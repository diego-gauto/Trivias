
import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";

import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import {
  BackgroundProfile,
  LogOut,
  LogOutIcon,
  SecondBox,
  ThirdBox,
} from "../../Profile/User/User.styled";
import NextReward from "./NextReward";
import PaymentMethod from "./PaymentMethod";
import UserData from "./UserData";
import UserInfo from "./UserInfo";

const User = () => {
  const responsive470 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }, [])

  } catch (error) {
    console.log(error)
    setLoggedIn(false)
  }
  useEffect(() => {
    fetchDB_data()
  }, [loggedIn])

  const fetchDB_data = async () => {
    try {
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response) => {
        var userData: any;
        response.forEach((e) => {
          userData = e.data()
        });
        setUserData(userData)
      })
    } catch (error) {
      return false
    }
  }


  return (
    <BackgroundProfile>
      {/* FIRST BOX */}
      {//Vista del navbar dinamico de Homepage
        userData !== null
          ?
          <UserInfo userData={userData} /> : <></>}
      {/* SECOND Container */}
      <SecondBox>
        <NextReward />
        <ThirdBox>
          {/* Third Container */}
          <UserData />
          {/* Fourth Container */}
          <PaymentMethod />
        </ThirdBox>
      </SecondBox>
      <Link href="/">
        <LogOut style={{
          display: responsive470 ? "" : "none",
          marginTop: "-5%",
        }}>
          Cerrar Sesión
          <LogOutIcon />
        </LogOut>
      </Link>
    </BackgroundProfile>
  )
}
export default User;