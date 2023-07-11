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
    width: 100%;
    @media (max-width: 1023px) {
      width: 82%;
    }
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
    p,
    h1 {
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
  transition: max-height 200ms ease;
  display: flex;
  padding-right: 30px;
  gap: 8%;
  font-weight: 500;
  font-size: large;
  line-height: 90%;
  max-heigth: 100%;
  .dialog {
    padding: 15%;
    max-width: 65%;
    width: 100%;
    text-align: center;
    border-radius: 30px;
    z-index: 100;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #dad3e5;
    padding: 50px;
    box-shadow: 0px 12px 15px rgba(0, 0, 0, 0.5);
    .sangria {
      margin-left: 15%;
      margin-right: 15%;
    }
    .sangria-y {
      margin-top: 5%;
      margin-bottom: 5%;
    }
    .purple {
      color: #a556eb;
    }
    .green {
      color: #29c784;
    }
    .blue {
      color: #1b7beb;
    }
    .orange {
      color: #f88114;
    }
    ul {
      margin-left: 12%;
      margin-right: 12%;
      text-align: justify;
    }
    .p-li {
      list-style: none;
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: medium;
    }
  }
  .dimScreen {
    z-index: 99;
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(222, 215, 232, 0.5);
  }
  .space-bt {
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin-right: 15px;
    }
  }
  .exit {
    position: absolute;
    right: 0;
    padding-right: 5%;
    .ex-icon {
      cursor: pointer;
    }
  }
  .buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    button {
      font-weight: 500;
      font-size: x-small !important;
      max-height: min-content;
      width: 25%;
      margin-left: 5%;
      margin-right: 5%;
      border: none;
      padding-block: 5px;
      border-radius: 30px;
      color: #fff;
    }
    .left {
      color: black;
      background: #ede7f2;
    }
    .right {
      background: #478ee1;
    }
  }
  h2 {
    color: #3f1168;
    font-weight: 700;
    margin: 15px;
  }
  @media (max-width: 1500px) {
    gap: 50px;
  }
  @media (max-width: 1380px) {
    gap: 30px;
  }
  @media (max-width: 1200px) {
    padding-right: 0;
  }
  @media (max-width: 1080px) {
    gap: 15px;
  }
  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 30px;
    align-items: center;
    width: 100%;
    .dialog {
      padding-inline: 20px;
      max-width: 90%;
    }
  }
  @media (max-width: 630px) {
    .dialog {
      h2 {
        font-size: 16px;
      }
      .sangria {
        margin-inline: 2%;
      }
      p {
        font-size: 12px;
      }
      ul {
        margin-inline: 2%;
        padding-left: 0;
        .space-bt {
          flex-direction: column;
          .p-li {
            font-size: 12px;
          }
        }
      }
      .buttons {
        flex-direction: column;
        align-items: center;
        button {
          width: 200px;
          height: 43px;
        }
      }
    }
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
export const PayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const CardIconResp = styled.div`
  width: fit-content;
  img {
    width: 40px;
    @media (max-width: 750px) {
      width: 40px;
    }
    @media (max-width: 650px) {
      width: 35px;
    }
  }
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

export const DataTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 20px;
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
    opacity: 0;
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
      font-size: 11px;
      left: 45px;
    }
    @media (max-width: 400px) {
      width: 140px;
      font-size: 10px;
      left: 38px;
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
    @media (max-width: 400px) {
      width: 20px;
      top: 46%;
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
      left: 42px;
      height: 28px;
    }
    @media (max-width: 400px) {
      left: 36px;
    }
  }
`;
export const ProfileMainContainer = styled.div<{
  startEdit: any;
  password: any;
  star: any;
  coordinates: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  gap: 50px;
  width: 30%;
  @media (max-width: 1023px) {
    padding-top: 20px;
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
    @media (max-width: 1023px) {
      top: -60px;
    }
    img {
      width: 50px;
    }
  }
  .stars {
    z-index: 3;
    position: absolute;
    transform: rotate(-170deg);
    width: 40px;
    height: 40px;
    ${(props) =>
      0 <= props.star &&
      props.star < 0.125 &&
      css`
        top: ${50 * props.coordinates - 30}px;
        left: ${120 + 50 * props.coordinates}px;
      `}
    ${(props) =>
      0.125 <= props.star &&
      props.star < 0.25 &&
      css`
        top: ${20 + 60 * props.coordinates}px;
        left: ${170 + 30 * props.coordinates}px;
      `}
    ${(props) =>
      0.25 <= props.star &&
      props.star < 0.375 &&
      css`
        top: ${80 + 70 * props.coordinates}px;
        left: ${200 - 30 * props.coordinates}px;
      `}
      ${(props) =>
      0.375 <= props.star &&
      props.star < 0.5 &&
      css`
        top: ${150 + 50 * props.coordinates}px;
        left: ${170 - 90 * props.coordinates}px;
      `}
    ${(props) =>
      0.5 <= props.star &&
      props.star < 0.625 &&
      css`
        top: ${200 - 50 * props.coordinates}px;
        left: ${80 - 90 * props.coordinates}px;
      `}
      ${(props) =>
      0.625 <= props.star &&
      props.star < 0.75 &&
      css`
        top: ${150 - 70 * props.coordinates}px;
        left: ${-30 * props.coordinates - 10}px;
      `}
        ${(props) =>
      0.75 <= props.star &&
      props.star <= 0.875 &&
      css`
        top: ${80 - 70 * props.coordinates}px;
        left: ${-30 * props.coordinates - 40}px;
      `}
      ${(props) =>
      0.875 <= props.star &&
      props.star <= 1 &&
      css`
        top: ${10 - 40 * props.coordinates}px;
        left: ${130 * props.coordinates - 10}px;
      `}
    img {
      transform: rotate(${(props) => props.star * 360}deg);
      width: 40px;
      @media (max-width: 480px) {
        width: 30px;
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
    }
    .main-text {
      display: flex;
      align-items: center;
      .time-reward {
        color: #1bb87f;
      }
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
      padding-block: 40px;
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
        padding: 30px;
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
          @media (max-width: 400px) {
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
      padding-block: 40px;
      padding-inline: 25px;
      border-radius: 0 0 20px 20px;
      @media (max-width: 1023px) {
        padding: 25px;
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
          bottom: -40px;
          color: red;
          font-weight: 600;
          text-align: center;
          width: 200px;
          white-space: break-spaces;
          left: 50%;
          transform: translateX(-50%);
          @media (max-width: 1023px) {
            bottom: -50px;
          }
          @media (max-width: 450px) {
            font-size: 12px;
          }
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
          font-size: 16px;
          font-weight: 600;
          font-family: "Montserrat", sans-serif;
          color: #441a6f;
          @media (max-width: 800px) {
            font-size: 14px;
          }
          @media (max-width: 600px) {
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
  timeProgress: number;
  certificateProgress: number;
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
      p {
        font-size: 10px;
        margin: 0;
        white-space: nowrap;
        color: #3f1168;
        font-weight: 600;
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
        ${(props) => props.reward == 1 && "url(#gradientTime)"}
        ${(props) => props.reward == 2 && "url(#gradientCertificate)"};
      stroke-width: 20px;
      stroke-dasharray: 755;
      ${(props) =>
        props.reward == 0 &&
        css<{ progress: number }>`
          stroke-dashoffset: ${(props) => props.progress};
        `}
      ${(props) =>
        props.reward == 1 &&
        css<{ timeProgress: number }>`
          stroke-dashoffset: ${(props) => props.timeProgress};
        `}
        ${(props) =>
        props.reward == 2 &&
        css<{ certificateProgress: number }>`
          stroke-dashoffset: ${(props) => props.certificateProgress};
        `}
      stroke-linecap: round;
      cx: 125px;
      cy: 125px;
      r: 120px;
      @media (max-width: 1023px) {
        stroke: ${(props) => props.reward == 0 && "url(#gradientLevelResp)"}
          ${(props) => props.reward == 1 && "url(#gradientTimeResp)"}
          ${(props) => props.reward == 2 && "url(#gradientCertificateResp)"};
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
    }
  }
`;
export const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 200px;
  z-index: 5;
  bottom: -50px;
  right: -100px;
  p {
    margin: 0;
  }
`;
export const CurveText = styled.h1<{ index: number }>`
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
export const RewardContainer = styled.div<{ reward: any }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 60%;
  gap: 20px;
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
          background: linear-gradient(
            135deg,
            #9a2fea 10%,
            #d244d1 50%,
            #fd8608 100%
          );
        `}
      ${(props) =>
        props.reward == 1 &&
        css`
          background: linear-gradient(135deg, #9a2fea 10%, #1beb00 100%);
        `}
      ${(props) =>
        props.reward == 2 &&
        css`
          background: linear-gradient(60deg, #8f0bee 10%, #059cfe 100%);
        `}
      .extra-info {
        padding-block: 25px;
        padding-inline: 10px;
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
        .point-container::before {
          content: "";
          position: absolute;
          background-color: transparent;
          border-top-left-radius: 21px;
          height: 42px;
          width: 24px;
          ${(props) =>
            props.reward == 0 &&
            css`
              top: -9px;
              right: 7px;
              transform: rotate(90deg);
              box-shadow: 0 -25px 0 0 #de94e1;
            `}
          ${(props) =>
            props.reward == 1 &&
            css`
              bottom: -42px;
              left: 0;
              transform: rotate(0deg);
              box-shadow: 0 -25px 0 0 #e6c4ea;
            `}
          ${(props) =>
            props.reward == 2 &&
            css`
              top: 144px;
              left: 0;
              box-shadow: 0 -25px 0 0 #e6c4ea;
              @media (max-width: 1200px) {
                top: 134px;
              }
              @media (max-width: 1023px) {
                top: 140px;
              }
              @media (max-width: 700px) {
                top: 124px;
              }
              @media (max-width: 480px) {
                top: 108px;
              }
            `}
        }

        ${(props) =>
          props.reward == 1 &&
          css`
            .time-container::before {
              content: "";
              position: absolute;
              background-color: transparent;
              border-top-left-radius: 21px;
              height: 19px;
              width: 42px;
              top: 0px;
              left: 0px;
              transform: rotate(0deg) scaleY(1);
              box-shadow: -25px 0 0 0 #e6c4ea;
            }
            .time-container::after {
              content: "";
              position: absolute;
              background-color: transparent;
              border-top-left-radius: 21px;
              height: 42px;
              width: 24px;
              top: -9px;
              right: 9px;
              transform: rotate(90deg) scaleY(1);
              box-shadow: 0 -25px 0 0 #e6c4ea;
            }
          `}

        .certificates-container::before {
          content: "";
          position: absolute;
          background-color: transparent;
          border-top-left-radius: 21px;
          height: 44px;
          width: 24px;
          ${(props) =>
            props.reward == 0 &&
            css`
              top: 144px;
              right: 0px;
              transform: rotate(180deg) scaleY(-1);
              box-shadow: 0 -25px 0 0 #e6c4ea;
              @media (max-width: 1200px) {
                top: 134px;
              }
              @media (max-width: 1023px) {
                top: 140px;
              }
              @media (max-width: 700px) {
                top: 124px;
              }
              @media (max-width: 480px) {
                top: 108px;
              }
            `}
          ${(props) =>
            props.reward == 1 &&
            css`
              bottom: -44px;
              right: 0;
              transform: rotate(180deg) scaleY(-1);
              box-shadow: 0 -25px 0 0 #e6c4ea;
            `}
          ${(props) =>
            props.reward == 2 &&
            css`
              top: -10px;
              left: 10px;
              transform: rotate(90deg) scaleY(-1);
              box-shadow: 0 -25px 0 0 #de94e1;
            `}
        }
        .point-container {
          position: relative;
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
            props.reward == 1 &&
            css`
              border-radius: 0 0 20px 0;
            `}
          ${(props) =>
            props.reward != 0 &&
            css`
              background-color: #e6c4ea;
            `}
          .first-word {
            color: #e86bff;
          }
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
          position: relative;
          height: fit-content;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 20px;
          padding-block: 15px;
          width: 33.34%;
          cursor: pointer;
          @media (max-width: 700px) {
            gap: 10px;
          }
          ${(props) =>
            props.reward != 1 &&
            css`
              background-color: #de94e1;
            `}
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
          .first-word {
            color: #cb61df;
          }
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
        position: relative;
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
        ${(props) =>
          props.reward == 1 &&
          css`
            border-radius: 0 0 0 20px;
          `}
        .first-word {
          color: #9530a8;
        }
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
  position: relative;
  button {
    margin-bottom: 20px;
    background: #3f1168;
    border: none;
    color: #f2e4c8;
    border-radius: 20px;
  }
  .img-hand {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 120px;
    @media (max-width: 1500px) {
      width: 100px;
    }
    @media (max-width: 1150px) {
      width: 90px;
    }
    @media (max-width: 1065px) {
      width: 80px;
    }
    @media (max-width: 1023px) {
      width: 140px;
    }
    @media (max-width: 600px) {
      width: 120px;
    }
    img {
      width: 120px;
      @media (max-width: 1500px) {
        width: 100px;
      }
      @media (max-width: 1023px) {
        width: 160px;
        right: 20px;
      }
      @media (max-width: 600px) {
        width: 130px;
      }
    }
  }
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
      font-size: 26px;
      color: #942ced;
      line-height: 25px;
      font-weight: 600;
      @media (max-width: 1150px) {
        font-size: 24px;
      }
      @media (max-width: 1065px) {
        font-size: 22px;
      }
      @media (max-width: 1023px) {
        font-size: 30px;
      }
      @media (max-width: 600px) {
        font-size: 24px;
      }
    }
    .third-text {
      font-size: 16px;
      color: #3f1168;
      font-weight: 600;
      line-height: 20px;
      @media (max-width: 1150px) {
        font-size: 14px;
      }
      @media (max-width: 1065px) {
        font-size: 12px;
      }
      @media (max-width: 1023px) {
        font-size: 18px;
      }
      @media (max-width: 600px) {
        width: 200px;
        font-size: 14px;
      }
    }
  }
`;

export const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
export const HistoryContainer = styled.div<{ addPayment: any }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  min-width: 320px;
  width: 40%;
  background-color: #dad3e5;
  padding: 20px;
  border-radius: 20px;
  ${(props) =>
    props.addPayment == true &&
    css`
      height: fit-content;
      .dots {
        margin-top: 20px;
      }
    `}
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
    margin-top: auto;
    gap: 10px;
    ${(props) =>
      props.addPayment == true &&
      css`
        margin-top: 20px;
      `}
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
    min-height: 374px;
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
    @media (max-width: 1200px) {
      height: 341px;
    }
    @media (max-width: 1023px) {
      height: fit-content;
      min-height: unset;
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
    .title {
      font-size: 24px;
      font-weight: 800;
      color: #942ced;
      margin-bottom: 10px;
      @media (max-width: 1023px) {
        text-align: center;
      }
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
        gap: 10px;
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
      margin-top: auto;
      @media (max-width: 1023px) {
        margin-top: 20px;
      }
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
          outline: none;
          border: 2px solid white;
          border-radius: 100px;
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
