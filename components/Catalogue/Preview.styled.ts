import Image from "next/image";
import styled from "styled-components";

export const PreviewContain = styled.div`
  display: flex;
  flex-direction: Column;
  gap: 40px;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const ModuleContain = styled.div`
  display: flex;
  flex-direction: Column;
  padding-inline: 20px;
  gap: 40px;
`;