import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
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
} from "./RespLevel.styled";
import Link from "next/link";

const RespLevel = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [size, setSize] = useState(0);
  const levelRef = collection(db, "levelPoints")

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
  const getLevel = async () => {
    let tempData: any = []
    const data = await getDocs(levelRef)
    data.forEach((doc) => {
      tempData.push({ ...doc.data(), id: doc.id })
    })
    tempData = tempData.filter((data: any) => (data.maximum >= userData.score && data.minimum <= userData.score) || data.level == 9)
    setLevel(tempData[0])
  }

  useEffect(() => {
    fetchDB_data()
  }, [])

  useEffect(() => {
    if (userData != null) {
      getLevel();
      getSize();
    }
  }, [userData, size]);

  useEffect(() => {
    if (userData != null && level != null) {
      setData(157 - (((userData.score - level.minimum) / (level.maximum - level.minimum)) * 157));

    }
  }, [level])


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
        >
          <defs>
            <linearGradient id="gradient3">
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
export default RespLevel;