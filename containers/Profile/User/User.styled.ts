import PhoneInput from "react-phone-number-input";

import styled, { css, keyframes } from "styled-components";

export const BackgroundProfile = styled.div`
  width: 100%;
  display: flex;
  background-color: #ede7f2;
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
    gap: 40px;
    align-items: center;
  }
  @media (max-height: 881px) {
    height: 100%;
  }
`;
export const SecondBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 40px;
  width: 70%;
  height: 100%;
  margin-top: 38px;
  .title-contain {
    display: flex;
    flex-direction: column;
    p {
      margin: 0;
      line-height: 60px;
    }
    .first-text {
      font-size: 36px;
      color: #3f1168;
      letter-spacing: 5px;
      span {
        font-weight: 600;
        color: #d244d1;
      }
    }
    .second-text {
      color: #3f1168;
      font-size: 42px;
      font-weight: 800;
      span {
        color: #942ced;
      }
    }
  }
`;
export const ThirdBox = styled.div`
  display: flex;
  gap: 50px;
  @media (max-width: 1023px) {
    flex-wrap: wrap;
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
  height: 32px;
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
  width: 59px;
  height: 33px;
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
    width: 40px;
    height: 27px;
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
    width: 200px;
    left: 80px;
    border: none;
    outline: none;
    @media (max-width: 400px) {
      width: 150px;
      font-size: 14px;
    }
  }
  .PhoneInputCountry {
    position: absolute;
    width: 40px;
    left: 30px;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
  }
`;
export const Box2 = styled.div`
  position: relative;
  width: 100%;
  border-radius: 100px;
  border: 1px solid #6717cd;
  height: 40px;
`;
export const ProfileMainContainer = styled.div<{
  startEdit: any;
  password: any;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 50px;
  width: 30%;
  .crown {
    position: absolute;
    font-size: 40px;
    top: -160px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    color: #ffb715;
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
    p {
      color: #451d71;
      font-size: 14px;
      font-weight: bold;
      line-height: 15px;
    }
    span {
      font-size: 16px;
      color: #fc8c07;
    }
  }
  .profile-container {
    position: relative;
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    width: 320px;
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
      .input-contain {
        display: flex;
        flex-direction: column;
        gap: 5px;
        label {
          font-size: 18px;
          font-weight: 600;
          font-family: "Montserrat", sans-serif;
          color: #441a6f;
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
      }
      .data-contain {
        display: flex;
        flex-direction: column;
        gap: 2px;
        p {
          margin: 0;
          font-size: 18px;
          font-weight: 800;
          width: fit-content;
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
      border-radius: ${(props) =>
        props.password == false ? "0 0 20px 20px" : "0 0 0 0"};
      p {
        margin: 0;
      }
      .data-container {
        line-height: 15px;
        .password-edit {
          width: 100%;
          background-color: transparent;
          border: 1px solid #ffa42c;
          color: #ffa42c;
          padding-block: 8px;
        }
        .email {
          color: white;
          font-size: 12px;
        }
        .email-user {
          color: white;
          font-size: 16px;
          font-weight: 700;
        }
        .password {
          color: #e08510;
          font-size: 16px;
          font-weight: 700;
        }
        .password-user {
          color: #e8c567;
          font-size: 16px;
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
      .input-contain {
        display: flex;
        flex-direction: column;
        gap: 5px;
        label {
          font-size: 18px;
          font-weight: 600;
          font-family: "Montserrat", sans-serif;
          color: #441a6f;
        }
        input {
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
          ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #933edc;
            font-weight: 500;
          }
        }
      }
    }
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
`;
export const PictureContain = styled.div<{ progress: number; reward: any }>`
  display: flex;
  width: 200px;
  height: 200px;
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  .circle-level {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 250px;
    height: 250px;
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
    }
  }
`;
export const ProfileIcon = styled.img`
  background-repeat: no-repeat;
  border-radius: 50%;
  width: 100%;
  height: auto;
`;
export const SecondContainer = styled.div`
  display: flex;
  gap: 50px;
`;
export const RewardContainer = styled.div<{ reward: any }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  .main-container {
    display: flex;
    flex-direction: column;
    background-color: #e4b6e8;
    border-radius: 20px;
    .extra-info {
      padding: 30px;
    }
    .reward-title-contain {
      width: 100%;
      padding: 20px;
      p {
        text-align: center;
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        color: #942cec;
      }
    }
    .reward-conditions {
      background-color: #de94e1;
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
      }

      .point-container {
        cursor: pointer;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        background-color: #e6c4ea;
        width: 33.33%;
        padding-block: 15px;
        padding-inline: 25px;
        border-radius: 20px;
        ${(props) =>
          props.reward == 0 &&
          css`
            background: linear-gradient(135deg, #9a2fea 0%, #fd8608 100%);
            border-radius: 20px 20px 0 0;
          `}
        p {
          color: #3f1168;
          line-height: 18px;
          ${(props) =>
            props.reward == 0 &&
            css`
              color: white;
            `}
        }

        .point-number {
          color: #942cec;
          font-size: 36px;
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
        cursor: pointer;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        background-color: #de94e1;
        padding-block: 15px;
        padding-inline: 25px;
        width: 33.34%;
        p {
          color: #3f1168;
          line-height: 18px;
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
        }
      }
      .certificates-container {
        cursor: pointer;
        height: 143.96px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #e6c4ea;
        padding-block: 15px;

        padding-inline: 25px;
        width: 33.33%;
        p {
          color: #3f1168;
          line-height: 18px;
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
  }
`;
export const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  .first-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 20px 20px 0 0;
    background-color: #f2e4c8;
    height: 65%;
    padding: 30px;
    p {
      font-size: 16px;
      color: #942ced;
      font-weight: 600;
      margin: 0;
    }
    .main-title {
      font-size: 26px;
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
    }
    .third-text {
      font-size: 18px;
      color: #3f1168;
      font-weight: 600;
      line-height: 20px;
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
  width: 40%;
  background-color: #dad3e5;
  padding: 30px;
  border-radius: 20px;
  height: fit-content;
  p {
    margin: 0;
  }
  .title {
    font-size: 24px;
    font-weight: 800;
    color: #942ced;
  }
  .history-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #942ced;
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
        }
        .second-info {
          width: 84px;
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
    }
  }
`;
export const PaymentMethodContainer = styled.div<{ add: any }>`
  width: 60%;
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
    .edit-mode {
      display: flex;
      align-items: center;
      gap: 10px;
      .info {
        p {
          font-size: 16px;
          font-weight: 600;
          color: #3f1168;
        }
        input {
          width: 100%;
          border-radius: 100px;
          border: 1px solid #942ced;
          background: transparent;
          color: #942ced;
          padding-block: 5px;
          padding-inline: 20px;
          :focus {
            outline: 2px solid #942ced;
          }
          ::placeholder {
            color: #942ced;
            opacity: 0.7;
          }
        }
        display: flex;
        width: 100%;
        justify-content: space-between;
        .date {
          display: flex;
          flex-direction: column;
          gap: 10px;
          .inputs {
            display: flex;
            gap: 20px;
          }
        }
        .date-inputs {
          width: 90px;
        }
      }
    }
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
        gap: 3%;
        background-color: #3f1168;
        padding-block: 5px;
        padding-inline: 20px;
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
      p {
        font-size: 16px;
        span {
          font-weight: 600;
        }
      }
    }
  }

  .new-card {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-block: 30px;
    padding-inline: 10%;
    background-color: #942ced;
    border-radius: 0 0 20px 20px;
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
      }
    }
    .main-title {
      font-size: 16px;
      color: #ffdd69;
      span {
        font-weight: 600;
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
      }
      .info {
        display: flex;
        justify-content: space-between;
        .date {
          display: flex;
          flex-direction: column;
          gap: 10px;
          .inputs {
            display: flex;
            gap: 20px;
          }
        }
        .date-inputs {
          width: 90px;
        }
      }
    }
  }
`;
