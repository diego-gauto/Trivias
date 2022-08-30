import React, { useEffect, useState } from "react";

import {
  AllPrizes,
  MainContainer,
  PrizeContain,
  PrizeImage,
  PrizeInfo,
  PrizeTitle,
  TitleClaim,
  Overlay2,
  ImageReward,

} from "./ClaimPrizes.styled";
import Modal1 from "./Modal1/Modal1";
import Modal2 from "./Modal1/Modal2";
import { getTimeRewards, getUserRewards } from "../../../../store/actions/RewardActions";

const TimePrizes = ({ score, user }: any) => {

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);

  const [rewards, setRewards] = useState<any>([]);
  const [reward, setReward] = useState<any>({});
  const getAllRewards = () => {
    getTimeRewards().then((res) => {
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
      <AllPrizes>
        {
          rewards.map((reward: any, index: any) => {
            return (
              <PrizeContain key={"Prizes" + index} >
                <PrizeImage onClick={() => {
                  setShow2(true), setReward(reward);
                }} >
                  <Overlay2 points={reward.month} score={score} />
                  <ImageReward src={reward.path} />
                </PrizeImage>
                <PrizeTitle>
                  {reward.title}
                </PrizeTitle>
                <PrizeInfo>
                  {reward.month} {reward.month <= 1 ? "mes" : "meses"}
                </PrizeInfo>
              </PrizeContain>
            )
          })
        }
      </AllPrizes>
      <Modal2 show={show2} setShow={setShow2} data={reward} user={user} score={score} />
    </MainContainer>
  )
}
export default TimePrizes;