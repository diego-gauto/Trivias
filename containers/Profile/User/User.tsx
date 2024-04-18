
import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import router from "next/router";

import { getAllRewardDataApi, getRewardsApi } from "../../../components/api/rewards";
import { getUserApi } from "../../../components/api/users";
import { BackgroundLoader, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { BackgroundProfile, SecondBox, ThirdBox } from "../../Profile/User/User.styled";
import { History } from "./History";
import NextReward from "./NextReward";
import PaymentMethod from "./PaymentMethod";
import UserInfo from "./UserInfo";

const User = () => {
  let today = new Date().getTime() / 1000;
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [userData, setUserData] = useState<any>(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [monthProgress, setMonthProgress] = useState(0)
  const [timeLevel, setTimeLevel] = useState<any>(0);
  const [starPosition, setStarPosition] = useState(0);
  const [nameUpperCase, setNameUpperCase] = useState<string>("");
  const [data, setData] = useState<number>(0)
  const [reward, setReward] = useState<any>(0);
  const [pointsRewards, setPointsRewards] = useState<any>([]);
  const [pointsRewardSize, setpointsRewardSize] = useState([]);
  const [timePrize, setTimePrize] = useState<any>([]);
  const [timePrizeSize, setTimePrizeSize] = useState<any>([]);
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [nextCertificate, setNextCertificate] = useState([]);
  const [certificateProgress, setCertificateProgress] = useState(0);
  const [missingData, setMissingData] = useState<number>(0);
  const [lastTimeReward, setLastTimeReward] = useState<any>([]);
  const [totalCertificates, setTotalCertificates] = useState<number>(0);
  const newCard = () => {
    setAddPayment(!addPayment)
  }
  const handleClick = (value: boolean) => {
    retrieveUser();
  }
  const retrieveUser = () => {
    getUserApi(localStorage.getItem("email")).then((res) => {
      setUserData(res);
      let maxLength = 18;
      let shortName = res.name;
      if (shortName.length > maxLength) {
        shortName = shortName.substring(0, maxLength) + "...";
      }
      setNameUpperCase(shortName.toUpperCase())
    })
  }
  const getRewardData = async (user: any) => {
    let nextCourseCertificate: any = [];
    let completedCertificates: any = [];
    let tempDayCount: any = today - user.start_date;
    let getMonth: any;
    let requests: any;
    let tempRewards: any = [];
    if (user.level === 1) {
      if (user.start_date === 0) {
        getMonth = 0;
      }
      else {
        getMonth = tempDayCount / (3600 * 24 * 30);
      }
    }
    else {
      getMonth = 0;
    }
    setMonthProgress(getMonth);
    setTimeLevel(Math.floor(getMonth))
    let tempTimeLevel: any = Math.floor(getMonth);
    await getRewardsApi().then(async (res) => {
      await Promise.all(res.data.data.map((reward: any) => {
        tempRewards.push(reward);
      }))
    })
    await getAllRewardDataApi(user.id).then((res) => {
      console.log(res);
      completedCertificates = res.certificates;
      nextCourseCertificate = res.nextCertificates;
    });
    let data = {
      reward: tempRewards,
      user: user,
      nextCourseCertificate: nextCourseCertificate[0],
      totalCertificates: completedCertificates.length,
      monthCompleted: tempTimeLevel,
      monthPercentage: getMonth
    }
    await getNextRewards(data);
  }
  const getTimeReward = async (props: any) => {
    const {
      monthPercentage,
      reward,
    } = props;
    let monthRewardCompleted = [];
    let progressMonth: number = 755;
    let monthFilter = [];
    monthFilter = reward.filter((data: any) => (data.type === "months" && monthPercentage < data.month));
    monthRewardCompleted = reward.filter((data: any) => (data.type === "months" && monthPercentage >= data.month));
    monthFilter.sort((a: any, b: any) => a.month - b.month);
    monthRewardCompleted.sort((a: any, b: any) => b.month - a.month);
    if (monthFilter.length > 0) {
      if (monthRewardCompleted.length === 0) {
        progressMonth = 755 - (((monthProgress - 0) / (monthFilter[0].month - 0)) * 755)
      }
      else {
        progressMonth = (755 - (((monthProgress - monthRewardCompleted[0].month) / (monthFilter[0].month - monthRewardCompleted[0].month)) * 755))
      }
    }
    else {
      progressMonth = 0;
    }
    return { progressMonth, monthFilter, monthRewardCompleted }
  }
  const getNextRewards = async (data: any) => {
    let pointsFilter: any = [];
    let pointRewardCompleted = [];
    let progressPoints: number = 0;
    let progressCertificates: number = 755;
    const {
      monthPercentage,
      nextCourseCertificate,
      reward,
      user
    } = data;
    pointsFilter = reward.filter((data: any) => (data.type === "points" && user.score < data.points));
    pointRewardCompleted = reward.filter((data: any) => (data.type === "points" && user.score >= data.points));
    pointsFilter.sort((a: any, b: any) => a.points - b.points);
    pointRewardCompleted.sort((a: any, b: any) => b.points - a.points);
    if (pointsFilter.length > 0) {
      if (pointRewardCompleted.length === 0) {
        progressPoints = 755 - (((user.score - 0) / (pointsFilter[0].points - 0)) * 755)
      }
      else {
        progressPoints = 755 - (((user.score - pointRewardCompleted[0].points) / (pointsFilter[0].points - pointRewardCompleted[0].points)) * 755)
      }
    }
    else {
      progressPoints = 0;
    }

    if (nextCourseCertificate) {
      progressCertificates = ((1 - nextCourseCertificate.progress) * 755);
    }
    else {
      progressCertificates = 755;
    }
    let timeRewardData = {
      monthPercentage: monthPercentage,
      reward: reward,
    }
    setPointsRewards(pointsFilter[0]);
    setData(progressPoints);
    setCertificateProgress(progressCertificates);
    setNextCertificate(nextCourseCertificate);
    await getTimeReward(timeRewardData).then((timeReward) => {
      if (monthPercentage === 0) {
        setTimeProgress(0);
        setTimePrize([]);
        setLastTimeReward([])
        setLoading(false);
        setMissingData(missingData + 1);
      } else {
        setTimeProgress(timeReward.progressMonth);
        setTimePrize(timeReward.monthFilter[0]);
        setLastTimeReward(timeReward.monthRewardCompleted)
        setLoading(false);
        setMissingData(missingData + 1);

      }
    })

  }
  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUserData(res);
        let maxLength = 18;
        let shortName = res.name;
        if (shortName.length > maxLength) {
          shortName = shortName.substring(0, maxLength) + "...";
        }
        setNameUpperCase(shortName.toUpperCase())
        getRewardData(res);
      })
    } else {
      localStorage.setItem("login", "true")
      router.push({ pathname: "/auth/login" });
    }
  }, [])
  useEffect(() => {
    if (missingData === 1) {
      getRewardData(userData);
    }
  }, [missingData])

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
      {/* <button onClick={send}>Test</button> */}
      {
        responsive1023 &&
        < div className="title-contain">
          <p className="first-text">
            PERFIL DE <span>{nameUpperCase}</span>
          </p>
          <h1 className="second-text">
            ¡Dale seguimiento<br /><span> a tu aprendizaje!</span>
          </h1>
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
          handleClick={handleClick}
        />
      }
      {/* SECOND Container */}
      <SecondBox>
        <div className="title-contain">
          <p className="first-text">
            PERFIL DE <span>{nameUpperCase}</span>
          </p>
          <h1 className="second-text">
            ¡Dale seguimiento<span> a tu aprendizaje!</span>
          </h1>
        </div>
        <NextReward
          user={userData}
          reward={reward}
          setReward={setReward}
          timeLevel={timeLevel}
          monthProgress={monthProgress}
          prize={pointsRewards}
          prizeSize={pointsRewardSize}
          timePrize={timePrize}
          timePrizeSize={timePrizeSize}
          nextCertificate={nextCertificate}
          handleClick={handleClick}
          lastTimeReward={lastTimeReward}
        />
        <ThirdBox>
          {/* Third Container */}
          <PaymentMethod data={userData} pm={userData.payment_methods} handleClick={handleClick} newCard={newCard} addPayment={addPayment} />
          {/* Fourth Container */}
          {/* <UserData data={userData} pm={paymentMethod} /> */}
          <History user={userData} addPayment={addPayment} />
        </ThirdBox>
      </SecondBox>
    </BackgroundProfile >
  )
}
export default User;