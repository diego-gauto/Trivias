import { ModalHeader } from "react-bootstrap";

import styled from "styled-components";

import Image from "next/image";

export const ModalContain = styled.div`
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const ModalCont = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: right;
  padding: 20px;
  gap: 40px;
  @media(max-width: 870px) {
    padding: 1%;
    justify-content: center;
  }
`;
export const Title = styled(ModalHeader)`
  font-size:24px;
  font-family:'Montserrat',sans-serif;
  border:none;
  padding:10px;
  @media(max-width: 870px) {
    font-size:18px;
  }
`;
export const ModalPay = styled.div`
  display:flex;
  gap: 40px;
  @media(max-width: 870px) {
    flex-direction:column;
  }
`;
export const CardTextContainer = styled.p`
  display:flex;
  justify-content:center;
  @media(max-width: 870px) {
    flex-direction:column;
  }
`;
export const CardText = styled.p`
  display:flex;
  font-size: 16px;
  font-weight: 600;
  margin-left:5px;
  justify-content:center;
  font-family:'Montserrat',sans-serif;
  @media(max-width: 870px) {
    margin-left:0;
    margin-top:-15px;
    width:100%;
  }
`;
export const PaymentIcon = styled.div`
  display: flex;
  margin-top:-20px;
  margin-bottom:-20px;
  justify-content:center;

  @media(max-width: 870px) {
    margin-bottom:0;
    margin-right:-100px;
  }

`;
export const PaymentIcon2 = styled.div`
  display: flex;
  margin-bottom:-20px;
  margin-top:-20px;
  @media(max-width: 870px) {
    margin-bottom:-5px;
  }
`;
export const PaymentMethod = styled.div`
  height:140px;
  width:100%;
  display: flex;
  flex-direction: column;
  border-radius:10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  @media(max-width: 870px) {
    width:160px;
    height:165px;
    align-items:center;
  }
`;
export const PaymentMethod2 = styled.div`
  display: flex;
  align-items:center;
  border-radius:10px;
    @media(max-width: 870px) {
      width:140px;
      & div:first-child {
        display:none;
      }
    }
`;
export const ModalPayment = styled.div`
  display:flex;
  width:40%;
  gap:40px;
  flex-direction: column;
  @media(max-width: 870px) {
    width: 250px;
  }
`;
export const ModalForm = styled.div`
  display:flex;
  width:60%;
  border-radius: 10px;
  padding:20px;
  @media(max-width: 870px) {
    width:100%;
  }
`;
export const Inputs = styled.div`
  display:flex;
  width:100%;
  flex-direction:column;
  gap:20px;
`;
export const InputInfo = styled.div`
  display:flex;
  width:100%;
  flex-direction:column;
`;
export const AddText = styled.label`
  font-size: 14px;
  width: 417px;
  height: 84px;
  color: background: #000000;
  font-family:'Montserrat',sans-serif;
  margin-bottom: 3%;
  @media(max-width: 870px) {
  }
  
`;
export const AlertMsg = styled.label`
  font-size: 14px;
  color: #6717CD;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 3%;
  @media(max-width: 870px) {
    width: 300px;
  }
`;
export const AlertCont = styled.label`
  display: flex;
`;
export const AlertIcon = styled.label`
  background-image: url(../images/ExIcon.svg);
  background-repeat: no-repeat;
  width: 19.5px;
  height: 19.5px;
  margin-right: 7.25px;
  @media(max-width: 870px) {
    width: 20px;
    height: 19.5px;
  }
`;
export const ModalInput = styled.input`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding:10px 0 10px 20px;
  border:1px solid #6717CD;
  border-radius:20px;
`;
export const BottomInputs = styled.div`
  display:flex;
  gap:20px;
   @media(max-width: 870px) {
    flex-direction:column;
  }
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: right;
  margin-top: -60px;
  @media(max-width: 870px) {
    justify-content: center;
    margin-bottom: 25px;
    margin-top: -125px;
  }
`;
export const PurpleButton = styled.button`
  background-color: #6717CD;
  color: #fff;
  width: 137px;
  padding-block: 15px;
  padding-inline: 25px;
  border-radius: 30px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;