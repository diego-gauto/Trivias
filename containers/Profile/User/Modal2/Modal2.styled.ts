import { ModalHeader } from 'react-bootstrap';

import styled, { css } from 'styled-components';

export const Modal2Contain = styled.div`
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
  gap: 15px;
`;
export const Title = styled(ModalHeader)`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  border: none;
  padding: 0;
`;
export const Membership = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media (max-width: 870px) {
    flex-direction: column;
  }
`;
export const MemberText = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const RenewalText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
export const PayMethod = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 870px) {
    flex-direction: column;
    justify-content: right;
    & :last-child {
      justify-content: center;
      margin-top: 5%;
    }
  }
`;
export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 870px) {
    align-items: flex-end;
  }
`;
export const CardText = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media (max-width: 870px) {
    margin-bottom: 4px;
  }
`;
export const CardIconResp = styled('i')<{ brand: any }>`
  ${(props) =>
    props.brand == 'visa' &&
    css`
      background-image: url(../images/visa-icon.png);
    `}
  ${(props) =>
    props.brand == 'mastercard' &&
    css`
      background-image: url(../images/mastercard-icon.png);
    `}
  ${(props) =>
    props.brand == 'amex' &&
    css`
      background-image: url(../images/amex-icon.png);
    `}
  
  background-repeat:no-repeat;
  width: 59px;
  height: 33px;
  background-position: center;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const ChangeMethod = styled.p`
  display: flex;
  color: #6717cd;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  cursor: pointer;
`;
export const NewMethod = styled.p`
  display: flex;
  color: #6717cd;
  font-size: 10px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  cursor: pointer;
`;
export const VisaIcon = styled.i`
  background-image: url(../images/Visa.svg);
  background-repeat: no-repeat;
  height: 33px;
  width: 47px;
  background-position: center;
`;
export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
export const PurpleButton = styled.button`
  background-color: #6717cd;
  color: #fff;
  border-radius: 30px;
  padding-block: 15px;
  padding-inline: 25px;
  border: none;
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
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
