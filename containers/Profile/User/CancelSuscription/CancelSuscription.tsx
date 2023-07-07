import router from "next/router";

import { CancelSub } from "./CancelSuscription.styled";
import { useEffect, useState } from "react";
import { getUserApi } from "../../../../components/api/users";
import { BackgroundLoader, LoaderContain, LoaderImage } from "../../../../screens/Login.styled";
import { getAllRewardDataApi, getRewardsApi } from "../../../../components/api/rewards";
import CircleProgress from "../../../CircleProgress/CircleProgress";
import { PROFILE_PATH } from "../../../../constants/paths";
const manitas = "/images/cancel_suscription/manos moradas.png"

const CancelSuscription = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [monthProgress, setMonthProgress] = useState(0);
  const [pointsRewards, setPointsRewards] = useState<any>([]);
  const [timePrize, setTimePrize] = useState<any>([]);
  const [nextCertificate, setNextCertificate] = useState([]);
  const [certificateProgress, setCertificateProgress] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [missingData, setMissingData] = useState<number>(0);
  const [data, setData] = useState<number>(0)
  const today = new Date().getTime() / 1000;
  const [timeLevel, setTimeLevel] = useState<any>(0);
  const [totalPointRewards, setTotalPointRewards] = useState<any>([]);
  const [monthReward, setMonthReward] = useState<any>([]);
  const goBack = () => {
    router.push({ pathname: PROFILE_PATH });
  }
  const goPause = () => {
    router.push({
      pathname: "/end-suscription",
      query: { type: "pause" }
    });
  }
  const goCancel = () => {
    router.push({
      pathname: '/end-suscription',
      query: { type: "cancel" }
    });
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
      await Promise.all(res.map((reward: any) => {
        tempRewards.push(reward);
      }))
      // setRewards(res);
    })
    await getAllRewardDataApi(user.id).then((res) => {
      completedCertificates = res.certificates;
      nextCourseCertificate = res.nextCertificates;
    });
    setNextCertificate(nextCourseCertificate);
    let data = {
      reward: tempRewards,
      user: user,
      nextCourseCertificate: nextCourseCertificate[0],
      totalCertificates: completedCertificates.length,
      monthCompleted: tempTimeLevel,
      monthPercentage: getMonth
    }
    // setCompleteCertificates(completedCertificates);
    // setCourses(nextCourseCertificate);
    await getNextRewards(data);
  }
  const getTimeReward = async (props: any) => {
    const {
      monthPercentage,
      reward,
    } = props;
    let monthRewardCompleted = [];
    let dashArray: number = 500;
    let progressMonth: number = dashArray;
    let monthFilter = [];
    monthFilter = reward.filter((data: any) => (data.type === "months" && monthPercentage < data.month));
    monthRewardCompleted = reward.filter((data: any) => (data.type === "months" && monthPercentage >= data.month));
    monthFilter.sort((a: any, b: any) => a.month - b.month);
    monthRewardCompleted.sort((a: any, b: any) => b.month - a.month);
    if (monthFilter.length > 0) {
      if (monthRewardCompleted.length === 0) {
        progressMonth = dashArray - (((monthProgress - 0) / (monthFilter[0].month - 0)) * dashArray)
      }
      else {
        progressMonth = (dashArray - (((monthProgress - monthRewardCompleted[0].month) / (monthFilter[0].month - monthRewardCompleted[0].month)) * dashArray))
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
    let dashArray: number = 500;
    let progressCertificates: number = dashArray;
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
        progressPoints = dashArray - (((user.score - 0) / (pointsFilter[0].points - 0)) * dashArray)
      }
      else {
        progressPoints = dashArray - (((user.score - pointRewardCompleted[0].points) / (pointsFilter[0].points - pointRewardCompleted[0].points)) * dashArray)
      }
    }
    else {
      progressPoints = 0;
    }

    if (nextCourseCertificate) {
      progressCertificates = ((1 - nextCourseCertificate.progress) * dashArray);
    }
    else {
      progressCertificates = dashArray;
    }
    let timeRewardData = {
      monthPercentage: monthPercentage,
      reward: reward,
    }
    setTotalPointRewards(pointRewardCompleted);
    setPointsRewards(pointsFilter[0]);
    setData(progressPoints);
    setCertificateProgress(progressCertificates);
    await getTimeReward(timeRewardData).then((timeReward) => {
      setTimeProgress(timeReward.progressMonth);
      setTimePrize(timeReward.monthFilter[0]);
      setMonthReward(timeReward.monthRewardCompleted);
      setLoader(true);
      setMissingData(missingData + 1);
    })
  }
  const getMonthForRaffle = () => {
    const current_date = new Date().getMonth() + 1;
    if (current_date >= 1 && current_date <= 3) {
      return "Mes de Abril"
    }
    if (current_date >= 4 && current_date <= 6) {
      return "Mes de Julio"
    }
    if (current_date >= 7 && current_date <= 9) {
      return "Mes de Octubre"
    }
    if (current_date >= 10 && current_date <= 12) {
      return "Mes de Enero"
    }
    return "Mes de Enero"
  }
  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUserData(res);
        getRewardData(res);
      })
    }
  }, [])
  useEffect(() => {
    if (missingData === 1) {
      getRewardData(userData);
    }
  }, [missingData])

  if (!loader) {
    return (
      <BackgroundLoader style={{ backgroundColor: "#ede7f2" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </BackgroundLoader>
    )
  }
  return (
    <CancelSub>
      <div className="m-3">
        {/* <h2 className="purple-dark">¿Estás seguro que quieres cancelar tu suscripción?</h2> */}
        <h2 className="purple-dark">¿Pasando por un mal momento?</h2>
        {/* <h2 className="purple">Pausa tu suscripción y no pierdas tus avances.</h2> */}
        <p className="my-4">Sabemos que hay momentos en la vida en la que necesitas hacer un pausa. </p>
        {/* <br />Por eso, <b>te ofrecemos la opcion de pausar tu suscripción por un mes.</b></p> */}
        <p className="my-4">Quizás no has podido tomar tus clases o no cuentas con el dinero suficiente para continuar. </p>
        <p className="my-4">Pero debo decirte que <b>Gonvar+</b> no sólo son clases, también tienes recompensas, beneficios y certificados que <b>perderás al cancelar:</b></p>
        {/* <p>Además al pausar tu suscripción, no solo <b>conservarás tu progreso,</b> si no que también se guardarán tus beneficios:</p> */}
        <div className="row w-100 justify-content-around">
          <div className="col-sm text-center">
            {/* <img src={GroupN} className="mb-3" /> */}
            <CircleProgress progress={data} total={totalPointRewards.length} color={"#f88114"} />
            <p><b className="orange">{userData.score}</b> Puntos obtenidos</p>
            <p><b className="orange">{totalPointRewards.length}</b> Recompensas obtenidas</p>
            <p>Tu próxima recompensa a los <b className="orange">{pointsRewards ? (pointsRewards.points) : 0}</b> puntos será:</p>
            <p><b className="orange">{pointsRewards ? pointsRewards.title : "Ya tienes todas las recompensas!"}</b></p>
          </div>
          <div className="col-sm text-center">
            <CircleProgress progress={timeProgress} total={monthReward.length} color={"#29c784"} />
            <p>Llevas <b className="green">{timeLevel}</b> meses inscrita a <b>Gonvar+</b>, por lo cual tienes <b className="green">{monthReward[0] ? monthReward[0].title : "por lo cual aun no obtienes descuento en productos Gonvar"}.</b></p>
            <p>Además tienes <b className="green">{timeLevel}</b> boletos para nuestra rifa que será en el </p>
            <p className="close"><b className="green">{getMonthForRaffle()}</b></p>
          </div>
          <div className="col-sm text-center">
            <CircleProgress progress={certificateProgress} total={userData.user_certificates.length} color={"#1b7beb"} />
            <p>Haz obtenido <b className="blue">{userData.user_certificates.length}</b> certificados con FUV <b>{'('}folio único verificado{')'},</b> y estás
              a punto de conseguir el certificado del curso </p>
            <div className="close">
              {
                nextCertificate.map((val: any, index: number) => {
                  if (index <= 2) {
                    return (
                      <p key={"next_certificates_" + index}>
                        <b className="blue p-0">{val.title}</b>
                      </p>
                    )
                  }
                  else {
                    return ""
                  }
                })
              }
            </div>
          </div>
        </div>
        <p className="my-4"><b>¡Haz las cuentas!</b>, todo lo que Gonvar te regala te conviene.</p>
        <p className="my-4">
          Si eres una aplicadora que gasta al menos 250 pesos al mes en producto de
          uñas, créeme que <b>te saldrá más económico</b> quedarte a recibir todos los regalos, que cancelar y
          comprar de todas formas producto de baja calidad, en otro lado y al mismo precio que el de Gonvar.
        </p>
        <p className="my-4">
          Evita cancelar tu suscripción y recuerda que Gonvar+ te regala producto cada dos meses, te otorga
          <b> boletos para rifas </b>y <b>descuentos de hasta 40% en producto</b>.
        </p>
        {/* <p><b>No dejes que los obstáculos te detengan.</b> Pausa tu suscripción y aprovecha esta oportunidad
          para cuidar de ti misma. Cuando estés lista, <b>estaremos aquí para ayudarte a retomar tu camino como
            Nail Artist.</b></p> */}
        {/* <p>Recuerda que esta accion solo la puedes realizar <b>dos veces cada 12 meses.</b> <br />Te quedan <b>{'x'}</b> pausas</p> */}
        <div className="buttons mt-5">
          <button onClick={goCancel} className="left">Perder mis beneficios</button>
          {/* <button onClick={goPause} className="right">Si quiero pausar</button> */}
          <button onClick={goBack} className="btn btn-link ">Regresar al inicio</button>
        </div>

      </div>
      <img src={manitas} className="under" />
    </CancelSub>
  )
}
export default CancelSuscription;