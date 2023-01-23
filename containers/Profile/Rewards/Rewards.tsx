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
import {
  TitleContainer,
  RewardContainer,
  RewardsTitle,
  RewardCardContainer,
} from "./Rewards.styled";
import { AiOutlineStar } from "react-icons/ai";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import RewardSlider from "./Sliders/rewardSlider";

const Rewards = () => {

  const [rewards, setRewards] = useState(true);
  const [size, setSize] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<any>([]);
  const [timeScore, setTimeScore] = useState<number>(0);

  //REDISENIO
  const rewardsType = [0, 1, 2];
  const [selectReward, setSelectReward] = useState(0);
  const crownImage = "/images/profile/crown.png"
  const handStarImage = "/images/Rewards/handStar.png"

  const changeRewardPosition = (index: number) => {
    if (index == selectReward) {
      setSelectReward(0)
    }
    else {
      setSelectReward(index)
    }
  }

  const getRewards = () => {

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
        setLoading(false);
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

  useEffect(() => {
    fetchDB_data()
    getRewards();
  }, [])

  useEffect(() => {
    if (userData != null) {
      getDate();
    }
  }, [userData, size]);

  useEffect(() => {
    if (userData != null && level != null) {

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
        <div className="hand-container">
          <img src={handStarImage} />
        </div>
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
        {
          rewardsType.map((val: any, index: any) => {
            return (
              <RewardCardContainer
                key={"RewardsCard " + index}
                reward={selectReward}
                progress={380}
                timeProgress={380}
                certificateProgress={380}
                type={val}
                className={`contain-${val}`}
                onClick={() => changeRewardPosition(index)}
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
                <div className="card-title">
                  <div className="title-contain">
                    <AiOutlineStar className="icon" />
                    <p className="texts">
                      <span className="main">RECOMPENSAS</span><br />
                      por puntaje
                    </p>
                  </div>
                  <p className="texts">
                    <span className="sub">2300 puntos </span>
                    <br />en total
                  </p>
                </div >
                <div className="next-reward">
                  <div className="container">
                    <div className="icon-rewards">
                      <FaPrescriptionBottleAlt />
                      <FaPrescriptionBottleAlt />
                    </div>
                    <p className="next-reward-title">
                      Siguiente recompensa <br />
                      <span>2 monómeros Gonvar</span>
                    </p>
                    <p className="next-reward-points">
                      al reunir<br />
                      <span>3000 puntos</span>
                    </p>
                  </div>
                </div>
              </RewardCardContainer>
            )
          })
        }
      </RewardsTitle>
      {/* <RewardSlider  isInfinite={true} type ="points" slideData={rewards}/> */}
    </RewardContainer>
  )
}
export default Rewards;