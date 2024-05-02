import { ModalHeader } from 'react-bootstrap';

import styled from 'styled-components';

export const Modal3Contain = styled.div`
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
`;
export const Title = styled(ModalHeader)`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  border: none;
  padding: 0;
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export const Text = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const Expire = styled.p`
  font-size: 16px;
  color: #6717cd;
  font-weight: 600;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width: 870px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;
export const PurpleButton = styled.button`
  background-color: #6717cd;
  color: #fff;
  border-radius: 30px;
  padding-block: 15px;
  padding-inline: 25px;
  border: none;
  @media (max-width: 870px) {
    width: 133px;
    margin: 5px;
  }
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const TransparentButton = styled.button`
  background: white;
  color: #6717cd;
  border-radius: 30px;
  padding-block: 15px;
  padding-inline: 25px;
  border: 1px solid #6717cd;
  @media (max-width: 870px) {
    width: 133px;
    margin: 5px;
  }
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
