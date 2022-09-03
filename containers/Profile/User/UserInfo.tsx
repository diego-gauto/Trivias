

import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";

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
} from "./User.styled";

const UserInfo = ({ userData, taskView, setTaskView }: any) => {



  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.log(error)
    });
  };

  return (
    <ProfileContainer>
      <ProfileIconContain>
        <PictureContain>
          {userData &&
            userData.photoURL.length > 0 ?
            <ProfileIcon src={userData.photoURL} ></ProfileIcon>
            : <ProfileIcon src={DEFAULT_USER_IMG} ></ProfileIcon>
          }
          <LevelContain>
            <UserLevel />
          </LevelContain>
        </PictureContain>
      </ProfileIconContain>
      <UserContainer>
        <LabelText>
          Usuario
        </LabelText>
        <UserText>
          {userData.name}
        </UserText>
      </UserContainer>
      <UserContainer>
        <LabelText>
          Correo electrónico
        </LabelText>
        <UserText>
          {userData.email}
        </UserText>
      </UserContainer>
      <UserContainer>
        <LabelText>
          Puntos
        </LabelText>
        <UserText>
          {userData.score}
        </UserText>
      </UserContainer>
      <UserContainer>
        <LabelText>
          Suscripción Actual
        </LabelText>
        <UserText>
          {userData.plan}
        </UserText>
      </UserContainer>
      {
        taskView == false &&
        <UserContainer>
          <OpenTasks onClick={() => { setTaskView(true) }}>
            Ver Tareas
          </OpenTasks>
        </UserContainer>
      }
      {
        taskView == true &&
        <UserContainer>
          <OpenTasks onClick={() => { setTaskView(false) }}>
            Ver Perfil
          </OpenTasks>
        </UserContainer>
      }

      <Link href="/">
        <LogOut
          onClick={logoutFunc}
        >
          Cerrar Sesión
          <LogOutIcon />
        </LogOut>
      </Link>

    </ProfileContainer>
  )
}
export default UserInfo;