import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import {
  getRewards,
} from "../../../store/actions/RewardActions";
import {
  TitleContainer,
  RewardContainer,
  RewardsTitle,
  RewardCardContainer,
  AllSlider,
} from "./Rewards.styled";
import { AiOutlineHourglass, AiOutlineStar } from "react-icons/ai";
import { FaAward, FaPrescriptionBottleAlt } from "react-icons/fa";
import RewardSlider from "./Sliders/RewardSlider";

const Rewards = () => {

  const [rewards, setRewards] = useState<any>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [rewardsTypes, setRewardsTypes] = useState([]);
  const allSlider = [
    { type: "points" },
    { type: "claim-points" },
    { type: "months" },
    { type: "claim-months" },
    { type: "certificates" }
  ]
  const [selectReward, setSelectReward] = useState("points");
  const crownImage = "/images/profile/crown.png"
  const handStarImage = "/images/Rewards/handStar.png"

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
  const changeRewardPosition = (val: string) => {
    if (val == selectReward) {
      setSelectReward("points")
    }
    else {
      setSelectReward(val)
    }
  }
  const getAllRewards = () => {
    getRewards().then((res) => {
      setRewards(res);
      getNextRewards(res);
    })
  }
  const getNextRewards = (res: any) => {
    let pointsFilter = [];
    let monthsFilter = [];
    let certificatesFilter = [];
    pointsFilter = res.filter((reward: any) => (reward.type == "points" && userData.score < reward.points));
    monthsFilter = res.filter((reward: any) => reward.type == "months");
    certificatesFilter = res.filter((reward: any) => reward.type == "certificates");
    pointsFilter.sort((a: any, b: any) => a.points - b.points)
    console.log(pointsFilter[0]);
    getRewardTexts(pointsFilter[0]);
  }
  const getRewardTexts = (pointsFilter: any) => {
    console.log(pointsFilter)
    let arrayRewards: any = [
      {
        type: "points",
        scoreType: "puntaje",
        score: userData.score,
        title: pointsFilter.title,
        points: pointsFilter.points,
        completed: 7,
      },
      {
        type: "months",
        scoreType: "meses",
        score: 1,
        title: "2 Monomeros Gonvar",
        months: 2,
        completed: 0,
      },
      {
        type: "certificates",
        scoreType: "certificados",
        score: 2,
        title: "2 Monomeros Gonvar",
        certificates: 3,
        completed: 12,
      },
    ];
    setLoading(false);
    setRewardsTypes(arrayRewards)
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

  window.addEventListener("resize", () => {
    setInnerWidth(window.innerWidth <= 400 ? 399 : window.innerWidth);
  });
  useEffect(() => {
    fetchDB_data()

  }, [])

  useEffect(() => {
    if (userData != null) {
      getAllRewards();
      console.log(userData)
    }
  }, [userData]);

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
        <div className="reward-card-container">
          {
            rewardsTypes.map((val: any, index: any) => {
              return (
                <RewardCardContainer
                  key={"RewardsCard " + index}
                  reward={selectReward}
                  progress={380}
                  timeProgress={380}
                  certificateProgress={380}
                  type={val.type}
                  onClick={() => changeRewardPosition(val.type)}
                >
                  <div className="circle-level">
                    <img src={crownImage} className="crown" />
                    <p className="points"> {(val.completed > 9 || val.completed == 0) ? val.completed : "0" + val.completed}</p>
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
                      {val.type == "points" && <AiOutlineStar className="icon" />}
                      {val.type == "months" && <AiOutlineHourglass className="icon" />}
                      {val.type == "certificates" && <FaAward className="icon" />}
                      <p className="texts">
                        <span className="main">RECOMPENSAS</span><br />
                        por {val.scoreType}
                      </p>
                    </div>
                    <p className="texts">
                      <span className="sub">
                        {val.type == "points" && val.score + " puntos"}
                        {val.type == "months" ? (val.score == 1 ? val.score + " mes" : val.score + " meses") : ""}
                        {val.type == "certificates" ? (val.score == 1 ? val.score + " certificado" : val.score + " certificados") : ""}
                      </span>
                      <br />
                      {val.points && "en total"}
                      {val.months && (val.score > 1 ? "completados" : "completado")}
                      {val.certificates && (val.score > 1 ? "completados" : "completado")}
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
                        <span>{val.title}</span>
                      </p>
                      <p className="next-reward-points">
                        {val.points && <>al reunir<br /></>}
                        {val.months && <>al completar<br /></>}
                        {val.certificates && <>al terminar<br /></>}
                        <span>
                          {val.points && val.points + " puntos"}
                          {val.months && val.months + " meses"}
                          {val.certificates && val.certificates + " lecciones"}
                        </span>
                      </p>
                    </div>
                  </div>
                </RewardCardContainer>
              )
            })
          }
        </div>
      </RewardsTitle>
      <AllSlider>
        {
          allSlider.map((val: any, index: any) => {
            return (
              <RewardSlider
                key={"Slider Rewards " + index}
                user={userData}
                score={userData.score}
                rewards={rewards}
                type={val.type}
                innerWidth={innerWidth}
                indexSlider={index}
              />
            )
          })
        }
      </AllSlider>
    </RewardContainer>
  )
}
export default Rewards;