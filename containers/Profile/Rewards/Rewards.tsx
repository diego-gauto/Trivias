import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";

import PointRewards from "./RewardComponent/PointRewards";
import TimeRewards from "./RewardComponent/TimeRewards";
import { LoaderContain, LoaderImage, Background } from "../../../screens/Login.styled";

import {
  Banner,
  BannerContain,
  BannerTitle,
  CurrentLevel,
  InnerProgress,
  InsideContain,
  LevelContain,
  MainContain,
  OuterProgress,
  PointsText,
  ProgressBackground,
  ProgressCircle,
  ProgressContain,
  ProgressSvg,
  RewardContainer,
  Vector,
  Vector2,
} from "./Rewards.styled";
import { Progress } from "../../../components/Catalogue/Module2/Module2.styled";

const Rewards = () => {

  const [rewards, setRewards] = useState(true);
  const responsive560 = useMediaQuery({ query: "(max-width: 560px)" });
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });

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

  let lastLevel: number = 100;

  let nextLevel: number = 400;

  let data: number = ((userData?.score - lastLevel) / (nextLevel - lastLevel)) * 346;

  let progress: number = 346 - data;

  return (
    <RewardContainer>

      <BannerContain>
        <Banner
          src="/images/Rewards/banner.png"
          width={responsive560 ? "750" : "1900"}
          height={responsive560 ? "500" : "450"}
        />
        <InsideContain>
          <BannerTitle>
            Centro de Recompensas
          </BannerTitle>
          <ProgressContain>
            <PointsText>
              {userData?.score}
            </PointsText>
            <OuterProgress>
              <LevelContain>
                <CurrentLevel>
                  1
                </CurrentLevel>
                <Vector />
                <Vector2 />
              </LevelContain>
              <ProgressSvg width={responsive560 ? "96px" : "120px"}
                height={responsive560 ? "96px" : "120px"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8E2DE2" />
                    <stop offset="100%" stopColor="#4A00E0" />
                  </linearGradient>
                </defs>
                <ProgressBackground
                  cx={responsive560 ? "47.5" : "60"}
                  cy={responsive560 ? "47.5" : "60"}
                  r={responsive560 ? "42.5" : "55"}

                />
                <ProgressCircle
                  cx={responsive560 ? "47.5" : "60"}
                  cy={responsive560 ? "47.5" : "60"}
                  r={responsive560 ? "42.5" : "55"}
                  progress={progress}
                />
              </ProgressSvg>
            </OuterProgress>
          </ProgressContain>
        </InsideContain>
      </BannerContain>
      <MainContain>
        {
          rewards
            ? <PointRewards setRewards={setRewards} userData={userData} />
            : <TimeRewards setRewards={setRewards} userData={userData} />
        }
      </MainContain>
    </RewardContainer>
  )
}
export default Rewards;