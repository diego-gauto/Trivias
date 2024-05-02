import styled, { css } from 'styled-components';

export const MainContainer = styled.div`
  background: #f8e4cc;
  padding-left: 40px;
  padding-block: 15px;
  color: #3f1168;
  * {
    margin: 0;
  }
  h2 {
    font-size: 16px;
    font-weight: bold;
  }
  p {
    font-size: 14px;
    span {
      font-weight: bold;
    }
  }
  .level-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const TextColor = styled.h6<{ level: any }>`
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-size: 14px;
  ${(props) =>
    props.level == 'Muy Fácil' &&
    css`
      color: #006ca8;
    `}
  ${(props) =>
    props.level == 'Fácil' &&
    css`
      color: #8c5098;
    `}
      ${(props) =>
    props.level == 'Intermedio' &&
    css`
      color: #ec7501;
    `}
    ${(props) =>
    props.level == 'Avanzado' &&
    css`
      color: #149e62;
    `}
      ${(props) =>
    props.level == 'Máster' &&
    css`
      color: #d22978;
    `}
`;
