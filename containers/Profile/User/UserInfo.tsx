import Link from 'next/link';
import React from 'react'
import { ProfileContainer, ProfileIconContain, ProfileIcon, UserContainer, LabelText, LogOut, LogOutIcon, UserText, PictureContain, Level } from './User.styled';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../../hooks/useAuth";

const UserInfo = ({ userData }: any) => {
  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.log(error)
    });
  };
  console.log(userData);
  return (
    <ProfileContainer>
      <ProfileIconContain>
        <PictureContain>
          {userData && userData.photoURL ?
            <ProfileIcon src={userData.photoURL} />
            : <ProfileIcon />
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