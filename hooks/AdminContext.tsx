import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./useAuth";
import { IAdminUsers, IUserFilters } from "../interfaces/IAdmin";
import { getAdminUsersApi, getComeFromApi, getCountriesApi, getMethodsApi } from "../components/api/admin";
import { getCoursesApi } from "../components/api/lessons";


interface Props {
  children?: ReactNode
  // any props that come into the component
}

const AdminContext = createContext<any>(null);

export const useAdmin = () => {
  return useContext(AdminContext);
};

export const AdminsContext = (props: Props) => {
  const [userFilters, setUserFilters] = useState<IUserFilters>({
    country: "todos",
    name: "all_users",
    offset: 0,
    spent: 0,
    level: -1,
    method: "todos",
    membership: "todos",
    course_id: -1,
    state: "todos",
    come_from: "todos",
    dates_login: {
      valid: 0,
      date_1: "",
      date_2: "",
    },
    dates_created: {
      valid: 0,
      date_1: "",
      date_2: "",
    }
  });
  const [countries, setCountries] = useState([]);
  const [methods, setMethods] = useState([]);
  const [comeFrom, setComeFrom] = useState([]);
  const [users, setUsers] = useState<IAdminUsers[]>([]);
  const [userLoader, setUserLoader] = useState<boolean>(true);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [courses, setCourses] = useState<any>([]);
  const [payCourses, setPayCourses] = useState<any>([]);

  const { children } = props;
  let userContext = useAuth();
  const { user } = userContext;
  const loadUsers = async () => {
    setUserLoader(true)
    const adminUsers = await getAdminUsersApi(userFilters);
    setTotalUsers(adminUsers.data.totalUsers);
    setUsers(adminUsers.data.users)
    setUserLoader(false)
  }
  const loadData = async () => {
    const countries = await getCountriesApi();
    setCountries(countries)
    const methods = await getMethodsApi();
    setMethods(methods);
    const comeFrom = await getComeFromApi();
    setComeFrom(comeFrom);
    let tempPayCourses: Array<any> = [];
    const courses = await getCoursesApi();
    setCourses(courses);
    courses.forEach((element: any) => {
      if (element.type == 'Producto') {
        let counter: number = 0;
        element.seasons.forEach((season: any) => {
          season.lessons.forEach((lesson: any) => {
            counter++;
          })
        });
        element.totalLessons = counter;
        tempPayCourses.push(element)
      }
    });
    setPayCourses(tempPayCourses)
  }
  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    if (user && user.role === "admin" || "superAdmin") {
      loadUsers();
    }
  }, [user, userFilters])

  const values = {
    countries,
    users,
    userLoader,
    comeFrom,
    loadUsers,
    methods,
    userFilters,
    totalUsers,
    setUserFilters,
    courses,
    payCourses,
  };

  return <AdminContext.Provider value={values}>{children}</AdminContext.Provider>;
};