import { Row } from "react-bootstrap";
import InputMask from "react-input-mask";

import Image from "next/image";
import styled, { css, keyframes } from "styled-components";

/*** ReDo screen styles */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  background-color: #ede7f2;
  width: 100%;
  min-height: 100vh;
  padding-inline: 60px;
  padding-block: 40px;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  .static-modal {
    background: rgb(237 231 242 / 60%);
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    .modal-costum {
      padding: 30px;
      border-radius: 30px;
      text-align: center;
      margin: auto;
      background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
      display: flex;
      flex-direction: column;
      gap: 20px;
      h1 {
        color: #00e2b4;
        margin: 0;
        span {
          color: white;
        }
      }
      p {
        color: #ede7f2;
        font-size: 17px;
        span {
          color: #ffdd67;
          font-size: 22px;
          font-weight: bold;
        }
      }
      button {
        width: 220px;
        height: 42px;
        margin: auto;
        border-radius: 20px;
        border: 1px solid #fff;
        padding: 5px 20px;
        background: none;
        color: white;
        font-size: 15px;
        a {
          color: inherit;
          text-decoration: none;
        }
      }
      .full {
        background: #fff;
        color: #942ced;
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
  p {
    color: #3f1168;
    font-size: 18px;
    margin: 0;
    span {
      color: #d244d1;
      font-weight: bold;
    }
  }
  img {
    width: fit-content;
    margin: auto;
  }
  label {
    color: #3f1168;
    font-weight: bold;
    font-size: 24px;
  }
  .purchase-info {
    p {
      text-align: center;
      color: #9b8faa;
      font-size: 17px;
    }
  }
  .purchase-responsive{
    display: none;
  }
  .purchase-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  .right-section {
    .box {
      position: relative;
      height: 100%;
      max-height: 800px;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background: rgb(148 44 237 / 30%);
      border-radius: 20px;
      padding: 40px 20px;
      .title {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        color: #3f1168;
        span {
          color: #942ced;
        }
        sub {
          font-style: italic;
          font-size: 14px;
          color: #6611c2;
          font-weight: 400;
        }
      }
      .subtitle {
        color: #6611c2;
        font-size: 20px;
        font-weight: 500;
        font: small-caption;
        letter-spacing: 2px;
      }
      .info {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px;
        p {
          color: #8161aa;
          font-size: 14px;
          span {
            color: #8161aa;
            font-weight: bold;
          }
        }
        img {
          height: 70%;
          width: 100%;
          border-radius: 10px;
        }
      }

      .coupon-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: fit-content;
        margin-left: auto;
        img {
          margin: 0;
        }
        a {
          color: #942ced;
          font-size: 17px;
          font-weight: bold;
        }
        p {
          text-align: end;
        }
        .coupon {
          position: relative;
          margin-block: 20px;
          input {
            color: #6611c2;
            padding: 5px 10px;
            font-size: 15px;
            outline: none;
            border: 1.5px solid #942ced;
            border-radius: 20px;
            &::placeholder {
              font-size: 13px;
              color: #942ced;
            }
          }
          button {
            width: 48px;
            position: absolute;
            height: 100%;
            background: #942ced;
            right: 0;
            border: none;
            border-radius: 20px;
          }
        }
        .line {
          border: 1.5px solid #3f1168;
          width: 100%;
        }
      }

      .price-container {
        margin-top: auto;
        .total {
          text-align: end;
          font-size: 38px;
          font-weight: bold;
          color: #e55c00;
          span {
            font-weight: 400;
            color: #e55c00;
          }
        }
      }
      .bg {
        background: #ffdd67;
        width: 45%;
        border-top-right-radius: 100%;
        height: 250px;
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom-left-radius: 20px;
      }
      .image {
        position: absolute;
        bottom: 0;
        left: -71px;
        max-height: 350px;
      }
    }
  }

  .left-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
    .cards{
      width: 350px;
    }
    .steps {
      margin: auto;
      display: flex;
      align-items: center;
      position: relative;
      .left-info {
        position: absolute;
        bottom: -70px;
        left: -86px;
        display: flex;
        align-items: center;
        gap: 10px;
        p {
          color: #a18cc4;
          font-size: 28px;
          font-weight: bold;
        }
        .rect {
          height: 50px;
          background: #a18cc4;
          width: 2px;
        }
        .lower {
          font-size: 18px;
          font-weight: 500;
        }
      }
      .right-info {
        position: absolute;
        bottom: -70px;
        right: -70px;
        display: flex;
        align-items: center;
        gap: 10px;
        p {
          color: #942ced;
          font-size: 28px;
          font-weight: bold;
        }
        .rect {
          height: 50px;
          background: #942ced;
          width: 2px;
        }
        .lower {
          color: #3f1168;
          font-size: 18px;
          font-weight: 500;
        }
      }
      .circle {
        z-indez: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background: #9900ed;
        border-radius: 50%;
      }
      .circle-no-fill {
        position: relative;
        z-index: 0;
        left: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border: 1.5px solid #3f1168;
        border-radius: 50%;
      }
      .line {
        z-index: 1;
        width: 250px;
        border: 1.5px solid #3f1168;
        border-left: none;
        border-right: 1px solid #ede7f2;
        height: 5px;
      }
    }

    .title {
      margin-top: 80px;
      font-size: 32px;
      font-weight: bold;
      color: #3f1168;
      span {
        color: #d244d1;
      }
    }

    .security-info {
      .top {
        display: flex;
        align-items: flex-end;
        svg {
          width: 40px;
          height: 40px;
          color: #3f1168;
        }
        p {
          font-size: 24px;
          font-weight: bold;
          span {
            color: #942ced;
          }
        }
      }
    }

    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 600px;
      margin: auto;
      .paypal {
        i {
          color: #009cde;
          font-size: 14px;
        }
      }
      .stripe {
        border: 2px solid #cdc7d8;
        padding-block: 20px;
        padding-inline: 40px;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        input[type="radio"] {
          accent-color: #9900ed;
          width: 25px;
          height: 20px;
        }

        .option {
          display: flex;
          align-items: center;
          gap: 10px;
          p {
            span {
              color: #3f1168 !important;
              font-weight: bold;
            }
          }
        }

        .form-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          input {
            border: 1px solid #942ced;
            outline: none;
            background: none;
            border-radius: 20px;
            padding-inline: 10px;
            font-size: 20px;
            color: #942ced;
            &::placeholder {
              color: #942ced;
            }
            &:focus {
              border: 2px solid #3f1168;
            }
          }
          .short {
            border: 1px solid #942ced;
            padding-inline: 10px;
            font-size: 20px;
            color: #942ced;
            outline: none;
            width: 90px;
            height: 34px;
            background: none;
            border-radius: 20px;
          }
        }

        button {
          background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
          border: none;
          border-radius: 20px;
          color: white;
          font-weight: bold;
          margin: auto;
          margin-top: 10px;
          padding: 5px 20px;
        }
      }
    }
  }
  @media (max-width: 1220px) {
    padding-inline: 0;
    padding-bottom: 0;
    background: none;
    gap: 0;
    min-height: auto;
    .purchase-container,
    .purchase-info {
      display: none;
    }
    .purchase-responsive {
      flex-direction: column;
      display: flex;
      gap: 40px;

      .steps {
      margin: auto;
      display: flex;
      align-items: center;
      position: relative;
      .left-info {
        position: absolute;
        bottom: -70px;
        left: -86px;
        display: flex;
        align-items: center;
        gap: 10px;
        @media (max-width: 520px) {
          left: -43px;
        }
        p {
          color: #a18cc4;
          font-size: 28px;
          font-weight: bold;
          @media (max-width: 520px) {
            font-size: 14px;
          }
        }
        .rect {
          height: 50px;
          background: #a18cc4;
          width: 2px;
        }
        .lower {
          font-size: 18px;
          font-weight: 500;
          @media (max-width: 520px) {
            font-size: 14px;
          }
        }
      }
      .right-info {
        position: absolute;
        bottom: -70px;
        right: -70px;
        display: flex;
        align-items: center;
        gap: 10px;
        @media (max-width: 520px) {
          right: -53px;
        }
        p {
          color: #942ced;
          font-size: 28px;
          font-weight: bold;
          @media (max-width: 520px) {
            font-size: 14px;
          }
        }
        .rect {
          height: 50px;
          background: #942ced;
          width: 2px;
        }
        .lower {
          color: #3f1168;
          font-size: 18px;
          font-weight: 500;
          @media (max-width: 520px) {
            font-size: 14px;
          }
        }
      }
      .circle {
        z-indez: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background: #9900ed;
        border-radius: 50%;
      }
      .circle-no-fill {
        position: relative;
        z-index: 0;
        left: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border: 1.5px solid #9900ed;
        border-radius: 50%;
      }
      .line {
        z-index: 1;
        width: 250px;
        border: 1.5px solid #9900ed;
        border-left: none;
        border-right: 1px solid #ede7f2;
        height: 5px;
        @media (max-width: 520px) {
          width:170px;
        }
      }
    }

    .second-section{
      margin-top: 60px;
      display: flex;
      justify-content: center;
      gap: 10px;
      align-items: center;
      .coupon-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: fit-content;
        margin-left: 0;
        img {
          margin: 0;
        }
        a {
          color: #942ced;
          font-size: 17px;
          font-weight: bold;
          @media (max-width: 520px) {
            font-size: 14px;
          }
        }
        p {
          text-align: start;
          @media (max-width: 520px) {
            font-size: 14px;
          }
        }
        .coupon {
          position: relative;
          margin-block: 20px;
          input {
            color: #6611c2;
            padding: 5px;
            font-size: 15px;
            outline: none;
            border: 1.5px solid #942ced;
            border-radius: 20px;
            &::placeholder {
              font-size: 13px;
              color: #942ced;
            }
            @media (max-width: 520px) {
            width: 100%;
          }
          }
          button {
            width: 48px;
            position: absolute;
            height: 100%;
            background: #942ced;
            right: 0;
            border: none;
            border-radius: 20px;
          }
        }
      }
      .line {
          border: 1.5px solid #3f1168;
          height: 70%;
        }

      .price-container {
          margin-block: auto;
          .title{
            font-size: 30px;
            font-weight: 700;
            span{
              color: #942CED;
            }
            @media (max-width: 520px) {
            font-size: 18px;
          }
          }
        .total {
          text-align: center;
          font-size: 38px;
          font-weight: bold;
          color: #e55c00;
          span {
            font-weight: 400;
            color: #e55c00;
          }
          @media (max-width: 520px) {
            font-size: 18px;
          }
        }
      }
    }

    .slider-container{
        background: rgb(148 44 237 / 30%);
        .terms{
          text-align: center;
          color: #74549E;
          font-size: 14px;
          span{
            font-weight: 600;
            color: #74549E;
          }
        }
        .bottom{
          position: relative;
          overflow: hidden;
          background: #d8acf4;
          padding-top: 40px;
        }
        .box {
            margin: auto;
            position: relative;
            max-width: 500px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            border-radius: 20px;
            padding: 40px 20px;
            .title {
              text-align: center;
              font-size: 30px;
              font-weight: bold;
              color: #3f1168;
              span {
                color: #942ced;
              }
              sub {
                font-style: italic;
                font-size: 14px;
                color: #6611c2;
                font-weight: 400;
              }
            }
            .subtitle {
              color: #6611c2;
              font-size: 20px;
              font-weight: 500;
              font: small-caption;
              letter-spacing: 2px;
            }
            .info {
              display: grid;
              grid-template-columns: auto;
              grid-gap: 40px;
              p {
                color: #8161aa;
                font-size: 20px;
                span {
                  color: #8161aa;
                  font-weight: bold;
                }
              }
              img {
                height: auto;
                width: 80%;
                border-radius: 10px;
              }
            }
          }
          .hand{
            position: relative;
            z-index: 1;
            display: flex;
            width: 400px;
          }
          .bg{
            height: 400px;
            border-radius: 50%;
            position: absolute;
            background: #FFDD67;
            bottom: -200px;
            width: 100%;
            max-width: 400px;
            z-index: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .pay-slide{
            background: #d8acf4;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            .title {
              text-align: center;
              font-size: 28px;
              font-weight: bold;
              color: #3f1168;
              span {
                color: #d244d1;
              }
              @media (max-width: 520px) {
                font-size: 22px;
              }
            }
            .info-container{
              .security-info {
                .top {
                  display: flex;
                  align-items: flex-end;
                  svg {
                    width: 30px;
                    height: 30px;
                    color: #3f1168;
                  }
                  p {
                    font-size: 24px;
                    font-weight: bold;
                    span {
                      color: #942ced;
                    }
                    @media (max-width: 520px) {
                      font-size: 18px;
                    }
                  }
                }
                p{
                  text-align: justify;
                }
              }
              img{
                @media (max-width: 600px) {
                  width: 100%;
                }
              }
            }
            .payment-methods {
              display: flex;
              flex-direction: column;
              gap: 20px;
              max-width: 600px;
              margin: auto;
              .paypal {
                text-align: center;
                i {
                  color: #009cde;
                  font-size: 14px;
                }
              }
              .stripe {
                border: 2px solid #3F1168;
                padding: 20px;
                border-radius: 30px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                input[type="radio"] {
                  accent-color: #9900ed;
                  width: 25px;
                  height: 20px;
                }

                .option {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  p {
                    span {
                      color: #3f1168 !important;
                      font-weight: bold;
                    }
                  }
                }

                .form-row {
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                  label{
                    font-size: 18px;
                  }
                  input {
                    border: 1px solid #942ced;
                    outline: none;
                    background: none;
                    border-radius: 20px;
                    padding-inline: 10px;
                    font-size: 18px;
                    color: #942ced;
                    &::placeholder {
                      color: #942ced;
                    }
                    &:focus {
                      border: 2px solid #3f1168;
                    }
                  }
                  .short {
                    border: 1px solid #942ced;
                    padding-inline: 10px;
                    font-size: 18px;
                    color: #942ced;
                    outline: none;
                    width: 90px;
                    height: 34px;
                    background: none;
                    border-radius: 20px;
                  }
                }

                button {
                  background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
                  border: none;
                  border-radius: 20px;
                  color: white;
                  font-weight: bold;
                  margin: auto;
                  margin-top: 10px;
                  padding: 5px 20px;
                }
              }
            }

          }
    // .bottom{
    //   position: relative;
    //   img{
    //     position: relative;
    //     z-index: 1;
    //     display: flex;
    //     width: 400px;
    //   }
    //   .bg{
    //     height: 400px;
    //     border-radius: 50%;
    //     position: absolute;
    //     background: #FFDD67;
    //     bottom: -62%;
    //     width: 100%;
    //     max-width: 400px;
    //     z-index: 0;
    //     left: 50%;
    //     transform: translateX(-50%);
    //   }
    // }

  }
`;

export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 60px;
  font-weight: 700;
  color: #3f1168;
  line-height: 60px;
  span {
    color: #942ced;
  }
  margin: 0;
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const PayBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
export const DataPayment = styled.div`
  display: flex;
  width: 100%;
  padding-block: 30px;
  padding-inline: 30px;
  position: relative;
  gap: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const DataPaymentContain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ProcessText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  position: absolute;
  text-align: center;
  margin: 0;
  bottom: 0px;
`;
export const ProcessCircle = styled.div`
  width: 32px;
  height: 32px;
  border: 1px solid gray;
  border-radius: 25px;
`;
export const Division = styled.div`
  width: 200px;
  height: 4px;
  background: gray;
`;
export const TextPosition = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  position: absolute;
  color: #6717cd;
  text-align: center;
  margin: 0;
  bottom: 0px;
`;
export const CirclePosition = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #6717cd;
  border-radius: 25px;
`;
export const Division2 = styled.div`
  width: 200px;
  height: 4px;
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
`;
export const PastText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  position: absolute;
  color: #6717cd;
  text-align: center;
  margin: 0;
  bottom: 0px;
`;
export const PastCircle = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
  border-radius: 25px;
`;
export const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;
export const SubContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 50%;
  flex: 1 480px;
  @media (max-width: 1023px) {
    gap: 20px;
  }
`;
export const ContainTitle = styled.h1`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 14px;
    text-align: center;
  }
`;
export const PaymentContain = styled.div<{ active: any }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7);
    cursor: pointer;
  }
  ${(props) =>
    props.active == true &&
    css`
      box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7) !important;
    `}
`;
export const PaymentDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
`;
export const PaymentMethod = styled("div")<{ active: any }>`
  ${(props) =>
    props.active == true &&
    css`
      box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7) !important;
    `}
  display: flex;
  align-items: center;
  padding-block: 10px;
  padding-inline: 20px;
  gap: 10px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7);
  }
  @media (max-width: 340px) {
    padding-block: 7px;
    padding-inline: 12px;
  }
`;
export const PayText = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 12px;
  }
`;
export const PayText2 = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const PaymentsContainer = styled.div`
  display: flex;
  gap: 10px;
`;
export const VisaPay = styled.i`
  background-image: url(../images/VisaPay.svg);
  background-repeat: no-repeat;
  height: 96px;
  width: 144px;
  background-position: center;
  @media (max-width: 500px) {
    width: 95px;
    height: 65px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;
export const VisaLogo = styled.i`
  background-image: url(../images/visa-icon.png);
  background-repeat: no-repeat;
  width: 70px;
  height: 100%;
  background-position: center;
`;
export const MastercardLogo = styled.i`
  background-image: url(../images/mastercard-icon.png);
  // background-image: url(../images/amex-icon.png);
  background-repeat: no-repeat;
  width: 70px;
  height: 100%;
  background-position: center;
`;
export const AmexLogo = styled.i`
  background-image: url(../images/amex-icon.png);
  background-repeat: no-repeat;
  width: 70px;
  height: 100%;
  background-position: center;
`;
export const PayPal = styled.i`
  background-image: url(../images/PaypalPay.png);
  background-repeat: no-repeat;
  height: 96px;
  width: 144px;
  background-position: center;
  @media (max-width: 500px) {
    width: 120px;
  }
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
export const NewMethodContain = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const NewMethod = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;
export const NewMethodBox = styled.div<{ active: any; plan: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 30px;
  width: 220px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:active {
    border: 1px solid black;
  }
  &:hover {
    box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7);
  }
  @media (max-width: 600px) {
    width: 50%;
    padding-block: 18px;
    justify-content: space-between;
  }
  ${(props) =>
    props.active == true &&
    props.plan == "stripe" &&
    css`
      box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7) !important;
    `}
`;
export const NewMethodBoxPaypal = styled.div<{ plan: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 30px;
  width: 220px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:active {
    border: 1px solid black;
  }
  &:hover {
    box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7);
  }
  @media (max-width: 600px) {
    width: 50%;
    padding-block: 18px;
    justify-content: space-between;
  }
  ${(props) =>
    props.plan == "paypal" &&
    css`
      box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7) !important;
    `}
`;
export const NewMethodBox2 = styled.div`
  @media (max-width: 500px) {
    display: visible;
    top: 40%;
    height: 120px;
    position: absolute;
    left: 27.5%;
    width: 45%;
    //z-index:;
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const TransparentButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  height: 50px;
  padding-inline: 25px;
  background: transparent;
  color: #6717cd;
  border-radius: 30px;
  border: 1px solid #6717cd;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 400px) {
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
  }
`;
export const PurpleButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background-color: #6717cd;
  color: #fff;
  border-radius: 30px;
  margin-left: auto;
  border: none;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 400px) {
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
  }
`;
const glow = keyframes`
  0% {
    background-position: 0% 50%;
    transform: scale(1);
  }
  50% {
    background-position: 100% 50%;
    transform: scale(1.05);
  }
  100% {
    background-position: 0% 50%;
  }
`;
export const PurpleBuyButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background: linear-gradient(
    135deg,
    #8e2de2 0%,
    #804fb3 25%,
    #6c4b91 50%,
    #552586 75%,
    #4a00e0 100%
  );
  background-size: 200% 100%;
  animation: ${glow} 2.7s ease infinite;
  color: #fff;
  border-radius: 30px;
  border: none;
  // &:hover{
  //   background-color: #5000b5;
  //   transform:scale(1.03);
  //   transition:.5s ease all;
  // }
  @media (max-width: 1023px) {
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
  }
`;
export const PurchaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 403.5px;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  @media (max-width: 1023px) {
    flex: 1 500px;
    gap: 10px;
    margin-bottom: 10px;
    order: -1;
  }
`;
export const CourseId = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 12px;
  }
`;
export const CourseName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: space-between;
  margin: 0;
  @media (max-width: 1115px) {
    font-size: 18px;
  }
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
export const CourseCost = styled.span`
  color: #6717cd;
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  @media (max-width: 1115px) {
    font-size: 20px;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const CourseCostResp = styled.span`
  display: none;
  color: #6717cd;
  font-size: 20px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  @media (max-width: 1023px) {
    display: flex;
    font-size: 18px;
  }
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
export const CardContain = styled.div`
  display: flex;
  justify-content: center;
  padding-inline: 20px;
  @media (max-width: 1023px) {
    display: none;
    padding-inline: 5px;
  }
`;
export const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  @media (max-width: 1300px) {
    width: 100%;
  }
`;
export const ImageContain = styled.div`
  display: flex;
  align-self: center;
  position: relative;
`;
export const NumberLesson = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  color: white;
  padding-block: 5px;
  padding-inline: 10px;
  border: 1px solid white;
  border-radius: 10px;
  @media (max-width: 1023px) {
    font-size: 10px;
  }
`;
export const CourseText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
export const CourseImage = styled.img`
  border-radius: 10px 10px 0 0;
  @media (max-width: 1300px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    height: auto;
  }
`;
export const TitleCourse = styled.p`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 20px;
  }
  @media (max-width: 400px) {
    font-size: 16px;
  }
`;
export const Subtitle = styled.p`
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 10px;
  }
`;
export const CourseInfo = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  .row-costum {
    display: flex;
    gap: 2%;
  }
  .row-costum label {
    width: 32%;
    justify-content: flex-end;
    padding-right: 0;
  }
`;
export const InputText = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #6717cd;
  font-family: "Montserrat", sans-serif;
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

export const RowCard = styled(Row)`
  font-size: 14px;
  color: #6717cd;
  font-family: "Montserrat", sans-serif;
  label {
    margin-bottom: 0;
  }
  input.form-control {
    border: 1px solid #6717cd;
    border-radius: 20px;
    padding: 10px 0px 10px 20px;
    font-size: 14px;
    font-weight: 300;
    font-family: "Raleway", sans-serif;
  }
  input.form-control:focus {
    outline: 1px solid #8e2de2;
  }
  input.form-control::placeholder {
    color: #000 !important;
    opacity: 0;
  }
  @media (max-width: 767px) {
    .col-md-4:nth-child(2) {
      margin-top: -14px;
    }
  }
`;

export const Input = styled.input`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  padding: 10px 0 10px 20px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  outline: none;
  :focus {
    border: 2px solid #6717cd;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
export const InputCard = styled(InputMask)`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  padding: 10px 0 10px 20px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  outline: none;
  :focus {
    border: 2px solid #6717cd;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
export const InputContain = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 15px;
  }
`;
export const AlertIcon = styled.i`
  background-image: url(../images/tip.svg);
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
  background-position: center;
`;
export const Text = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #6717cd;
  font-family: "Raleyway", sans-serif;
  font-weight: 600;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
export const Text2 = styled.p`
  font-size: 14px;
  font-family: "Raleyway", sans-serif;
  font-weight: 600;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
export const Text3 = styled.p`
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const BotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
export const PurchaseText = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-family: "Raleyway", sans-serif;
  font-weight: 600;
  margin: 0;
  @media (max-width: 400px) {
    font-size: 10px;
  }
`;
export const PurchaseData = styled.span`
  align-items: center;
  font-size: 14px;
  font-family: "Raleyway", sans-serif;
  font-weight: 400;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 12px;
  }
  @media (max-width: 400px) {
    font-size: 10px;
  }
`;
export const InfoCard = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
export const PurchaseContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: gray;
  border-radius: 15px;
`;
const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;
export const LoaderContainSpinner = styled.div`
  box-sizing: border-box;
  display: block;
  width: 30px;
  height: 30px;
  margin: auto;
  border-width: 9px;
  border-style: solid;
  border-radius: 50%;
  border-color: #6717cd transparent transparent;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;
