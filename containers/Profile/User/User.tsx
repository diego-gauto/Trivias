
import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";
import { LoaderContain, LoaderImage, Background } from "../../../screens/Login.styled";

import { getAuth, signOut } from "firebase/auth";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
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
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [level, setLevel] = useState<any>([]);
  const [current, setCurrent] = useState<any>([]);
  const [next, setNext] = useState<any>([]);
  const [barProgress, setBarProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const levelRef = collection(db, "levelPoints")

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
  const getLevel = async () => {
    let tempData: any = []
    const data = await getDocs(levelRef)
    data.forEach((doc) => {
      tempData.push({ ...doc.data(), id: doc.id })
    })
    tempData = tempData.filter((data: any) => (data.maximum >= userData.score && data.minimum <= userData.score))
    setLevel(tempData[0])
  }
  const getPosition = async () => {
    let tempData: any = []
    const data = await getDocs(levelRef)
    data.forEach((doc) => {
      tempData.push({ ...doc.data(), id: doc.id })
    })
    tempData = tempData.filter((data: any) => (data.maximum == level.maximum || (data.maximum == level.minimum - 1 || data.maximum >= 99)))
    setCurrent(tempData[0])
    setNext(tempData[1])
  }
  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.log(error)
    });
  };
  useEffect(() => {
    fetchDB_data()
  }, [loggedIn])

  useEffect(() => {
    if (userData != null) {
      getLevel();

    }
  }, [userData]);
  useEffect(() => {
    if (userData != null && level != null) {
      getPosition();
      setBarProgress(((userData.score - level.minimum) / (level.maximum - level.minimum)) * 100)
      console.log(barProgress)
    }
  }, [level])
  useEffect(() => {
    if (userData != null && current != null) {
      setLoading(false);
    }
  }, [current])
  if (loading) {
    return (
      <Background>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
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
        <NextReward score={userData.score} nextLevel={next.name} currentLevel={current.name} barProgress={barProgress} />
        <ThirdBox>
          {/* Third Container */}
          <UserData />
          {/* Fourth Container */}
          <PaymentMethod />
        </ThirdBox>
      </SecondBox>
      <Link href="/">
        <LogOut onClick={logoutFunc} style={{
          display: responsive1023 ? "" : "none",
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