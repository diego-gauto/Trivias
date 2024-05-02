import { user } from 'firebase-functions/v1/auth';
import React, { useEffect, useState } from 'react';
import { LoaderContain } from '../../../containers/Profile/User/User.styled';
import { updateAdminAccessApi, updateUserInfoApi } from '../../api/admin';
import { createNotification } from '../../api/notifications';
import { getUserApi } from '../../api/users';
import { ModalContainer, ModalContent } from './Modal.styled';

const EditUserModal = ({ show, setShow, user, handleClick }: any) => {
  const [update, setUpdate] = useState<any>({ user });
  const [updating, setUpdating] = useState(false);
  const handleClose = () => setShow(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (localStorage.getItem('email')) {
      getUserApi(localStorage.getItem('email')).then((res) => {
        setUserData(res);
      });
    }
  }, []);

  const updateUser = async () => {
    if (userData.role === 'admin' && userData.roles[4].edit === 0) {
      alert('No tienes permisos para esta acción');
      return;
    }
    setUpdating(true);
    let tempUser = {
      name: update.name,
      last_name: update.last_name,
      phone_number: update.phone_number,
      score: update.score,
      id: update.id,
    };
    let notification = {
      userId: update.id,
      type: 'reward',
      notificationId: '',
      score: update.score,
    };
    // createNotification(notification);
    updateUserInfoApi(tempUser).then(() => {
      handleClick();
      setUpdating(false);
      handleClose();
    });
  };
  useEffect(() => {
    if (user) {
      setUpdate(user);
    }
  }, [user]);
  return (
    <ModalContainer show={show} onHide={handleClose} centered>
      <ModalContent>
        <div className='title'>
          <p>User Info</p>
        </div>
        <div className='form-inputs'>
          <div className='column'>
            <div className='input'>
              <label>First Name</label>
              <input
                placeholder={update.name}
                defaultValue={update.name}
                onChange={(e) => {
                  setUpdate({ ...update, name: e.target.value });
                }}
              />
            </div>
            <div className='input'>
              <label>Last Name</label>
              <input
                placeholder={update.last_name}
                defaultValue={update.last_name}
                onChange={(e) => {
                  setUpdate({ ...update, last_name: e.target.value });
                }}
              />
            </div>
          </div>
          <div className='column'>
            <div className='input'>
              <label>Score</label>
              <input
                type='number'
                defaultValue={update.score}
                onChange={(e) => {
                  setUpdate({ ...update, score: parseInt(e.target.value) });
                }}
              />
            </div>
            <div className='input'>
              <label>Whatsapp</label>
              <input
                placeholder={update.phone_number}
                defaultValue={update.phone_number}
                onChange={(e) => {
                  setUpdate({ ...update, phone_number: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className='button-contain'>
          {!updating ? (
            <button
              onClick={() => {
                updateUser();
              }}
            >
              Editar
            </button>
          ) : (
            <LoaderContain />
          )}
        </div>
      </ModalContent>
    </ModalContainer>
  );
};
export default EditUserModal;
