import { useEffect, useState } from "react";

import { AiOutlineHourglass, AiOutlineStar } from "react-icons/ai";
import { FaArrowRight, FaAward } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import { useMediaQuery } from "react-responsive";

import "animate.css";
import Link from "next/link";
import router from "next/router";

import { getCoursesApi } from "../../../components/api/lessons";
import { getRewardsApi } from "../../../components/api/rewards";
import { cancelPaypal, cancelStripe } from "../../../components/api/users";
import { LoaderContainSpinner } from "../Purchase/Purchase.styled";
import { RewardContainer, SubscriptionContainer, ThirdBox } from "./User.styled";

const or_star = "/images/cancel_modal/or_star.png"
const gr_star = "/images/cancel_modal/gr_star.png"
const bl_star = "/images/cancel_modal/bl_star.png"
const handImage = "/images/profile/hand.png"

const NextReward = ({ timeLevel, reward, prizeSize, timePrize, timePrizeSize, setReward, user, prize, nextCertificate, monthProgress, handleClick }: any) => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [formatDate, setFormatDate] = useState("")
  const [loader, setLoader] = useState<any>(false);
  const [points, setPoints] = useState<any>();
  const [time, setTime] = useState<any>();
  const [certificates, setCertificates] = useState<any>();
  const [pop, setPop] = useState<any>(false);

  const today = new Date().getTime() / 1000;

  const getRewards = async () => {
    let tempPointsObj: any = { obtained: [], blocked: [] };
    let tempMonthObj: any = { obtained: [], blocked: [] };
    let tempPoints: any = [];
    let tempMonths: any = [];
    getRewardsApi().then((res) => {
      tempPoints = res.filter((x: any) => x.type === 'points');
      tempMonths = res.filter((x: any) => x.type === 'months');
      tempPoints.sort((a: any, b: any) => a.points - b.points);
      tempMonths.sort((a: any, b: any) => a.month - b.month);

      tempPoints.forEach((element: any) => {
        if (user.score >= element.points) {
          tempPointsObj.obtained.push(element);
        } else {
          tempPointsObj.blocked.push(element);
        }
      });
      setPoints(tempPointsObj);
      let today: any = new Date().getTime() / 1000;
      let tempDayCount: any = today - user.start_date;
      let tempMonth = user.start_date === 0 ? 0 : tempDayCount / (3600 * 24 * 30);
      tempMonths.forEach((element: any) => {
        if (Math.floor(tempMonth) >= element.month) {
          tempMonthObj.obtained.push(element);
        } else {
          tempMonthObj.blocked.push(element);
        }
      });
      setTime(tempMonthObj);
    })
    let array: any = [];
    user.user_certificates.forEach((element: any) => {
      array.push(element.course_id)
    });
    getCoursesApi().then((courses) => {
      let tempCertificates = courses.filter((x: any) => !array.includes(x.id));
      let countArray: any = []
      tempCertificates.forEach((course: any, index: number) => {
        countArray.push({ id: course.id, name: course.title, count: 0 })
        course.lessons.forEach((lesson: any) => {
          if (lesson.users) {
            if (lesson.users.filter((x: any) => x.user_id === user.user_id).length > 0) {
              countArray[index].count++;
            }
          }
        });
      });
      countArray.sort((a: any, b: any) => b.count - a.count);
      setCertificates(countArray);
    })
  }

  useEffect(() => {
    let tempDate = new Date((user.final_date) * 1000);
    let tempDay = tempDate.getDate();
    let tempMonth = tempDate.getMonth() + 1;
    let tempYear = tempDate.getFullYear();
    setFormatDate(`${tempDay}/${tempMonth}/${tempYear}`);

  }, [])

  useEffect(() => {
    getRewards()
  }, [])

  const cancelSubscription = async () => {
    setLoader(true);
    if (user.method == 'stripe') {
      let sub = {
        subscriptionId: user.plan_id,
        userId: user.user_id,
        planName: ""
      }
      cancelStripe(sub).then(() => {
        handleClick()
        setLoader(false);
      })
    } else {
      let membership = {
        planId: user.plan_id,
        id: user.plan_id
      }
      cancelPaypal(membership).then(() => {
        handleClick()
        setLoader(false);
      })
    }
    router.push({
      pathname: "/cancel-suscription",
      query: { id: user.user_id }
    });
  }

  const getDays = () => {
    return Math.round((user.final_date - today) / 86400)
  }
  return (
    <ThirdBox>
      {pop &&
        <div className="dimScreen animate__animated animate__slideInUp" >
          <div id="confirmBox" className="dialog">
            <div className="exit">
              <TfiClose className="ex-icon" onClick={() => setPop(false)} />
            </div>
            <h2>¡Nos estristece saber que deseas irte!</h2>
            <p className="sangria sangria-y">Al cancelar tu suscripcion <b className="purple"> se reiniciara todo tu avance. </b>
              Tus beneficios, recompensas y certificados se perderán.
            </p>
            <p>En este momento, <b className="purple">{user.name}</b>, has completado <b>{'x'}</b> cursos y cuentas con:</p>
            <ul>
              <div className="space-bt">
                <img src={or_star} />
                <p className="p-li"><b className="orange">{'x'}</b> Puntos obtenidos, <b className="orange">{'x'} </b>
                  recompensas obtenidas por puntaje y una proxima recompensa a los <b className="orange">{'x'}</b> puntos.</p>
              </div>
              <div className="space-bt">
                <img src={gr_star} />
                <p className="p-li">Llevas <b className="green">{'x tiempo'}</b> de contratar <b><i>Gonvar+</i></b>,
                  lo que te ha dado como beneficio un descuento del <b className="green">{'x'}% </b>
                  en todos nuestros productos</p>
              </div>
              <div className="space-bt">
                <img src={bl_star} />
                <p className="p-li">Has obtenido <b className="blue">{'x'}</b> certificados de tus cursos y estas
                  por completar <b className="blue">{'x'}</b> cursos mas.</p>
              </div>
            </ul>
            <div className="buttons">
              <button className="left" onClick={cancelSubscription}>Renuncio a mis beneficios, recompensas y certificados</button>
              <button className="right" onClick={() => { setPop(false) }}>Salir</button>
            </div>
          </div>
        </div>}
      <RewardContainer reward={reward}>
        <div className="main-container">
          <div className="reward-title-contain">
            <p>
              Centro de recompensas
            </p>
          </div>
          <div>
          </div>
          <div className="reward-containers">
            <div className="reward-conditions">
              <div className="point-container" onClick={() => { setReward(0) }}>
                <p><span className="first-word">Recompensas</span> <br />
                  obtenidas<br />
                  <span> por puntaje</span></p>
                <div className="bottom-contain">
                  <p className="point-number">
                    {points?.obtained.length}
                  </p>
                  <AiOutlineStar style={reward == 0 ? { color: "white" } : { color: "#942cec" }} />
                </div>
              </div>
              <div className="time-container" onClick={() => { setReward(1) }}>
                <p><span className="first-word">Beneficios</span> <br />
                  obtenidos<br />
                  <span> por tiempo</span></p>
                <div className="bottom-contain">
                  <p className="time-number">
                    {time?.obtained.length}
                  </p>
                  <AiOutlineHourglass style={reward == 1 ? { color: "white" } : { color: "#942cec" }} />
                </div>
              </div>
              <div className="certificates-container" onClick={() => { setReward(2) }}>
                <p><span className="first-word">Certificados</span> <br />
                  <span>acumulados</span></p>
                <div className="bottom-contain">
                  <p className="certificate-number">
                    {user.user_certificates?.length > 0 ? user.user_certificates.length : 0}
                  </p>
                  <FaAward style={reward == 2 ? { color: "white" } : { color: "#942cec" }} />
                </div>
              </div>
            </div>
            <div className="extra-info">
              {
                reward === 0 &&
                <p>
                  {
                    points?.blocked.length > 0 ?
                      <>Siguiente Recompensa <span>{points?.blocked[0].title}</span> a los <span>{points?.blocked[0].points} puntos</span></> :
                      <>Próximamente podrás desbloquear <span>nuevas recompensas</span></>
                  }
                </p>
              }
              {
                reward === 1 &&
                <p>
                  {
                    time.blocked.length > 0 ?
                      <>Siguiente Beneficio <span>{time?.blocked[0].title}</span> a los <span>{time?.blocked[0].month} meses</span></>
                      : <>Próximamente podrás desbloquear <span>nuevos beneficios</span></>
                  }
                </p>
              }
              {
                reward === 2 &&
                <p style={{ textAlign: "center" }}>
                  {
                    certificates?.length > 0 ?
                      <> Certificado más próximo<span> {certificates[0]?.name}</span></>
                      : <>Próximamente podrás desbloquear <span>nuevos certificados</span></>
                  }
                </p>
              }
            </div>
          </div>
        </div>
        <Link href="/Rewards">
          <button >Ir al <span>Centro de Recompensas </span><FaArrowRight /> </button>
        </Link>
      </RewardContainer>
      <SubscriptionContainer>
        <div className="first-section">
          <p className="main-title">
            Suscripción
          </p>
          <div className="subscription-content">
            <p className="text-1">
              Suscripción actual
            </p>
            <div className="subscription-info">
              {(user.level === 1 || (user.level === 0 && user.final_date > today)) ? <p >
                Gonvar+<br />
                <span className="span">Suscripción mensual</span>
              </p> :
                <p>Sin subscripción</p>}
            </div>
            <p className="text-1">
              Próximo cargo
            </p>
            {
              user.role === "superAdmin" ?
                <div className="subscription-info">
                  <p><span className="span">Super Admin</span></p>
                </div>
                :
                <div className="subscription-info">
                  {((user.level === 1 && user.subscription === 0) || (user.level === 0 && user.final_date > today && user.subscription === 0)) ? <p >
                    <span className="span">{formatDate}</span>
                  </p> :
                    <p><span className="span">{(user.subscription === 1 && user.final_date > today) ? `Haz cancelado tu suscripción, te quedan ${getDays()} días` : "s/f"}</span></p>}
                </div>
            }
            {(!loader && (user.level > 0 && user.plan_name)) && <button onClick={() => { setPop(true); }}>Cancelar Suscripción</button>}
            {loader && <LoaderContainSpinner />}
          </div>
        </div>
        <div className="second-section">
          <p className="first-text">PROXIMAMENTE</p>
          <p className="second-text">Refiere amigos</p>
          <p className="third-text">Obtén premios para ti {!responsive1023 && <br />}
            y para ellos.</p>
        </div>
        <div className="img-hand">
          <img src={handImage} />
        </div>
      </SubscriptionContainer>
    </ThirdBox >
  )
}
export default NextReward;