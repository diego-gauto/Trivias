

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  AllPrizes,
  ImageReward,
  MainContainer,
  PrizeContain,
  PrizeImage,
  PrizeInfo,
  PrizeTitle,
  TitleClaim,
} from "./ClaimPrizes.styled";
import Modal1 from "./Modal1/Modal1";
import Modal2 from "./Modal1/Modal2";
import { getRewards } from "../../../../store/actions/RewardActions";

const PointPrizes = () => {

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);

  const [rewards, setRewards] = useState<any>([]);
  const [reward, setReward] = useState<any>({});
  const getAllRewards = () => {
    getRewards().then((res) => {
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
              <PrizeContain key={"Prizes" + index}>
                <PrizeImage onClick={() => {
                  setShow1(true), setReward(reward);
                }}>
                  <ImageReward path={reward.path} />
                </PrizeImage>
                <PrizeTitle>
                  {reward.title}
                </PrizeTitle>
                <PrizeInfo>
                  {reward.points} puntos
                </PrizeInfo>
              </PrizeContain>
            )
          })
        }
      </AllPrizes>
      <Modal1 show={show1} setShow={setShow1} data={reward} />
      <Modal2 show={show2} setShow={setShow2} />
    </MainContainer>
  )
}
export default PointPrizes;