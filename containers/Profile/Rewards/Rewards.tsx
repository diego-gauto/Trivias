import React, { useEffect, useState } from "react";



import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import {
  getBanner,
  getLevel,
  getTimeLevel,
  getTimeLevels,
} from "../../../store/actions/RewardActions";
import PointRewards from "./RewardComponent/PointRewards";
import TimeRewards from "./RewardComponent/TimeRewards";
import {
  BannerContain,
  TitleContainer,
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
  RewardsTitle,
  RewardCardContainer,
} from "./Rewards.styled";
import { TimeProgressBackground, TimeProgressCircle, TimeSvg } from "./RewardsTime.styled";

const Rewards = () => {

  const [rewards, setRewards] = useState(true);
  const [size, setSize] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<any>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [timeScore, setTimeScore] = useState<number>(0);
  const [timeLevel, setTimeLevel] = useState<any>(0);
  const [currentTimeLevel, setCurrentTimeLevel] = useState<number>(0);
  const [data, setData] = useState<number>(0)
  const [dataResp, setDataResp] = useState<number>(0)
  const [timeData, setTimeData] = useState<number>(0)
  const [timeDataResp, setTimeDataResp] = useState<number>(0)
  const [banner, setBanner] = useState<any>({})
  const [timeLevels, setTimeLevels] = useState<any>()
  //REDISENIO
  const [selectReward, setSelectReward] = useState(0);
  const crownImage = "/images/profile/crown.png"

  const getAllTimeLevels = () => {
    getTimeLevels().then(res => {
      setTimeLevels(res)
    })
  }
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
    let tempToday: number = new Date().getTime() / 1000;
    let tempDate: number = userData.membership?.startDate;
    let timeScore = Math.ceil((tempToday - tempDate) / (3600 * 24));
    if (tempDate == 0) {
      timeScore = 0;
    }
    setTimeScore(timeScore)
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

  const getCurrentTimeLevel = () => {
    getTimeLevel().then(async (res) => {
      await Promise.all(res.map(async (element: any) => {
        element.minMonth = element.minimum * 30;
        element.maxMonth = element.maximum * 30;
      }))
      let tempIndex = 0;
      let tempLevels: any = [];
      tempLevels = res.filter((data: any, index: any) => timeScore >= data.minMonth && timeScore < data.maxMonth);
      if (tempLevels.length > 0) {
        tempIndex = res.findIndex((x: any) =>
          x.id == tempLevels[0]?.id)
        tempLevels[0].level = tempIndex + 1;
        tempLevels[0].index = tempIndex;
        setTimeLevel(tempLevels[0]);
        setCurrentTimeLevel(res.length);
        setTimeData(346 - (((timeScore - tempLevels[0].minMonth) / (tempLevels[0].maxMonth - tempLevels[0].minMonth)) * 346));
        setTimeDataResp(289 - (((timeScore - tempLevels[0].minMonth) / (tempLevels[0].maxMonth - tempLevels[0].minMonth)) * 289));
      } else {
        tempLevels = res.filter((data: any, index: any) => timeScore > data.maxMonth);
        const lastItem: any = [...tempLevels].pop();
        tempIndex = res.findIndex((x: any) =>
          x.id == lastItem?.id);
        if (lastItem) {
          lastItem.level = tempIndex + 1;
          lastItem.index = tempIndex;
          setTimeLevel(lastItem);
          setTimeData(346 - (((timeScore - tempLevels[0].minMonth) / (tempLevels[0].maxMonth - tempLevels[0].minMonth)) * 346));
          setTimeDataResp(289 - (((timeScore - tempLevels[0].minMonth) / (tempLevels[0].maxMonth - tempLevels[0].minMonth)) * 289));
        }
      }
      if (res[0].minMonth > timeScore) {
        tempLevels.level = 0;
        setTimeLevel(tempLevels);
        setTimeData(0);
        setTimeDataResp(0);
      }
    })
  }

  useEffect(() => {
    fetchDB_data()
    getRewardBanner()
  }, [])

  useEffect(() => {
    if (userData != null) {
      getCurrentLevel();
      getCurrentTimeLevel();
      getAllTimeLevels();
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
      <Background style={{ alignItems: "center", justifyContent: "center" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }
  /////// REDISENIO




  return (
    <RewardContainer>
      <TitleContainer>
        <div className="rewards-circle">
          <div className="inside" />
        </div>
        <p className="title">CENTRO DE <span>RECOMPENSAS</span></p>
      </TitleContainer>
      <RewardsTitle>
        <p className="main-text">
          ¡Haz hecho<br /> un gran trabajo <br />hasta ahora,<br /><span> {userData.name}!</span>
        </p>
        <div className="sub-paragraph">
          <p className="second-text">Descubre lo que tu progreso <br />
            en <span className="span-color">Gonvar</span> trajo para ti.
          </p>
          <p className="second-text">
            No olvides regresar pronto<br />
            <span className="span-weight">para descubrir nuevos premios.</span>
          </p>
        </div>
        <RewardCardContainer
          reward={selectReward}
          progress={380}
          timeProgress={380}
          certificateProgress={380}
        >

          <div className="circle-level">
            <img src={crownImage} className="crown" />
            <p className="points"> 08</p>
            <svg xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#902be7" />
                  <stop offset="100%" stopColor="#451371" />
                </linearGradient>
              </defs>
              <circle className="progress-background"
              />
              <circle className="progress-circle" />
            </svg>
          </div>
        </RewardCardContainer>
      </RewardsTitle>
    </RewardContainer>
  )
}
export default Rewards;