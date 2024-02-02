import styled from "styled-components";

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
    &:hover {
      opacity: 0.67;
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
    padding-block: 12px;
    padding-inline: 50px;
    font-weight: 600;
    &:hover {
      opacity: 0.67;
    }
  }
  button.type2 {
    border: 2px solid #9a1aff;
    background-color: transparent;
    padding-inline: 200px;
    color: #9a1aff;
    display: flex;
    gap: 10px;
    align-items: center;
    svg {
      font-size: 1.2rem;
    }
  }
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    padding-block: 60px;
    width: 85%;
    background-color: #fff;
    border-radius: 40px;
    text-align: center;
    .payment-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 25px;
      .payment-method {
        display: flex;
        gap: 10px;
        align-items: center;
        img {
          width: 50px;
        }
        p {
          color: black;
        }
        .dots {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 10px;
        }
        .text {
          font-size: 1.3rem;
          font-weight: 500;
        }
      }
      .edit {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        width: 400px;
        align-items: center;
        p {
          color: #9a1aff;
          font-size: 1.2rem;
          font-weight: 400;
        }
        .default {
          display: flex;
          gap: 10px;
          align-items: center;
          .input-radio {
            display: flex;
            width: 30px;
            height: 20px;
            border-radius: 100px;
            background-color: gray;
            position: relative;
            transition: 0.4s ease all;
            .dot {
              position: absolute;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background-color: white;
              top: 1px;
              left: 1px;
            }
            cursor: pointer;
          }
          .selected-radio {
            background-color: #9a1aff;
            .dot {
              left: 11px;
            }
          }
          p {
            color: #3f1168;
          }
        }
        .right {
          display: flex;
          gap: 10px;
        }
      }
    }
    h2 {
      color: #9a1aff;
      margin: 0;
      font-size: 1.6rem;
      font-weight: 600;
    }
    p {
      color: #3f1168;
      margin: 0;
    }
    .description {
      font-weight: 500;
      font-size: 1.4rem;
    }
    .description-2 {
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
`;
