import styled, { css } from "styled-components";

export const SlideContainer = styled.div<{ type: string; innerWidth: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: relative;
  flex-shrink: 0;
  width: ${(props) => (props.innerWidth - 40) / 5}px;
  
  @media (max-width: 1023px) {
    gap: 10px;
  }
  @media (max-width: 750px) {
    width: ${(props) => (props.innerWidth - 40) / 3}px;
  }
  @media (max-width: 450px) {
    width: ${(props) => (props.innerWidth - 100) / 2}px;
  }
  p {a
    margin: 0;
  }
  .text-container {
    text-align: center;
    font-size: 12px;
    @media (max-width: 1023px) {
      font-size: 10px;
    }
    .title-text {
      font-weight: 600;
      color: #3f1168;
      line-height: 15px;
      @media (max-width: 1023px) {
        line-height: 12px;
      }
      span {
        font-weight: 800;
        ${(props) =>
          (props.type == "points" || props.type == "claim-points") &&
          css`
            color: #dd5900;
          `}
        ${(props) =>
          (props.type == "months" || props.type == "claim-months") &&
          css`
            color: #1bb87f;
          `}
          ${(props) =>
            props.type == "certificates" &&
            css`
              color: #524af5;
            `}
      }
    }
    .about-text {
      line-height: 12px;
      font-weight: 600;
      background: linear-gradient(to right, #42126c, #922cea);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      @media (max-width: 1023px) {
        line-height: 10px;
      }
    }
  }
  .image-container {
    width: 85%;
    min-height: 55%;
    max-height: 55%;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  .info {
    font-size: 12px;
    padding: 10px;
    border: none;
    border-radius: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export const BackgroundSlide = styled.div<{ type: string }>`
  padding-top: 20px;
`;
