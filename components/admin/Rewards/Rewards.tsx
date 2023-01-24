import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import { getBanner, getRequest, getRewards, updateBanner, updateRequest } from "../../../store/actions/RewardActions";
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
  const [requests, setRequests] = useState([]);
  const [reward, setReward] = useState<any>({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getRewards().then((res) => {
      setRewards(res);
    })
    getRequest().then((res) => {
      setRequests(res);
    })
  }, []);

  const handleEvent = () => {
    getRewards().then((res) => {
      setRewards(res);
    })
  }

  const formatDate = (date: any) => {
    let tempDate = new Date(date.seconds * 1000);
    let tempDay = tempDate.getDate()
    let tempMonth = tempDate.getUTCMonth() + 1;
    let tempYear = tempDate.getFullYear()
    let formatDate = `${tempDay}/${tempMonth}/${tempYear}`
    return formatDate
  }

  const confirmRequest = (data: any) => {
    if (!data.status) {
      var result = confirm("Desea que esta recompensa sea reclamada?");
      if (result == true) {
        updateRequest(data.id).then(() => {
          getRequest().then((res) => {
            setRequests(res);
          })
        })
      }
    }
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
        <p className="title">Solicitudes</p>
        <div className="request-container">
          <div className="row-titles">
            <p>Nombre</p>
            <p>Producto</p>
            <p>Fecha</p>
            <p>Status</p>
          </div>
          {requests.map((request: any) => {
            return (
              <div className="tr">
                <p>{request.user}</p>
                <p>{request.product}</p>
                <p>{formatDate(request.createAt)}</p>
                <p style={{ background: request.status ? "#33c600" : "#e70000", color: "#fff", cursor: "pointer" }}
                  onClick={() => {
                    confirmRequest(request)
                  }}
                >
                  {request.status ? "Reclamada" : "No reclamada"}
                </p>
              </div>
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