
import React, { useEffect, useState } from 'react'
import { IUser } from '../../../interfaces/IUserData';
import { Modal, Spinner } from 'react-bootstrap';
import {
  ComeFromContainer, Box2,
  InputPhone,
  PictureContain,
  ProfileIcon,
  ProfileMainContainer,
  ProfileText,
} from './ComeFromModal.styled';
import { IoClose } from 'react-icons/io5';
import { SOCIALS_ARRAY } from '../../../constants/arrays';
import { PurpleButton, SelectInput } from '../../../constants/defaultClasses.styled';
import { updateExtraInfoApi } from '../../api/auth';
import { statesAndLadas, statesOfMexicoArray } from './Ladas';
import option from '../../Forms/option/option';

interface IComeFromModal {
  user: IUser;
  show: boolean;
  onHide: () => void;
}

const ComeFromModal = (props: IComeFromModal) => {
  const { user, show, onHide } = props;
  const [hasComeFrom, setHasComeFrom] = useState<boolean>(false);
  const [comeFrom, setComeFrom] = useState<string>(user.come_from || '');
  const [hasPhoneNumber, setHasPhoneNumber] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phone_number || '');
  const [errorComeFrom, setErrorComeFrom] = useState<string>("");
  const [errorPhone, setErrorPhone] = useState<string>("");
  const [originState, setOriginState] = useState<string>(user.origin_state || '');
  const [errorState, setErrorState] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const optionSelect = (value: string) => {
    setComeFrom(value);
    setErrorComeFrom('')
  }

  useEffect(() => {
    setPhoneNumber(user.phone_number);
    if (user.phone_number) {
      setHasPhoneNumber(true);
    }
  }, [user.phone_number]);

  useEffect(() => {
    setOriginState(user.origin_state);
  }, [user.origin_state]);

  useEffect(() => {
    setComeFrom(user.come_from);
    if (user.come_from) {
      setHasComeFrom(true);
    }
  }, [user.come_from]);

  const isValidPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber === undefined) {
      return false;
    }
    if (phoneNumber.length === 0) {
      return false;
    }
    if (phoneNumber.startsWith('52')) {
      return phoneNumber.length === 12 || phoneNumber.length === 13;
    }
    return phoneNumber.length >= 10;
  }

  const updateExtraInfo = async () => {
    setLoader(true);
    let hasErrors = false;
    if (comeFrom === '' && user.come_from !== '') {
      setComeFrom(user.come_from);
      setHasComeFrom(true);
    }
    if (comeFrom === "") {
      setLoader(false);
      setErrorComeFrom("Seleccione una opción por favor");
      setHasComeFrom(false);
      hasErrors = true;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      setLoader(false);
      setErrorPhone("Ingrese un numero de telefono valido");
      setHasPhoneNumber(false);
      hasErrors = true;
    } else {
      setErrorPhone("");
      setHasPhoneNumber(true);
    }
    if (phoneNumber.startsWith('52')) {
      if (originState === '') {
        setLoader(false);
        setErrorState("Seleccione un estado de procedencia");
        hasErrors = true;
      } else {
        setErrorState("");
      }
    } else {
      setErrorState("");
    }

    if (hasErrors) {
      return;
    }

    try {
      if (!hasComeFrom || !hasPhoneNumber) {
        setLoader(false);
        return;
      }
      if (phoneNumber.startsWith("52") && originState === '') {
        setLoader(false);
        return;
      }

      const responsePhoneNumber = await updateExtraInfoApi({
        id: user.id,
        phone_number: phoneNumber,
        come_from: comeFrom,
        origin_state: !phoneNumber.startsWith("52") ? 'Desconocido' : originState
      });
      setLoader(false);
      onHide();
    }
    catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  return (
    <Modal show={show}>
      <ComeFromContainer>
        <div className='header'>
          <h2 className='title'>
            Hola
            <span> {user.name}!</span>
          </h2>
        </div>
        {
          user.come_from === undefined ?
            <p className="email-user">
              Su información aclara que usted ingreso por "{user.come_from}".
            </p>
            :
            <div className='bottom-data'>
              <p>¿Porqué medio te enteraste de nuestros cursos?</p>
              <div className='select-container'>
                <SelectInput
                  onChange={(e) => optionSelect(e.target.value)}
                  value={
                    comeFrom
                  }
                >
                  <option value="" disabled >Seleccione una opción</option>
                  {
                    SOCIALS_ARRAY.map((val: string, index: number) => {
                      return (
                        <option value={val} key={"socials_" + index}>{val}</option>
                      )
                    })
                  }
                </SelectInput>
                {
                  errorComeFrom !== "" && <p
                    style={{
                      color: 'red',
                      fontWeight: '600',
                      position: 'absolute',
                      bottom: '-25px',
                      paddingLeft: '5px'
                    }}>{errorComeFrom}</p>
                }
              </div>
            </div>
        }
        <div className="data-container" style={{ paddingTop: '15px' }}>
          <p className="email">
            Whatsapp
          </p>
          <small style={{
            display: 'block',
            fontSize: '14px',
            fontFamily: '"Montserrat", sans-serif'
          }}
          >Primero seleccione una nacionalidad</small>
          <Box2>
            <div
              className="separate"
              style={{
                position: 'relative',
                left: '55px',
                display: 'flex',
                width: '1px',
                backgroundColor: 'white',
                lineHeight: '0'
              }}
            />
            <InputPhone
              value={user.phone_number === 'undefined' ? '' : "+" + user.phone_number}
              limitMaxLength={true}
              international={true}
              countryCallingCodeEditable={false}
              onChange={(e: any) => {
                setPhoneNumber(parseInt(e) + '');
              }}
            />
          </Box2>
          {
            errorPhone !== "" && <p style={{
              color: 'red',
              fontWeight: '600',
              padding: '0',
              margin: '0',
              paddingLeft: '5px'
            }}>{errorPhone}</p>
          }
          {
            !phoneNumber.startsWith('52') ? <></> : <div>
              <small style={{
                display: 'block',
                fontSize: '14px',
                fontFamily: '"Montserrat", sans-serif'
              }}
              >Ahora seleccione un estado de procedencia</small>
              <SelectInput
                onChange={(e) => setOriginState(e.target.value)}
                value={
                  originState
                }
              >
                <option value='' disabled key={"socials_" + 0}>Seleccione un estado</option>
                {
                  statesOfMexicoArray.map((state, index) => {
                    return (
                      <option value={state} key={"mexico_state_" + (index + 1)} >{state}</option>
                    )
                  })
                }
              </SelectInput>
            </div>
          }
          {
            errorState !== "" && <p style={{
              color: 'red',
              fontWeight: '600',
              padding: '0',
              margin: '0',
              paddingLeft: '5px'
            }}>{errorState}</p>
          }
        </div>

        <div className='btn-contain' style={{ paddingBlock: '15px' }}>
          {
            loader
              ? <div style={{ marginRight: 10 }}><Spinner /></div>
              : <PurpleButton className='btn' onClick={updateExtraInfo}>Continuar</PurpleButton>
          }
        </div>
      </ComeFromContainer>
    </Modal>
  )
}
export default ComeFromModal;