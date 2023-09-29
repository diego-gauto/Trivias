import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./useAuth";
import { IAdminUsers, IUserFilters } from "../interfaces/IAdmin";
import { getAdminUsersApi } from "../components/api/admin";


interface Props {
  children?: ReactNode
  // any props that come into the component
}

const AdminContext = createContext<any>(null);

export const useAdmin = () => {
  //console.log(db)
  return useContext(AdminContext);
};

export const AdminsContext = (props: Props) => {
  const [userFilters, setUserFilters] = useState<IUserFilters>({
    country: "todos",
    name: "all_users",
    current_page: 1,
    spent: 0,
    level: -1,
    method: "todos",
    membership: "todos",
    course_id: -1,
    state: "todos",
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
  const [users, setUsers] = useState({} as IAdminUsers);
  const [userLoader, setUserLoader] = useState<boolean>(true);
  const { children } = props;
  let userContext = useAuth();
  const { user } = userContext;

  const loadUsers = async () => {
    const adminUsers = await getAdminUsersApi(userFilters);
  }
  useEffect(() => {
    if (user && user.role === "admin" || "superAdmin") {
      loadUsers();
    }
  }, [user])

  const values = {
    countries,
    users,
    userLoader,
    loadUsers,
  };

  return <AdminContext.Provider value={values}>{children}</AdminContext.Provider>;
};