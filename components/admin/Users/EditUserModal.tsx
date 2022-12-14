import { user } from 'firebase-functions/v1/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { LoaderContain } from '../../../containers/Profile/User/User.styled';
import { db } from '../../../firebase/firebaseConfig';
import { ModalContainer, ModalContent } from './Modal.styled';

const EditUserModal = ({ show, setShow, user }: any) => {
  const [update, setUpdate] = useState<any>({ user })
  const [updating, setUpdating] = useState(false);

  const handleClose = () => setShow(false);

  const updateUser = async () => {
    setUpdating(true);
    const docRef = doc(db, 'users', update.id);
    await updateDoc(docRef, {
      name: update.name,
      lastName: update.lastName,
      phoneNumber: update.phoneNumber,
      score: update.score,
    }).then(() => {
      alert("Información actualizada");
      setUpdating(false);
      window.location.reload();
    })
  }
  console.log(update)
  useEffect(() => {
    setUpdate({ ...user })
  }, [user])
  return (
    <ModalContainer show={show} onHide={handleClose} centered>
      <ModalContent>
        <div className="title">
          <p>
            User Info
          </p>
        </div>
        <div className="form-inputs">
          <div className='column'>
            <div className="input">
              <label>
                First Name
              </label>
              <input
                placeholder={user.name}
                defaultValue={user.name}
                onChange={(e) => {
                  setUpdate({ ...user, name: e.target.value })
                }}
              />
            </div>
            <div className="input">
              <label>
                Last Name
              </label>
              <input
                placeholder={user.lastName}
                defaultValue={user.lastName}
                onChange={(e) => {
                  setUpdate({ ...user, lastName: e.target.value })
                }}
              />
            </div>
          </div>
          <div className='column'>
            <div className="input">
              <label>
                Score
              </label>
              <input
                placeholder={user.score}
                defaultValue={user.score}
                onChange={(e) => {
                  setUpdate({ ...user, score: parseInt(e.target.value) })
                }}
              />
            </div>
            <div className="input">
              <label>
                Whatsapp
              </label>
              <input
                placeholder={user.phoneNumber}
                defaultValue={user.phoneNumber}
                onChange={(e) => {
                  setUpdate({ ...user, phoneNumber: e.target.value })
                }}
              />
            </div>
          </div>
        </div>
        <div className='button-contain'>
          {
            !updating
              ?
              <button onClick={() => {
                updateUser();
              }}>Editar</button>
              : <LoaderContain />
          }
        </div>
      </ModalContent>
    </ModalContainer>
  )
}
export default EditUserModal;