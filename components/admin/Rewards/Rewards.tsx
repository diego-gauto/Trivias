import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import CsvDownloader from 'react-csv-downloader';
import {
  getBanner,
  getRequest,
  getRewards,
  updateBanner,
  updateRequest,
  updateUserRewards,
} from '../../../store/actions/RewardActions';
import { createNotification } from '../../api/notifications';
import {
  getRequestsApi,
  getRewardsApi,
  IRequest,
  IReward,
  IRewardResponse,
  printRequestsType,
  updateRequestStatusApi,
} from '../../api/rewards';
import { getUserApi } from '../../api/users';
import { AdminContain } from '../SideBar.styled';
import AddReward from './Modals/AddReward';
import EditReward from './Modals/EditReward';
import {
  generateUserIdQuery,
  generateUserRoleAccessQuery,
  generateUserRolesLevelQuery,
} from '../../GenericQueries/UserRoles/UserRolesQueries';
import {
  Role,
  UserLevelValue,
} from '../../GenericQueries/UserRoles/UserRolesInterfaces';

import { Reward, RewardContain } from './Rewards.styled';
import rewards from '../../../pages/rewards';
import { getGenericQueryResponse } from '../../api/admin';

interface UserAccesss {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
  canRequest: boolean;
}

const Rewards = () => {
  let currentMonth = new Date().getMonth() + 1;
  const [userLevel, setUserLevel] = useState<UserLevelValue>('user');
  const [userAccess, setUserAccess] = useState<UserAccesss>({
    canView: false,
    canCreate: false,
    canDelete: false,
    canEdit: false,
    canRequest: false,
  });
  const [showAddReward, setShowAddReward] = useState(false);
  const [rewards, setRewards] = useState<IReward[]>([]);
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [reward, setReward] = useState<any>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [checkRewardType3, setCheckRewardType3] = useState<boolean>(true);

  const { canCreate, canDelete, canEdit, canRequest, canView } = userAccess;

  const getUserRolesData = async () => {
    try {
      const email = localStorage.getItem('email');
      if (email === null) {
        throw new Error('No existe un email establecido para el usuario');
      }
      const userIdQuery = generateUserIdQuery(email);
      const userIdResponse = await getGenericQueryResponse(userIdQuery);
      const userId = userIdResponse.data.data[0]['id'];
      // Roles request
      const userRolesQuery = generateUserRoleAccessQuery(userId);
      const userRolesResponse = await getGenericQueryResponse(userRolesQuery);
      const userRoles = userRolesResponse.data.data as Role[];
      const role = userRoles.find((role) => role.role === 'rewards');
      setUserAccess({
        canView: role?.view === 1,
        canEdit: role?.edit === 1,
        canDelete: role?.delete === 1,
        canCreate: role?.create === 1,
        canRequest: role?.request === 1,
      });
      // Role level
      const userLevelQuery = generateUserRolesLevelQuery(userId);
      const userLevelResponse = await getGenericQueryResponse(userLevelQuery);
      const userRoleLevel = userLevelResponse.data.data[0]['role'];
      setUserLevel(userRoleLevel);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const RequestsRewardDownload: any = async () => {
    let body = {
      reward_id: 32,
    };
    let sendUsers: any = [];
    const requests = await printRequestsType(body);
    await Promise.all(
      requests.map(async (req: any) => {
        sendUsers.push({
          nombre: req.name,
          email: req.email,
          telefono: req.phone_number,
          fecha_solicitud: req.creaed_at,
        });
      }),
    );

    return sendUsers;
  };

  const getAllRequests = async () => {
    try {
      const requests = await getRequestsApi();
      console.log({ requests });
      setRequests(requests.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRewards = async () => {
    try {
      const { data: rewards } = (await getRewardsApi()).data;
      let findMonthReward = rewards.filter(
        (val: any) => val.month === -1 && val.type === 'months',
      );
      if (findMonthReward.length > 0) {
        setCheckRewardType3(true);
      }
      setRewards(rewards);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date: any) => {
    return date.slice(0, 10);
  };

  const confirmRequest = (request: IRequest) => {
    if (!canRequest && userLevel === 'admin') {
      alert('No tienes permisos para esta acción');
      return;
    }
    let notification = {
      userId: request.user_id,
      message: 'Recompensa aprovada',
      type: 'reward',
      subType: 'request',
      notificationId: '',
      score: 0,
      title: request.title,
    };
    if (!request.status) {
      var result = confirm('Desea que esta recompensa sea reclamada?');
      if (result === true) {
        console.log(request);
        request.status = 1;
        updateRequestStatusApi(request).then((res) => {
          getAllRequests();
        });
      }
    }
  };

  useEffect(() => {
    getUserRolesData();
    handleRewards();
    getAllRequests();
  }, []);

  return (
    <AdminContain>
      <RewardContain>
        <p className='title'>Recompensas Gonvar</p>
        <div className='top-buttons'>
          {((canCreate && userLevel === 'admin') ||
            userLevel === 'superAdmin') && (
              <button
                className='add'
                onClick={() => {
                  setShowAddReward(true);
                }}
              >
                Agregar Recompensa
              </button>
            )}
          {checkRewardType3 && (
            <CsvDownloader
              filename={'lista_mes_' + currentMonth}
              extension='.csv'
              separator=','
              wrapColumnChar=''
              datas={RequestsRewardDownload}
            >
              <button className='add'>Usuario mes {currentMonth}</button>
            </CsvDownloader>
          )}
        </div>
        <div className='rewards'>
          {rewards.map((reward, index) => {
            return (
              <Reward type={reward.type} key={'RewardTable ' + index}>
                <FiEdit></FiEdit>
                <img
                  height={170}
                  src={reward.image}
                  alt={`${reward.title}`}
                  onClick={() => {
                    if (canEdit || userLevel === 'superAdmin') {
                      setReward(reward);
                      setShowEditModal(true);
                    } else {
                      alert('No cuentas con permiso para editar recompensas');
                    }
                  }}
                />
                <p className='title'>{reward.title}</p>
                {reward.type == 'points' && <p>{reward.points} Puntos</p>}
                {reward.type == 'months' && <p>{reward.month} Meses</p>}
                {/* reward.type == "certificates" && <p>{reward.certificates} Certificados</p> */}
              </Reward>
            );
          })}
        </div>
        {((canRequest && userLevel === 'admin') ||
          userLevel === 'superAdmin') && (
            <>
              <p className='title'>Solicitudes</p>
              <div className='request-container'>
                <div className='row-titles'>
                  <p>Nombre</p>
                  <p>Telefono</p>
                  <p>Correo</p>
                  <p>Producto</p>
                  <p>Fecha</p>
                  <p>Status</p>
                </div>
                {requests.map((request, index) => {
                  return (
                    <div className='tr' key={'RequestTable ' + index}>
                      <p>{request.name}</p>
                      <p>
                        {request.phone_number !== 'undefined'
                          ? request.phone_number
                          : 'Sin telefono'}
                      </p>
                      <p>{request.email}</p>
                      <p>{request.title}</p>
                      <p>{formatDate(request.created_at)}</p>
                      <p
                        style={{
                          background: request.status ? '#33c600' : '#e70000',
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          confirmRequest(request);
                        }}
                      >
                        {request.status ? 'Reclamada' : 'No reclamada'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
      </RewardContain>
      <AddReward
        show={showAddReward}
        setShow={setShowAddReward}
        handleEvent={handleRewards}
      ></AddReward>
      <EditReward
        show={showEditModal}
        setShow={setShowEditModal}
        handleEvent={handleRewards}
        data={reward}
      ></EditReward>
    </AdminContain>
  );
};
export default Rewards;
