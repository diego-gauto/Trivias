import styled from 'styled-components';

export const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  .payment-method {
    display: flex;
    gap: 10px;
    align-items: center;
    img {
      width: 30px;
    }
    p {
      color: black;
    }
    .dots {
      font-size: 1rem;
      font-weight: 600;
      margin-top: 10px;
    }
    .text {
      font-size: 1rem;
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
        height: 21px;
        border-radius: 100px;
        background-color: gray;
        position: relative;
        transition: 0.2s ease all;
        .dot {
          position: absolute;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background-color: white;
          top: 2px;
          left: 2px;
          transition: 0.2s ease all;
        }
        cursor: pointer;
      }
      .selected-radio {
        background-color: #9a1aff;
        .dot {
          left: 10px;
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
  @media (max-width: 991px) {
    gap: 15px;
  }
`;
