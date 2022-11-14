import { ModalHeader } from "react-bootstrap";
import InputMask from "react-input-mask";
import styled from "styled-components";

export const ModalContain = styled.div`
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const ModalCont = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
`;
export const Title = styled(ModalHeader)`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  border: none;
  padding: 0;
`;
export const ModalPay = styled.div`
  display: flex;
  gap: 40px;
  margin-left: 20%;
  @media (max-width: 990px) {
    flex-direction: column;
    margin-left: 0%;
  }
`;
export const CardTextContainer = styled.p`
  display: flex;
  justify-content: center;
  @media (max-width: 990px) {
    flex-direction: column;
  }
`;
export const CardText = styled.p`
  display: flex;
  font-size: 16px;
  font-weight: 600;
  margin-left: 5px;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  @media (max-width: 990px) {
    margin-left: 0;
    margin-top: -15px;
    width: 100%;
  }
`;
export const PaymentIcon = styled.div`
  display: flex;
  //margin-right:-40px;
  margin-top: -20px;
  margin-bottom: -20px;
  justify-content: center;
  @media (max-width: 990px) {
    margin-bottom: 0;
  }
`;
export const PaymentIcon2 = styled.div`
  display: flex;
  margin-bottom: -20px;
  margin-top: -20px;
  @media (max-width: 990px) {
    margin-bottom: -5px;
  }
`;
export const PaymentMethod = styled.div`
  height: 140px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  @media (max-width: 990px) {
    width: 160px;
    height: 165px;
    align-items: center;
  }
`;
export const PaymentMethod2 = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  @media (max-width: 990px) {
    width: 140px;
    & div:first-child {
      display: none;
    }
  }
`;
export const ModalPayment = styled.div`
  display: flex;
  width: 40%;
  gap: 40px;
  flex-direction: column;
  @media (max-width: 990px) {
    flex-direction: row;
    width: 100%;
  }
`;
export const ModalForm = styled.div`
  display: flex;
  width: 70%;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  @media (max-width: 990px) {
    width: 100%;
  }
`;
export const Inputs = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;
export const InputInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
export const AddText = styled.label`
  font-size: 14px;
  color: #6717cd;
  font-family: "Montserrat", sans-serif;
`;
export const ModalInput = styled.input`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  padding: 10px 0 10px 20px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  outline: none;
  :focus {
    border: 2px solid #8e2de2;
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
    border: 2px solid #8e2de2;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
export const BottomInputs = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 990px) {
    flex-direction: column;
  }
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export const PurpleButton = styled.button`
  background-color: #6717cd;
  color: #fff;
  width: 200px;
  padding-block: 15px;
  padding-inline: 25px;
  border-radius: 30px;
  border: none;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
