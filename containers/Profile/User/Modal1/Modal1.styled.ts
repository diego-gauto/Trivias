import { ModalHeader } from 'react-bootstrap';
import styled from 'styled-components';

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
  padding: 20px;
  gap: 40px;
`;
export const Title = styled(ModalHeader)`
  font-size:24px;
  font-family:'Montserrat',sans-serif;
  border:none;
  padding:0;
`;
export const ModalPay = styled.div`
  display:flex;
  gap: 40px;
`;
export const CardText = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family:'Montserrat',sans-serif;
`;
export const PaymentIcon = styled.div`
  display: flex;
  gap: 20px;
`;
export const PaymentMethod = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  width: 100%;
  padding-block:20px;
  border-radius:10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const ModalPayment = styled.div`
  display:flex;
  width:40%;
  gap:40px;
  flex-direction: column;
`;
export const ModalForm = styled.div`
  display:flex;
  width:60%;
  border-radius: 10px;
  padding:20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const Inputs = styled.div`
  display:flex;
  width:100%;
  flex-direction:column;
  gap:10px;
`;
export const InputInfo = styled.div`
  display:flex;
  width:100%;
  flex-direction:column;
`;
export const AddText = styled.label`
  font-size: 14px;
  color: #6717CD;
  font-family:'Montserrat',sans-serif;
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
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export const PurpleButton = styled.button`
  background-color: #6717CD;
  color: #fff;
  width: 200px;
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