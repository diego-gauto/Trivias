import React, { useEffect, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import Modal2 from "./Modal2/Modal2";
import {
  AllEditInputs,
  Box2,
  DataTitle,
  EditButtons,
  EditInput,
  EditText,
  InputPhone,
  Inputs,
  ProfileData,
  SaveButton,
  SubscriptionButton,
} from "./User.styled";
import { IUserDataProps } from "../../../interfaces/IUserData";
import PhoneInput from "react-phone-number-input";

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
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    }).then(() => {
      alert("Información actualizada");
      window.location.reload();
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
              Nombre
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
              Apellido
            </EditText>
            <EditInput
              placeholder={data.lastName}
              defaultValue={data.lastName}
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value })
              }}
            />
          </Inputs>
          <Inputs>
            <EditText>
              Telefono
            </EditText>
            <Box2>
              <InputPhone
                value={data.phoneNumber}
                limitMaxLength={true}
                international={true}
                countryCallingCodeEditable={false}
                onChange={(e: any) => {
                  setUser({ ...user, phoneNumber: e })
                }}
              />
            </Box2>

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