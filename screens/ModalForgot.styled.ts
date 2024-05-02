import styled, { keyframes } from 'styled-components';

export const ForgotContain = styled.div`
  position: absolute;
  padding-inline: 20px;
  padding-block: 20px;
  border: 1px solid #fff;
  box-sizing: border-box;
  width: 100%;
  gap: 15px;
  max-width: 600px;
  min-height: 500px;
  background: transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 10px;
  backdrop-filter: blur(40px);
  backdrop-opactiy: 10px;
  font-family: Montserrat;
  @media (max-width: 530px) {
    padding-inline: 5px;
    padding-block: 5px;
    min-height: 430px;
    width: 93%;
  }
`;
export const Title = styled.div`
  font-family: Montserrat;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;
export const TextContain = styled.div`
  display: flex;
  padding-block: 20px;
  text-align: center;
  color: #fff;
`;
export const EmailContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;
`;
export const Text2 = styled.label`
  font-size: 18px;
  color: #3f1168;
  font-weight: 700;
`;
export const MessageContainer = styled.label`
  display: flex !important;
  font-family: Montserrat;
  height: 20px;
  font-size: 13px;
  padding-left: 3%;
  color: #aaff00;
  @media (max-width: 670px) {
    font-size: 12px;
    height: 25px;
  }
`;
export const TextInput = styled.input`
  background: #e7c9eb;
  border: 1px solid #942ced;
  border-radius: 20px;
  color: #3f1168;
  padding-left: 25px;
  font-weight: bold;
  line-height: 10px;
`;
export const PurpleButton2 = styled.button`
  background-color: #6717cd;
  color: #fff;
  height: 50px;
  width: 50%;
  border-radius: 30px;
  border: none;
  margin: 15px;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
const scale = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.03);
    background-color:  #5000b5;
  }
`;
export const PurpleButtonLoader = styled.div`
  display: flex;
  font-family: Montserrat;
  background-color: #6717cd;
  color: #fff;
  height: 50px;
  width: 50%;
  border-radius: 30px;
  border: none;
  margin: 15px;
  align-items: center;
  justify-content: center;
  animation: ${scale} 0.7s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;
export const ButtonContain = styled.div`
  display: flex;
  button {
    margin: auto;
    background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
    color: #fff;
    font-size: 16px;
    padding: 8px 25px;
    border-radius: 30px;
    border: none;
    font-weight: 700;
  }
`;
export const CloseButton = styled.button`
  background-color: #de5246;
  color: #fff;
  height: 50px;
  width: 50%;
  border-radius: 30px;
  border: none;
  &:hover {
    background-color: #db2c1d;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 670px) {
    margin-bottom: 20px;
  }
`;
