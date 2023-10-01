import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./useAuth";
import { IAdminUsers, IUserFilters } from "../interfaces/IAdmin";
import { getAdminUsersApi, getComeFromApi, getCountriesApi, getCoursesApi, getMethodsApi } from "../components/api/admin";



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
  const [permits, setPermits] = useState(false);

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
    const courses = await getCoursesApi();
    setCourses(courses.courses);
    setPayCourses(courses.product_course);
  }
  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    if (user && user.role === "admin" || "superAdmin") {
      loadUsers();
      if (user.role === "superAdmin") {
        setPermits(true);
      }
      if (user.role === "admin" && user.roles[4].report === 0) {
        setPermits(true);
      }
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
    permits,
  };

  return <AdminContext.Provider value={values}>{children}</AdminContext.Provider>;
};