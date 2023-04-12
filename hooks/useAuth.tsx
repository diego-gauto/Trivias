
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import { getUserApi } from "../components/api/users";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  //console.log(db)
  return useContext(AuthContext);
};

export const getSingleUser = async (id: string) => {
  //const docRef = doc(db, 'users', id);
  try {
    const docSnap = await getDoc(doc(db, 'users', id));
    return docSnap.data()
  } catch {
    return undefined;
  }
}

export const AuthProvider = ({ children, ...props }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const auth = getAuth();

  const logout = () => {

    return signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.log(error)
    })
  };


  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUser(res);
        setIsAuthenticating(false);
      })
    } else {
      setIsAuthenticating(false);
    }
  }, [])

  const values = {
    user,
    isAuthenticating,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};
