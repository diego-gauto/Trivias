import styled, { css } from 'styled-components';
import ReactInputMask from 'react-input-mask';
import PhoneInput from 'react-phone-number-input';

export const ComeFromContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #dad3e5;
  border-radius: 30px;
  p,
  h2 {
    margin: 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 30px;
      font-weight: 600;
      color: #3f1168;
      span {
        color: #942ced;
      }
    }
    .icon {
      font-size: 20px;
      color: #3f1168;
    }
  }
  .bottom-data {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .select-container {
      position: relative;
      .error {
        color: red;
        font-weight: 600;
        position: absolute;
        bottom: -25px;
        left: 8px;
      }
    }
  }
  .btn-contain {
    display: flex;
    justify-content: end;
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
      stroke: ${(props) => props.reward == 0 && 'url(#gradientLevel)'}
        ${(props) => props.reward == 1 && 'url(#gradientTime)'}
        ${(props) => props.reward == 2 && 'url(#gradientCertificate)'};
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
        stroke: ${(props) => props.reward == 0 && 'url(#gradientLevelResp)'}
          ${(props) => props.reward == 1 && 'url(#gradientTimeResp)'}
          ${(props) => props.reward == 2 && 'url(#gradientCertificateResp)'};
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
  .crown {
    position: absolute;
    font-size: 40px;
    top: -160px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    img {
      width: 50px;
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
    .main-text {
      display: flex;
      align-items: center;
      height: 76px;
      .time-reward {
        color: #1bb87f;
      }
    }
    .responsive-picture {
      display: none;
    }
  }
  .profile-container {
    position: relative;
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    p {
      margin: 0;
    }
    .user-info-up {
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: ${(props) =>
        props.startEdit == false ? '#dad3e5' : '#e4b6e8'};
      padding-top: 160px;
      padding-inline: 40px;
      padding-bottom: 40px;
      border-radius: 20px 20px 0 0;
      .btn-edit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background-color: transparent;
        color: #441a6f;
        font-weight: 600;
        border: 1px solid #441a6f;
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
          font-size: 16px;
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
        display: ${(props) => props.password == true && 'none'};
      }
      @media (max-width: 600px) {
        padding-block: 30px;
        padding-inline: 15px;
        gap: 6px;
        min-width: 45%;
      }
      border-radius: ${(props) =>
        props.password == false ? '0 0 20px 20px' : '0 0 0 0'};
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
    .options {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
  @media (max-width: 1280px) {
    .profile-container {
      .user-info-up {
        padding-inline: 30px;
      }
    }
  }
  @media (max-width: 1200px) {
    .profile-container {
      .user-info-up {
        padding-inline: 20px;
      }
    }
  }
  @media (max-width: 1023px) {
    padding-top: 20px;
    width: 100%;
    flex-direction: column-reverse;
    .crown {
      top: -60px;
    }
    .first-text {
      flex-direction: column;
      align-items: center;
      gap: 30px;
      display: flex;
      width: 80%;
      order: 2;
      justify-content: space-between;
      padding-inline: 50px;
      .responsive-picture {
        display: flex;
      }
      p {
        font-size: 20px;
        line-height: 20px;
      }
      span {
        font-size: 30px;
        line-height: 50px;
      }
      .main-text {
        height: unset;
        .time-reward {
          .reward-height {
            line-height: 25px;
          }
        }
      }
    }
    .profile-container {
      flex-direction: row;
      margin-top: 0;
      width: 100%;
      justify-content: center;
      .user-info-up {
        min-width: 40%;
        padding-top: 40px;
        border-radius: 20px 0 0 20px;
        .name-text {
          text-align: start;
          font-size: 30px;
          line-height: 25px;
        }
      }
    }
  }
  @media (max-width: 750px) {
    .first-text {
      padding-inline: 0;
      width: 90%;
      p {
        font-size: 16px;
        line-height: 16px;
      }
      span {
        font-size: 24px;
        line-height: 50px;
      }
    }
    .profile-container {
      .user-info-up {
        padding-block: 30px;
        padding-inline: 10px;
        justify-content: space-around;
        min-width: 45%;
        .btn-edit {
          font-size: 14px;
        }
        .input-contain {
          input {
            width: 180px;
          }
        }
        .data-contain{
          p {
              font-size: 14px;
        }
      }
    }
  }
  @media (max-width: 500px) {
    .profile-container {
      .user-info-up {
        .btn-edit {
          font-size: 12px;
        }
        .input-contain {
          input {
            width: 150px;
            font-size: 12px;
          }
          label {
            font-size: 14px;
          }
        }
        .name-text {
          font-size: 22px;
          line-height: 20px;
        }
        .data-contain{
          p {
            font-size: 12px;
          }
        }
      }
    }
  }
  @media (max-width: 400px) {
    .profile-container {
      .user-info-up {
        .input-contain {
          input {
            width: 120px;
          }
        }
      }
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
