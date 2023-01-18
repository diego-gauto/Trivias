import styled from "styled-components";

export const PreviewContain = styled.div`
  display: flex;
  flex-direction: Column;
  width: 100%;
  gap: 40px;
  background: #ede7f2;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @media (max-width: 1023px) {
    gap: 20px;
  }
`;
export const ModuleContain = styled.div`
  display: flex;
  flex-direction: Column;
  gap: 20px;
  @media (max-width: 1023px) {
    gap: 20px;
    padding-inline: 0px;
  }
`;
