import styled, { css } from "styled-components";

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
  gap: 40px;
  .reveal-arrows {
    .arrows {
      opacity: 0;
    }
    &:hover {
      .arrows {
        transition: 0.5s ease all;
        opacity: 1;
      }
    }
  }
  .line {
    margin-left: 60px;
    height: 1px;
    width: auto;
    background: #00000033;
    @media (max-width: 1023px) {
      margin-left: 30px;
    }
  }
  @media (max-width: 1023px) {
    gap: 20px;
    padding-inline: 0px;
  }
`;

export const Arrows = styled.div<{ side: string }>`
  display: flex;
  cursor: pointer;
  position: absolute;
  font-size: 45px;
  top: 30%;
  z-index: 10000;
  @media (max-width: 1023px) {
    display: none;
  }
  ${(props) =>
    props.side === "left" &&
    css`
      left: 10px;
    `}
  ${(props) =>
    props.side === "right" &&
    css`
      right: 10px;
    `}
`;
