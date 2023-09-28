import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./useAuth";
import { IAdminUsers, IUserFilters } from "../interfaces/IAdmin";


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
  const [userFilters, setUserFilters] = useState({} as IUserFilters);
  const [countries, setCountries] = useState([]);
  const [users, setUsers] = useState({} as IAdminUsers);
  const { children } = props;
  let userContext = useAuth();
  const { user } = userContext;

  useEffect(() => {
    if (user && user.role === "admin" || "superAdmin") {

    }
  }, [user])

  const values = {
    countries,
  };

  return <AdminContext.Provider value={values}>{children}</AdminContext.Provider>;
};