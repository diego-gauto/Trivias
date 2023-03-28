import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import {
  RewardContainer,
  ThirdBox,
  SubscriptionContainer,
} from "./User.styled";
import { useEffect, useState } from "react";
import { cancelSub, getTimeRewards } from "../../../store/actions/ProfileActions";
import { AiOutlineHourglass, AiOutlineStar } from "react-icons/ai";
import { FaArrowRight, FaAward } from "react-icons/fa";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase/firebaseConfig";
import { LoaderContainSpinner } from "../Purchase/Purchase.styled";
const handImage = "/images/profile/hand.png"

const NextReward = ({ timeLevel, reward, prizeSize, timePrize, timePrizeSize, setReward, user, prize, nextCertificate, monthProgress }: any) => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  let date = new Date().getTime() / 1000;
  const [formatDate, setFormatDate] = useState("")
  const [loader, setLoader] = useState<any>(false);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true)
  }
  const getNextTimeReward = async () => {
    // let tempSize: any = [];
    // let tempReward: any = [];
    // getTimeRewards().then(async (res) => {
    //   tempSize = res.filter((data: any) => (data.month <= timeLevel))
    //   tempReward = res.filter((data: any) => (data.month > timeLevel));
    //   if (tempSize) {
    //     setTimePrizeSize(tempSize.length);
    //   }
    //   const timeLevels = await getTimeLevel()
    //   let tempRewards: any = [];
    //   tempRewards = res.filter((data: any) => (data.month >= timeLevels[timeIndex]?.minimum && data.month < timeLevels[timeIndex].maximum));
    //   setTimePrize(tempReward[0]);
    // })
  }
  useEffect(() => {
    let tempDate = new Date((user.final_date) * 1000);
    let tempDay = tempDate.getDate();
    let tempMonth = tempDate.getMonth() + 1;
    let tempYear = tempDate.getFullYear();
    setFormatDate(`${tempDay}/${tempMonth}/${tempYear}`);

  }, [])
  useEffect(() => {
    if (monthProgress !== 0) {
      getNextTimeReward()
    }
  }, [monthProgress])
  const cancelSubscription = async () => {
    setLoader(true);
    if (user.membership.method == 'stripe') {
      const updateCard = httpsCallable(functions, 'cancelStripeSubscription');
      await updateCard(user.membership.planId).then(async (res: any) => {
        handleShow()
        setLoader(false);
      })
    } else {
      let userPlan: any = {
        planId: user.membership.planId,
        id: user.id
      }
      const cancelPlan = httpsCallable(functions, 'cancelPaypalSubscription');
      await cancelPlan(userPlan).then(async (res: any) => {
        handleShow();
        setLoader(false);
      })
    }
    cancelSub(user.id);
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
                <p>Recompensas<br />
                  obtenidas<br />
                  <span> por puntaje</span></p>
                <div className="bottom-contain">
                  <p className="point-number">
                    {prizeSize > 9 ? prizeSize : prizeSize != 0 ? "0" + prizeSize : 0}
                  </p>
                  <AiOutlineStar style={reward == 0 ? { color: "white" } : { color: "#942cec" }} />
                </div>
              </div>
              <div className="time-container" onClick={() => { setReward(1) }}>
                <p>Beneficios<br />
                  obtenidos<br />
                  <span> por tiempo</span></p>
                <div className="bottom-contain">
                  <p className="time-number">
                    {timePrizeSize > 9 ? timePrizeSize : timePrizeSize != 0 ? "0" + timePrizeSize : 0}
                  </p>
                  <AiOutlineHourglass style={reward == 1 ? { color: "white" } : { color: "#942cec" }} />
                </div>
              </div>
              <div className="certificates-container" onClick={() => { setReward(2) }}>
                <p>Certificados<br />
                  <span>acumulados</span></p>
                <div className="bottom-contain">
                  {/* <p className="certificate-number">
                    {user.certificates?.length > 0 ? (user.certificates.length > 9 ? user.certificates.length : "0" + user.certificates.length) : 0}
                  </p> */}
                  <FaAward style={reward == 2 ? { color: "white" } : { color: "#942cec" }} />
                </div>
              </div>
            </div>
            <div className="extra-info">
              {
                reward == 0 &&
                <p>
                  {
                    prize.length <= 0 ? <>Sin<span> Recompensa</span></> : "Siguiente Recompensa"
                  }
                  <span> {prize.title}</span>
                </p>
              }
              {
                reward == 1 &&
                <p>
                  {
                    !timeLevel
                      ? <>Sin<span> Recompensa</span></>
                      :
                      timePrize
                        ? <>Siguiente Recompensa <span>{timePrize.title}</span></>
                        : <>Sin<span> Recompensa</span></>
                  }
                </p>
              }
              {
                reward == 2 &&
                <p style={{ textAlign: "center" }}>
                  {
                    nextCertificate ?
                      <> Certificado más próximo<span> {nextCertificate.name}</span></>
                      : <>Sin <span>Certificados</span></>
                  }
                </p>
              }
            </div>
          </div>

        </div>
        <Link href="/Rewards">
          <button disabled>Ir al <span>Centro de Recompensas </span><FaArrowRight /> </button>
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
              {user.final_date > date ? <p >
                Gonvar+<br />
                <span className="span">Suscripción mensual</span>
              </p> :
                <p>Sin subscripción</p>}
            </div>
            <p className="text-1">
              Próximo cargo
            </p>
            <div className="subscription-info">
              {user.final_date > date ? <p >
                <span className="span">{formatDate}</span>
              </p> :
                <p><span className="span">s/f</span></p>}
            </div>
            {(!loader && user.level > 0) && <button onClick={cancelSubscription}>Cancelar Suscripción</button>}
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