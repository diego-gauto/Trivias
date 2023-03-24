import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import {
  getRewards, getUserRewards,
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
import { useRouter } from "next/router";
import { getNextCertificate } from "../../../store/actions/courseActions";
import { title } from "process";

const Rewards = () => {

  const [rewards, setRewards] = useState<any>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [courses, setCourses] = useState<any>([]);
  const [completeCertificates, setCompleteCertificates] = useState<any>([])
  const [loading, setLoading] = useState(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [rewardsTypes, setRewardsTypes] = useState([]);
  const [userReward, setUserReward] = useState([]);
  const [monthProgress, setMonthProgress] = useState(0)
  const [timeLevel, setTimeLevel] = useState<any>(0);
  const [allSlider, setAllSlider] = useState<any>([
    { type: "claim-points" },
    { type: "points" },
  ])
  const [selectReward, setSelectReward] = useState("points");
  const crownImage = "/images/profile/crown.png"
  const handStarImage = "/images/Rewards/handStar.png"
  const router = useRouter();
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
  const getAllUserRewards = () => {
    getUserRewards(userData.id).then((res) => {
      setUserReward(res);
    });
  }
  const changeRewardPosition = (val: string) => {
    let tempSlides: any = [];
    if (val == selectReward) {
      setSelectReward("points")
    }
    else {
      setSelectReward(val)
    }
    if (val == "points") {
      tempSlides = [
        { type: "claim-points" },
        { type: "points" },
      ]
      setAllSlider(tempSlides)
    }
    if (val == "months") {
      tempSlides = [
        { type: "claim-months" },
        { type: "months" },
      ]
      setAllSlider(tempSlides)
    }
    if (val == "certificates") {
      tempSlides = [
        { type: "claim-certificates" },
        { type: "certificates" },
      ]
      setAllSlider(tempSlides)
    }
  }
  const getAllRewards = (nextCertificate: any) => {
    getRewards().then((res) => {
      setRewards(res);
      getNextRewards(res, nextCertificate);
    })
  }
  const getCurrentTimeLevel = () => {
    let tempCurrentDate: any = new Date().getTime() / 1000;
    let tempDayCount: any = tempCurrentDate - userData.membership.startDate;
    let getMonth: any;
    if (userData.membership.startDate == 0) {
      getMonth = 0;
    }
    else {
      getMonth = tempDayCount / (3600 * 24 * 30);
    }
    setMonthProgress(getMonth);
    setTimeLevel(Math.floor(getMonth))
  }
  const getNextCertificates = () => {
    let counter: number = 0;
    let totalLessons: number = 0;
    let maxTtotalLessons: number = 0;
    let average: number = 0;
    let arrCourse: any = [];
    let maximum: any = 0;
    let certCourses: any = [];
    getNextCertificate().then((res: any) => {
      res.map((course: any) => {
        if (userData?.certificates) {
          userData?.certificates.forEach((cert: any) => {
            if (cert.courseId == course.id) {
              certCourses.push({
                title: course.courseTittle,
                path: course.coursePath,
                professorId: course.courseProfessor[0],
                color: course.courseCertificateColor,
                courseId: course.id,
              });
            }
          })
        }
        setCompleteCertificates(certCourses);
        course.lessons.map((lesson: any) => {
          lesson.users.map((userID: any) => {
            if (userData.id === userID) {
              counter = counter + 1;
            }
          })
        })
        maxTtotalLessons = course.lessons.length;
        average = counter / maxTtotalLessons;
        totalLessons = maxTtotalLessons - counter;
        if (average == 1) {
          counter = 0;
        }
        if (counter > 0) {
          arrCourse.push({
            total: average,
            title: course.courseTittle,
            lessonsLeft: totalLessons,
            maxLessons: maxTtotalLessons,
            type: "certificates",
            path: course.coursePath,
            about: course.courseAbout,
          })
          counter = 0;
        }
      })
      maximum = Math.max(...arrCourse.map((val: any) => val.total));
      setCourses(arrCourse);
      arrCourse = arrCourse.filter((val: any) => val.total == maximum);
      getAllRewards(arrCourse[0]);
    })
  }
  const getNextRewards = (res: any, nextCertificate: any) => {
    let pointsFilter = [];
    let previousRewardPoints: any = [];
    let progressPoints: number = 0;
    let pointsLength = [];
    let monthsFilter = [];
    let previousRewardMonths: any = [];
    let progressMonths: number = 0;
    let monthsLength = [];
    let certificatesCompleted: number = userData.certificates?.length;
    let progressCertificates: number = 0;
    pointsFilter = res.filter((reward: any) => (reward.type == "points" && userData.score < reward.points));
    previousRewardPoints = res.filter((reward: any) => (reward.type == "points" && userData.score >= reward.points));
    pointsLength = res.filter((reward: any) => (reward.type == "points" && userData.score >= reward.points));
    monthsFilter = res.filter((reward: any) => (reward.type == "months" && timeLevel < reward.months));
    previousRewardMonths = res.filter((reward: any) => (reward.type == "months" && timeLevel >= reward.months));
    monthsLength = res.filter((reward: any) => (reward.type == "months" && timeLevel >= reward.months));
    if (previousRewardPoints.length == 0) {
      previousRewardPoints = [{
        points: 0,
      }]
    }
    if (previousRewardMonths.length == 0) {
      previousRewardMonths = [{
        months: 0,
      }]
    }
    pointsFilter.sort((a: any, b: any) => a.points - b.points)
    monthsFilter.sort((a: any, b: any) => a.months - b.months)
    previousRewardPoints.sort((a: any, b: any) => b.points - a.points)
    previousRewardMonths.sort((a: any, b: any) => b.months - a.months)
    if (pointsFilter.length == 0) {
      pointsFilter = [{
        points: 0,
        title: "Sin Recompensas"
      }]
    }
    else {
      progressPoints = 565 - (((userData.score - previousRewardPoints[0].points) / (pointsFilter[0].points - previousRewardPoints[0].points)) * 565)
    }
    if (monthsFilter.length == 0) {
      monthsFilter = [{
        months: 0,
        title: "Sin Recompensas"
      }]
    }
    else {
      progressMonths = 565 - (((monthProgress - previousRewardMonths[0].months) / (monthsFilter[0].months - previousRewardMonths[0].months)) * 565)
    }
    if (nextCertificate) {
      progressCertificates = ((1 - nextCertificate.total) * 565);
    }
    else {
      progressCertificates = 0;
    }
    getRewardTexts(pointsFilter[0], pointsLength, progressPoints, monthsFilter[0], monthsLength, progressMonths, progressCertificates, nextCertificate, certificatesCompleted);
  }
  const getRewardTexts = (pointsFilter: any, pointsLength: any, progressPoints: number, monthsFilter: any, monthsLength: any, monthProgress: any, progressCertificates: any, nextCertificate: any, certificatesCompleted: any) => {
    let arrayRewards: any = [
      {
        type: "points",
        scoreType: "puntaje",
        score: userData.score,
        title: pointsFilter.title,
        points: pointsFilter.points,
        completed: pointsLength.length,
        progress: progressPoints,
      },
      {
        type: "months",
        scoreType: "meses",
        score: timeLevel,
        title: monthsFilter.title,
        months: monthsFilter.months,
        completed: monthsLength.length,
        progress: monthProgress,
      },
      {
        type: "certificates",
        scoreType: "certificados",
        score: certificatesCompleted ? certificatesCompleted : 0,
        title: nextCertificate?.title ? nextCertificate.title : "Sin certificados",
        certificates: nextCertificate?.lessonsLeft ? nextCertificate.lessonsLeft : "0",
        completed: certificatesCompleted ? certificatesCompleted : 0,
        progress: progressCertificates,
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
        router.push("auth/Login")
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
      getAllUserRewards();
      getNextCertificates();
      getCurrentTimeLevel();
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
                  progress={val.progress}
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
                      {
                        (val.type == "points") &&
                        <p className="texts">
                          <span className="main">RECOMPENSAS</span><br />
                          por {val.scoreType}
                        </p>
                      }
                      {
                        (val.type == "months") &&
                        <p className="texts">
                          <span className="main">BENEFICIOS</span><br />
                          por {val.scoreType}
                        </p>
                      }
                      {
                        val.type == "certificates" &&
                        <p className="texts">
                          <span className="main">CERTIFICADOS</span><br />
                          Completados
                        </p>
                      }
                    </div>

                    <p className="texts">
                      <span className="sub">
                        {val.type == "points" && val.score + " puntos"}
                        {val.type == "months" ? (val.score == 1 ? val.score + " mes" : val.score + " meses") : ""}
                        {val.type == "certificates" ? (val.score == 1 ? val.score + " certificado" : val.score + " certificados") : ""}
                      </span>
                      <br />
                      {val.type == "points" && "en total"}
                      {val.type == "months" && (val.score == 1 ? "completado" : "completados")}
                      {val.type == "certificates" && (val.score == 1 ? "completado" : "completados")}
                    </p>
                  </div >
                  <div className="next-reward">
                    <div className="container">
                      <div className="icon-rewards">
                        <FaPrescriptionBottleAlt />
                        <FaPrescriptionBottleAlt />
                      </div>
                      <p className="next-reward-title">
                        {val.type == "points" && <>Siguiente recompensa<br /></>}
                        {val.type == "months" && <>Siguiente beneficio<br /></>}
                        {val.type == "certificates" && <>Siguiente certificado<br /></>}
                        <span>{val.title}</span>
                      </p>
                      <p className="next-reward-points">
                        {val.type == "points" && <>{val.points !== 0 ? <>al reunir<br /></> : <>Recompensas<br /></>}</>}
                        {val.type == "months" && <>{val.months !== 0 ? <>al completar<br /></> : <>Recompensas<br /></>}</>}
                        {val.type == "certificates" && <>{val.certificates !== 0 ? <>al completar<br /></> : <>Recompensas<br /></>}</>}
                        <span>
                          {val.type == "points" && <>{val.points !== 0 ? val.points + " puntos" : "Completadas"}</>}
                          {val.type == "months" && <>{val.months !== 0 ? (val.months == 1 ? val.months + " mes" : val.months + " meses") : "Completadas"}</>}
                          {val.type == "certificates" && <>{val.certificates !== 0 ? (val.certificates == 1 ? val.certificates + " lección" : val.certificates + " lecciones") : "Completadas"}</>}
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
                months={timeLevel}
                certificates={userData.certificates?.length ? userData.certificates?.length : 0}
                rewards={rewards}
                type={val.type}
                innerWidth={innerWidth}
                indexSlider={index}
                userReward={userReward}
                getAllUserRewards={getAllUserRewards}
                courses={courses}
                completeCertificates={completeCertificates}
                router={router}
              />
            )
          })
        }
      </AllSlider>
    </RewardContainer>
  )
}
export default Rewards;