
import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import { getAuth, signOut } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";

import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import { Background, BackgroundLoader, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { getPaymentmethods } from "../../../store/actions/PaymentActions";
import { getLevel, getRewards, getTimeLevel } from "../../../store/actions/RewardActions";
import {
  BackgroundProfile,
  LogOut,
  LogOutIcon,
  SecondBox,
  ThirdBox,
} from "../../Profile/User/User.styled";
import HomeWork from "./HomeWork";
import NextReward from "./NextReward";
import PaymentMethod from "./PaymentMethod";
import UserData from "./UserData";
import UserInfo from "./UserInfo";
import { History } from "./History";
import { getNextCertificate } from "../../../store/actions/courseActions";

const User = () => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [level, setLevel] = useState<any>([]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethods] = useState<any>([]);
  const [monthProgress, setMonthProgress] = useState(0)
  const [timeLevel, setTimeLevel] = useState<any>(0);
  const [starPosition, setStarPosition] = useState(0);
  const [nameUpperCase, setNameUpperCase] = useState<string>("");
  const [data, setData] = useState<number>(0)
  const [reward, setReward] = useState<any>(0);
  const [pointsRewards, setPointsRewards] = useState<any>([]);
  const [pointsRewardSize, setpointsRewardSize] = useState([]);
  const [timePrize, setTimePrize] = useState<any>([]);
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [nextCertificate, setNextCertificate] = useState([]);
  const [certificateProgress, setCertificateProgress] = useState(0);

  const newCard = () => {
    setAddPayment(!addPayment)
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
      let temp_pm: any = []
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response) => {
        response.forEach((e) => {
          getPaymentmethods(e.id).then((res: any) => {
            temp_pm = res;
            res.forEach((element: any) => {
              if (e.data().membership.paymentMethod == element.cardId) {
                element.default = true;
              } else {
                element.default = false;
              }
            });
            setPaymentMethods(res);
            temp_pm = temp_pm.filter((x: any) => x.cardId == e.data().membership.paymentMethod);
            if (temp_pm.length > 0) {
              setUserData({ ...e.data(), id: e.id, membership: { ...e.data().membership, brand: temp_pm[0].brand, last4: temp_pm[0].last4 } });
            } else {
              setUserData({ ...e.data(), id: e.id });
            }

          })
        });
      })
    } catch (error) {
      return false
    }
  }
  const getAllRewards = () => {
    let monthsRewards: any
    getRewards().then((reward) => {
      monthsRewards = reward.filter((val: any) => (val.type == "months"))
      getNextPointsReward(reward);
    })
  }
  const getNextPointsReward = (reward: any) => {
    let tempRewardSize = reward.length;
    console.log(tempRewardSize);
    let pointsRewards = reward.filter((val: any) => (val.type == "points" && (userData.score < val.points)))
    pointsRewards.sort((a: any, b: any) => a.points - b.points)
    if (pointsRewards[0] == null) {
      setPointsRewards([])
    }
    else {
      setPointsRewards(pointsRewards[0])
    }
  }
  const getCurrentLevel = () => {
    getLevel().then((res) => {
      res = res.filter((data: any, index: any) => data.minimum <= userData.score)
      setLevel(res[0])
    })
  }
  const getCurrentTimeLevel = () => {
    let tempCurrentDate: any = new Date().getTime() / 1000;
    let tempDayCount: any = tempCurrentDate - userData.membership.startDate;
    let getMonth: any = tempDayCount / (60 * 60 * 24 * 30);
    setMonthProgress(getMonth);
    setTimeLevel(Math.floor(getMonth))
  }
  const getTimeProgress = () => {
    if (monthProgress == 0) {
      setTimeProgress(0)
    }
    else {
      setTimeProgress(755 - (((monthProgress - timeLevel) / (timeLevel + 1 - timeLevel)) * 755))
    }
  }
  const getNextCertificates = () => {
    let counter: number = 0;
    let totalLessons: number = 0;
    let maxTtotalLessons: number = 0;
    let average: number = 0;
    let arrCourse: any = [];
    let maximum: any = 0;
    getNextCertificate().then((res: any) => {
      res.map((course: any) => {
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
          arrCourse.push({ total: average, name: course.courseTittle, lessonsLeft: totalLessons, maxLessons: maxTtotalLessons })
          counter = 0;
        }
      })
      maximum = Math.max(...arrCourse.map((val: any) => val.total));
      arrCourse = arrCourse.filter((val: any) => val.total == maximum);
      setNextCertificate(arrCourse[0]);
    })
  }
  const certificateProgressBar = () => {
    let tempProgress: number = 0;
    let totalLessonsLeft: any = nextCertificate;
    tempProgress = ((totalLessonsLeft?.lessonsLeft) / totalLessonsLeft?.maxLessons) * 755;
    setCertificateProgress(tempProgress);
  }
  useEffect(() => {
    fetchDB_data()
  }, [loggedIn])
  useEffect(() => {
    if (userData != null) {
      getCurrentLevel();
      getCurrentTimeLevel();
      getNextCertificates();
      getAllRewards();
      setNameUpperCase(userData.name.toUpperCase())
    }
  }, [userData]);
  useEffect(() => {
    if (userData !== null && level !== null && timeLevel !== null && nextCertificate !== null) {
      certificateProgressBar();
      getTimeProgress();
      setData(755 - (((userData.score - level.minimum) / (level.maximum - level.minimum)) * 755));
      setLoading(false);
    }
  }, [level, timeLevel, reward, nextCertificate]);
  const handleClick = (value: boolean) => {
    fetchDB_data();
  }
  if (loading) {
    return (
      <BackgroundLoader>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </BackgroundLoader>
    )
  }
  return (
    <BackgroundProfile>
      {/* FIRST CONTAINER */}
      {
        responsive1023 &&
        < div className="title-contain">
          <p className="first-text">
            PERFIL DE <span>{nameUpperCase}</span>
          </p>
          <p className="second-text">
            ¡Dale seguimiento<br /><span> a tu aprendizaje!</span>
          </p>
        </div>
      }

      {//Vista del navbar dinamico de Homepage

        userData !== null
        &&
        <UserInfo
          userData={userData}
          nextReward={pointsRewards}
          nextTimeReward={timePrize}
          data={data}
          timeProgress={timeProgress}
          reward={reward}
          responsive1023={responsive1023}
          starPosition={starPosition}
          timeLevel={timeLevel}
          nextCertificate={nextCertificate}
          certificateProgress={certificateProgress}
        />
      }
      {/* SECOND Container */}
      <SecondBox>
        <div className="title-contain">
          <p className="first-text">
            PERFIL DE <span>{nameUpperCase}</span>
          </p>
          <p className="second-text">
            ¡Dale seguimiento<span> a tu aprendizaje!</span>
          </p>
        </div>
        <NextReward
          score={userData.score}
          user={userData}
          reward={reward}
          setReward={setReward}
          timeLevel={timeLevel}
          monthProgress={monthProgress}
          timeIndex={timeLevel.index}
          prize={pointsRewards}
          prizeSize={pointsRewardSize}
          timePrize={timePrize}
          setTimePrize={setTimePrize}
          nextCertificate={nextCertificate}
        />
        <ThirdBox>
          {/* Third Container */}
          <PaymentMethod data={userData} pm={paymentMethod} handleClick={handleClick} newCard={newCard} addPayment={addPayment} />
          {/* Fourth Container */}
          {/* <UserData data={userData} pm={paymentMethod} /> */}
          <History user={userData} addPayment={addPayment} />
        </ThirdBox>
      </SecondBox>
      {/* <Link href="/">
        <LogOut onClick={logoutFunc} style={{
          display: responsive1023 ? "" : "none",
          marginTop: "-5%",
        }}>
          Cerrar Sesión
          <LogOutIcon />
        </LogOut>
      </Link> */}
    </BackgroundProfile >
  )
}
export default User;