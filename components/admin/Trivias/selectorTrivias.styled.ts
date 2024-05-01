import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3% 5% 3% 5%;
`;

export const ButtonContainer = styled.div`
  display: grid;
  place-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
  padding-bottom: 30px;
  width: 100%;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const OptionText = styled.div`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 27px;
  text-align: center;
  color: #520795;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
`;

export const SelectorTriviasButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 344.72px;
  height: 74px;
  border: 0;
  cursor: pointer;
  font-family: 'Montserrat';
  border-radius: 100px;
  background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
`;
