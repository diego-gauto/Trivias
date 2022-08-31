import React, { useEffect, useState } from "react";

import { getRewards } from "../../../../store/actions/RewardActions";
import Modal1 from "./Modal/Modal1";
import Modal2 from "./Modal/Modal2";
import {
  Add,
  Container,
  CreateIcon,
  Image,
  ImageContain,
  ItemContain,
  NewPrize,
  PrizeText,
  SubTitle,
  Title,
} from "./Prize.styled";

const Prize = () => {

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
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
    <Container>
      {
        rewards.map((reward: any, index: any) => {
          return (
            <ItemContain key={"adminPrizes" + index}>
              <ImageContain>
                <Image src={reward.path} />
                <CreateIcon onClick={() => { setShow(true), setReward(reward) }} />
              </ImageContain>
              <Title>{reward.title}</Title>
              <SubTitle>{reward.points} puntos</SubTitle>
            </ItemContain>
          )
        })
      }
      <NewPrize onClick={() => { setEdit(true) }} >
        <Add />
        <PrizeText>
          Añadir nueva recompesa
        </PrizeText>
      </NewPrize>
      <Modal1 show={show} setShow={setShow} data={reward} />
      <Modal2 show={edit} setShow={setEdit} />
    </Container>
  )
}
export default Prize;