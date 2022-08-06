

import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";

import { DEFAULT_USER_IMG } from "../../../constants/paths";
import {
  LabelText,
  Level,
  LogOut,
  LogOutIcon,
  PictureContain,
  ProfileContainer,
  ProfileIcon,
  ProfileIconContain,
  UserContainer,
  UserText,
} from "./User.styled";

const UserInfo = ({ userData }: any) => {



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
          <Level />
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
      <Link href="/Screens/Landings">
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