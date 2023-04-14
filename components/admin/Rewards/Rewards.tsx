import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import { getBanner, getRequest, getRewards, updateBanner, updateRequest, updateUserRewards } from "../../../store/actions/RewardActions";
import { getRequestsApi, getRewardsApi, updateRequestStatusApi } from "../../api/rewards";
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

  const getAllRequests = () => {
    getRequestsApi().then((res) => {
      setRequests(res);
    })
  }

  useEffect(() => {
    getRewardsApi().then((res) => {
      setRewards(res);
    })
    getAllRequests();
    // getRewards().then((res) => {
    //   setRewards(res);
    // })
    // getRequest().then((res) => {
    //   setRequests(res);
    // })
  }, []);

  const handleEvent = () => {
    getRewardsApi().then((res) => {
      setRewards(res);
    })
  }

  const formatDate = (date: any) => {
    // let tempDate = new Date(date.seconds * 1000);
    // let tempDay = tempDate.getDate()
    // let tempMonth = tempDate.getUTCMonth() + 1;
    // let tempYear = tempDate.getFullYear()
    // let formatDate = `${tempDay}/${tempMonth}/${tempYear}`
    return date.slice(0, 10)
  }

  const confirmRequest = (data: any) => {
    if (!data.status) {
      var result = confirm("Desea que esta recompensa sea reclamada?");
      if (result === true) {
        console.log(data);
        data.status = 1;
        updateRequestStatusApi(data).then((res) => {
          getAllRequests();
        })
        // updateRequest(data.id).then(() => {
        //   getRequest().then((res) => {
        //     setRequests(res);
        //   })
        // })
        // updateUserRewards(data.userId, data.rewardId).then(() => {
        // })
      }
    }
  }
  return (
    <AdminContain>
      <RewardContain>
        <p className="title">Recompensas Gonvar</p>
        <button className="add" onClick={() => { setShow(true) }}>Agregar Recompensa</button>
        <div className="rewards">
          {rewards.map((reward: any, index: any) => {
            return (
              <Reward type={reward.type} key={"RewardTable " + index}>
                <FiEdit></FiEdit>
                <img height={170} src={reward.image} alt="" onClick={() => { setReward(reward); setEdit(true) }} />
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
            <p>Telefono</p>
            <p>Correo</p>
            <p>Producto</p>
            <p>Fecha</p>
            <p>Status</p>
          </div>
          {requests.map((request: any, index: number) => {
            return (
              <div className="tr" key={"RequestTable " + index}>
                <p>{request.name}</p>
                <p>{request.phone_number !== "undefined" ? request.phone_number : "Sin telefono"}</p>
                <p>{request.email}</p>
                <p>{request.title}</p>
                <p>{formatDate(request.created_at)}</p>
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