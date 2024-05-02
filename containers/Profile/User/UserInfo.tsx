import React, { useEffect, useState } from 'react';

import { useFacebook } from 'react-facebook';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdEdit, MdModeEditOutline } from 'react-icons/md';

import { getAuth } from 'firebase/auth';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { googleLogout } from '@react-oauth/google';

import { updateUserInfo } from '../../../components/api/users';
import { DEFAULT_USER_IMG } from '../../../constants/paths';
import { useAuth } from '../../../hooks/useAuth';
import { updateProfileImage } from '../../../store/actions/UserActions';
import {
  Box2,
  InputPhone,
  PictureContain,
  ProfileIcon,
  ProfileMainContainer,
  ProfileText,
} from './User.styled';

const { getCode, getName } = require('country-list');

const UserInfo = ({
  userData,
  nextReward,
  handleClick,
  nextTimeReward,
  timeProgress,
  data,
  reward,
  responsive1023,
  starPosition,
  timeLevel,
  nextCertificate,
  certificateProgress,
}: any) => {
  let today = new Date().getTime() / 1000;
  let tempDate = new Date(userData.final_date * 1000);
  let tempDay = tempDate.getDate();
  let tempMonth = tempDate.getUTCMonth() + 1;
  let tempYear = tempDate.getFullYear();
  let formatDate = `${tempDay}/${tempMonth}/${tempYear}`;
  const [user, setUser] = useState<any>({ userData });
  const [password, setPassword] = useState<any>('');
  const [confirmPassword, setConfirmPassword] = useState<any>('');
  const [startEdit, setStartEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [image, setImage] = useState<string>('');
  const [starCoordinates, setStarCoordinates] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const numFor = Intl.NumberFormat('en-US');
  const nextLevel_format = numFor.format(nextReward.points);
  const points_format = numFor.format(userData.score);
  const auth = getAuth();
  const userPass: any = auth.currentUser;
  const starsImage = '/images/profile/stars.png';
  const crownImage = '/images/profile/crown.png';
  const { api } = useFacebook();
  const { reloadUser } = useAuth();

  // const socket = io("ws://gonvar.inowu.dev:8000");

  // send a message to the server
  // socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

  // // receive a message from the server
  // socket.on("hello from server", (...args) => {
  //   // ...
  // });

  const hiddenFileInput: any = React.useRef(null);
  const changeImage = (e: any) => {
    hiddenFileInput.current.click();
  };
  const getUserImg = (file: any) => {
    var reader: any = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event: any) => {
      setImage(reader.result);
      setUser({ ...user, format: reader.result });
    };
  };
  function makeShortName(name: string) {
    let maxLength = 11;
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '..';
    }
    return name;
  }
  const logoutFunc = () => {
    localStorage.clear();
    if (user.provider === 'web') {
      window.location.href = '/';
    }
    if (user.provider === 'google') {
      googleLogout();
      window.location.href = '/';
    }
    if (user.provider === 'facebook') {
      api?.logout();
      window.location.href = '/';
    }
  };

  const handleUpdateData = async () => {
    let photo = user.photo;
    let tempPassword = user.password;
    if (image !== '') {
      await updateProfileImage(user, user.id).then((res) => {
        photo = res;
        setImage('');
      });
    }
    if (editPassword) {
      if (password == confirmPassword) {
        if (password.length >= 6) {
          tempPassword = password;
        } else {
          setErrorPassword(true);
          setErrorMsg('La contraseña debe tener al menos 6 carácteres');
          return;
        }
      } else {
        setErrorPassword(true);
        setErrorMsg('La contraseña no coincide');
        return;
      }
    }
    if (user.name === '' || user.last_name === '') {
      alert('Por favor no deje los campos vacios!');
      return;
    }

    let body = {
      name: user.name,
      last_name: user.last_name,
      phone_number: user.phone_number.replace('+', ''),
      userId: user.id,
      photo: photo,
      password: tempPassword,
      country: parseNumber(user.phone_number),
      stripeId: user.stripe_id,
    };

    updateUserInfo(body).then((res) => {
      setStartEdit(false);
      setEditPassword(false);
      setPassword('');
      setConfirmPassword('');
      reloadUser();
      handleClick();
    });
  };
  const stopEdit = () => {
    setEditPassword(false);
    setStartEdit(false);
  };
  const parseNumber = (phone: string) => {
    if (!phone.includes('+')) {
      phone = '+' + phone;
    }
    const parsedNumber = parsePhoneNumberFromString(phone);
    const country = getName(parsedNumber?.country);
    return country;
  };

  useEffect(() => {
    setUser({ ...userData });
  }, [userData]);
  const format = (start_date: any, level: any) => {
    let tempDayCount: any = today - start_date;
    let getMonth: any;
    if (level === 1 || userData.final_date > today) {
      if (start_date === 0) {
        getMonth = 0;
      } else {
        getMonth = tempDayCount / (3600 * 24 * 30);
      }
    } else {
      getMonth = 0;
    }
    return Math.floor(getMonth);
  };
  return (
    <ProfileMainContainer
      startEdit={startEdit}
      password={editPassword}
      star={starPosition}
      coordinates={starCoordinates}
    >
      <div className='first-text'>
        <div className='main-text'>
          <p>
            {reward === 0 && (
              <>
                Siguiente
                <br />
                recompensa <br />
              </>
            )}
            {reward === 1 && (
              <>
                Siguiente
                <br />
                beneficio <br />
              </>
            )}

            {reward === 0 ? (
              <span>
                {nextLevel_format ? (
                  nextLevel_format + ' puntos'
                ) : (
                  <>
                    ¡Próximamente: <br /> más recompensas para ti!
                  </>
                )}
              </span>
            ) : reward === 1 ? (
              <span className='time-reward'>
                {nextTimeReward?.month ? (
                  nextTimeReward.month > 1 ? (
                    nextTimeReward.month + ' meses'
                  ) : (
                    nextTimeReward.month + ' mes'
                  )
                ) : (
                  <div className='reward-height'>
                    ¡Próximamente: <br /> más beneficios para ti!
                  </div>
                )}
              </span>
            ) : (
              <></>
            )}
            {reward === 2 && (
              <>
                <span style={{ color: '#0057e2' }}>
                  {nextCertificate ? (
                    nextCertificate.lessonsLeft === 0 ? (
                      'Estás a algunas tareas'
                    ) : (
                      <>
                        {nextCertificate.lessonsLeft === 1
                          ? 'Estás a ' +
                            nextCertificate.lessonsLeft +
                            ' lección'
                          : 'Estás a ' +
                            nextCertificate.lessonsLeft +
                            ' lecciones'}
                      </>
                    )
                  ) : (
                    'Mira lecciones '
                  )}
                </span>
                {nextCertificate ? (
                  <>
                    <br /> de un nuevo <br /> certificado
                  </>
                ) : (
                  <>
                    <br /> para obtener <br /> certificados!
                  </>
                )}
              </>
            )}
          </p>
        </div>
        <div className='responsive-picture'>
          <PictureContain
            progress={data}
            reward={reward}
            timeProgress={timeProgress}
            certificateProgress={certificateProgress}
          >
            <ProfileText style={{ transform: 'rotate(-5deg)' }}>
              <svg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'>
                <path id='MyPath' fill='none' d='M60,130 Q 200,0 0,-200' />
                {reward === 0 && (
                  <text>
                    <textPath
                      href='#MyPath'
                      fill='#3f1168'
                      style={{ fontSize: 14, fontFamily: 'Montserrat' }}
                    >
                      Puntaje actual
                    </textPath>
                  </text>
                )}
                {reward === 1 && (
                  <text>
                    <textPath
                      href='#MyPath'
                      fill='#3f1168'
                      style={{ fontSize: 14, fontFamily: 'Montserrat' }}
                    >
                      Puntaje actual
                    </textPath>
                  </text>
                )}
              </svg>
            </ProfileText>
            <ProfileText
              style={
                reward === 0
                  ? { bottom: -54, right: -122, transform: 'rotate(-5deg)' }
                  : reward === 1
                    ? timeLevel === 0
                      ? { bottom: -67, right: -116, transform: 'rotate(1deg)' }
                      : {
                          bottom: -27,
                          right: -131,
                          transform: 'rotate(-13deg)',
                        }
                    : {}
              }
            >
              <svg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'>
                <path id='scorePath' fill='none' d='M65,130 Q 200,0 0,-500' />
                <text>
                  <textPath
                    href='#scorePath'
                    fill='#3f1168'
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {reward === 0 && `${points_format} puntos`}
                    {reward === 1 && (
                      <>
                        {timeLevel > 0
                          ? timeLevel > 1
                            ? timeLevel + ' meses'
                            : timeLevel + ' mes'
                          : 'Sin Suscripción'}
                      </>
                    )}
                  </textPath>
                </text>
              </svg>
            </ProfileText>
            {starPosition !== 0 && (
              <div className='stars'>
                <img src={starsImage} />
              </div>
            )}
            <div className='crown'>
              <img src={crownImage} />
            </div>
            <ProfileIcon
              onClick={changeImage}
              edit={startEdit}
              src={
                startEdit == true && image !== ''
                  ? image
                  : userData
                    ? userData.photo
                    : DEFAULT_USER_IMG
              }
            ></ProfileIcon>
            <input
              className='picture'
              type='file'
              ref={hiddenFileInput}
              accept='image/png, image/jpg, image/jpeg'
              onChange={(e) => {
                getUserImg(e.target.files);
              }}
            />
            {startEdit && (
              <div className='edit' onClick={changeImage}>
                <div className='edit-icon'>
                  <MdEdit />
                  {/* <div className="background2" /> */}
                </div>
                <div className='message'>
                  <p>Cambiar imagen</p>
                </div>
              </div>
            )}
            <div className='circle-level'>
              <svg xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <linearGradient id='gradientLevelResp'>
                    <stop offset='0%' stopColor='#f88d21' />
                    <stop offset='100%' stopColor='#972dec' />
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient id='gradientTimeResp'>
                    <stop offset='0%' stopColor='#1beb00' />
                    <stop offset='100%' stopColor='#972dec' />
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient id='gradientCertificateResp'>
                    <stop offset='0%' stopColor='#0997fe' />
                    <stop offset='100%' stopColor='#9108ee' />
                  </linearGradient>
                </defs>

                <circle className='progress-background' />
                <circle className='progress-circle' />
              </svg>
            </div>
          </PictureContain>
        </div>
      </div>
      <div className='profile-container'>
        {!responsive1023 && (
          <>
            <div className='crown'>
              <img src={crownImage} />
            </div>
            <PictureContain
              progress={data}
              reward={reward}
              timeProgress={timeProgress}
              certificateProgress={certificateProgress}
            >
              <ProfileIcon
                onClick={changeImage}
                edit={startEdit}
                src={
                  startEdit == true && image !== ''
                    ? image
                    : userData
                      ? userData.photo
                      : DEFAULT_USER_IMG
                }
              ></ProfileIcon>
              {startEdit && (
                <div className='edit' onClick={changeImage}>
                  <div className='edit-icon'>
                    <MdEdit />
                    {/* <div className="background2" /> */}
                  </div>
                  <div className='message'>
                    <p>Cambiar imagen</p>
                  </div>
                </div>
              )}
              <div className='circle-level'>
                <svg xmlns='http://www.w3.org/2000/svg'>
                  <defs>
                    <linearGradient id='gradientLevel'>
                      <stop offset='0%' stopColor='#f88d21' />
                      <stop offset='50%' stopColor='#d244d1' />
                      <stop offset='100%' stopColor='#972dec' />
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient id='gradientTime'>
                      <stop offset='0%' stopColor='#1beb00' />
                      <stop offset='100%' stopColor='#972dec' />
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient id='gradientCertificate'>
                      <stop offset='0%' stopColor='#0997fe' />
                      <stop offset='100%' stopColor='#9108ee' />
                    </linearGradient>
                  </defs>

                  <circle className='progress-background' />
                  <circle className='progress-circle' />
                </svg>
              </div>
            </PictureContain>
          </>
        )}

        {!startEdit ? (
          <div className='user-info-up'>
            <p className='name-text'>
              {makeShortName(userData.name)}
              <br />
              <span>{userData.lastName}</span>
            </p>
            <div className='data-contain'>
              <p className='points'>{points_format} puntos</p>
              <p className='months'>
                {format(user.start_date, user.level)} meses de aprendizaje
              </p>
              <p className='certificates'>
                {userData.user_certificates?.length > 0
                  ? userData.user_certificates?.length == 1
                    ? userData.user_certificates?.length + ' certificado'
                    : userData.user_certificates?.length + ' certificados'
                  : 'Sin certificados'}
              </p>
            </div>
          </div>
        ) : (
          <div
            className='user-info-up'
            style={responsive1023 == true ? { gap: 2, paddingTop: 20 } : {}}
          >
            <div className='input-contain'>
              <label>Nombre</label>
              <input
                placeholder={userData.name}
                defaultValue={userData.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              />
            </div>
            <div className='input-contain'>
              <label>Apellido</label>
              <input
                placeholder={userData.last_name}
                defaultValue={userData.last_name}
                onChange={(e) => {
                  setUser({ ...user, last_name: e.target.value });
                }}
              />
            </div>
            {responsive1023 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 10,
                  gap: 10,
                }}
              >
                <button className='btn-edit' onClick={handleUpdateData}>
                  Guardar Cambios
                </button>
                <button
                  className='btn-edit'
                  onClick={stopEdit}
                  style={{ width: 80 }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        )}
        <div className='user-info-down'>
          <div className='data-container'>
            <p className='email'>Correo electrónico</p>
            <p className='email-user'>{userData.email}</p>
          </div>
          <div className='data-container'>
            <p className='email'>Whatsapp</p>
            {!startEdit ? (
              <p className='email-user'>
                {userData.phone_number === 'undefined'
                  ? ''
                  : userData.phone_number}
              </p>
            ) : (
              <Box2>
                <div className='separate' />
                <InputPhone
                  value={
                    userData.phone_number === 'undefined'
                      ? ''
                      : '+' + userData.phone_number
                  }
                  limitMaxLength={true}
                  international={true}
                  countryCallingCodeEditable={false}
                  onChange={(e: any) => {
                    setUser({ ...user, phone_number: e });
                    console.log(e);
                  }}
                />
              </Box2>
            )}
          </div>
          <div className='data-container'>
            {!startEdit ? (
              <>
                {responsive1023 && (
                  <div className='btn-edit-container'>
                    <button
                      className='btn-edit'
                      onClick={() => {
                        setStartEdit(true);
                      }}
                    >
                      <MdModeEditOutline />
                      Editar Perfil
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {user.provider === 'web' && (
                  <button
                    onClick={() => {
                      setEditPassword(!editPassword);
                    }}
                    className='password-edit'
                  >
                    Cambiar contraseña
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {editPassword && (
          <div className='edit-contain'>
            <div className='input-contain'>
              <label>Nueva contraseña</label>
              <div className='input-password'>
                <input
                  value={password}
                  type={showNewPassword ? 'text' : 'password'}
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                  placeholder='Crea una contraseña'
                />
                <div
                  className='eye'
                  onClick={() => {
                    setShowNewPassword(!showNewPassword);
                  }}
                >
                  {showNewPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </div>
              </div>
            </div>
            <div className='input-contain'>
              <label>Confirmar nueva contraseña</label>
              <div className='input-password'>
                <input
                  value={confirmPassword}
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={(e: any) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder='Confirma tu contraseña'
                ></input>
                <div
                  className='eye'
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </div>
              </div>
              {errorPassword && <div className='error'>{errorMsg}</div>}
            </div>
          </div>
        )}
      </div>
      <div className='btn-container'>
        {!startEdit ? (
          <button
            className='btn-edit'
            onClick={() => {
              setStartEdit(true);
            }}
          >
            <MdModeEditOutline />
            Editar Perfil
          </button>
        ) : (
          <button className='btn-edit' onClick={handleUpdateData}>
            Guardar Cambios
          </button>
        )}
        {!startEdit ? (
          <button className='btn-logout' onClick={logoutFunc}>
            Cerrar sesión
          </button>
        ) : (
          <button className='btn-logout' onClick={stopEdit}>
            Cancelar
          </button>
        )}
      </div>
    </ProfileMainContainer>
  );
};
export default UserInfo;
