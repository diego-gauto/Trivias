import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillCrown } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { DEFAULT_USER_IMG } from "../../../constants/paths";
import UserLevel from "../Rewards/UserLevel/UserLevel";
import {
  LabelText,
  Level,
  LevelContain,
  LogOut,
  LogOutIcon,
  OpenTasks,
  PictureContain,
  ProfileContainer,
  ProfileIcon,
  ProfileIconContain,
  UserContainer,
  UserText,
  ProfileMainContainer,
  InputPhone,
  Box2
} from "./User.styled";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useMediaQuery } from "react-responsive";

const UserInfo = ({ userData, taskView, setTaskView, nextLevel, data, reward }: any) => {
  let today = new Date().getTime() / 1000;
  let tempDate = new Date(userData.membership.finalDate * 1000);
  let tempDay = tempDate.getDate()
  let tempMonth = tempDate.getUTCMonth() + 1;
  let tempYear = tempDate.getFullYear()
  let formatDate = `${tempDay}/${tempMonth}/${tempYear}`
  const [user, setUser] = useState<any>({ userData })
  const [startEdit, setStartEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const phoneCode = userData.phoneNumber != null && userData.phoneNumber.slice(0, 3);
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const numFor = Intl.NumberFormat('en-US');
  const nextLevel_format = numFor.format(nextLevel);
  const points_format = numFor.format(userData.score);
  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.log(error)
    });
  };
  const updateUser = async () => {
    const docRef = doc(db, 'users', user.id);
    await updateDoc(docRef, {
      name: user.name,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    }).then(() => {
      setStartEdit(false);
    })
  }
  useEffect(() => {
    setUser({ ...userData })
  }, [userData])
  return (
    <ProfileMainContainer startEdit={startEdit} password={editPassword}>
      <div className="first-text">
        <div className="main-text">
          <p >Siguiente <br />recompensa<br /><span>{nextLevel_format} puntos</span></p>
        </div>
        <div className="responsive-picture">
          <div className="crown">
            <AiFillCrown />
          </div>
          <PictureContain progress={data} reward={reward}>
            {userData &&
              userData.photoURL.length > 0 ?
              <ProfileIcon src={userData.photoURL} ></ProfileIcon>
              : <ProfileIcon src={DEFAULT_USER_IMG} ></ProfileIcon>
            }
            <div className="circle-level">
              <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradientLevel">
                    <stop offset="0%" stopColor="#f88d21" />
                    <stop offset="100%" stopColor="#972dec" />
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient id="gradientCertificate">
                    <stop offset="0%" stopColor="#0997fe" />
                    <stop offset="100%" stopColor="#9108ee" />
                  </linearGradient>
                </defs>
                <circle className="progress-background"
                />
                <circle className="progress-circle" />
              </svg>
            </div>
          </PictureContain>
        </div>
      </div>
      <div className="profile-container">
        {
          !responsive1023 &&
          <>
            <div className="crown">
              <AiFillCrown />
            </div>
            <PictureContain progress={data} reward={reward}>
              {userData &&
                userData.photoURL.length > 0 ?
                <ProfileIcon src={userData.photoURL} ></ProfileIcon>
                : <ProfileIcon src={DEFAULT_USER_IMG} ></ProfileIcon>
              }
              <div className="circle-level">
                <svg xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gradientLevel">
                      <stop offset="0%" stopColor="#f88d21" />
                      <stop offset="100%" stopColor="#972dec" />
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient id="gradientCertificate">
                      <stop offset="0%" stopColor="#0997fe" />
                      <stop offset="100%" stopColor="#9108ee" />
                    </linearGradient>
                  </defs>
                  <circle className="progress-background"
                  />
                  <circle className="progress-circle" />
                </svg>
              </div>
            </PictureContain>
          </>
        }

        {
          !startEdit
            ?
            <div className="user-info-up">
              <p className="name-text">
                {userData.name}<br /><span>{userData.lastName}</span>
              </p>
              <div className="data-contain">
                <p className="points">{points_format} puntos</p>
                <p className="months">16 meses de aprendizaje</p>
                <p className="certificates">14 certificados</p>
              </div>
            </div>
            :
            <div className="user-info-up">
              <div className="input-contain">
                <label>
                  Nombre
                </label>
                <input
                  placeholder={userData.name}
                  defaultValue={userData.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value })
                  }}
                />
              </div>
              <div className="input-contain">
                <label>
                  Apellido
                </label>
                <input
                  placeholder={userData.lastName}
                  defaultValue={userData.lastName}
                  onChange={(e) => {
                    setUser({ ...user, lastName: e.target.value })
                  }}
                />
              </div>

            </div>
        }

        <div className="user-info-down">
          <div className="data-container">
            <p className="email">
              Correo electrónico
            </p>
            <p className="email-user">
              {userData.email}
            </p>
          </div>
          <div className="data-container">
            <p className="email">
              Whatsapp
            </p>
            {
              !startEdit
                ?
                <p className="email-user">
                  {userData.phoneNumber}
                </p>
                :
                <Box2>
                  <div className="separate" style={{ left: 55 }} />
                  <InputPhone
                    value={userData.phoneNumber}
                    limitMaxLength={true}
                    international={true}
                    countryCallingCodeEditable={false}
                    onChange={(e: any) => {
                      setUser({ ...user, phoneNumber: e })
                    }}
                  />
                </Box2>
            }
          </div>
          <div className="data-container">
            {
              !startEdit
                ?
                <>
                  <p className="password">
                    Contraseña
                  </p>
                  <p className="password-user">
                    **********
                  </p>
                </>
                :
                <button
                  onClick={() => { setEditPassword(!editPassword) }}
                  className="password-edit"
                >
                  Crear nueva contraseña
                </button>
            }
          </div>
        </div>
        {
          editPassword &&
          <div className="edit-contain">
            <div className="input-contain">
              <label>
                Contraseña actual
              </label>
              <input
                placeholder="Crea una contraseña"
              />
            </div>
            <div className="input-contain">
              <label>
                Nueva contraseña
              </label>
              <input
                placeholder="Crea una contraseña"
              />
            </div>
            <div className="input-contain">
              <label>
                Confirmar nueva contraseña
              </label>
              <input
                placeholder="Confirma tu contraseña"
              />
            </div>
          </div>
        }

      </div>
      <div className="btn-container">
        {
          !startEdit
            ?
            <button
              className="btn-edit"
              onClick={() => { setStartEdit(true) }}
            >
              <MdModeEditOutline />
              Editar Perfil
            </button>
            :
            <button
              className="btn-edit"
              onClick={() => { updateUser() }}
            >
              Guardar Cambios
            </button>
        }

        <button className="btn-logout">Cerrar sesión</button>
      </div>
    </ProfileMainContainer>
    // <ProfileContainer>
    //   <ProfileIconContain>
    //     <PictureContain>
    //       {userData &&
    //         userData.photoURL.length > 0 ?
    //         <ProfileIcon src={userData.photoURL} ></ProfileIcon>
    //         : <ProfileIcon src={DEFAULT_USER_IMG} ></ProfileIcon>
    //       }
    //       <LevelContain>
    //         <UserLevel />
    //       </LevelContain>
    //     </PictureContain>
    //   </ProfileIconContain>
    //   <UserContainer>
    //     <LabelText>
    //       Usuario
    //     </LabelText>
    //     <UserText>
    //       {userData.name} {userData.lastName}
    //     </UserText>
    //   </UserContainer>
    //   <UserContainer>
    //     <LabelText>
    //       Correo electrónico
    //     </LabelText>
    //     <UserText>
    //       {userData.email}
    //     </UserText>
    //   </UserContainer>
    //   <UserContainer>
    //     <LabelText>
    //       Puntos
    //     </LabelText>
    //     <UserText>
    //       {userData.score}
    //     </UserText>
    //   </UserContainer>
    //   {userData.membership.finalDate > today && <UserContainer>
    //     <LabelText>
    //       Suscripción Actual
    //     </LabelText>
    //     <UserText>
    //       Gonvar Plus Mensual
    //     </UserText>
    //   </UserContainer>}
    //   {userData.membership.finalDate > today && <UserContainer>
    //     <LabelText>
    //       Próximo cargo
    //     </LabelText>
    //     <UserText>
    //       {formatDate}
    //     </UserText>
    //   </UserContainer>}
    //   {
    //     userData.role == "user" &&
    //     <UserContainer>
    //       {
    //         !taskView ?
    //           <OpenTasks onClick={() => { setTaskView(true) }}>
    //             Ver Tareas
    //           </OpenTasks>
    //           :
    //           <OpenTasks onClick={() => { setTaskView(false) }}>
    //             Ver Perfil
    //           </OpenTasks>
    //       }
    //     </UserContainer>
    //   }
    //   <Link href="/">
    //     <LogOut
    //       onClick={logoutFunc}
    //     >
    //       Cerrar Sesión
    //       <LogOutIcon />
    //     </LogOut>
    //   </Link>
    // </ProfileContainer>
  )
}
export default UserInfo;