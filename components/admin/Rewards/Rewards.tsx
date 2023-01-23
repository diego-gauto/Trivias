import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import { getBanner, getRewards, updateBanner } from "../../../store/actions/RewardActions";
import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import AddReward from "./Modals/AddReward";
import EditReward from "./Modals/EditReward";

import {
  Reward,
  RewardContain,
} from "./Rewards.styled";

const Rewards = () => {
  const [show, setShow] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [reward, setReward] = useState<any>({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getRewards().then((res) => {
      setRewards(res);
    })
  }, []);

  const handleEvent = () => {
    getRewards().then((res) => {
      setRewards(res);
    })
  }

  return (
    <AdminContain>
      <SideBar />
      <RewardContain>
        <p className="title">Recompensas Gonvar</p>
        <button className="add" onClick={() => { setShow(true) }}>Agregar Recompensa</button>
        <div className="rewards">
          {rewards.map((reward: any) => {
            return (
              <Reward type={reward.type}>
                <FiEdit></FiEdit>
                <img src={reward.path} alt="" onClick={() => { setReward(reward); setEdit(true) }} />
                <p className="title">{reward.title}</p>
                {reward.type == "points" && <p>{reward.points} Puntos</p>}
                {reward.type == "months" && <p>{reward.months} Meses</p>}
                {reward.type == "certificates" && <p>{reward.certificates} Certificados</p>}
              </Reward>
            )
          })}
        </div>
      </RewardContain>
      <AddReward show={show} setShow={setShow} handleEvent={handleEvent}></AddReward>
      <EditReward show={edit} setShow={setEdit} handleEvent={handleEvent} data={reward}></EditReward>
    </AdminContain>
  )
}
export default Rewards;