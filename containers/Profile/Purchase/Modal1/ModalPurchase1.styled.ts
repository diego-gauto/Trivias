import { ModalHeader } from "react-bootstrap";
import styled from "styled-components";

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
  flex-direction: column;
  padding: 20px;
  gap: 40px;
`;
export const Title = styled(ModalHeader)`
  font-size: 24px;
  font-family:'Montserrat',sans-serif;
  border: none;
  padding: 0;
  @media(max-width: 424px){
    font-size: 20px;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
  @media(max-width: 424px){
    gap: 20px;
    padding: 10px;
  }
`;
export const CouponContain = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media(max-width: 424px){
    padding: 15px;
  }
`;
export const CouponText = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family:'Montserrat',sans-serif;
  margin: 0;
  @media(max-width: 424px){
    font-size: 14px;
  }
`;
export const DiscountText = styled.p`
  font-size: 14px;
  font-family:'Raleway',sans-serif;
  margin: 0;
  @media(max-width: 424px){
    font-size: 12px;
  }
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
  @media(max-width: 424px){
    font-size: 12px;
  }
`;
export const ModalInput = styled.input`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding:10px 0 10px 20px;
  border:1px solid #6717CD;
  border-radius:20px;
  :focus{
    outline: 1px solid #8E2DE2;
  }
  @media(max-width: 424px){
    font-size: 12px;
  }
`;
export const ButtonsDiv = styled.div`
  display: flex;
  justify-content:space-between;
  margin-bottom:20px;
`;
export const ButtonsDiv2 = styled.div`
  display: flex;
  justify-content:flex-end;
  margin-bottom:20px;
`;
export const PurpleButton = styled.button`
  background-color: #6717CD;
  color: #fff;
  border-radius: 30px;
  padding-block: 15px;
  padding-inline: 25px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
  @media(max-width: 424px){
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
  }
`;
export const DiscountApproved = styled.p`
  text-align:center;
  font-size: 18px;
  font-weight: 600;
  font-family:'Montserrat',sans-serif;
  margin: 0;
`;
export const TransparentButton = styled.button`
  background:white;
  color: #6717CD;
  border-radius: 30px;
  padding-block: 15px;
  padding-inline: 25px;
  border:1px solid #6717CD;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
  @media(max-width: 424px){
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
  }
`;