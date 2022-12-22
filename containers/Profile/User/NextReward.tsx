import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import {
  AddPay,
  ArrowRight,
  CompleteBar,
  Currentlvl,
  DataTitle,
  ImageContain,
  Nextlvl,
  Pointbox,
  PointsBox,
  PolygonDown,
  ProgressBar1,
  ProgressBar2,
  RewardBox,
  RewardCenterLink,
  RewardCenterLinkNoReward,
  RewardContain,
  RewardContainer,
  RewardData,
  RewardImage,
  RewardInfo,
  RewardParagraph,
  RewardPoints,
  RewardTitle,
  RewardTitleBox,
  SecondContainer,
  SubscriptionContainer,
  UserPoints,
  VectorLeft,
  VectorRight,
} from "./User.styled";
import { useEffect, useState } from "react";
import { getRewards, getTimeRewards } from "../../../store/actions/ProfileActions";
import { getTimeLevel } from "../../../store/actions/RewardActions";
import { AiOutlineHourglass, AiOutlineStar } from "react-icons/ai";
import { FaArrowRight, FaAward } from "react-icons/fa";

const NextReward = ({ score, barProgress, level, timeIndex, timeProgress, timeLevel, reward, setReward }: any) => {
  const [prize, setPrize] = useState<any>([]);
  const [timePrize, setTimePrize] = useState<any>([]);
  const responsive470 = useMediaQuery({ query: "(max-width: 470px)" });

  const getNextReward = () => {
    getRewards().then((res) => {
      res = res.filter((data: any) => (data.points > score));
      if (res[0] == null) {
        setPrize([])
      }
      else {
        setPrize(res[0])
      }
    })
  }
  const getNextTimeReward = async () => {
    getTimeRewards().then(async (res) => {
      const timeLevels = await getTimeLevel()
      let tempRewards: any;
      tempRewards = res.filter((data: any) => (data.month >= timeLevels[timeIndex]?.minimum && data.month < timeLevels[timeIndex].maximum));
      setTimePrize(tempRewards[0]);
    })
  }
  useEffect(() => {
    getNextReward();
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
          <div className="reward-conditions">

            <div className="point-container" onClick={() => { setReward(0) }}>
              <p>Recompensas<br />
                obtenidas<br />
                <span> por puntaje</span></p>
              <div className="bottom-contain">
                <p className="point-number">
                  08

                </p>
                <AiOutlineStar style={reward == 0 ? { color: "white" } : { color: "#942cec" }} />
              </div>
            </div>
            <div className="time-container">
              <p>Beneficios<br />
                obtenidos<br />
                <span> por tiempo</span></p>
              <div className="bottom-contain">
                <p className="time-number">
                  12
                </p>
                <AiOutlineHourglass style={reward == 1 ? { color: "white" } : { color: "#942cec" }} />
              </div>
            </div>
            <div className="certificates-container" onClick={() => { setReward(2) }}>
              <p>Certificados<br />
                <span>acumulados</span></p>
              <div className="bottom-contain">
                <p className="certificate-number">
                  06
                </p>
                <FaAward style={reward == 2 ? { color: "white" } : { color: "#942cec" }} />
              </div>
            </div>

          </div>
          <div className="extra-info">
            1
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
              <p >
                Gonvar+<br />
                <span className="span">Suscripción mensual</span>
              </p>
            </div>
            <p className="text-1">
              Próximo cargo
            </p>
            <div className="subscription-info">
              <p >
                <span className="span">11/07/2022</span>
              </p>
            </div>
          </div>
        </div>
        <div className="second-section">
          <p className="first-text">PROXIMAMENTE</p>
          <p className="second-text">Refiere amigos</p>
          <p className="third-text">Obtén premios para ti<br />
            y para ellos.</p>
        </div>
      </SubscriptionContainer>
    </SecondContainer>

    // <RewardContain>
    //   <DataTitle>
    //     Siguiente Recompensa...
    //   </DataTitle>
    //   <RewardBox>
    //     <VectorLeft onClick={() => { setReward(!reward) }} />
    //     {
    //       reward == false &&
    //       <RewardTitle>
    //         Recompensas por puntuaje
    //       </RewardTitle>
    //     }
    //     {
    //       reward == true &&
    //       <RewardTitle>
    //         Recompensas por tiempo
    //       </RewardTitle>
    //     }
    //     <VectorRight onClick={() => { setReward(!reward) }} />
    //   </RewardBox>
    //   {
    //     reward == false &&
    //     <>
    //       <Pointbox>
    //         <Currentlvl>
    //           {
    //             level - 1
    //           }
    //         </Currentlvl>
    //         <CompleteBar>
    //           <ProgressBar1 barProgress={barProgress}>
    //             <PointsBox>
    //               <UserPoints style={{ display: responsive470 ? "none" : "" }}>
    //                 {score}
    //               </UserPoints>
    //               <PolygonDown />
    //             </PointsBox>
    //           </ProgressBar1>
    //         </CompleteBar>
    //         <Nextlvl>
    //           {
    //             level
    //           }
    //         </Nextlvl>
    //       </Pointbox>
    //       <RewardData>
    //         <ImageContain>
    //           <RewardImage src={prize.path} />
    //         </ImageContain>
    //         <RewardInfo>
    //           <RewardTitleBox>
    //             {prize.title}
    //           </RewardTitleBox>
    //           <RewardPoints>
    //             {prize.points} puntos
    //           </RewardPoints>
    //           <RewardParagraph>
    //             {prize.about}
    //           </RewardParagraph>

    //         </RewardInfo>

    //       </RewardData>
    //       {rewardCenter}
    //     </>
    //   }
    //   {
    //     reward == true &&
    //     <>
    //       <Pointbox>
    //         <Currentlvl>
    //           {timeLevel}
    //         </Currentlvl>
    //         <CompleteBar>
    //           <ProgressBar2 barProgress={timeProgress}>
    //             <PointsBox>
    //               <UserPoints style={{ display: responsive470 ? "none" : "" }}>

    //               </UserPoints>
    //               <PolygonDown />
    //             </PointsBox>
    //           </ProgressBar2>
    //         </CompleteBar>
    //         <Nextlvl>
    //           {timeLevel + 1}
    //         </Nextlvl>
    //       </Pointbox>
    //       {timeLevel > 0 ? <RewardData>
    //         <ImageContain>
    //           <RewardImage src={timePrize.path} />
    //         </ImageContain>
    //         <RewardInfo>
    //           <RewardTitleBox>
    //             {timePrize.title}
    //           </RewardTitleBox>
    //           <RewardPoints>
    //             {
    //               timePrize.month <= 1 ? timePrize.month + " mes" : timePrize.month + " meses"
    //             }
    //           </RewardPoints>
    //           <RewardParagraph>
    //             {timePrize.about}
    //           </RewardParagraph>
    //           {rewardCenter}
    //         </RewardInfo>
    //       </RewardData> :
    //         <>
    //           <p>No hay premios en este nivel...</p>
    //           {rewardCenterNoReward}
    //         </>
    //       }
    //     </>
    //   }
    // </RewardContain>

  )
}
export default NextReward;