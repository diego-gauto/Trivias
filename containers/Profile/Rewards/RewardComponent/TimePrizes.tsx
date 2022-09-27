import React, { useEffect, useState } from "react";

import { RewardModal } from "../../../../components/Rewards/RewardModal";
import { IReward } from "../../../../interfaces/IReward";
import { getTimeRewards, getUserRewards } from "../../../../store/actions/RewardActions";
import {
  AllPrizes,
  ImageReward,
  MainContainer,
  Overlay2,
  PrizeContain,
  PrizeImage,
  PrizeInfo,
  PrizeTitle,
  TitleClaim,
} from "./ClaimPrizes.styled";

const TimePrizes = ({ score, user }: any) => {
  const [show, setShow] = useState(false);

  const [rewards, setRewards] = useState<any>([]);
  const [reward, setReward] = useState<any>({});

  // const container: any = document.getElementById("container");

  // container?.addEventListener("wheel", function (e: any) {
  //   if (e.deltaY > 0) {
  //     container.scrollLeft += 50;
  //     e.preventDefault();
  //   }
  //   else {
  //     container.scrollLeft -= 50;
  //     e.preventDefault();
  //   }
  // });

  const getAllRewards = () => {
    getTimeRewards().then((res: any) => {
      getUserRewards(user.id).then((rw) => {

        res.forEach((element: any) => {
          if (rw.some((x: any) => x.id == element.id && x.status == true)) {
            element.status = true;
          } else {
            element.status = false;
          }

        });
      })
      setRewards(res);
    })
  }

  useEffect(() => {
    getAllRewards();
  }, [])

  return (
    <MainContainer>
      <TitleClaim>
        Premios por reclamar
      </TitleClaim>
      <AllPrizes id="container">
        {
          rewards.map((reward: IReward, index: any) => {
            return (
              <PrizeContain key={"Prizes" + index} >
                <PrizeImage onClick={() => {
                  setShow(true), setReward(reward);
                }} >
                  <Overlay2 points={reward.month} score={score} />
                  <ImageReward src={reward.path} />
                </PrizeImage>
                <PrizeTitle>
                  {reward.title}
                </PrizeTitle>
                <PrizeInfo>
                  {reward.month} {reward.month && reward.month <= 1 ? "mes" : "meses"}
                </PrizeInfo>
              </PrizeContain>
            )
          })
        }
      </AllPrizes>
      <RewardModal show={show} setShow={setShow} reward={reward} user={user} score={score} isTimeReward={true} />
    </MainContainer>
  )
}
export default TimePrizes;