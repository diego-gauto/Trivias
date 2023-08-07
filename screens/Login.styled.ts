import PhoneInput from "react-phone-number-input";

import styled, { keyframes } from "styled-components";

/**** new style ****/
export const BackgroundLoader = styled.div`
  display: flex;
  width: 100%;
  min-height: 90vh;
  align-items: center;
  justify-content: center;
`;
export const Background = styled.div`
  display: flex;
  width: 100%;
  min-height: 90vh;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  .terms-container{
    display: flex;
    align-items: baseline;
    gap: 20px;
  }
  .terms {
    font-size: 14px;
    color: #74549e;
    line-height: initial;
    text-align: center;
    span {
        font-weight: bold;
      }
  }
  .left-side {
    position: relative;
    background-color: #d4a2f1;
    width: 60%;
    display: flex;
    justify-content: center;
    @media (max-width: 1023px) {
      width: 100%;
      justify-content: center;
    }
    p {
      padding-block: 40px;
      font-size: 60px;
      color: #3f1168;
      font-weight: 700;
      line-height: 60px;
      span {
        color: #942ced;
      }
      @media (max-width: 1023px) {
        font-size: 40px;
        text-align: center;
        line-height: 45px;
        padding-top: 50px;
        padding-bottom: 20px;
        margin: 0;
        font-weight: 800;
      }
      @media (max-width: 600px) {
        font-size: 30px;
        line-height: 30px;
      }
      @media (max-width: 450px) {
        font-size: 24px;
      }
    }
    img {
      position: absolute;
      width: 100%;
      bottom: 0;
      right: -10%;
      @media (max-width: 1023px) {
        display: none;
      }
    }
  }
 
  .right-side {
    width: 40%;
    background-color: #dcb7f1;
    padding-inline: 10px;
    @media (max-width: 1023px) {
      width: 100%;
    }
    form {
      max-width: 400px;
      margin: auto;
      height: 100%;
      display: flex;
      padding-block: 40px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      p,
      h1 {
        margin: 0;
      }
      .sub-section {
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 10px;
        width: 100%;
        .bold{
          color: #942ced;
          font-weight: 700;
          cursor: pointer;
        }
        .subtitle {
          color: #3f1168;
          font-size: 21px;
          font-weight: 500;
          @media (max-width: 1023px) {
            font-size: 18px;
          }
          @media (max-width: 450px) {
            font-size: 14px;
          }
        }
        .login {
          color: #942ced;
          cursor: pointer;
          font-size: 21px;
          font-weight: 700;
          @media (max-width: 1023px) {
            font-size: 18px;
          }
          @media (max-width: 450px) {
            font-size: 14px;
          }
        }
      }
      .box {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .form-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          position: relative;
          width: 100%;
          gap: 20px;
          .error {
            color: red;
            position: absolute;
            transform: translateX(50%);
            bottom: -20px;
            right: 50%;
            white-space: nowrap;
            font-size: 14px;
            font-weight: bold;
          }
          .form-input {
            width: 100%;
            flex-grow: 1;
            position: relative;
            .eye {
              cursor: pointer;
              position: absolute;
              bottom: 8px;
              right: 15px;
            }
            label {
              color: #3f1168;
              font-size: 21px;
              font-weight: 700;
              font-family: Montserrat, sans-serif;
              margin-bottom: 5px;
              @media (max-width: 1023px) {
                font-size: 16px;
              }
              @media (max-width: 450px) {
                font-size: 14px;
              }
            }
            input {
              background: rgb(218 211 229 / 40%);
              border: 1px solid #942ced;
              border-radius: 20px;
              color: #3f1168;
              font-size: 19px;
              font-weight: 700;
              padding-left: 25px;
              @media (max-width: 1023px) {
                font-size: 18px;
              }
              @media (max-width: 450px) {
                font-size: 14px;
              }
              &:valid {
                background-color: #ebe1f0;
              }
              &::placeholder {
                color: #6611c2;
                font-weight: 400;
              }
            }
          }
        }
      }
      
      .social-media-container {
        display: flex;
        flex-wrap: wrap;
        row-gap: 20px;
        justify-content: center;
        width: 100%;
        .info {
          width: 55%;
          padding-right: 10px;
          border-right: 1.5px solid #3f1168;
          p {
            color: #3f1168;
            font-size: 18px;
            line-height: initial;
            white-space: nowrap;
            span {
              font-weight: bold;
            }
            @media (max-width: 1023px) {
              font-size: 14px;
            }
          }
        }
        .socials {
          display: flex;
          width: 45%;
          align-items: center;
          gap: 20px;
          padding-left: 20px;
          @media (max-width: 400px) {
            gap: 10px;
            padding-left: 10px;
          }
          img {
            cursor: pointer;
            width: 50px;
            height: auto;
          }
        }
      }
    }
    .imgResp{
      display: none;
      position: relative;
      height: 300px;
      @media (max-width: 1023px) {
        display: flex;
      }
      img {
        left: 50%;
        transform: translateX(-50%);
        @media (max-width: 1023px) {
          position: absolute;
         width: 575px;
         bottom: 0;
        }
    }
  }
`;
export const LoginBackground = styled.div`
  display: flex;
  width: 100%;
  min-height: 90vh;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  .left-side {
    order: 1;
    position: relative;
    background-color: #e096e2;
    width: 60%;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 1023px) {
      width: 100%;
      justify-content: center;
    }
    p {
      padding-top: 350px;
      padding-right: 30px;
      font-size: 40px;
      color: #3f1168;
      font-weight: 700;
      line-height: 45px;
      span {
        color: #942ced;
      }
      @media (max-width: 1250px) {
        padding-top: 300px;
      }
      @media (max-width: 1120px) {
        padding-right: 10px;
      }
      @media (max-width: 1023px) {
        padding-top: 50px;
        text-align: center;
        font-size: 36px;
        padding-bottom: 20px;
      }
      @media (max-width: 400px) {
        font-size: 30px;
        line-height: 30px;
      }
    }
    .imgUpperHand {
      position: absolute;
      width: 650px;
      top: -70px;
      right: -120px;
      @media (max-width: 1400px) {
        width: 76%;
        right: -100px;
      }
      @media (max-width: 1023px) {
        display: none;
      }
    }
    .imgBottomHand {
      position: absolute;
      width: 550px;
      bottom: -110px;
      left: 0;
      @media (max-width: 1400px) {
        width: 64%;
      }
      @media (max-width: 1023px) {
        display: none;
      }
    }
  }
  .right-side {
    width: 40%;
    background-color: rgba(206, 91, 196, 0.5);
    position: relative;
    order: 2;
    overflow: hidden;
    @media (max-width: 1023px) {
      width: 100%;
    }
    form {
      max-width: 400px;
      margin: auto;
      height: 100%;
      display: flex;
      padding-block: 40px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      .forgotText {
        font-size: 12px;
        color: #402466;
        @media (max-width: 400px) {
          font-size: 10px;
        }
        span {
          cursor: pointer;
          font-weight: bold;
        }
      }
      .line {
        width: 100%;
        border-bottom: 2px solid #734390;
      }
      .title-contain {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .subtext {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 16px;
        @media (max-width: 400px) {
          font-size: 14px;
        }
        .first-sub {
          color: #402466;
          line-height: 20px;
        }
        .second-sub {
          color: #9731ec;
        }
        p {
          text-align: center;
          font-weight: bold;
        }
      }
      .first-paragraph {
        color: #9731ec;
        font-weight: bold;
        text-align: center;
        font-size: 14px;
      }
      .second-paragraph {
        color: #402466;
        text-align: center;
        font-size: 14px;

        span {
          font-weight: bold;
        }
        @media (max-width: 400px) {
          font-size: 12px;
        }
      }
      p,
      h1 {
        margin: 0;
      }
      .sub-section {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
        .subtitle {
          color: #3f1168;
          font-size: 21px;
          font-weight: 500;
        }
        .login {
          color: #942ced;
          cursor: pointer;
          font-size: 21px;
          font-weight: 700;
        }
      }
      .box {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 320px;
        @media (max-width: 400px) {
          width: 280px;
        }
        .form-row {
          display: flex;
          flex-direction: column;
          align-items: baseline;
          justify-content: space-between;
          width: 100%;
          gap: 5px;
          .form-input {
            flex-grow: 1;
            position: relative;
            width: 100%;
            .eye {
              cursor: pointer;
              position: absolute;
              bottom: 8px;
              right: 15px;
            }
            label {
              color: #3f1168;
              font-size: 18px;
              font-weight: 700;
              font-family: Montserrat, sans-serif;
              margin-bottom: 5px;
              @media (max-width: 1023px) {
                font-size: 16px;
              }
              @media (max-width: 400px) {
                font-size: 14px;
              }
            }
            span {
              font-weight: 400;
            }
            input {
              background: #e7c9eb;
              border: 1px solid #942ced;
              border-radius: 20px;
              color: #3f1168;
              padding-left: 25px;
              font-weight: bold;
              line-height: 10px;
              @media (max-width: 400px) {
                font-size: 14px;
              }
              &:valid {
                background-color: #ebe1f0;
                color: #402466;
              }
              &::placeholder {
                color: #6611c2;
                font-weight: 400;
              }
              &:focus {
                background: #ebe1f0;
              }
            }
          }
        }
      }
      .registerText {
        color: #402466;
        font-weight: bold;
        span {
          color: #9731ec;
          cursor: pointer;
        }
        @media (max-width: 400px) {
          font-size: 14px;
        }
      }
      .social-media-container {
        display: flex;
        flex-wrap: wrap;
        row-gap: 20px;
        justify-content: center;
        width: 100%;
        .info {
          width: 55%;
          padding-right: 10px;
          border-right: 1.5px solid #3f1168;
          p {
            color: #3f1168;
            font-size: 18px;
            line-height: initial;
            white-space: nowrap;
            span {
              font-weight: bold;
            }
            @media (max-width: 1023px) {
              font-size: 14px;
            }
          }
        }
        .socials {
          display: flex;
          width: 45%;
          align-items: center;
          gap: 20px;
          padding-left: 20px;
          @media (max-width: 400px) {
            gap: 10px;
            padding-left: 10px;
          }
          img {
            cursor: pointer;
            width: 50px;
            height: 50px;
          }
        }
        .terms {
          font-size: 14px;
          color: #74549e;
          line-height: initial;
          text-align: center;
          span {
            font-weight: bold;
          }
        }
      }
    }
    .imgResp {
      display: none;
      position: relative;
      height: 250px;
      @media (max-width: 1023px) {
        display: flex;
      }
      .imgLeft {
        position: absolute;
        bottom: -70px;
        left: -30px;
        width: 40%;
        min-width: 230px;
        @media (max-width: 450px) {
        }
      }
      .rightArm {
        position: absolute;
        top: -45px;
        right: 0;
        .circle {
          top: 0;
          right: -180px;
          position: absolute;
          border-radius: 50%;
          display: flex;
          width: 300px;
          height: 300px;
          background: linear-gradient(180deg, #942ced 0%, #cf43d2 100%);
          @media (max-width: 600px) {
            right: -160px;
          }
        }
        .imgRight {
          right: -80px;
          position: absolute;
          width: 40%;
          transform: rotate(-25deg);
          min-width: 250px;
          @media (max-width: 600px) {
            right: -60px;
          }
        }
      }
    }
  }
`;
export const Title = styled.h1`
  font-family: Montserrat;
  color: #401269;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  font @media (max-width: 670px) {
    font-size: 30px;
  }
`;

export const InputPhone = styled(PhoneInput)`
  flex: 1 1;
  height: 40px;
  background: transparent;
  opacity: 0.8;
  border-radius: 30px;
  border: 1px solid #942ced;
  background: rgb(218 211 229 / 40%);
  input {
    background: none !important;
    border: none !important;
    &::placeholder {
      color: #6611c2;
      font-weight: 400 !important;
    }
  }
  .PhoneInputInput {
    padding-left: 30px;
    border: none;
    outline: none;
    color: #fff;
    min-width: 255px;
    background: transparent;
    @media (max-width: 420px) {
      min-width: 80%;
    }
    @media (max-width: 360px) {
      min-width: 77%;
    }
    @media (max-width: 330px) {
      min-width: 75%;
    }
  }
  .PhoneInputCountry {
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    left: 20px;
    margin-right: var(--PhoneInputCountrySelect-marginRight);
    .PhoneInputCountrySelectArrow {
      color: #942ced;
      opacity: unset;
    }
  }
  @media (max-width: 670px) {
    font-size: 12px;
  }
`;

export const ProfilePicture = styled.i`
  background-image: url(../images/DefaultIcon.png);
  height: 106px;
  width: 98px;
  background-position: center;
  border: none;
  background-repeat: no-repeat;
`;
export const ProfilePicture2 = styled.i`
  background-image: url(../images/DefaultIcon.png);
  height: 140px;
  width: 140px;
  background-position: center;
  border: none;
  background-repeat: no-repeat;
`;
export const Error = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  p {
    color: red;
    text-align: center;
    font-weight: 600;
    font-size: 14px;

    margin: 0;
  }
`;

export const AnimatedBackground = styled.video`
  width: auto;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: -2;
  margin-left: -80px;
`;
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;
export const ChildrenContain = styled.div`
  flex-grow: 1;
  .admin-menu {
    border: none;
    width: fit-content;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    background: #6717cd;
    margin-left: 20px;
    margin-top: 20px;
  }
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
  display: block;
  position: absolute;
  left: -26px;
  top: -26px;
  width: 100px;
  height: 100px;
  margin: 6px;
  border-width: 9px;
  border-style: solid;
  border-radius: 50%;
  border-color: #6717cd transparent transparent;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;
export const LoaderImage = styled.div`
  position: relative;
  background-size: contain;
  background-position: center;
  display: flex;
  width: 60px;
  height: 60px;
  background-image: url(../images/logo-g.png);
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 90px;
  padding-block: 40px;
  border: 1px solid #fff;
  box-sizing: border-box;
  width: 100%;
  gap: 15px;
  max-width: 515px;
  min-height: 680px;
  background: #92616154;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 10px;
  backdrop-filter: blur(180px);
  backdrop-opactiy: 10px;
  font-family: Montserrat;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 15px;
  }
  @media (max-width: 530px) {
    padding-inline: 20px;
  }
`;
export const LoginBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 70px;
  padding-block: 40px;
  border: 1px solid #fff;
  box-sizing: border-box;
  width: 100%;
  gap: 25px;
  max-width: 727px;
  min-height: 680px;
  background: transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 10px;
  backdrop-filter: blur(180px);
  backdrop-opactiy: 10px;
  font-family: Montserrat;
  position: relative;
  @media (max-width: 760px) {
    padding-inline: 30px;
  }
`;
export const Box1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  @media (max-width: 670px) {
    width: 100%;
    max-width: 320px;
  }
`;
export const Box2 = styled.div`
  position: relative;
  width: 100%;
  @media (max-width: 670px) {
    width: 100%;
    max-width: 320px;
  }
`;
export const PasswordBox = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (max-width: 670px) {
    width: 100%;
    max-width: 320px;
  }
`;
export const Text2 = styled.label`
  font-size: 14px;
  color: #fff;
  opacity: 0.8;
  @media (max-width: 670px) {
    font-size: 12px;
  }
`;
export const TextInput = styled.input`
  color: #fff;
  outline: none;
  opacity: 0.8;
  border: 1px solid white;
  width: 100%;
  height: 40px;
  background: transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 20px;
  padding: 0 0 0 20px;
  font-size: 14px;
  ::placeholder {
    color: #fff;
  }
  :focus {
    background: transparent;
    box-shadow: 0px 0px 10px 2px #6717cd;
    border: 2px solid white;
    color: #fff;
  }
  @media (max-width: 670px) {
    font-size: 12px;
  }
`;
export const TextInput_2 = styled.input`
  color: #fff;
  outline: none;
  opacity: 0.8;
  border: 1px solid white;
  width: 100%;
  height: 40px;
  background: transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 20px;
  padding: 0 0 0 20px;
  font-size: 14px;

  > i {
    display: none !important;
  }

  ::placeholder {
    color: #fff;
  }
  @media (max-width: 670px) {
    font-size: 12px;
  }
  :focus {
    background: transparent;
    box-shadow: 0px 0px 10px 2px #6717cd;
    border: 2px solid white;
    color: #fff;
  }
`;

export const ArchiveInput = styled.input`
  color: #fff;
  outline: none;
  opacity: 0.8;
  border: 1px solid white;
  width: 100%;
  height: 40px;
  background: transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 20px;
  padding: 0 0 0 50px;
  font-size: 14px;
  ::placeholder {
    color: #adadac;
  }
  @media (max-width: 670px) {
    font-size: 12px;
  }
`;
export const PurpleButton2 = styled.button`
  background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
  color: #fff;
  font-size: 16px;
  padding: 8px 25px;
  border-radius: 30px;
  border: none;
  font-weight: 700;
  font-family: Montserrat, sans-serif;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #de5246;
  color: #fff;
  height: 50px;
  width: 100%;
  border-radius: 30px;
  border: none;
  &:hover {
    background-color: #db2c1d;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const FacebookButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #0768fd;
  color: #fff;
  height: 50px;
  width: 100%;
  border-radius: 30px;
  border: none;
  &:hover {
    background-color: #0755fd;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const TransparentButton = styled.button`
  background: transparent;
  color: #fff;
  height: 50px;
  border-radius: 30px;
  border: 1px solid white;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const GoogleIcon = styled.i`
  background-image: url(../images/google.svg);
  height: 21px;
  width: 21px;
  border-style: none;
  background-position: center;
`;
export const FacebookIcon = styled.i`
  background-image: url(../images/facebook.svg);
  height: 21px;
  width: 21px;
  background-position: center;
`;
export const EyeIcon = styled.i`
  background-image: url(../images/eye.png);
  height: 15px;
  width: 22.5px;
  background-position: center;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
`;
export const LineIcon = styled.i`
  background-image: url(../images/Line-2.png);
  height: 30px;
  width: 2px;
  background-position: center;
  position: absolute;
  top: 0;
  left: 50px;
  margin: 29px 0 0 12px;
  opacity: 0.4;
  @media (max-width: 670px) {
    left: 45px;
  }
  @media (max-width: 420px) {
    left: 40px;
  }
`;
export const FolderIcon = styled.i`
  background-image: url(../images/folder.png);
  height: 24px;
  width: 24px;
  top: 50%;
  left: 20px;
  background-position: center;
  position: absolute;
  opacity: 0.8;
  cursor: pointer;
  z-index: 1;
`;

export const AllButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  max-width: 272px;
  width: 100%;
`;
export const Paragraph = styled.div`
  text-align: center;
  gap: 5px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 20px;
`;
export const Text3 = styled.p`
  font-family: Raleway;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  margin: 0;
  opacity: 0.8;
  @media (max-width: 670px) {
    font-size: 10px;
  }
`;
export const LinkText = styled.span`
  font-family: Raleway;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-decoration: underline;
  @media (max-width: 670px) {
    font-size: 10px;
  }
  cursor: pointer;
`;
