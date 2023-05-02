import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import {
  RewardContainer,
  ThirdBox,
  SubscriptionContainer,
} from "./User.styled";
import { useEffect, useState } from "react";
import { AiOutlineHourglass, AiOutlineStar } from "react-icons/ai";
import { FaArrowRight, FaAward } from "react-icons/fa";
import { LoaderContainSpinner } from "../Purchase/Purchase.styled";
import { cancelPaypal, cancelStripe } from "../../../components/api/users";
import { getRewardsApi } from "../../../components/api/rewards";
import { getCoursesApi } from "../../../components/api/lessons";
const handImage = "/images/profile/hand.png"

const NextReward = ({ timeLevel, reward, prizeSize, timePrize, timePrizeSize, setReward, user, prize, nextCertificate, monthProgress, handleClick }: any) => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [formatDate, setFormatDate] = useState("")
  const [loader, setLoader] = useState<any>(false);
  const [points, setPoints] = useState<any>();
  const [time, setTime] = useState<any>();
  const [certificates, setCertificates] = useState<any>();

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
    if (confirm(`¿Desea cancelar su suscripción?`)) {
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
    }
  }

  return (
    <ThirdBox>
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
                  <>Siguiente Recompensa {points?.blocked.length > 0 ?
                    <span>{points?.blocked[0].title}</span> :
                    <>Sin<span> Recompensa</span></>}</>

                </p>
              }
              {
                reward === 1 &&
                <p>
                  <>Siguiente Recompensa {time.blocked.length > 0 ?
                    <span>{time?.blocked[0].title}</span> :
                    <>Sin<span> Recompensa</span></>}</>

                </p>
              }
              {
                reward === 2 &&
                <p style={{ textAlign: "center" }}>
                  {
                    certificates?.length > 0 ?
                      <> Certificado más próximo<span> {certificates[0]?.name}</span></>
                      : <>Sin <span>Certificados</span></>
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
                  {user.level === 1 ? <p >
                    <span className="span">{formatDate}</span>
                  </p> :
                    <p><span className="span">s/f</span></p>}
                </div>
            }
            {(!loader && (user.level > 0 && user.plan_name)) && <button onClick={cancelSubscription}>Cancelar Suscripción</button>}
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
    </ThirdBox>
  )
}
export default NextReward;