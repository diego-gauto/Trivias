import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  .certificate-container {
    display: flex;
    gap: 20px;
    align-items: center;
    width: 100%;
    p {
      margin: 0;
      color: #fff;
      font-weight: 500;
      font-style: italic;
    }
    button {
      background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
      color: #fff;
      border: none;
      width: 100%;
      padding: 5px 15px;
      p {
        animation-name: scale;
        animation-duration: 1.2s;
        animation-iteration-count: infinite;
        // transform: scale(1.1);
      }
    }
  }
`;
export const Container = styled.div`
  display: flex;
  gap: 20px;
`;
export const FirstContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1023px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    gap: 10px;
  }
`;
export const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 40px;
  @media (max-width: 1023px) {
    display: none;
  }
`;
