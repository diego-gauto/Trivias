import { ModalHeader } from "react-bootstrap";

import styled from "styled-components";

export const ForgotContain = styled.div`
  position: absolute;
  padding-inline: 20px;
  padding-block:20px;
  border: 1px solid #fff;
  box-sizing: border-box;
  width:100%;
  gap: 15px;
  max-width:600px;
  min-height:500px;
  background:transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 10px;
  backdrop-filter: blur(40px);
  backdrop-opactiy:10px;
  font-family: Montserrat;
  @media (max-width: 530px) {
    padding-inline: 5px;
    padding-block: 5px;
    min-height: 430px;
    width: 93%;
  }
`;
export const Title = styled(ModalHeader)`
font-family: Montserrat;
color: #fff;
font-style: normal;
font-size: 36px;
justify-content: center;
text-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
font-family: Montserrat;
@media (max-width: 670px) {
  font-size:25px;
  margin-top: 5%;
}
`;
export const TextContain = styled.div`
  display: flex;
  //padding-inline: 40px;
  padding: 40px;
  justify-content: center;
  text-align: center;
  color: #fff;
  @media (max-width: 670px) {
    padding: 25px;
  }
`;
export const EmailContain = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: 70px;
  width: 100%;
  @media (max-width: 670px) {
    width: 100%;
    padding-inline: 25px;
  }
`;
export const Text2 = styled.label`
  font-size: 14px;
  color: #fff;
  opacity: .8;
  @media (max-width: 670px) {
    font-size: 12px;
  }
`;
export const TextInput = styled.input`
  color: #fff;
  outline: none;
  opacity: .8;
  border: 1px solid white;
  width: 100%;
  height: 40px;
  background:transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 20px;
  padding: 0 0 0 20px;
  font-size: 14px;
  ::placeholder{
    color: #adadac;
  }
  @media (max-width: 670px) {
    font-size: 12px;
  }
`; 
export const PurpleButton2 = styled.button`
  background-color: #6717CD;
  color: #fff;
  height: 50px;
  width: 50%;
  border-radius: 30px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const ButtonContain = styled.div`
  display:flex;
  justify-content:center;
  width: 100%;
  padding: 20px;
  @media (max-width: 670px) {
    padding: 15px;
  }
`;
export const CloseButton = styled.button`
  background-color: #de5246;
  color: #fff;
  height: 50px;
  width: 50%;
  border-radius: 30px;
  border:none;
  &:hover{
    background-color: #db2c1d;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
