import React, { useEffect, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import Modal2 from "./Modal2/Modal2";
import {
  AllEditInputs,
  DataTitle,
  EditButtons,
  EditInput,
  EditText,
  Inputs,
  ProfileData,
  SaveButton,
  SubscriptionButton,
} from "./User.styled";
import { IUserDataProps } from "../../../interfaces/IUserData";

interface props {
  data: IUserDataProps,
  pm: any,
}

const UserData = ({ data, pm }: props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState<any>({ data })

  const updateUser = async () => {

    const docRef = doc(db, 'users', user.id);
    await updateDoc(docRef, {
      name: user.name,
      phoneNumber: user.phoneNumber,
    })
  }

  useEffect(() => {
    setUser({ ...data })
  }, [data])
  return (
    <>
      <ProfileData>
        <DataTitle>
          Datos de la Cuenta
        </DataTitle>
        <AllEditInputs>
          <Inputs>
            <EditText>
              Nombre de Usuario
            </EditText>
            <EditInput
              placeholder={data.name}
              defaultValue={data.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value })
              }}
            />
          </Inputs>
          <Inputs>
            <EditText>
              Telefono
            </EditText>
            <EditInput
              placeholder={data.phoneNumber == null ? "5512345678" : data.phoneNumber}
              defaultValue={data.phoneNumber}
              onChange={(e) => {
                setUser({ ...user, phoneNumber: e.target.value })
              }}
            />
          </Inputs>
        </AllEditInputs>
        <EditButtons>
          {data.membership.level == 1 && <SubscriptionButton onClick={handleShow}>
            Cambiar Suscripción
          </SubscriptionButton>}
          <SaveButton onClick={() => {
            updateUser();
          }}>
            Guardar
          </SaveButton>
        </EditButtons>
      </ProfileData>
      <Modal2 show={show} setShow={setShow} data={data} pm={pm} />
    </>
  )
}
export default UserData;