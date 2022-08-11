import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { collection, onSnapshot, query, where, getDocs, doc, getDoc } from "firebase/firestore";
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
import { Progress } from "../../../components/Catalogue/Module2/Module2.styled";

const Rewards = () => {

  const [rewards, setRewards] = useState(true);
  const responsive560 = useMediaQuery({ query: "(max-width: 560px)" });
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const levelRef = collection(db, "levelPoints")

  const [level, setLevel] = useState<any>([]);
  const [userLevel, setUserLevel] = useState<any>([]);

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
    tempData = tempData.filter((data: any) => (data?.maximum >= userData?.score && data?.minimum <= userData?.score))
    setLevel(tempData[0])
    // data.docs.map((doc) => {
    //   setUserLevel({ ...doc.data(), id: doc.id })
    // })
  }

  let dataResp: number = ((userData?.score - level?.minimum) / (level?.maximum - level?.minimum)) * 289;

  let progressResp: number = 289 - dataResp;

  useEffect(() => {
    setData(346 - (((userData?.score - level?.minimum) / (level?.maximum - level?.minimum)) * 346));
    getLevel();
    setLoading(false);
    console.log(data)
  }, [userData?.score]);

  useEffect(() => {
    fetchDB_data()

  }, [loggedIn])

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
                  progressResp={progressResp}
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