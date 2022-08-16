import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { useAuth } from "../../../../hooks/useAuth";
import {
  Background,
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
import { getLevel } from "../../../../store/actions/RewardActions";

const UserLevel = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [size, setSize] = useState(0);

  const [level, setLevel] = useState<any>([]);

  const [data, setData] = useState<number>(0)

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
        var value: any;
        response.forEach((e) => {
          value = e.data()
        });
        setUserData(value)

      })
    } catch (error) {
      return false
    }
  }
  const getSize = async () => {
    db.collection('levelPoints').get().then(snap => {
      setSize(snap.size) // will return the collection size
    });
  }
  const getCurrentLevel = () => {
    getLevel().then((res) => {
      res = res.filter((data: any, index: any) => (data.maximum >= userData.score && data.minimum <= userData.score) || data.level == size)

      setLevel(res[0])
    })
  }
  useEffect(() => {
    fetchDB_data()

  }, [loggedIn])

  useEffect(() => {
    if (userData != null) {
      getCurrentLevel();
      getSize();
    }
  }, [userData, size]);

  useEffect(() => {
    if (userData != null && level != null) {
      setData(157 - (((userData.score - level.minimum) / (level.maximum - level.minimum)) * 157));
    }
  }, [level])
  useEffect(() => {
    if (userData != null && size != null) {

    }
  }, [size])

  return (
    <Link href="/Rewards">
      <OuterProgress>
        <LevelContain>
          <CurrentLevel>
            {level.level}
          </CurrentLevel>
          <Vector />
          <Vector2 />
        </LevelContain>
        <ProgressSvg
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient2">
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
            progress={data}
          />
        </ProgressSvg>
      </OuterProgress>
    </Link>
  )
}
export default UserLevel;