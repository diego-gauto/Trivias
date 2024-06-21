import styled from 'styled-components';

export const PurchaseNewContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-block: 30px;
  padding-inline: 15px;
  background: linear-gradient(135deg, #e0d9ea 0%, #f1ebfa 100%);
  min-height: 82vh;
  .actives {
    cursor: pointer;
    transition: 0.3s ease all;
    &:hover {
      opacity: 0.67;
    }
  }
  .fade {
    opacity: 0;
    pointer-events: none;
    cursor: unset;
    &:hover {
      opacity: 0;
    }
  }
  a {
    text-decoration: none;
    font-weight: 600;
    color: #9a1aff;
  }
  button {
    background-color: #9a1aff;
    border: none;
    border-radius: 100px;
    color: #fff;
    padding-block: 8px;
    padding-inline: 30px;
    font-weight: 600;
    font-size: 14px;
    transition: 0.3s ease all;
    &:hover {
      opacity: 0.67;
    }
  }
  button.type2 {
    border: 2px solid #9a1aff;
    background-color: transparent;
    justify-content: center;
    width: 60%;
    color: #9a1aff;
    display: flex;
    gap: 10px;
    align-items: center;
    svg {
      font-size: 1.2rem;
      transition: 0.4s ease all;
    }
    .rotate {
      transform: rotate(-180deg);
    }
  }
  button.type3,
  button:disabled {
    background-color: #9a1aff;
  }
  button:disabled.type3 {
    background-color: rgb(148 44 237 / 80%);
  }
  button:disabled {
    background-color: rgb(148 44 237 / 80%);
  }
  button.oxxo {
    background-color: #d8363e;
  }
  button.spei {
    background-color: #36d86d;
  }
  .paypal-disable {
    background-image: url('/images/purchase/paypal-white-text.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 75px 25px;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    label {
      font-size: 14px;
      color: #3f1168;
      font-weight: 300;
      text-align: start;
    }
  }
  input {
    padding-inline: 20px;
    border-radius: 100px;
    padding-block: 8px;
    border: 1px solid black;
    opacity: 0.77;
  }
  select {
    padding-inline: 20px;
    border-radius: 4px;
    padding-block: 8px;
  }
  .complete-contain {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 650px;
    padding-inline: 20px;
    background-color: #fff;
    padding-block: 40px;
    border-radius: 40px;
    align-self: center;
    .main-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 25px;
      width: 100%;
      text-align: center;
      .payment-container {
        display: flex;
        flex-direction: column;
        gap: 50px;
      }
      h2 {
        color: #9a1aff;
        margin: 0;
        font-size: 1.6rem;
        font-weight: 600;
      }
      p {
        margin: 0;
      }
      .description {
        font-weight: 500;
        font-size: 1rem;
      }
      .description-2 {
        font-weight: 600;
        font-size: 1rem;
      }
      .add-payment-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 35px;
        transition: 0.4s ease all;
        max-height: 0px;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        width: 100%;
        max-width: 600px;
        .description-text {
          color: #3f1168;
          text-align: start;
          font-weight: 500;
          font-size: 14px;
        }
        .button-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          gap: 10px;
          .box-container {
            display: flex;
            gap: 5px;
            align-items: center;
            padding-block: 20px;
            height: 84px;
            width: 100%;
            border: 1px solid black;
            justify-content: center;
            opacity: 0.77;
            cursor: pointer;
            p {
              width: 100px;
              text-align: start;
              font-size: 14px;
              color: black;
            }
            &:hover {
              background-color: #fcebff;
            }
          }
          .selected-box {
            background-color: #fcebff;
            border: 1px solid #9a1aff;
            opacity: 1;
            p {
              color: #9a1aff;
            }
          }
        }
        .card-container {
          display: flex;
          gap: 30px;
          width: 100%;
          justify-content: center;
          margin-inline: 40px;
          flex-wrap: nowrap;
          .left-side {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .input-container {
              input,
              select {
                width: 100%;
              }
              select {
                height: 100%;
                padding-inline: 5px;
                width: 60px;
              }
            }
            .inputs-column {
              display: flex;
              gap: 20px;
              input {
                width: 100%;
                border-radius: 4px;
              }
            }
          }
          .right-side {
            display: flex;
            margin-top: 20px;
            width: 50%;
            .card-img {
              display: flex;
              flex-direction: column;
              gap: 10px;
              align-items: start;
              padding: 40px;
              width: 300px;
              height: 200px;
              border-radius: 10px;
              background: linear-gradient(to bottom, #393d44 0%, #5b636b 100%);
              transition: 1s ease all;
              .square {
                background-color: #d9d9d9;
                border-radius: 6px;
                width: 50px;
                height: 33px;
              }
              .number {
                height: 21px;
              }
              .last-data {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                gap: 5px;
                .date {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
              }
              p {
                color: #a5a9ae;
                font-size: 14px;
              }
            }
            .background-checked {
              background: linear-gradient(to bottom, #ae47ff 0%, #9a1aff 100%);
              p {
                color: #fff;
              }
            }
          }
        }
      }
      .show-contain {
        max-height: 1350px;
        overflow: unset;
        opacity: 1;
        pointer-events: unset;
      }
    }
  }
  .security-info {
    width: 100%;
    font-size: 14px;
    text-align: start;
    .top {
      display: flex;
      align-items: flex-end;
      svg {
        width: 30px;
        height: 30px;
        color: #3f1168;
      }
      p {
        font-size: 20px;
        font-weight: bold;
        span {
          color: #942ced;
        }
      }
    }
  }
  .steps {
    margin: 0 20px 80px;
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
        font-size: 18px;
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
        font-size: 14px;
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
      @media (max-width: 400px) {
        right: -35px;
      }
      p {
        color: #942ced;
        font-size: 18px;
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
        font-size: 14px;
        font-weight: 500;
        @media (max-width: 520px) {
          font-size: 14px;
        }
      }
    }
    .circle {
      z-index: 2;
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
      width: 125px;
      border: 1.5px solid #9900ed;
      border-left: none;
      border-right: 1px solid #ede7f2;
      height: 5px;
      @media (max-width: 520px) {
        width: 170px;
      }
    }
  }
  .right-section {
    display: flex;
    justify-content: center;
    padding-inline: 20px;
    padding-block: 20px;
    width: 100%;
    .box {
      width: 100%;
      max-width: 450px;
      /* max-width: 295px; */
      position: relative;
      /*
      top: 95px;
      right: 20px;
      */
      display: flex;
      flex-direction: column;
      gap: 5px;
      background: rgb(148 44 237 / 30%);
      border-radius: 20px;
      padding: 20px 20px;
      .gonvar-subscription-container {
        display: flex;
        flex-direction: row;
        gap: 10px;
      }
      .title {
        text-align: center;
        font-size: 16px;
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
        grid-template-columns: 1fr;
        grid-gap: 10px;
        align-items: center;
        /* margin-bottom: 40px; */
        p {
          color: black;
          font-size: 14px;
          span {
            color: #8161aa;
            font-weight: bold;
          }
        }
        img {
          width: 70%;
          border-radius: 10px;
          justify-self: center;
        }
        @media screen and (max-width: 758px) {
          grid-template-columns: 1fr;
          justify-content: center;
          align-items: center;
          margin-bottom: 100px;
          img {
            width: 70%;
            border-radius: 10px;
            justify-self: center;
          }
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
        margin-top: 10px;
        .total {
          text-align: end;
          font-size: 22px;
          font-weight: bold;
          color: #e55c00;
          margin: 0;
          span {
            font-weight: 400;
            color: #e55c00;
          }
        }
      }
      .bg {
        background: #ffdd67;
        width: 25%;
        border-top-right-radius: 100%;
        height: 120px;
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom-left-radius: 20px;
      }
      .image {
        position: absolute;
        bottom: 0;
        left: 0;
        max-width: 50%;
        @media (max-width: 768px) {
          max-height: 40%;
        }
        @media (max-width: 1300px) {
          max-height: 100%;
        }
      }
    }
  }
  .white-space {
    visibility: hidden;
    min-width: 300px;
  }
  .hidden-image {
    display: block;
    /*
    @media screen and (max-height: 870px) and (min-width: 768px) {
      display: none;
    }
    */
  }
  @media screen and (max-height: 940px) and (min-width: 768px) {
    .hidden-image {
      display: none;
    }
    .info {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
  @media (max-width: 1300px) {
    .right-section {
      padding-inline: 5px;
      padding-block: 5px;
      .box {
        width: 100%;
        /* max-width: 295px; */
        position: relative;
        /*
      top: 95px;
      right: 20px;
      */
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: rgb(148 44 237 / 30%);
        border-radius: 20px;
        padding: 20px 20px;
      }
    }
    button {
      padding-block: 10px;
      padding-inline: 30px;
      font-size: 14px;
    }
    button.type2 {
      width: fit-content;
    }
    button.type3 {
      width: fit-content;
    }
    .complete-contain {
      padding-block: 30px;
      align-self: center;
      margin-left: 15px;
      max-width: 450px;
      .main-container {
        gap: 15px;
        width: 100%;
        .description {
          font-size: 1rem;
          br {
            display: none;
          }
        }
        .description-2 {
          font-size: 1rem;
        }
        .payment-container {
          gap: 30px;
          .edit {
            p {
              font-size: 1rem;
            }
          }
          .payment-method {
            img {
              width: 40px;
            }
            .dots {
              font-size: 1rem;
            }
            .text {
              font-size: 1rem;
            }
          }
        }
        .add-payment-container {
          gap: 30px;
          .card-container {
            flex-wrap: wrap;
            .right-side {
              width: fit-content;
            }
          }
          .description-text {
            font-size: 14px;
            text-align: justify;
          }
        }
      }
    }
  }
  @media (max-width: 750px) {
    .complete-contain {
      margin: 5px;
      width: 100%;
      flex-direction: column;
      background-color: white;
      padding-inline: 20px;
      padding-block: 20px;
      margin: 10px;
      align-self: center;
      .main-container {
        .description {
          padding-inline: 0;
        }
        .add-payment-container {
          .description-text {
            font-size: 12px;
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .button-container {
      grid-template-columns: 1fr;
      align-items: center;
      justify-items: center; /* adjusted */
      width: 75%;
      .box-container {
        width: 150px;
        p {
          font-size: 12px;
        }
      }
    }
    .complete-contain {
      .main-container {
        .add-payment-container {
          .card-container {
            flex-wrap: wrap;
          }
        }
      }
    }
  }
  @media (max-width: 480px) {
    .edit {
      width: 320px;
    }
    .complete-contain {
      margin: 5px;
      .main-container {
        .add-payment-container {
          gap: 15px;
          .button-container {
            width: 100%;
            .box-container {
              width: 100%;
              padding-left: 8px;
              p {
                font-size: 12px;
              }
            }
          }
          .card-container {
            gap: 15px;
            flex-wrap: wrap;
            .left-side {
              width: 90%;
              align-items: center;
              .input-container {
                width: 85%;
              }
              .inputs-column {
                input {
                  width: 80px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .complete-contain {
      order: 1; /* Cambia el orden de la primera tarjeta */
      align-self: center;
    }
    .right-section {
      order: 2; /* Cambia el orden de la segunda tarjeta */
    }
  }

  /* Dispositivos tablet */
  @media only screen and (min-width: 768px) and (max-width: 1301px) {
    display: grid;
    grid-template-columns: 3fr 2fr;
    justify-content: center;
    position: relative;
    .complete-contain {
      order: 1; /* Cambia el orden de la primera tarjeta */
      align-self: center; /* Centra verticalmente */
      justify-self: end;
    }
    .right-section {
      order: 2; /* Cambia el orden de la segunda tarjeta */
      position: fixed; /* Fija la posición */
      top: 20%;
      left: 62%;
      max-width: 295px;
    }
  }

  /* Dispositivos de escritorio */
  @media only screen and (min-width: 1300px) {
    flex-direction: row;
    justify-content: center;
    .complete-contain {
      order: 1; /* Cambia el orden de la primera tarjeta */
      align-self: center; /* Centra verticalmente */
      margin-right: 200px;
    }
    .right-section {
      order: 2; /* Cambia el orden de la segunda tarjeta */
      position: fixed; /* Fija la posición */
      max-width: 432px;
      top: 15%;
      left: 67%;
    }
    .info {
      grid-template-columns: 3fr 2fr;
      margin-bottom: 40px;
      padding-bottom: 20px;
    }
  }
`;
