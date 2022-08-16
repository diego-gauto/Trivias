import React, { useEffect, useState } from "react";

import { collection } from "firebase/firestore";

import {
  CurrentLevel,
  LevelContain,
  OuterProgress,
  ProgressBackground,
  ProgressCircle,
  ProgressSvg,
  Vector,
  Vector2,
} from "../../../../containers/Profile/Rewards/UserLevel/UserLevel.styled";
import { db } from "../../../../firebase/firebaseConfig";
import { getLevel } from "../../../../store/actions/RewardActions";
import { AllUser } from "../UsersList";

const UserLevel = ({ userLevel }: any) => {
  //const [selectedUser, setSelectedUser] = useState<SelectedUser>({ name: "", score: 0, email: "", id: "" });
  const [size, setSize] = useState(0);
  const [getUser, setGetUser] = useState<Array<AllUser | any>>([]);
  const [level, setLevel] = useState<any>([]);
  const [data, setData] = useState<number>(0)

  // const getUserId = async () => {
  //   const usersCollectionRef = query(collection(db, "users"));
  //   const userData = await getDocs(usersCollectionRef);
  //   setGetUser(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  // }

  // const clickUser = async (id: string) => {
  //   const newUser: SelectedUser | any = await getSingleUser(selectedUser.id);
  //   if (newUser?.uid) {
  //     setSelectedUser(newUser);
  //   }

  // }

  const getSize = async () => {
    db.collection('levelPoints').get().then(snap => {
      setSize(snap.size) // will return the collection size
    });
  }
  const getCurrentLevel = () => {
    getLevel().then((res) => {
      res = res.filter((data: any) => (data.maximum >= userLevel.score && data.minimum <= userLevel.score) || data.level == size)
      setLevel(res[0])
      console.log("SIZE LEVEL:", res)
    })
  }

  useEffect(() => {
    if (userLevel != null) {
      level.Level
      // getUserId();
      // clickUser(selectedUser.id);
      getCurrentLevel();
      getSize();
    }
  }, [userLevel, size]);

  useEffect(() => {
    if (userLevel != null && level != null) {
      setData(157 - (((userLevel.score - level.minimum) / (level.maximum - level.minimum)) * 157));
    }
  }, [level])
  useEffect(() => {
    if (userLevel != null && size != null) {

    }
  }, [size])

  return (
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
  )
}
export default UserLevel;