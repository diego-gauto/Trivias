import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { useAuth } from "../../../../hooks/useAuth";
import {
  CurrentLevel,
  LevelContain,
  OuterProgress,
  ProgressBackground,
  ProgressCircle,
  ProgressSvg,
  Vector,
  Vector2,
} from "./UserLevel.styled";
import Link from "next/link";

const UserLevel = () => {
  const [loggedIn, setLoggedIn] = useState<any>(false);
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

  let lastLevel: number = 100;

  let nextLevel: number = 400;

  let data: number = ((userData?.score - lastLevel) / (nextLevel - lastLevel)) * 157;

  let progress: number = 157 - data;

  return (
    <Link href="/Rewards">
      <OuterProgress>
        <LevelContain>
          <CurrentLevel>
            1
          </CurrentLevel>
          <Vector />
          <Vector2 />
        </LevelContain>
        <ProgressSvg
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8E2DE2" />
              <stop offset="100%" stopColor="#4A00E0" />
            </linearGradient>
          </defs>
          <ProgressBackground
            cx="27px"
            cy="27px"
            r="25px"

          />
          <ProgressCircle
            cx="27px"
            cy="27px"
            r="25px"
            progress={progress}
          />
        </ProgressSvg>
      </OuterProgress>
    </Link>
  )
}
export default UserLevel;