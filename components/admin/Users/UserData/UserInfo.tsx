import React from 'react'
import { CloseIcon, FirstBox, Title, TitleContain, UserContain } from './UserInfo.styled';

const UserInfo = ({ setShowUser, showUser }: any) => {
  return (
    <UserContain>
      <TitleContain>
        <FirstBox>
          <Title>Usuario Activo</Title>
        </FirstBox>
        <CloseIcon onClick={() => { setShowUser(false) }} />
      </TitleContain>
    </UserContain>
  )
}
export default UserInfo;