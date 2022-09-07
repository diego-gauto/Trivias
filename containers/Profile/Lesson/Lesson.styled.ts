import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width:100%;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @media (max-width: 1023px) {
    padding-block: 20px;
    padding-inline: 10px;
  }
`;
export const Container = styled.div`
  display: flex;
  gap: 20px;
`;
export const FirstContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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