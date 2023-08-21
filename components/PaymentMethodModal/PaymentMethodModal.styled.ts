import styled from "styled-components";

export const PaymentMethodModalContain = styled.div`
  display: flex;
  background-color: #ede7f2;
  position: relative;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #3f1168;
    margin: 0;
  }
  p {
    font-size: 14px;
    font-weight: 500;
    color: #3f1168;
    margin: 0;
    .light {
      color: #942ced;
    }
    .dark {
      color: #3f1168;
      font-weight: 600;
    }
  }
  .button-section {
    display: flex;
    justify-content: space-evenly;
    button {
      width: 140px;
      height: 40px;
      font-size: 12px;
      border-radius: 30px;
      border: none;
      background: #3f1168;
      color: #fff;
    }
  }
  .close-icon {
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    color: #3f1168;
  }
`;
