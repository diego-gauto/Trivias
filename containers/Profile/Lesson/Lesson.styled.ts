import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Container = styled.div`
  display: flex;
  gap: 20px;
`;
export const FirstContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 20px;
`;
export const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 40px;
`;