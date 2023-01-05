import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import {
  ArrowRight,
  RewardCenterLink,
  RewardCenterLinkNoReward,
  RewardContainer,
  SecondContainer,
  SubscriptionContainer,
} from "./User.styled";
import { useEffect, useState } from "react";
import { getRewards, getTimeRewards } from "../../../store/actions/ProfileActions";
import { getTimeLevel } from "../../../store/actions/RewardActions";
import { AiOutlineHourglass, AiOutlineStar } from "react-icons/ai";
import { FaArrowRight, FaAward } from "react-icons/fa";
const handImage = "/images/profile/hand.png"

const NextReward = ({ score, timeIndex, timeLevel, reward, setReward, user, prize, setPrize, timePrize, setTimePrize }: any) => {
  const [prizeSize, setPrizeSize] = useState<any>(0);
  const [timePrizeSize, setTimePrizeSize] = useState<any>(0);
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  let date = new Date().getTime() / 1000;
  const [formatDate, setFormatDate] = useState("")

  const getNextReward = () => {
    let tempSize: any = [];
    getRewards().then((res) => {
      tempSize = res.filter((data: any) => (data.points <= score));
      res = res.filter((data: any) => (data.points > score));
      if (tempSize) {
        setPrizeSize(tempSize.length);
      }
      if (res[0] == null) {
        setPrize([])
      }
      else {
        setPrize(res[0])
      }
    })
  }
  const getNextTimeReward = async () => {
    let tempSize: any = [];
    let tempReward: any = [];
    getTimeRewards().then(async (res) => {
      tempSize = res.filter((data: any) => (data.month <= timeLevel))
      tempReward = res.filter((data: any) => (data.month > timeLevel));
      if (tempSize) {
        setTimePrizeSize(tempSize.length);
      }
      const timeLevels = await getTimeLevel()
      let tempRewards: any;
      tempRewards = res.filter((data: any) => (data.month >= timeLevels[timeIndex]?.minimum && data.month < timeLevels[timeIndex].maximum));
      setTimePrize(tempReward[0]);
    })
  }
  useEffect(() => {
    getNextReward();
    let tempDate = new Date((user.membership.finalDate) * 1000);
    let tempDay = tempDate.getDate();
    let tempMonth = tempDate.getMonth() + 1;
    let tempYear = tempDate.getFullYear();
    setFormatDate(`${tempDay}/${tempMonth}/${tempYear}`);

  }, [])
  useEffect(() => {
    if (timeLevel) {
      getNextTimeReward()
    }
  }, [timeLevel])

  const rewardCenter = (
    <Link href="/Rewards">
      <RewardCenterLink>
        Ir al Centro de Recompensas
        <ArrowRight />
      </RewardCenterLink>
    </Link>
  )

  const rewardCenterNoReward = (
    <Link href="/Rewards">
      <RewardCenterLinkNoReward>
        Ir al Centro de Recompensas
        <ArrowRight />
      </RewardCenterLinkNoReward>
    </Link>
  )

  return (
    <SecondContainer>
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
                  <p className="certificate-number">
                    {user.certificates?.length > 0 ? (user.certificates.length > 9 ? user.certificates.length : "0" + user.certificates.length) : 0}
                  </p>
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
                    timePrize.length <= 0 ? <>Sin<span> Recompensa</span></> : "Siguiente Recompensa"
                  }
                  <span> {timePrize.title}</span>
                </p>
              }
              {
                reward == 2 &&
                <p style={{ textAlign: "center" }}>
                  {
                    user.certificates ?
                      <> Ultimo certificado completado<span> {user.certificates[user.certificates.length - 1].courseTitle}</span></>
                      : <>Sin <span>Certificados</span></>
                  }
                </p>
              }
            </div>
          </div>

        </div>
        <Link href="/Rewards">
          <button>Ir al <span>Centro de Recompensas </span><FaArrowRight /> </button>
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
              {user.membership.finalDate > date ? <p >
                Gonvar+<br />
                <span className="span">Suscripción mensual</span>
              </p> :
                <p>Sin subscripción</p>}
            </div>
            <p className="text-1">
              Próximo cargo
            </p>
            <div className="subscription-info">
              {user.membership.finalDate > date ? <p >
                <span className="span">{formatDate}</span>
              </p> :
                <p><span className="span">s/f</span></p>}
            </div>
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
    </SecondContainer>
  )
}
export default NextReward;