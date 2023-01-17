
import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import { getAuth, signOut } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";

import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import { Background, BackgroundLoader, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { getPaymentmethods } from "../../../store/actions/PaymentActions";
import { getLevel, getTimeLevel } from "../../../store/actions/RewardActions";
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
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [timeScore, setTimeScore] = useState<number>(0);
  const [timeLevel, setTimeLevel] = useState<any>([]);
  const [starPosition, setStarPosition] = useState(0);
  const [currentTimeLevel, setCurrentTimeLevel] = useState<number>(0);
  const [taskView, setTaskView] = useState(false);
  const [nameUpperCase, setNameUpperCase] = useState<string>("");
  const [data, setData] = useState<number>(0)
  const [reward, setReward] = useState<any>(0);
  const [prize, setPrize] = useState<any>([]);
  const [timePrize, setTimePrize] = useState<any>([]);
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [nextCertificate, setNextCertificate] = useState([]);

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
  const getDate = () => {
    let tempToday: number = new Date().getTime() / 1000;
    let tempDate: number = userData.membership?.startDate;
    // let timeScore: any = (((tempToday - tempDate) / 86400) / 30).toPrecision(2);
    let timeScore = Math.ceil((tempToday - tempDate) / (3600 * 24));

    if (tempDate == 0) {
      timeScore = 0;
    }
    setTimeScore(timeScore)
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
        setCurrentTimeLevel(res.length)
      } else {
        tempLevels = res.filter((data: any, index: any) => timeScore > data.maxMonth);
        const lastItem: any = [...tempLevels].pop();
        tempIndex = res.findIndex((x: any) =>
          x.id == lastItem?.id);
        if (lastItem) {
          lastItem.level = tempIndex + 1;
          lastItem.index = tempIndex;
          setTimeLevel(lastItem);
        }
      }

      if (res[0].minMonth > timeScore) {
        tempLevels.level = 0;
        setTimeLevel(tempLevels)
      }
    })
  }
  const getNextCertificates = () => {
    let counter: number = 0;
    let totalLessons: number = 0;
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
        totalLessons = course.lessons.length;
        average = counter / totalLessons;
        totalLessons = totalLessons - counter;
        if (average == 1) {
          counter = 0;
        }
        if (counter > 0) {
          arrCourse.push({ total: average, name: course.courseTittle, lessonsLeft: totalLessons })
          counter = 0;
        }
      })
      maximum = Math.max(...arrCourse.map((val: any) => val.total));
      arrCourse = arrCourse.filter((val: any) => val.total == maximum);
      setNextCertificate(arrCourse[0]);
    })
  }
  console.log(nextCertificate)
  // const logoutFunc = () => {
  //   const auth = getAuth();
  //   signOut(auth).then(() => {
  //     window.location.href = "/";
  //   }).catch((error) => {
  //     console.log(error)
  //   });
  // };
  useEffect(() => {
    fetchDB_data()

  }, [loggedIn])

  useEffect(() => {
    if (userData != null) {
      getCurrentLevel();
      getDate();
      getCurrentTimeLevel();
      getNextCertificates();
      setNameUpperCase(userData.name.toUpperCase())
    }
  }, [userData]);
  useEffect(() => {
    if (userData != null && level != null && timeLevel != null) {
      if (timeScore == 0) {
        setTimeProgress(0)
      }
      else {
        setTimeProgress(755 - (((timeScore - timeLevel.minMonth) / (timeLevel.maxMonth - timeLevel.minMonth)) * 755))
      }
      if (reward == 0) {
        setStarPosition((userData.score - level.minimum) / (level.maximum - level.minimum));
      }
      if (reward == 1) {
        if (timeScore == 0) {
          setStarPosition(0);
        }
        else {
          setStarPosition((timeScore - timeLevel.minMonth) / (timeLevel.maxMonth - timeLevel.minMonth));
        }
      }
      if (reward == 2) {
        setStarPosition(0)
      }
      setData(755 - (((userData.score - level.minimum) / (level.maximum - level.minimum)) * 755));
      setLoading(false);
    }
  }, [level, timeLevel, reward]);
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
          nextReward={prize}
          nextTimeReward={timePrize}
          data={data}
          timeProgress={timeProgress}
          reward={reward}
          responsive1023={responsive1023}
          starPosition={starPosition}
          timeLevel={timeLevel}
          nextCertificate={nextCertificate}
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
          timeLevel={timeLevel?.level}
          timeIndex={timeLevel.index}
          prize={prize}
          setPrize={setPrize}
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