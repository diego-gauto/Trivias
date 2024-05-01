import React, { useEffect, useState } from 'react';
import { IUser } from '../../../interfaces/IUserData';
import { Modal, Spinner } from 'react-bootstrap';
import {
  ComeFromContainer,
  Box2,
  InputPhone,
  PictureContain,
  ProfileIcon,
  ProfileMainContainer,
  ProfileText,
} from './ComeFromModal.styled';
import { IoClose } from 'react-icons/io5';
import { SOCIALS_ARRAY } from '../../../constants/arrays';
import {
  PurpleButton,
  SelectInput,
} from '../../../constants/defaultClasses.styled';
import { updateExtraInfoApi } from '../../api/auth';
import { statesAndLadas, statesOfMexicoArray } from './Ladas';
import option from '../../Forms/option/option';

interface IComeFromModal {
  user: IUser;
  show: boolean;
  onHide: () => void;
}

/*
const testUser = {
  "id": 54598,
  "come_from": 'Facebook',
  "phone_number": "526421910021",
  "origin_state": 'Sonora',
  "name": "Alberto",
  "last_name": " Félix",
  "email": "alberto.felix@inowu.dev",
  "password": "123456",
  "role": "user",
  "photo": "/images/profile/default_img.png",
  "score": 33,
  "stripe_id": "",
  "provider": "web",
  "created_at": "2023-12-01T06:58:55.000Z",
  "past_user": "no",
  "subscription": 0,
  "last_sign_in": "2024-02-14T12:07:52.000Z",
  "country": "Mexico",
  "conekta_id": "cus_2v11XPGWr5fxXwHaC",
  "terms": 1,
  "user_id": 54598,
  "final_date": 1715690000,
  "level": 0,
  "method": "admin",
  "payment_method": null,
  "plan_id": null,
  "plan_name": null,
  "start_date": 1703100000,
  "type": null
}
*/

type PhoneErrorText = 'Ingrese un numero de telefono valido' | '';
type ComeFromErrorText = 'Seleccione una opción por favor' | '';

const ComeFromModal = (props: IComeFromModal) => {
  const { user, show, onHide } = props;
  const [comeFrom, setComeFrom] = useState<string>(user.come_from || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user.phone_number || '',
  );
  const [errorComeFrom, setErrorComeFrom] = useState<ComeFromErrorText>('');
  const [errorPhone, setErrorPhone] = useState<PhoneErrorText>(
    !user.phone_number ? '' : '',
  );
  const [originState, setOriginState] = useState<string>(
    user.origin_state || '',
  );
  const [errorState, setErrorState] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [isCorrectPhoneNumber, setIsCorrectPhoneNumber] = useState<
    'yes' | 'no'
  >('yes');
  const [isCorrectOriginState, setIsCorrectOriginState] = useState<
    'yes' | 'no'
  >('yes');
  // const [warningMessage, setWarningMessage] = useState<'La petición fue exitosa' | 'La petición no se envio' | ''>('');

  const generatePhoneNumberInput = () => {
    return (
      <div className='data-container' style={{ paddingTop: '15px' }}>
        <p className='email'>
          {!!user.phone_number
            ? 'Whatsapp'
            : 'No tenemos tu Whatsapp, por favor ingresa el tuyo'}
        </p>
        <small
          style={{
            display: 'block',
            fontSize: '14px',
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          Primero seleccione una nacionalidad
        </small>
        <Box2>
          <div
            className='separate'
            style={{
              position: 'relative',
              left: '55px',
              display: 'flex',
              width: '1px',
              backgroundColor: 'white',
              lineHeight: '0',
            }}
          />
          <InputPhone
            value={
              user.phone_number === 'undefined' ? '' : '+' + user.phone_number
            }
            limitMaxLength={true}
            international={true}
            countryCallingCodeEditable={false}
            onChange={(e: any) => {
              setPhoneNumber(parseInt(e) + '');
              if (isValidPhoneNumber(parseInt(e) + '')) {
                setErrorPhone('');
              } else {
                // Ingrese un numero de telefono valido
                setErrorPhone('Ingrese un numero de telefono valido');
              }
            }}
          />
        </Box2>
        {errorPhone !== '' && (
          <p
            style={{
              color: 'red',
              fontWeight: '600',
              padding: '0',
              margin: '0',
              paddingLeft: '5px',
            }}
          >
            {errorPhone}
          </p>
        )}
      </div>
    );
  };

  const generatePhoneNumberQuestion = () => {
    const onOptionChange = (e: any) => {
      setIsCorrectPhoneNumber(e.target.value);
    };

    return (
      <div className='data-container' style={{ paddingTop: '15px' }}>
        <p>
          Tu numero de WhatsApp registrado es:{' '}
          <strong>{user.phone_number}</strong>
        </p>
        <p>¿Es correcto este numero de WhatsApp?</p>
        <form action=''>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              paddingLeft: '15px',
            }}
          >
            <div>
              <input
                checked={isCorrectPhoneNumber === 'yes'}
                type='radio'
                value='yes'
                name='show-phone-number'
                id='radio-is-correct-phone-number'
                onChange={onOptionChange}
              />
              <label
                style={{ paddingLeft: '5px' }}
                htmlFor='radio-is-correct-phone-number'
              >
                Si
              </label>
            </div>
            <div>
              <input
                checked={isCorrectPhoneNumber === 'no'}
                type='radio'
                value='no'
                name='show-phone-number'
                id='radio-is-not-correct-phone-number'
                onChange={onOptionChange}
              />
              <label
                style={{ paddingLeft: '5px' }}
                htmlFor='radio-is-not-correct-phone-number'
              >
                No, quiero editar mi numero
              </label>
            </div>
          </div>
        </form>
        {isCorrectPhoneNumber === 'no' ? generatePhoneNumberInput() : <></>}
      </div>
    );
  };

  const generateOriginStateInput = () => {
    return (
      <div>
        <small
          style={{
            display: 'block',
            fontSize: '14px',
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          Su estado de procedencia es:
        </small>
        <SelectInput
          onChange={(e) => {
            setOriginState(e.target.value);
            setErrorState('');
          }}
          value={originState}
        >
          <option value='' disabled key={'socials_' + 0}>
            Seleccione un estado
          </option>
          {statesOfMexicoArray.map((state, index) => {
            return (
              <option value={state} key={'mexico_state_' + (index + 1)}>
                {state}
              </option>
            );
          })}
        </SelectInput>
        {errorState !== '' && (
          <p
            style={{
              color: 'red',
              fontWeight: '600',
              padding: '0',
              margin: '0',
              paddingLeft: '5px',
            }}
          >
            {errorState}
          </p>
        )}
      </div>
    );
  };

  const generateOriginStateQuestion = () => {
    const onOptionChange = (e: any) => {
      setIsCorrectOriginState(e.target.value);
    };

    return (
      <div className='data-container' style={{ paddingTop: '15px' }}>
        <p>
          Tu estado de origen registrado es:{' '}
          <strong>{user.origin_state}</strong>
        </p>
        <p>¿Es correcto?</p>
        <form action=''>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              paddingLeft: '15px',
            }}
          >
            <div>
              <input
                checked={isCorrectOriginState === 'yes'}
                type='radio'
                value='yes'
                name='show-origin-state'
                id='radio-is-correct-origin-state'
                onChange={onOptionChange}
              />
              <label
                style={{ paddingLeft: '5px' }}
                htmlFor='radio-is-correct-origin-state'
              >
                Si
              </label>
            </div>
            <div>
              <input
                checked={isCorrectOriginState === 'no'}
                type='radio'
                value='no'
                name='show-origin-state'
                id='radio-is-correct-origin-state'
                onChange={onOptionChange}
              />
              <label
                style={{ paddingLeft: '5px' }}
                htmlFor='radio-is-correct-origin-state'
              >
                No
              </label>
            </div>
          </div>
        </form>
        {isCorrectOriginState === 'no' ? generateOriginStateInput() : <></>}
      </div>
    );
  };

  const optionSelect = (value: string) => {
    setComeFrom(value);
    setErrorComeFrom('');
  };

  useEffect(() => {
    setPhoneNumber(user.phone_number || '');
  }, [user.phone_number]);

  useEffect(() => {
    setOriginState(user.origin_state || '');
  }, [user.origin_state]);

  useEffect(() => {
    setComeFrom(user.come_from || '');
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
  };

  const updateExtraInfo = async () => {
    setLoader(true);
    let hasErrors = false;
    if (comeFrom === '') {
      setLoader(false);
      setErrorComeFrom('Seleccione una opción por favor');
      hasErrors = true;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      setLoader(false);
      setErrorPhone('Ingrese un numero de telefono valido');
      hasErrors = true;
    } else {
      setErrorPhone('');
    }
    if (phoneNumber.startsWith('52')) {
      if (originState === '') {
        setLoader(false);
        setErrorState('Seleccione un estado de procedencia');
        hasErrors = true;
      } else {
        setErrorState('');
      }
    } else {
      setErrorState('');
    }

    if (hasErrors) {
      // setWarningMessage('La petición no se envio');
      return;
    }

    try {
      if (!comeFrom || !phoneNumber) {
        setLoader(false);
        // setWarningMessage('La petición no se envio');
        return;
      }
      if (phoneNumber.startsWith('52') && originState === '') {
        setLoader(false);
        // setWarningMessage('La petición no se envio');
        return;
      }

      const responsePutHTTP = await updateExtraInfoApi({
        id: user.id,
        phone_number: phoneNumber,
        come_from: comeFrom,
        origin_state: !phoneNumber.startsWith('52')
          ? 'Desconocido'
          : originState,
      });
      // setWarningMessage('La petición fue exitosa');
      setLoader(false);
      onHide();
    } catch (error) {
      setLoader(false);
      // setWarningMessage('La petición no se envio');
      console.log(error);
    }
  };
  return (
    <Modal show={show}>
      <ComeFromContainer>
        <div className='header'>
          <h2 className='title'>
            Hola
            <span> {user.name}!</span>
          </h2>
        </div>
        {!user.come_from ? (
          <div className='bottom-data'>
            <p>¿Porqué medio te enteraste de nuestros cursos?</p>
            <div className='select-container'>
              <SelectInput
                onChange={(e) => {
                  optionSelect(e.target.value);
                  setErrorComeFrom('');
                }}
                value={comeFrom}
              >
                <option value='' disabled key={'socials_' + 0}>
                  Seleccione una opción
                </option>
                {SOCIALS_ARRAY.map((val: string, index: number) => {
                  return (
                    <option value={val} key={'socials_' + (index + 1)}>
                      {val}
                    </option>
                  );
                })}
              </SelectInput>
              {!!errorComeFrom && (
                <p
                  style={{
                    color: 'red',
                    fontWeight: '600',
                    position: 'absolute',
                    bottom: '-25px',
                    paddingLeft: '5px',
                  }}
                >
                  {errorComeFrom}
                </p>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        {!user.phone_number
          ? generatePhoneNumberInput()
          : generatePhoneNumberQuestion()}
        {phoneNumber.startsWith('52') && !!user.origin_state ? (
          generateOriginStateQuestion()
        ) : (
          <></>
        )}
        {phoneNumber.startsWith('52') && !user.origin_state ? (
          generateOriginStateInput()
        ) : (
          <></>
        )}
        {/*
          <>
            <small>User values:</small><p>{JSON.stringify(transformUser(user), null, 2).replace(' ', '\n')}</p>
          </>
          */}

        {/*
          <>
            <small>
              New values:
            </small>
            <p>{JSON.stringify({ comeFrom, phoneNumber, originState }, null, 2)}</p>
          </>
          */}

        {/*
          <strong style={{
            color: warningMessage === 'La petición fue exitosa' ? 'green' : 'red'
          }}>{warningMessage}</strong>
        */}

        <div className='btn-contain' style={{ paddingBlock: '15px' }}>
          {loader ? (
            <div style={{ marginRight: 10 }}>
              <Spinner />
            </div>
          ) : (
            <PurpleButton className='btn' onClick={updateExtraInfo}>
              Continuar
            </PurpleButton>
          )}
        </div>
      </ComeFromContainer>
    </Modal>
  );
};

const transformUser = (user: any) => {
  const { come_from, phone_number, origin_state } = user;

  return {
    come_from,
    phone_number,
    origin_state,
  };
};

export default ComeFromModal;
