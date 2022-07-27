import Link from 'next/link';
import React from 'react'
import { ProfileContainer, ProfileIconContain, ProfileIcon, UserContainer, LabelText, LogOut, LogOutIcon, UserText } from './User.styled';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../../hooks/useAuth";

const UserInfo = () => {
  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/Screens/Landings";
    }).catch((error) => {
      console.log(error)
    });
  };
  return (
    <ProfileContainer>
      <ProfileIconContain>
        <ProfileIcon />
      </ProfileIconContain>
      <UserContainer>
        <LabelText>
          Usuario
        </LabelText>
        <UserText>
          Mofupiyo
        </UserText>
      </UserContainer>
      <UserContainer>
        <LabelText>
          Correo electrónico
        </LabelText>
        <UserText>
          mofu@mofu.com
        </UserText>
      </UserContainer>
      <UserContainer>
        <LabelText>
          Puntos
        </LabelText>
        <UserText>
          1,100
        </UserText>
      </UserContainer>
      <UserContainer>
        <LabelText>
          Suscripción Actual
        </LabelText>
        <UserText>
          Gonvar Plus
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