import React, { useEffect, useState } from 'react'
import { getTimeRewards } from '../../../../store/actions/RewardActions';
import AddTimePrize from './Modal/AddTimePrize';
import EditTimePrizes from './Modal/EditTimePrizes';
import { Add, Container, CreateIcon, Image, ImageContain, ItemContain, NewPrize, PrizeText, SubTitle, Title } from './Prize.styled';


const TimePrize = () => {

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rewards, setRewards] = useState<any>([]);
  const [reward, setReward] = useState<any>({});
  const getAllRewards = () => {
    getTimeRewards().then((res) => {
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
            <ItemContain key={"adminTimePrizes" + index}>
              <ImageContain>
                <Image src={reward.path} />
                <CreateIcon onClick={() => { setEdit(true), setReward(reward) }} />
              </ImageContain>
              <Title>{reward.title}</Title>
              <SubTitle>{reward.month} {reward.month <= 1 ? "mes" : "meses"}</SubTitle>
            </ItemContain>
          )
        })
      }
      <NewPrize onClick={() => { setShow(true) }} >
        <Add />
        <PrizeText>
          Añadir nueva recompesa
        </PrizeText>
      </NewPrize>
      <AddTimePrize show={show} setShow={setShow} />
      <EditTimePrizes show={edit} setShow={setEdit} data={reward} />
    </Container>
  )
}
export default TimePrize;