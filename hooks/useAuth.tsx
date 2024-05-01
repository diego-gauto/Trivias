import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';
import { getUserApi } from '../components/api/users';
import { IUserInfoResult } from '../interfaces/IUser';

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

interface IUseAuthProps {
  user: IUserInfoResult | null;
  isAuthenticating: boolean;
  logout: () => Promise<void>;
  reloadUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<IUserInfoResult | null>>;
}

const AuthContext = createContext<any>(null); //<any>(null); // <IUseAuthProps>({} as IUseAuthProps);

export const useAuth = () => {
  //console.log(db)
  return useContext(AuthContext);
};

export const getSingleUser = async (id: string) => {
  //const docRef = doc(db, 'users', id);
  try {
    const docSnap = await getDoc(doc(db, 'users', id));
    return docSnap.data();
  } catch {
    return undefined;
  }
};

export const AuthProvider = ({ children, ...props }: Props) => {
  const [user, setUser] = useState<any>(null); // useState<IUserInfoResult | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  const auth = getAuth();

  const logout = () => {
    return signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('email')) {
      getUserApi(localStorage.getItem('email')).then((res) => {
        setUser(res);
        setIsAuthenticating(false);
      });
    } else {
      setIsAuthenticating(false);
    }
  }, []);

  const reloadUser = () => {
    getUserApi(localStorage.getItem('email')).then((res) => {
      setUser({ ...res });
    });
  };

  const values = {
    user,
    isAuthenticating,
    logout,
    reloadUser,
    setUser,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};
