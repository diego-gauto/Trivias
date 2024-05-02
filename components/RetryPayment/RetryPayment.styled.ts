import styled from 'styled-components';

export const RetryPaymentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-block: 30px;
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
  button.type3 {
    width: 50%;
  }
  button.oxxo {
    background-color: #d8363e;
  }
  button.spei {
    background-color: #36d86d;
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
    width: auto;
    padding-inline: 20px;
    background-color: #fff;
    padding-block: 60px;
    border-radius: 40px;
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
        gap: 50px;
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
          display: flex;
          justify-content: space-between;
          width: 100%;
          gap: 20px;
          .box-container {
            display: flex;
            gap: 10px;
            align-items: center;
            padding-block: 20px;
            height: 84px;
            border: 1px solid black;
            justify-content: center;
            opacity: 0.77;
            width: 180px;
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
          margin-inline: 40px;
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
        max-height: 1050px;
        overflow: unset;
        opacity: 1;
        pointer-events: unset;
      }
    }
  }
  @media (max-width: 1300px) {
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
      .main-container {
        gap: 15px;
        width: unset;
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
            // align-items: center;
            // flex-direction: column;
            .right-side {
              width: fit-content;
            }
          }
          .description-text {
            font-size: 14px;
            text-align: justify;
            padding-inline: 20px;
          }
        }
      }
    }
  }
  @media (max-width: 750px) {
    .complete-contain {
      width: 100%;
      flex-direction: column;
      background-color: transparent;
      padding-inline: 20px;
      padding-block: 0px;
      .main-container {
        .description {
          width: 350px;
        }
        .add-payment-container {
          .description-text {
            font-size: 16px;
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .card-container {
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .button-container {
      scale: 0.7;
      width: auto !important;
    }
  }
  @media (max-width: 480px) {
    .edit {
      width: 320px;
    }
    .complete-contain {
      .main-container {
        .add-payment-container {
          gap: 15px;
          .button-container {
            .box-container {
              width: 150px;
              p {
                font-size: 12px;
              }
            }
          }
          .card-container {
            gap: 15px;
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
`;
