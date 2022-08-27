import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { collection, onSnapshot, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";

import PointRewards from "./RewardComponent/PointRewards";
import TimeRewards from "./RewardComponent/TimeRewards";
import { LoaderContain, LoaderImage, Background } from "../../../screens/Login.styled";

import {
  BannerContain,
  BannerTitle,
  CurrentLevel,
  ImageContain,
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
import { addUserReward, getBanner, getLevel } from "../../../store/actions/RewardActions";
import { TimeProgressBackground, TimeProgressCircle, TimeSvg } from "./RewardsTime.styled";

const Rewards = () => {

  const [rewards, setRewards] = useState(true);
  const [size, setSize] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<any>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [timeLevel, setTimeLevel] = useState<number>(0);


  const [data, setData] = useState<number>(0)
  const [dataResp, setDataResp] = useState<number>(0)
  const [banner, setBanner] = useState<any>({})

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
    console.log(error);
    setLoggedIn(false);
  }
  const fetchDB_data = async () => {
    try {
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response) => {

        response.forEach((e: any) => {
          setUserData({ ...e.data(), id: e.id });
        });

      })
    } catch (error) {
      return false
    }
  }
  const getDate = () => {
    let tempToday = new Date().getTime() / 1000;
    let tempDate: any = userData.membership?.startDate;
    let timeLevel = (tempToday - tempDate) / 86400;
    console.log(timeLevel)
    setTimeLevel(timeLevel)
  }

  const getRewardBanner = () => {
    getBanner().then((res) => {
      setBanner(res);
    })
  }

  const getSize = async () => {
    db.collection('levelPoints').get().then(snap => {
      setSize(snap.size) // will return the collection size
    });
  }

  const getCurrentLevel = () => {
    getLevel().then((res) => {
      res = res.filter((data: any, index: any) => data.minimum <= userData.score)
      setLevel(res[0])
      setCurrentLevel(res.length)
    })
  }

  useEffect(() => {
    fetchDB_data()
    getRewardBanner()
  }, [])

  useEffect(() => {
    if (userData != null) {
      getCurrentLevel();
      getSize();
      getDate();
    }
  }, [userData, size]);

  useEffect(() => {
    if (userData != null && level != null) {
      if (level.maximum < userData.score) {
        setData(0);
        setDataResp(0);
      } else {
        setData(346 - (((userData.score - level.minimum) / (level.maximum - level.minimum)) * 346));
        setDataResp(289 - (((userData.score - level.minimum) / (level.maximum - level.minimum)) * 289));
      }
      setLoading(false);
    }
  }, [level])

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
    <RewardContainer>

      <BannerContain>
        <ImageContain>
          <img
            src={banner.path}
          />
        </ImageContain>
        <InsideContain>
          <BannerTitle>
            Centro de Recompensas
          </BannerTitle>
          {
            rewards
              ?
              <ProgressContain>
                <PointsText>
                  {userData.score} puntos

                </PointsText>
                <OuterProgress>
                  <LevelContain>
                    <CurrentLevel>
                      {currentLevel}
                    </CurrentLevel>
                    <Vector />
                    <Vector2 />
                  </LevelContain>
                  <ProgressSvg
                  >
                    <defs>
                      <linearGradient id="gradient">
                        <stop offset="0%" stopColor="#8E2DE2" />
                        <stop offset="100%" stopColor="#4A00E0" />
                      </linearGradient>
                    </defs>
                    <ProgressBackground />
                    <ProgressCircle
                      progress={data}
                      progressResp={dataResp}
                    />
                  </ProgressSvg>
                </OuterProgress>
              </ProgressContain>
              :
              <ProgressContain>
                <PointsText>
                  {userData.score}
                  {
                    userData.score == 1 ? " mes" : " meses"
                  }
                </PointsText>
                <OuterProgress>
                  <LevelContain>
                    <CurrentLevel>
                      {currentLevel}
                    </CurrentLevel>
                    <Vector />
                    <Vector2 />
                  </LevelContain>
                  <TimeSvg
                  >
                    <defs>
                      <linearGradient id="gradientTimeLevel">
                        <stop offset="0%" stopColor="#8E2DE2" />
                        <stop offset="100%" stopColor="#4A00E0" />
                      </linearGradient>
                    </defs>
                    <TimeProgressBackground />
                    <TimeProgressCircle
                      progress={data}
                      progressResp={dataResp}
                    />
                  </TimeSvg>
                </OuterProgress>
              </ProgressContain>
          }
        </InsideContain>
      </BannerContain>
      <MainContain>
        {
          rewards
            ? <PointRewards
              setRewards={setRewards}
              level={level}
              currentLevel={currentLevel}
              score={userData.score}
              user={userData}
            />
            : <TimeRewards
              setRewards={setRewards}
              timeLevel={timeLevel}
            />
        }
      </MainContain>
    </RewardContainer>
  )
}
export default Rewards;