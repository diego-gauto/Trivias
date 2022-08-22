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
  width: 5000px;
`;
export const ModalCont = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
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
    margin-bottom: 3%;
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
  max-width: 278px;
  max-height: 278px;
  position: relative;
  border-radius: 10px;
  cursor: pointer;
  @media(max-width: 870px) {
    margin-bottom:0;
    margin-top:-60px;
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
  text-align: justify;
  color: background: #000000;
  font-family:'Montserrat',sans-serif;
  margin-bottom: 3%;
  @media(max-width: 870px) {
    width: 320px;
    height: 126px;
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
export const RewardText = styled.label`
  font-size: 14px;
  color: #6717CD;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 3%;
  text-align: center;
  @media(max-width: 870px) {
    position: absolute;
    top: 40%;
    left: 23%;
  }
`;
export const AlertCont = styled.label`
  display: flex;
`;
export const TextClaim = styled.p`
  font-size: 14px;
  font-family: 'Raleway';
  font-weight: 600;
  margin: 0;
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
  justify-content: space-between;
  margin-top: -60px;
  @media(max-width: 870px) {
    justify-content: center;
    margin-bottom: 25px;
    margin-top: -125px;
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  gap: 10px;
  height: fit-content;
  align-items: center;
`;
export const PurpleButton = styled.button`
  background-color: #6717CD;
  color: #fff;
  padding-block: 10px;
  padding-inline: 25px;
  height: fit-content;
  border-radius: 100px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const TransparentButton = styled.button`
  background-color: white;
  color: #6717CD;
  padding-block: 10px;
  padding-inline: 25px;
  border-radius: 100px;
  border: 1px solid #6717CD;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const ImageReward = styled("i")<{path:any}>`
  background-image: url(${props=>props.path});
  background-repeat: no-repeat;
  background-position: center;
  min-height: 260px;
  min-width: 260px;
`;