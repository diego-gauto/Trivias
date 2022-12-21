import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
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
  ProfileMainContainer
} from "./User.styled";

const UserInfo = ({ userData, taskView, setTaskView, nextLevel }: any) => {
  let today = new Date().getTime() / 1000;
  let tempDate = new Date(userData.membership.finalDate * 1000);
  let tempDay = tempDate.getDate()
  let tempMonth = tempDate.getUTCMonth() + 1;
  let tempYear = tempDate.getFullYear()
  let formatDate = `${tempDay}/${tempMonth}/${tempYear}`

  const phoneCode = userData.phoneNumber != null && userData.phoneNumber.slice(0, 3);

  const numFor = Intl.NumberFormat('en-US');
  const nextLevel_format = numFor.format(nextLevel);
  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.log(error)
    });
  };

  return (
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
    <ProfileMainContainer>
      <div className="first-text">
        <p >Siguiente <br />recompensa<br /><span>{nextLevel_format} puntos</span></p>
      </div>
      <div className="profile-container">
        <PictureContain>
          {userData &&
            userData.photoURL.length > 0 ?
            <ProfileIcon src={userData.photoURL} ></ProfileIcon>
            : <ProfileIcon src={DEFAULT_USER_IMG} ></ProfileIcon>
          }
        </PictureContain>
        <div className="user-info-up">
          <p className="name-text">
            {userData.name}<br /><span>{userData.lastName}</span>
          </p>
          <div className="data-contain">
            <p className="points">{userData.score} puntos</p>
            <p className="months">16 meses de aprendizaje</p>
            <p className="certificates">14 certificados</p>
          </div>
        </div>
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
            <p className="email-user">
              {userData.phoneNumber}
            </p>
          </div>
          <div className="data-container">
            <p className="password">
              Contraseña
            </p>
            <p className="password-user">
              **********
            </p>
          </div>
        </div>
      </div>
      <button className="btn-edit"><MdModeEditOutline />Editar Perfil</button>
      <button className="btn-logout">Cerrar sesión</button>
    </ProfileMainContainer>
  )
}
export default UserInfo;