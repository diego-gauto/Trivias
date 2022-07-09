import React from 'react'
import NextReward from './NextReward';
import UserData from './UserData';
import PaymentMethod from './PaymentMethod';
import UserInfo from './UserInfo';
import {
  BackgroundProfile,
  SecondBox,
  ThirdBox
} from '../../Profile/User/User.styled'


const User = () => {
  return (
    <BackgroundProfile>
      {/* FIRST BOX */}
      <UserInfo />
      {/* SECOND Container */}
      <SecondBox>
        <NextReward />
        <ThirdBox>
          {/* Third Container */}
          <UserData />
          {/* Fourth Container */}
          <PaymentMethod />
        </ThirdBox>
      </SecondBox>
    </BackgroundProfile>
  )
}
export default User;