import ReactInputMask from "react-input-mask";
import PhoneInput from "react-phone-number-input";

import styled, { css, keyframes } from "styled-components";

export const BackgroundProfile = styled.div`
  width: 100%;
  display: flex;
  background-color: #ede7f2;
  .title-contain {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 82%;
    @media (max-width: 700px) {
      width: 95%;
    }
    p {
      margin: 0;
      line-height: 40px;
    }
    .first-text {
      font-size: 24px;
      color: #3f1168;
      letter-spacing: 4px;
      line-height: 60px;
      span {
        font-weight: 600;
        color: #d244d1;
      }
      @media (max-width: 550px) {
        font-size: 20px;
      }
      @media (max-width: 400px) {
        font-size: 16px;
        letter-spacing: 3px;
        line-height: 50px;
      }
    }
    .second-text {
      color: #3f1168;
      font-size: 42px;
      font-weight: 800;
      span {
        color: #942ced;
      }
      @media (max-width: 550px) {
        font-size: 36px;
      }
      @media (max-width: 400px) {
        font-size: 30px;
      }
    }
  }
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
`;
export const SecondBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  @media (max-width: 1280px) {
    padding-left: 0;
  }
  gap: 40px;
  width: 70%;
  height: 100%;
  margin-top: 38px;
  @media (max-width: 1023px) {
    margin-top: 20px;
    width: 100%;
    gap: 30px;
    padding: 0;
  }
  .title-contain {
    display: flex;
    flex-direction: column;
    @media (max-width: 1023px) {
      display: none;
    }
    p {
      margin: 0;
      line-height: 60px;
    }
    .first-text {
      font-size: 36px;
      color: #3f1168;
      letter-spacing: 5px;
      @media (max-width: 1200px) {
        font-size: 30px;
      }
      span {
        font-weight: 600;
        color: #d244d1;
      }
    }
    .second-text {
      color: #3f1168;
      font-size: 42px;
      font-weight: 800;
      @media (max-width: 1200px) {
        font-size: 35px;
      }
      span {
        color: #942ced;
      }
    }
  }
`;
export const ThirdBox = styled.div`
  display: flex;
  gap: 50px;
  @media (max-width: 1380px) {
    gap: 30px;
  }
  @media (max-width: 1080px) {
    gap: 15px;
  }
  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 30px;
    align-items: center;
    width: 100%;
  }
`;
export const ProfileContainer = styled.div`
  width: 40%;
  background: white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  padding-inline: 40px;
  padding-block: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const ProfilePayment = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  @media (max-width: 1023px) {
    order: 3;
  }
`;
export const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  background: white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 15px;
  @media (max-width: 1023px) {
    width: 100%;
  }
`;
export const RewardContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7.5px;
  height: 100%;
  width: 100%;
  background: white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 15px;
  @media (max-width: 1023px) {
    //width:100%;
  }
`;
export const ProfileIconContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogOutIcon = styled.i`
  background-image: url(../images/logout.svg);
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
`;
export const ArrowRight = styled.i`
  background-image: url(../images/arrowRightPurple.svg);
  background-repeat: no-repeat;
  height: 16px;
  width: 20px;
`;
export const Level = styled.i`
  background-image: url(../images/nivel.png);
  background-repeat: no-repeat;
  height: 48px;
  width: 48px;
  position: absolute;
  bottom: 0;
  right: 0;
`;
export const UserContainer = styled.div``;
export const LabelText = styled.label`
  font-family: "Raleway", sans-serif;
  font-size: 14px;
`;
export const UserText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  color: #8e2de2;
  font-weight: 600;
  margin: 0;
`;
export const OpenTasks = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  color: #9011ff;
  font-weight: 600;
  margin: 0;
  cursor: pointer;
  width: fit-content;
  &:hover {
    color: #600fa6;
    text-decoration: underline;
  }
`;
export const LogOut = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: #8e2de2;
  margin: auto auto 0 auto;
  cursor: pointer;
  &:hover {
    color: #600fa6;
    text-decoration: underline;
  }
  @media (max-width: 1023px) {
    margin-inline: 0;
    margin-top: 0;
    margin-bottom: 15px;
  }
`;
export const PaymentTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  @media (max-width: 1023px) {
    font-size: 20px;
  }
`;
export const PaymentBox = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  padding-block: 8px;
  padding-inline: 10px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 510px) {
    padding-block: 10px;
    padding-inline: 10px;
  }
  @media (max-width: 350px) {
    padding-block: 5px;
    padding-inline: 5px;
  }
`;
export const PayBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const PayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const VisaIcon = styled.i`
  background-image: url(../images/Visa.png);
  background-repeat: no-repeat;
  height: 30px;
  width: 47px;
  background-position: center;
`;
export const CardIconResp = styled("i")<{ brand: any }>`
  ${(props) =>
    props.brand == "visa" &&
    css`
      background-image: url(../images/visa-icon.png);
    `}
  ${(props) =>
    props.brand == "mastercard" &&
    css`
      background-image: url(../images/mastercard-icon.png);
    `}
  ${(props) =>
    props.brand == "amex" &&
    css`
      background-image: url(../images/amex-icon.png);
    `}
  
  background-repeat:no-repeat;
  min-width: 59px;
  min-height: 33px;
  background-position: center;
`;
export const PaypalIcon = styled.i`
  background-image: url(../images/Paypal.png);
  background-repeat: no-repeat;
  height: 32px;
  width: 47px;
  background-position: center;
`;
export const TrashIcon = styled.i`
  background-image: url(../images/trash.svg);
  background-repeat: no-repeat;
  height: 21px;
  width: 18px;
  background-position: center;
`;
export const PaymentText = styled.p`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  margin: 0;
  @media (max-width: 510px) {
    font-size: 12px;
  }
`;
export const DeleteContain = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;
`;
export const DeleteText = styled.p`
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  color: #6717cd;
  margin: 0;
  &:hover {
    font-weight: 600;
  }
  @media (max-width: 1280px) {
    display: none;
  }
`;
export const AddPay = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  margin-bottom: 0;
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  color: #6717cd;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 1023px) {
    margin-top: 25px;
  }
`;

export const RewardCenterLink = styled(AddPay)`
  justify-content: center;
  white-space: nowrap;
  @media (max-width: 350px) {
    font-size: 12px;
  }
`;

export const RewardCenterLinkNoReward = styled(AddPay)``;

export const RewardBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  @media (max-width: 400px) {
    gap: 5px;
  }
`;
export const DataTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 20px;
  }
`;
export const VectorLeft = styled.i`
  background-image: url(../images/rigthPurpleArrow.svg);
  background-repeat: no-repeat;
  rotate: 180deg;
  height: 22px;
  width: 18px;
  background-position: center;
  cursor: pointer;
`;
export const VectorRight = styled.i`
  background-image: url(../images/rigthPurpleArrow.svg);
  background-repeat: no-repeat;
  height: 22px;
  width: 18px;
  background-position: center;
  cursor: pointer;
`;
export const RewardTitle = styled.p`
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  margin: 0;
  text-align: center;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
export const Pointbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
export const Currentlvl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: white;
  background-color: #6717cd;
  min-height: 50px;
  min-width: 50px;
  border-radius: 50%;
  background-position: center;
  @media (max-width: 400px) {
    height: 32px;
    width: 32px;
  }
`;
export const Nextlvl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #6717cd;
  background-color: white;
  border: 1px solid #6717cd;
  min-height: 50px;
  min-width: 50px;
  border-radius: 50%;
  background-position: center;
  @media (max-width: 400px) {
    height: 32px;
    width: 32px;
  }
`;
export const ProgressBar1 = styled("div")<{ barProgress: any }>`
  height: 7px;
  background-color: #6717cd;
  border: 1px solid #6717cd;
  position: relative;
  width: ${(props) => props.barProgress}%;
`;
export const ProgressBar2 = styled("div")<{ barProgress: any }>`
  height: 7px;
  background-color: #6717cd;
  border: 1px solid #6717cd;
  position: relative;
  width: ${(props) => props.barProgress}%;
`;
export const CompleteBar = styled.div`
  display: flex;
  width: 100%;
  height: 8px;
  max-width: 186px;
  border-radius: 5px;
  border: 1px solid #6717cd;
`;
export const PointsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 0;
  width: 0px;
`;
export const PolygonDown = styled.i`
  background-image: url(../images/arrowDownPurple.svg);
  height: 9px;
  width: 12px;
  background-repeat: no-repeat;
  left: 0;
`;
export const UserPoints = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  color: #0000fd;
  margin: 0;
  white-space: nowrap;
`;
export const RewardData = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 1023px) {
    flex-direction: column;
    padding-inline: 60px;
    align-items: center;
  }
  @media (max-width: 850px) {
    align-items: center;
  }
  @media (max-width: 450px) {
    padding-inline: 0;
  }
`;
export const RewardInfo = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  @media (max-width: 1023px) {
    text-align: center;
  }
`;
export const RewardTitleBox = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const RewardPoints = styled.p`
  font-size: 12px;
  opacity: 0.7;
  font-family: "Raleway", sans-serif;
  margin: 0;
`;
export const RewardParagraph = styled.p`
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const ImageContain = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  @media (max-width: 1023px) {
    max-height: 260px;
    max-width: 260px;
  }
`;
export const RewardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
`;
export const AllEditInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`;
export const EditText = styled.label`
  font-size: 14px;
  color: #6717cd;
  font-family: "Montserrat", sans-serif;
`;
export const EditInput = styled.input`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  padding-inline: 20px;
  padding-block: 8px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  outline: none;
  :focus {
    border: 2px solid #8e2de2;
  }
`;
export const EditButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;
export const SaveButton = styled.button`
  padding-block: 10px;
  padding-inline: 25px;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  border: none;
  border-radius: 30px;
  background-color: #6717cd;
  &:hover {
    background-color: #5b02cc;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1023px) {
    width: 60%;
  }
  @media (max-width: 1185px) {
    font-size: 14px;
  }
`;
export const SubscriptionButton = styled.button`
  padding-block: 10px;
  padding-inline: 25px;
  color: #6717cd;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #6717cd;
  border-radius: 30px;
  background-color: white;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1023px) {
    width: 60%;
  }
  @media (max-width: 1185px) {
    font-size: 12px;
  }
`;
export const LevelContain = styled.div`
  position: absolute;
  right: -8px;
  bottom: -8px;
  background: transparent;
  border-radius: 50%;
`;
const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;
export const WhiteLoader = styled.div`
  box-sizing: border-box;
  align-self: center;
  display: block;
  width: 30px;
  height: 30px;
  margin: 6px;
  border-width: 9px;
  border-style: solid;
  border-radius: 50%;
  border-color: white transparent transparent;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;
export const LoaderContain = styled.div`
  box-sizing: border-box;
  align-self: center;
  display: block;
  width: 30px;
  height: 30px;
  margin: 6px;
  border-width: 9px;
  border-style: solid;
  border-radius: 50%;
  border-color: #6717cd transparent transparent;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;
export const InputPhone = styled(PhoneInput)`
  select {
    position: absolute;
    z-index: 1;
    background: transparent;
    color: transparent;
    outline: none;
    border: none;
    option {
      color: black;
    }
  }
  .PhoneInputInput {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 180px;
    background: transparent;
    color: white;
    left: 65px;
    border: none;
    outline: none;
    @media (max-width: 600px) {
      font-size: 14px;
    }
    @media (max-width: 450px) {
      width: 160px;
      font-size: 12px;
      left: 48px;
    }
    @media (max-width: 355px) {
      width: 140px;
      font-size: 10px;
      left: 40px;
    }
  }
  .PhoneInputCountry {
    position: absolute;
    width: 30px;
    left: 15px;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: 450px) {
      width: 25px;
      left: 12px;
    }
    @media (max-width: 355px) {
      width: 22px;
    }
  }
`;
export const Box2 = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  border: 1px solid white;
  border-radius: 100px;
  background-color: #691eaa;
  @media (max-width: 450px) {
    height: 30px;
  }
  .separate {
    position: absolute;
    left: 55px;
    display: flex;
    height: 33px;
    width: 1px;
    background-color: white;
    line-height: 0px;
    @media (max-width: 450px) {
      left: 45px;
      height: 28px;
    }
    @media (max-width: 355px) {
      left: 38px;
    }
  }
`;
export const ProfileMainContainer = styled.div<{
  startEdit: any;
  password: any;
  star: any;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 50px;
  width: 30%;
  @media (max-width: 1023px) {
    width: 100%;
    flex-direction: column-reverse;
  }
  .crown {
    position: absolute;
    font-size: 40px;
    top: -160px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    color: #ffb715;
    @media (max-width: 1023px) {
      top: -60px;
    }
    @media (max-width: 480px) {
      top: -53px;
    }
    img {
      width: 50px;
      @media (max-width: 480px) {
        width: 38px;
      }
    }
  }
  .stars {
    z-index: 3;
    position: absolute;
    ${(props) =>
      0 <= props.star &&
      props.star <= 0.25 &&
      css`
        top: "${props.star}px";
      `}
    img {
      width: 50px;
      @media (max-width: 480px) {
        width: 38px;
      }
    }
  }
  button {
    font-size: 14px;
    font-weight: bold;
    border-radius: 100px;
    padding-block: 5px;
    width: 150px;
    &:hover {
      transform: scale(1.03);
      transition: 1s ease all;
    }
  }
  .first-text {
    text-align: center;
    @media (max-width: 1023px) {
      flex-direction: column;
      align-items: center;
      gap: 30px;
      display: flex;
      width: 80%;
      order: 2;
      justify-content: space-between;
      padding-inline: 50px;
    }

    @media (max-width: 750px) {
      padding-inline: 0;
    }
    @media (max-width: 600px) {
      width: 90%;
    }
    p {
      color: #451d71;
      font-size: 14px;
      font-weight: bold;
      line-height: 15px;
      @media (max-width: 1023px) {
        font-size: 20px;
        line-height: 20px;
      }
      @media (max-width: 750px) {
        font-size: 16px;
        line-height: 16px;
      }
      @media (max-width: 450px) {
        font-size: 12px;
        line-height: 12px;
      }
    }
    span {
      font-size: 16px;
      color: #fc8c07;
      @media (max-width: 1023px) {
        font-size: 30px;
        line-height: 50px;
      }
      @media (max-width: 750px) {
        font-size: 24px;
        line-height: 40px;
      }
      @media (max-width: 450px) {
        font-size: 18px;
        line-height: 30px;
      }
    }
    .main-text {
      display: flex;
      align-items: center;
    }
    .responsive-picture {
      display: none;
      @media (max-width: 1023px) {
        display: flex;
      }
    }
  }
  .profile-container {
    position: relative;
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    @media (max-width: 1023px) {
      flex-direction: row;
      margin-top: 0;
      width: 100%;
      justify-content: center;
    }
    .picture-container {
    }
    p {
      margin: 0;
    }
    .user-info-up {
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: ${(props) =>
        props.startEdit == false ? "#dad3e5" : "#e4b6e8"};
      padding-top: 160px;
      padding-inline: 40px;
      padding-bottom: 40px;
      border-radius: 20px 20px 0 0;

      @media (max-width: 1280px) {
        padding-inline: 30px;
      }
      @media (max-width: 1200px) {
        padding-inline: 20px;
      }
      @media (max-width: 1023px) {
        min-width: 40%;
        padding-top: 40px;
        border-radius: 20px 0 0 20px;
      }
      @media (max-width: 600px) {
        padding-block: 30px;
        padding-inline: 10px;
        justify-content: space-around;
        min-width: 45%;
      }
      .btn-edit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background-color: transparent;
        color: #441a6f;
        font-weight: 600;
        border: 1px solid #441a6f;
        @media (max-width: 600px) {
          font-size: 14px;
        }
        @media (max-width: 450px) {
          font-size: 12px;
        }
      }
      .input-contain {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
        label {
          font-size: 18px;
          font-weight: 600;
          font-family: "Montserrat", sans-serif;
          color: #441a6f;
          @media (max-width: 450px) {
            font-size: 14px;
          }
        }
        input {
          padding-inline: 20px;
          padding-block: 5px;
          font-size: 14px;
          color: #933edc;
          font-weight: 800;
          border-radius: 100px;
          border: 1px solid #933edc;
          :focus {
            outline: 1px solid #8e2de2;
          }
          @media (max-width: 600px) {
            width: 180px;
          }
          @media (max-width: 450px) {
            width: 150px;
            font-size: 12px;
          }
          @media (max-width: 400px) {
            width: 120px;
          }
        }
      }
      .name-text {
        text-align: center;
        font-size: 36px;
        line-height: 30px;
        font-weight: 800;
        color: #441a6f;
        span {
          color: #933edc;
        }
        @media (max-width: 1023px) {
          text-align: start;
        }
        @media (max-width: 700px) {
          font-size: 30px;
          line-height: 25px;
        }
        @media (max-width: 550px) {
          font-size: 26px;
          line-height: 23px;
        }
        @media (max-width: 450px) {
          font-size: 22px;
          line-height: 20px;
        }
      }
      .data-contain {
        display: flex;
        flex-direction: column;
        gap: 2px;
        p {
          margin: 0;
          font-size: 16px;
          font-weight: 800;
          width: fit-content;
          @media (max-width: 700px) {
            font-size: 14px;
          }
          @media (max-width: 550px) {
            font-size: 12px;
          }
          @media (max-width: 450px) {
            font-size: 10px;
          }
        }
        .points {
          background: linear-gradient(to right, #f9801b, #a834e4);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
        }
        .months {
          background: linear-gradient(to right, #03c799, #8b36e8);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
        }
        .certificates {
          background: linear-gradient(to right, #00a1ff, #8713ef);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
        }
      }
    }
    .user-info-down {
      display: flex;
      flex-direction: column;
      gap: 15px;
      background-color: #3f1168;
      padding: 30px;
      padding-inline: 40px;
      @media (max-width: 1280px) {
        padding-inline: 30px;
      }
      @media (max-width: 1200px) {
        padding-inline: 20px;
      }
      @media (max-width: 1023px) {
        border-radius: 0 20px 20px 0;
        min-width: 40%;
        display: ${(props) => props.password == true && "none"};
      }
      @media (max-width: 600px) {
        padding-block: 30px;
        padding-inline: 15px;
        gap: 6px;
        min-width: 45%;
      }
      border-radius: ${(props) =>
        props.password == false ? "0 0 20px 20px" : "0 0 0 0"};
      p {
        margin: 0;
      }
      .data-container {
        line-height: 15px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        @media (max-width: 600px) {
          gap: 0;
        }
        .btn-edit-container {
          display: flex;
          justify-content: center;
          padding-top: 10px;
          .btn-edit {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background-color: transparent;
            border: 1px solid white;
            color: white;
            font-weight: 500;
            padding-block: 10px;
            @media (max-width: 600px) {
              font-size: 14px;
              width: 140px;
            }
            @media (max-width: 450px) {
              font-size: 12px;
              padding-block: 5px;
              width: 125px;
            }
          }
        }
        .password-edit {
          width: 100%;
          background-color: transparent;
          border: 1px solid #ffa42c;
          color: #ffa42c;
          padding-block: 8px;
          @media (max-width: 1023px) {
            margin-top: 8px;
          }
          @media (max-width: 600px) {
            margin-top: 24px;
            font-size: 14px;
            padding-inline: 10px;
          }
          @media (max-width: 450px) {
            font-size: 12px;
          }
          @media (max-width: 450px) {
            font-size: 10px;
          }
          @media (max-width: 355px) {
            padding-inline: 0;
            padding-block: 5px;
          }
        }
        .email {
          color: white;
          font-size: 14px;
          @media (max-width: 700px) {
            font-size: 12px;
          }
          @media (max-width: 550px) {
            font-size: 10px;
          }
        }
        .email-user {
          color: white;
          font-size: 16px;
          font-weight: 700;
          word-break: break-word;
          @media (max-width: 700px) {
            font-size: 14px;
          }
          @media (max-width: 550px) {
            font-size: 12px;
          }
          @media (max-width: 450px) {
            font-size: 10px;
          }
        }
        .password {
          color: #e08510;
          font-size: 16px;
          font-weight: 700;
          @media (max-width: 700px) {
            font-size: 14px;
          }
          @media (max-width: 550px) {
            font-size: 12px;
          }
          @media (max-width: 450px) {
            font-size: 10px;
          }
        }
        .password-user {
          color: #e8c567;
          font-size: 16px;
          @media (max-width: 700px) {
            font-size: 14px;
          }
          @media (max-width: 550px) {
            font-size: 12px;
          }
          @media (max-width: 450px) {
            font-size: 10px;
          }
        }
      }
    }
    .edit-contain {
      display: flex;
      flex-direction: column;
      gap: 5px;
      background-color: #f5e2ac;
      padding: 25px;
      border-radius: 0 0 20px 20px;
      @media (max-width: 1023px) {
        min-width: 40%;
        border-radius: 0 20px 20px 0;
      }
      @media (max-width: 600px) {
        min-width: 45%;
        padding: 15px;
      }
      @media (max-width: 400px) {
        min-width: 200px;
        padding: 10px;
      }
      .input-contain {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
        gap: 5px;
        .error {
          font-size: 14px;
          position: absolute;
          bottom: -20px;
          color: red;
          font-weight: 600;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }
        .input-password {
          display: flex;
          width: 100%;
          position: relative;
          .eye {
            font-size: 25px;
            position: absolute;
            right: 10px;
            top: 40%;
            transform: translateY(-50%);
            color: #933edc;
            cursor: pointer;
            @media (max-width: 450px) {
              font-size: 20px;
            }
          }
          input {
            width: 100%;
            padding-inline: 20px;
            padding-block: 5px;
            font-size: 14px;
            color: #933edc;
            font-weight: 800;
            border-radius: 100px;
            border: 1px solid #933edc;
            background: #f1e4ce;
            :focus {
              outline: 1px solid #8e2de2;
            }
            @media (max-width: 600px) {
              font-size: 12px;
            }
            @media (max-width: 450px) {
              font-size: 10px;
            }
            ::placeholder {
              /* Chrome, Firefox, Opera, Safari 10.1+ */
              color: #933edc;
              font-weight: 500;
            }
          }
        }
        label {
          font-size: 18px;
          font-weight: 600;
          font-family: "Montserrat", sans-serif;
          color: #441a6f;
          @media (max-width: 800px) {
            font-size: 16px;
          }
          @media (max-width: 600px) {
            font-size: 14px;
          }
          @media (max-width: 450px) {
            font-size: 12px;
          }
        }
      }
    }
  }
  .btn-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 15px;
    @media (max-width: 1023px) {
      display: none;
    }
    .btn-edit {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      background-color: #933edc;
      color: white;
      font-weight: 500;
      border: none;
    }
    .btn-logout {
      color: #441a6f;
      border: 1px solid #441a6f;
    }
  }
`;
export const PictureContain = styled.div<{
  progress: number;
  reward: any;
  progressResp: number;
}>`
  display: flex;
  width: 200px;
  height: 200px;
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 1023px) {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
  }
  @media (max-width: 480px) {
    width: 135px;
    height: 135px;
  }
  .picture {
    display: none;
    input::file-selector-button {
      display: none;
    }
  }
  .edit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    cursor: pointer;
    .edit-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 40px;
      width: 70px;
      height: 70px;
      border: 2px solid white;
      border-radius: 50%;
      @media (max-width: 480px) {
        width: 50px;
        height: 50px;
        font-size: 25px;
      }
    }
    .message {
      top: 20px;
      left: 55px;
      position: absolute;
      padding-inline: 10px;
      padding-block: 5px;
      background-color: #dad3e5;
      border-radius: 100px;
      box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.2);
      @media (max-width: 480px) {
        font-size: 8px;
        top: 12px;
        left: 40px;
        padding-inline: 6px;
        padding-block: 2px;
      }
      p {
        font-size: 10px;
        margin: 0;
        white-space: nowrap;
        color: #3f1168;
        font-weight: 600;
        @media (max-width: 480px) {
          font-size: 7px;
        }
      }
    }
  }
  .circle-level {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 250px;
    height: 250px;
    @media (max-width: 480px) {
      width: 170px;
      height: 170px;
    }
    svg {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      stroke-dasharray: 755;
      z-index: 1;
      transform: rotate(-90deg);
      border-radius: 50%;
    }
    .progress-circle {
      fill: none;
      stroke: ${(props) => props.reward == 0 && "url(#gradientLevel)"}
        ${(props) => props.reward == 2 && "url(#gradientCertificate)"};
      stroke-width: 20px;
      stroke-dasharray: 755;
      stroke-dashoffset: ${(props) => props.progress};
      stroke-linecap: round;
      cx: 125px;
      cy: 125px;
      r: 120px;
      @media (max-width: 1023px) {
        stroke: ${(props) => props.reward == 0 && "url(#gradientLevelResp)"}
          ${(props) => props.reward == 2 && "url(#gradientCertificateResp)"};
      }
      @media (max-width: 480px) {
        stroke-width: 10px;
        stroke-dashoffset: ${(props) => props.progressResp};
        stroke-dasharray: 502;
        cx: 85px;
        cy: 85px;
        r: 80px;
      }
    }
    .progress-background {
      fill: none;
      stroke: #3f1168;
      stroke-width: 18px;
      stroke-dasharray: 755;
      stroke-dashoffset: 0;
      cx: 125px;
      cy: 125px;
      r: 120px;
      @media (max-width: 480px) {
        stroke-width: 10px;
        stroke-dasharray: 502;
        cx: 85px;
        cy: 85px;
        r: 80px;
      }
    }
  }
`;
export const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  right: 0;
  p {
    margin: 0;
  }
`;
export const CurveText = styled.p`
  position: absolute;
`;
export const ProfileIcon = styled.img<{ edit: any }>`
  background-repeat: no-repeat;
  border-radius: 50%;
  width: 100%;
  height: auto;
  ${(props) =>
    props.edit == true &&
    css`
      z-index: 2;
      cursor: pointer;
      filter: invert(27%) sepia(64%) saturate(2944%) hue-rotate(259deg)
        brightness(90%) contrast(90%);
    `}
`;
export const SecondContainer = styled.div`
  display: flex;
  gap: 50px;
  @media (max-width: 1380px) {
    gap: 30px;
  }
  @media (max-width: 1080px) {
    gap: 15px;
  }
  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;
export const RewardContainer = styled.div<{ reward: any }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 60%;
  @media (max-width: 1200px) {
    min-width: 420px;
  }
  @media (max-width: 1023px) {
    width: 80%;
    gap: 20px;
    min-width: 300px;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    background-color: #e4b6e8;
    border-radius: 20px;
    .reward-title-contain {
      width: 100%;
      padding: 20px;
      @media (max-width: 1023px) {
        padding-block: 15px;
      }
      p {
        text-align: center;
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        color: #942cec;
        @media (max-width: 1023px) {
          font-size: 30px;
        }
        @media (max-width: 600px) {
          font-size: 24px;
        }
        @media (max-width: 480px) {
          font-size: 20px;
        }
      }
    }
    .reward-containers {
      border-radius: 20px;
      ${(props) =>
        props.reward == 0 &&
        css`
          background: linear-gradient(135deg, #9a2fea 10%, #fd8608 100%);
        `}
      ${(props) =>
        props.reward == 2 &&
        css`
          background: linear-gradient(60deg, #8f0bee 10%, #059cfe 100%);
        `}
      .extra-info {
        padding-block: 25px;
        display: flex;
        justify-content: center;
        p {
          margin: 0;
          color: white;
          font-weight: 600;
          @media (max-width: 1200px) {
            font-size: 14px;
          }
          @media (max-width: 1023px) {
            font-size: 18px;
          }
          @media (max-width: 600px) {
            font-size: 15px;
          }
          @media (max-width: 480px) {
            font-size: 12px;
          }
          span {
            color: #fedd67;
          }
        }
      }
      .reward-conditions {
        display: flex;
        border-radius: 20px 20px 0 0;
        p {
          margin: 0;
          font-weight: 600;
        }
        span {
          font-weight: 800;
        }
        .bottom-contain {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #942cec;
          font-size: 40px;
          @media (max-width: 1200px) {
            font-size: 30px;
          }
          @media (max-width: 480px) {
            font-size: 26px;
          }
        }
        .point-container {
          cursor: pointer;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 33.33%;
          padding-block: 15px;
          @media (max-width: 700px) {
            gap: 10px;
          }
          ${(props) =>
            props.reward == 0 &&
            css`
              border-radius: 20px 20px 0 0;
            `}
          ${(props) =>
            props.reward != 0 &&
            css`
              background-color: #e6c4ea;
            `}
          p {
            color: #3f1168;
            line-height: 18px;
            @media (max-width: 1200px) {
              font-size: 14px;
            }
            @media (max-width: 1023px) {
              font-size: 18px;
              line-height: 20px;
            }
            @media (max-width: 700px) {
              font-size: 14px;
              line-height: 18px;
            }
            @media (max-width: 480px) {
              font-size: 11px;
              line-height: 14px;
            }
            ${(props) =>
              props.reward == 0 &&
              css`
                color: white;
              `}
          }

          .point-number {
            color: #942cec;
            font-size: 36px;
            @media (max-width: 1200px) {
              font-size: 30px;
            }
            ${(props) =>
              props.reward == 0 &&
              css`
                color: white;
              `}
          }
          .point-data {
            width: 565.05px;
          }
        }
        .time-container {
          height: fit-content;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 20px;
          background-color: #de94e1;
          padding-block: 15px;
          width: 33.34%;
          @media (max-width: 700px) {
            gap: 10px;
          }
          ${(props) =>
            props.reward == 0 &&
            css`
              border-radius: 0 0 0 20px;
            `}
          ${(props) =>
            props.reward == 2 &&
            css`
              border-radius: 0 0 20px 0;
            `}
          p {
            color: #3f1168;
            line-height: 18px;
            @media (max-width: 1200px) {
              font-size: 14px;
            }
            @media (max-width: 1023px) {
              font-size: 18px;
              line-height: 20px;
            }
            @media (max-width: 700px) {
              font-size: 14px;
              line-height: 18px;
            }
            @media (max-width: 480px) {
              font-size: 11px;
              line-height: 14px;
            }
            ${(props) =>
              props.reward == 1 &&
              css`
                color: white;
              `}
          }
          .time-number {
            color: #942cec;
            font-size: 36px;
            ${(props) =>
              props.reward == 1 &&
              css`
                color: white;
              `}
            @media (max-width: 1200px) {
              font-size: 30px;
            }
          }
        }
      }
      .certificates-container {
        cursor: pointer;
        height: 144px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-block: 15px;
        width: 33.33%;
        @media (max-width: 1200px) {
          height: 134px;
        }
        @media (max-width: 1023px) {
          height: 140px;
        }
        @media (max-width: 700px) {
          height: 124px;
        }
        @media (max-width: 480px) {
          height: 108px;
        }
        ${(props) =>
          props.reward != 2 &&
          css`
            background-color: #e6c4ea;
          `}
        p {
          color: #3f1168;
          line-height: 18px;
          @media (max-width: 1200px) {
            font-size: 14px;
          }
          @media (max-width: 1023px) {
            font-size: 18px;
            line-height: 20px;
          }
          @media (max-width: 700px) {
            font-size: 14px;
            line-height: 18px;
          }
          @media (max-width: 480px) {
            font-size: 11px;
            line-height: 14px;
          }
          ${(props) =>
            props.reward == 2 &&
            css`
              color: white;
            `}
        }
        .certificate-number {
          color: #942cec;
          font-size: 36px;
          ${(props) =>
            props.reward == 2 &&
            css`
              color: white;
            `}
          @media (max-width: 1200px) {
            font-size: 30px;
          }
          @media (max-width: 480px) {
            font-size: 26px;
          }
        }
      }
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding-block: 15px;
    border-radius: 100px;
    border: none;
    background: #3f1168;
    font-size: 20px;
    color: white;
    font-weight: 600;
    span {
      color: #ffdd67;
    }
    &:hover {
      transform: scale(1.03);
      transition: 1s ease all;
    }
    @media (max-width: 480px) {
      padding-block: 12px;
      font-size: 16px;
    }
    @media (max-width: 480px) {
      padding-block: 10px;
      font-size: 14px;
    }
  }
`;
export const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  @media (max-width: 1200px) {
    min-width: 260px;
  }
  @media (max-width: 1023px) {
    width: 80%;
    min-width: 300px;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
  min-width: 320px;
  .first-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 20px 20px 0 0;
    background-color: #f2e4c8;
    height: 65%;
    padding-block: 20px;
    padding-inline: 30px;
    @media (max-width: 1200px) {
      padding-inline: 20px;
    }
    @media (max-width: 1023px) {
      padding-left: 10%;
    }
    p {
      font-size: 16px;
      color: #942ced;
      font-weight: 600;
      margin: 0;
      @media (max-width: 1200px) {
        font-size: 14px;
      }
    }
    .main-title {
      font-size: 26px;
      @media (max-width: 1200px) {
        font-size: 22px;
      }
    }
    .subscription-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .text-1 {
        color: #3f1168;
      }
      .subscription-info {
        padding-left: 30px;
        p {
          font-size: 18px;
          font-weight: 800;
          .span {
            color: #3f1168;
          }
          @media (max-width: 1200px) {
            font-size: 16px;
          }
        }
      }
    }
  }
  .second-section {
    border-radius: 0 0 20px 20px;
    background-color: #f8e097;
    height: 35%;
    padding-block: 15px;
    padding-inline: 30px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    @media (max-width: 1200px) {
      padding-inline: 20px;
    }
    @media (max-width: 1023px) {
      padding-left: 10%;
    }
    p {
      margin: 0;
    }
    .first-text {
      background: linear-gradient(to right, #942ced, #f9901b, #942ced);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      width: fit-content;
    }
    .second-text {
      font-size: 30px;
      color: #942ced;
      line-height: 25px;
      font-weight: 600;
      @media (max-width: 1200px) {
        font-size: 26px;
      }
    }
    .third-text {
      font-size: 18px;
      color: #3f1168;
      font-weight: 600;
      line-height: 20px;
      @media (max-width: 1200px) {
        font-size: 16px;
      }
    }
  }
`;

export const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  min-width: 320px;
  width: 40%;
  background-color: #dad3e5;
  padding: 20px;
  border-radius: 20px;
  height: fit-content;
  @media (max-width: 1200px) {
    min-width: 260px;
    padding-inline: 15px;
  }
  @media (max-width: 1023px) {
    width: 100%;
    border-radius: 0;
    gap: 30px;
  }
  @media (max-width: 700px) {
    gap: 20px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
  p {
    margin: 0;
  }
  .title {
    font-size: 24px;
    font-weight: 800;
    color: #942ced;
    @media (max-width: 1200px) {
      font-size: 22px;
    }
    @media (max-width: 1023px) {
      font-size: 26px;
    }
    @media (max-width: 700px) {
      font-size: 22px;
    }
  }
  .history-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #942ced;
    @media (max-width: 1023px) {
      gap: 50px;
      padding-inline: 30px;
    }
    @media (max-width: 700px) {
      gap: 30px;
      padding-inline: 10px;
    }
    @media (max-width: 480px) {
      gap: 10px;
      padding-inline: 0;
    }
    .history-data {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 100%;
      .history-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        p {
          font-size: 14px;
          font-weight: 600;
          color: #3f1479;
          @media (max-width: 1200px) {
            font-size: 12px;
          }
          @media (max-width: 1023px) {
            font-size: 20px;
          }
          @media (max-width: 700px) {
            font-size: 16px;
          }
          @media (max-width: 480px) {
            font-size: 12px;
          }
        }
        .second-info {
          width: 84px;
          word-break: break-all;
          @media (max-width: 1200px) {
            width: 70px;
          }
          @media (max-width: 1023px) {
            width: 120px;
          }
          @media (max-width: 700px) {
            width: 98px;
          }
          @media (max-width: 480px) {
            width: 70px;
          }
        }
      }
      .line {
        border-radius: 100px;
        width: 100%;
        height: 1px;
        background-color: #3f1479;
      }
    }
  }
  .dots {
    display: flex;
    margin-top: 20px;
    gap: 10px;
    .option-dot {
      cursor: pointer;
      display: flex;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      @media (max-width: 1023px) {
        height: 10px;
        width: 10px;
      }
    }
  }
`;
export const PaymentMethodContainer = styled.div<{ add: any }>`
  min-width: 60%;
  @media (max-width: 1200px) {
    min-width: 420px;
    max-width: 420px;
  }
  @media (max-width: 1023px) {
    width: 80%;
    min-width: 300px;
    max-width: 800px;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
  p {
    margin: 0;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #d2aff0;
    padding: 30px;
    border-radius: ${(props) =>
      props.add == false ? "20px" : "20px 20px 0 0"};
    font-family: "Montserrat", sans-serif;
    @media (max-width: 1260px) {
      padding: 20px;
    }
    @media (max-width: 600px) {
      padding-block: 20px;
      padding-inline: 15px;
    }
    .edit-button {
      display: flex;
      justify-content: center;
      button {
        font-size: 16px;
        font-weight: bold;
        color: white;
        background-color: #942ced;
        border-radius: 100px;
        padding-block: 5px;
        padding-inline: 30px;
        border: none;
        &:hover {
          transform: scale(1.03);
          transition: 1s ease all;
        }
      }
    }
    // .edit-mode {
    //   display: flex;
    //   align-items: center;
    //   gap: 10px;
    //   .info {
    //     p {
    //       font-size: 16px;
    //       font-weight: 600;
    //       color: #3f1168;
    //     }
    //     input {
    //       width: 100%;
    //       border-radius: 100px;
    //       border: 1px solid #942ced;
    //       background: transparent;
    //       color: #942ced;
    //       padding-block: 5px;
    //       padding-inline: 20px;
    //       :focus {
    //         outline: 2px solid #942ced;
    //       }
    //       ::placeholder {
    //         color: #942ced;
    //         opacity: 0.7;
    //       }
    //     }
    //     display: flex;
    //     width: 100%;
    //     justify-content: space-between;
    //     .date {
    //       display: flex;
    //       flex-direction: column;
    //       gap: 10px;
    //       .inputs {
    //         display: flex;
    //         gap: 20px;
    //       }
    //     }
    //     .date-inputs {
    //       width: 90px;
    //     }
    //   }
    // }
    .title {
      font-size: 24px;
      font-weight: 800;
      color: #942ced;
      margin-bottom: 10px;
    }
    .card-contain {
      display: flex;
      align-items: center;
      gap: 10px;
      .card {
        align-items: center;
        width: 100%;
        border-radius: 100px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #3f1168;
        padding-block: 5px;
        padding-inline: 20px;
        cursor: pointer;
        @media (max-width: 1300) {
          padding-right: 10px;
        }
        &:hover {
          transform: scale(1.03);
          transition: 0.2s ease all;
        }
        .star {
          color: yellow;
          font-size: 18px;
        }
        .separate {
          position: absolute;
          display: flex;
          height: 46px;
          left: 90px;
          width: 1px;
          background-color: #942ced;
          line-height: 0px;
        }
        input {
          width: fit-content;
          background: transparent;
          color: white;
          padding-block: 5px;
          padding-left: 20px;
          border: none;
          color: #942ced;
          font-weight: 600;
          :focus {
            outline: none;
          }
          ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #942ced;
            opacity: 0.7;
          }
        }
        .text-card {
          font-size: 16px;
          color: white;
          @media (max-width: 1300px) {
            font-size: 12px;
          }
          @media (max-width: 1023px) {
            font-size: 18px;
          }
          @media (max-width: 750px) {
            font-size: 15px;
          }
          @media (max-width: 650px) {
            font-size: 12px;
          }
          @media (max-width: 480px) {
            font-size: 10px;
          }
        }
        .last-digits {
          color: white;
          font-weight: 600;
        }
        .last-4 {
          font-weight: 600;
          color: #ffdd67;
        }
      }
      .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 45px;
        min-height: 45px;
        border-radius: 50%;
        border: 2px solid #942ced;
        font-size: 20px;
        color: #942ced;
        cursor: pointer;
        &:hover {
          transform: scale(1.03);
          border: 3px solid red;
          color: red;
          transition: 1s ease all;
        }
      }
    }
    .bottom-contain {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: #942ced;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      margin-top: 20px;
      @media (max-width: 480px) {
        gap: 5px;
        font-size: 16px;
      }
      @media (max-width: 370px) {
        font-size: 14px;
      }
      p {
        font-size: 16px;
        span {
          font-weight: 600;
        }
        @media (max-width: 480px) {
          font-size: 12px;
        }
        @media (max-width: 370px) {
          font-size: 10px;
        }
      }
    }
  }

  .new-card {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-block: 30px;
    padding-inline: 25px;
    background-color: #942ced;
    border-radius: 0 0 20px 20px;
    @media (max-width: 1260px) {
      padding: 20px;
    }
    .button-contain {
      display: flex;
      justify-content: center;
      button {
        font-size: 16px;
        font-weight: bold;
        color: #942ced;
        border-radius: 100px;
        padding-block: 5px;
        padding-inline: 30px;
        border: none;
        &:hover {
          transform: scale(1.03);
          transition: 1s ease all;
        }
        @media (max-width: 700px) {
          font-size: 14px;
        }
      }
    }
    .main-title {
      font-size: 16px;
      color: #ffdd69;
      span {
        font-weight: 600;
      }
      @media (max-width: 700px) {
        font-size: 14px;
      }
    }
    .container-2 {
      display: flex;
      flex-direction: column;
      gap: 10px;
      p {
        color: white;
        font-weight: 600;
      }
      input {
        width: 100%;
        border-radius: 100px;
        border: 1px solid white;
        background: transparent;
        color: white;
        padding-block: 5px;
        padding-inline: 20px;
        :focus {
          outline: 2px solid white;
        }
        ::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: white;
          opacity: 0.7;
        }
      }
      .card-input {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        @media (max-width: 700px) {
          font-size: 14px;
        }
        @media (max-width: 480px) {
          font-size: 12;
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        .date {
          display: flex;
          flex-direction: column;
          gap: 10px;
          @media (max-width: 700px) {
            font-size: 14px;
          }
          @media (max-width: 480px) {
            font-size: 12px;
          }
          .inputs {
            display: flex;
            gap: 20px;
            @media (max-width: 480px) {
              gap: 10px;
            }
          }
        }
        .date-inputs {
          width: 90px;
          @media (max-width: 480px) {
            width: 70px;
          }
        }
      }
    }
  }
`;
export const InputCard = styled(ReactInputMask)`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  padding: 10px 0 10px 20px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  outline: none;
  :focus {
    border: 2px solid #8e2de2;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
