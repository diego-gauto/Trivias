import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
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

const Rewards = () => {

  const [rewards, setRewards] = useState(true);
  const responsive560 = useMediaQuery({ query: "(max-width: 560px)" });
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const levelRef = collection(db, "levelPoints")

  const [level, setLevel] = useState<any>([]);

  const [data, setData] = useState<number>(0)
  const [dataResp, setDataResp] = useState<number>(0)

  const [unLocked, setUnLocked] = useState<any>([])
  const [locked, setLocked] = useState<any>([])


  const getUnLocked = async () => {
    let tempData2: any = []
    const data2 = await getDocs(levelRef)
    data2.forEach((doc) => {
      tempData2.push({ ...doc.data(), id: doc.id })
    })
    setUnLocked(tempData2.filter((data2: any) => data2.maximum < level.maximum))
  }
  const getLocked = async () => {
    let tempData3: any = []
    const data3 = await getDocs(levelRef)
    data3.forEach((doc) => {
      tempData3.push({ ...doc.data(), id: doc.id })
    })
    setLocked(tempData3.filter((data3: any) => data3.maximum > level.maximum))
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

  const getLevel = async () => {
    let tempData: any = []
    const data = await getDocs(levelRef)
    data.forEach((doc) => {
      tempData.push({ ...doc.data(), id: doc.id })
    })
    tempData = tempData.filter((data: any) => (data.maximum >= userData.score && data.minimum <= userData.score))
    setLevel(tempData[0])
  }


  useEffect(() => {
    fetchDB_data()
  }, [])

  useEffect(() => {
    if (userData != null) {
      getLevel();
      getUnLocked();
      getLocked();
    }
  }, [userData]);

  useEffect(() => {
    if (userData != null && level != null) {
      setData(346 - (((userData.score - level.minimum) / (level.maximum - level.minimum)) * 346));
      setDataResp(289 - (((userData.score - level.minimum) / (level.maximum - level.minimum)) * 289));
      setLoading(false);
      console.log(unLocked)
      console.log(locked)
    }
  }, [level, unLocked, locked])

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
          <Banner
            src="/images/Rewards/banner.png"
            layout="fill"
            priority
          />
        </ImageContain>
        <InsideContain>
          <BannerTitle>
            Centro de Recompensas
          </BannerTitle>
          <ProgressContain>
            <PointsText>
              {userData?.score}
              &nbsp;
              <span>
                puntos
              </span>
            </PointsText>
            <OuterProgress>
              <LevelContain>
                <CurrentLevel>
                  {level?.name}
                </CurrentLevel>
                <Vector />
                <Vector2 />
              </LevelContain>
              <ProgressSvg
                xmlns="http://www.w3.org/2000/svg"
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
        </InsideContain>
      </BannerContain>
      <MainContain>
        {
          rewards
            ? <PointRewards
              setRewards={setRewards}
              userData={userData}
              level={level}
              locked={locked}
              unLocked={unLocked}
            />
            : <TimeRewards
              setRewards={setRewards}
              userData={userData}
            />
        }
      </MainContain>
    </RewardContainer>
  )
}
export default Rewards;