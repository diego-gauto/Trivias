

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  AllPrizes,
  Band,
  ImageReward,
  MainContainer,
  Overlay,
  PrizeContain,
  PrizeImage,
  PrizeInfo,
  PrizeTitle,
  TitleClaim,
} from "./ClaimPrizes.styled";
import Modal1 from "./Modal1/Modal1";
import { getRewards, getUserRewards } from "../../../../store/actions/RewardActions";


const PointPrizes = ({ score, user }: any) => {

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);

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
    getRewards().then((res) => {
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
      <AllPrizes  >
        {
          rewards.map((reward: any, index: any) => {
            return (
              <PrizeContain key={"Prizes" + index} >
                <PrizeImage onClick={() => {
                  setShow1(true), setReward(reward);
                }} >
                  <Overlay points={reward.points} score={score} />
                  <ImageReward src={reward.path} />
                  {
                    reward.status == true &&
                    <Band />
                  }
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
      <Modal1 show={show1} setShow={setShow1} data={reward} user={user} />
    </MainContainer>
  )
}
export default PointPrizes;