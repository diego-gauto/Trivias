import styled, { css } from "styled-components";

export const SlideContainer = styled.div<{
  type: string;
  innerWidth: number;
}>`
  padding-left: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  &:first-child{
     padding-left: 20px;
  }
  // width: ${(props) => (props.innerWidth - 40) / 5}px;
  // @media (max-width: 1023px) {
  //   gap: 10px;
  // }
  // @media (max-width: 750px) {
  //   width: ${(props) => (props.innerWidth - 40) / 3}px;
  // }
  // @media (max-width: 450px) {
  //   width: ${(props) => (props.innerWidth - 100) / 2}px;
  // }
  p {a
    margin: 0;
  }
  .text-container {
    text-align: center;
    font-size: 12px;
    margin-block: 15px;
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
            (props.type == "certificates" ||
              props.type == "claim-certificates") &&
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
  .img-complete{
    // width: 85%;
    // min-height: 55%;
    // max-height: 55%;
    width: 250px;
    height: 250px;
    position: relative;
    cursor: pointer;
    .image-container {
      width: 100%;
      height: 100%;
    }
    .btn-contain{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      .btn-info{
        white-space: nowrap;
        padding-block: 8px;
        padding-inline: 20px;
        border-radius: 100px;
        border: none;
        z-index: 3;
        .text{
          font-size: 16px;
          font-weight: 600;
          color: #3f1168;
        }
      }

    }
    &:hover {
      .image-container{
        opacity: 0.5;
      }
      .btn-contain{
        opacity: 1;
      }
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
  .reward-info-container{
    display: flex; 
    flex-direction: column;
    width: 250px;
    font-size: 12px;
    .top{
      background-color: #dad3e5;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      p{
        color: #942ced;
        font-weight: 600;
        span{
          font-weight: 500;
        }
      }
      .about{
        font-weight: 500;
        color: #3f1168;
      }
    }
    .bottom{
      text-align: center;
      padding: 15px;
      background: #3f1168;
      color: white;
      margin-bottom: 30px;
      border-radius: 0 0 20px 20px;
      .rewards{
        font-weight: 600;
        color: #dd5900;
      }
      .months{
        font-weight: 600;
        color: #1bb87f;
      }
      .certificates{
        font-weight: 600;
        color: #524af5;
      }
    }
  }
`;
export const BackgroundSlide = styled.div<{ type: string }>`
  padding-top: 20px;
  .un-claimed {
    padding: 30px;
    font-weight: 500;
    font-size: 18px;
    color: #3f1168;
    @media (max-width: 550px) {
      font-size: 14px;
    }
    @media (max-width: 400px) {
      font-size: 10px;
    }
  }
`;
