
import { useMediaQuery } from "react-responsive";

import Link from "next/link";

import {
  BackgroundProfile,
  LogOut,
  LogOutIcon,
  SecondBox,
  ThirdBox,
} from "../../Profile/User/User.styled";
import NextReward from "./NextReward";
import PaymentMethod from "./PaymentMethod";
import UserData from "./UserData";
import UserInfo from "./UserInfo";

const User = () => {
  const responsive470 = useMediaQuery({ query: "(max-width: 470px)" });

  return (
    <BackgroundProfile>
      {/* FIRST BOX */}
      <UserInfo />
      {/* SECOND Container */}
      <SecondBox>
        <Link href="/Screens/Landings">
          <LogOut style={{
            display: responsive470 ? "" : "none",
            marginTop: "-5%",
          }}>
            Cerrar Sesión
            <LogOutIcon />
          </LogOut>
        </Link>
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