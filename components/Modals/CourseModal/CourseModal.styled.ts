import { Modal } from 'react-bootstrap';
import styled, { css } from 'styled-components';

export const ModalContain = styled.div`
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const ModalMod = styled(Modal)`
  // .modal-content {
  //   border-radius: 0px !important;
  // }
  padding-right: 0px !important;
  padding-left: 0px !important;
  @media (min-width: 992px) {
    .modal-lg,
    .modal-xl {
      --bs-modal-width: 66%;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding-inline: 20px;
  flex-direction: column;
  position: absolute;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-block-start: 10px;
    .tag {
      background: linear-gradient(135deg, #952ced 22%, #ca41d4 80%);
      color: #fff;
      border-radius: 30px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      padding: 4px 10px;
      letter-spacing: 2px;
      span {
        font-weight: 100;
        color: #ffffffa8;
      }
      @media (max-width: 1023px) {
        display: none;
      }
    }
    @media (max-width: 1023px) {
      justify-content: end;
    }
  }
  @media (max-width: 991px) {
    gap: 40px;
  }
  @media (max-width: 500px) {
    gap: 20px;
    padding-inline: 10px;
  }
  @media (max-width: 400px) {
    gap: 0px;
  }
`;
export const ContainerVideo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const ContainVideo = styled.div`
  display: flex;
  justify-content: center;
`;
export const CourseContain = styled.div<{ level: any }>`
  display: flex;
  padding: 40px;
  gap: 20px;
  background: #ede7f2;
  @media (max-width: 550px) {
    margin-top: 30px;
  }
  @media (max-width: 450px) {
    padding: 30px;
  }
  p {
    margin: 0;
    color: #3f1168;
    font-weight: 500;
    line-height: initial;
  }
  .title {
    font-size: 25px;
    @media (max-width: 500px) {
      font-size: 20px;
    }
    @media (max-width: 400px) {
      font-size: 18px;
    }
  }
  .responsive-top-info {
    border-bottom: 1px solid #80808063;
    display: flex;
    .left {
      border-right: 1px solid #80808063;
      flex: 1;
      border-bottom: none;
      display: flex;

      .professor-container {
        display: flex;
        align-items: center;
        gap: 10px;
        @media (max-width: 450px) {
          gap: 10px;
        }
        @media (max-width: 400px) {
          gap: 5px;
        }
        p {
          font-size: 12px;
          @media (max-width: 450px) {
            letter-spacing: 1px;
            font-size: 8px;
          }
          @media (max-width: 375px) {
            font-size: 6px;
          }
          span {
            font-weight: 600;
          }

          .name {
            font-size: 16px;
            letter-spacing: 0;
            @media (max-width: 450px) {
              font-size: 12px;
            }
            @media (max-width: 400px) {
              font-size: 10px;
            }
          }
        }
        img {
          width: 50px;
          border-radius: 50%;
          aspect-ratio: 1;
          object-fit: cover;
          @media (max-width: 450px) {
            width: 40px;
          }
          @media (max-width: 375px) {
            width: 35px;
          }
        }
        .tooltip {
          position: relative;
          display: contents;
        }
        .tooltiptext {
          visibility: hidden;
          width: 250px;
          background-color: #555;
          color: #fff;
          text-align: center;
          padding: 5px 0;
          border-radius: 6px;

          position: relative;
          z-index: 1;
          bottom: 60%;
          left: -15%;
          margin-left: -65px;

          opacity: 0;
          transition: opacity 0.3s;
        }
        .tooltiptext::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #555 transparent transparent transparent;
        }
        .tooltip:hover ~ .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      }
    }
    .right {
      flex: none;
      padding-left: 20px;
      gap: 0;
      @media (max-width: 450px) {
        padding-left: 15px;
      }
      @media (max-width: 400px) {
        padding-left: 10px;
      }
      .rating {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        @media (max-width: 450px) {
          font-size: 14px;
        }
        @media (max-width: 400px) {
          font-size: 12px;
        }
        .review-count {
          font-weight: 400;
          font-size: smaller;
        }
      }
      .time {
        color: #a733e4;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: -0.5px;
        @media (max-width: 450px) {
          font-size: 10px;
        }
        @media (max-width: 400px) {
          font-size: 9px;
        }
      }
      .duration {
        font-weight: 700;
        font-size: 14px;
        @media (max-width: 450px) {
          font-size: 12px;
        }
        @media (max-width: 400px) {
          font-size: 11px;
        }
      }
      button {
        border: 1px solid #ff9b00;
        border-radius: 20px;
        color: #ff9b00;
        background: none;
        font-size: 12px;
        font-weight: 700;
        width: fit-content;
        padding: 5px 20px;
        margin-block-start: 15px;
        @media (max-width: 550px) {
          margin-block: 8px;
        }
        @media (max-width: 450px) {
          font-size: 10px;
          padding: 5px 15px;
        }
        @media (max-width: 400px) {
          font-size: 10px;
          padding: 4px 12px;
        }
      }
    }
  }
  .left {
    flex: 0 35%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #80808063;
    @media (max-width: 990px) {
      border-right: none;
      border-bottom: 1px solid #80808063;
      padding-bottom: 20px;
    }
    @media (max-width: 450px) {
      padding-bottom: 15px;
      padding-right: 5px;
    }
    padding-right: 20px;
    .level-container {
      margin-block-start: 10px;
      margin-block-end: 20px;
      display: flex;
      gap: 10px;
      align-items: center;
      @media (max-width: 450px) {
        margin-block-start: 8px;
        margin-block-end: 12px;
        gap: 5px;
      }
      img {
        width: 17px !important;
        @media (max-width: 450px) {
          width: 15px !important;
        }
      }
      .difficulty-word {
        color: inherit;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 2px;
        @media (max-width: 450px) {
          font-size: 10px;
        }
      }
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
    }
    .time {
      color: #a733e4;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: -0.5px;
      @media (max-width: 450px) {
        font-size: 10px;
      }
      @media (max-width: 400px) {
        font-size: 9px;
      }
    }
    .duration {
      font-weight: 700;
      font-size: 14px;
      @media (max-width: 450px) {
        font-size: 12px;
      }
      @media (max-width: 400px) {
        font-size: 11px;
      }
    }
    button {
      border: 1px solid #ff9b00;
      border-radius: 20px;
      color: #ff9b00;
      background: none;
      font-size: 12px;
      font-weight: 700;
      width: fit-content;
      padding: 5px 20px;
      margin-block-start: 15px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    .bottom {
      @media (max-width: 991px) {
        p {
          text-align: justify;
        }
      }
      @media (max-width: 450px) {
        p {
          font-size: 12px;
          line-height: 14px;
        }
      }
    }
    .top {
      display: flex;
      gap: 30px;
      @media (max-width: 991px) {
        flex-direction: column-reverse;
        align-items: center;
      }
      .rating {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-right: 30px;
        border-right: 1px solid #80808063;
        @media (max-width: 991px) {
          border-right: none;
        }
        p {
          font-size: 28px;
          font-weight: 600;
          justify-content: center;
          flex-wrap: wrap;
          text-align: center;
          display: flex;
          align-items: center;

          .review-count {
            font-weight: 400;
            font-size: initial;
          }
        }
        svg {
          font-size: 25px;
        }
      }
      .professor-container {
        display: flex;
        gap: 10px;
        align-items: center;
        p {
          font-size: 12px;
          letter-spacing: 2px;
          span {
            font-weight: 600;
          }
          .name {
            font-size: 16px;
          }
        }
        img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 50%;
        }
        .tooltip {
          position: relative;
          display: contents;
        }
        .tooltiptext {
          visibility: hidden;
          width: 250px;
          background-color: #555;
          color: #fff;
          text-align: center;
          padding: 5px 0;
          border-radius: 6px;

          position: relative;
          z-index: 1;
          bottom: 60%;
          left: -15%;
          margin-left: -65px;

          opacity: 0;
          transition: opacity 0.3s;
        }
        .tooltiptext::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #555 transparent transparent transparent;
        }
        .tooltip:hover ~ .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
  @media (max-width: 991px) {
    flex-direction: column;
    z-index: 10;
    padding-top: 0;
  }
`;
export const Cross = styled.p`
  display: flex;
  color: #3f1168;
  justify-content: flex-end;
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  margin: 0;
  @media (max-width: 1023px) {
    color: #fff;
  }
`;
export const Description = styled.p`
  font-size: 18px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media (max-width: 990px) {
    font-size: 14px;
  }
`;
export const EpisodeContain = styled.div`
  display: flex;
  position: relative;
  width: 250px;
  img {
    border-radius: 20px;
  }
  @media (max-width: 990px) {
    width: 160px;
  }
`;
export const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: initial;
  color: #3f1168;
  font-weight: 500;
  font-size: 18px;
  justify-content: center;
`;
export const EpisodeTime = styled.p`
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media (max-width: 990px) {
    font-size: 14px;
  }
`;
export const EpisodeTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  @media (max-width: 990px) {
    font-size: 16px;
  }
`;
export const ImageBack = styled.img`
  width: 100%;
  height: auto;
  @media (max-width: 990px) {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  @media (max-width: 550px) {
    width: 100%;
    height: auto !important;
    margin-top: 0;
    margin-bottom: auto;
  }
`;
export const LessonContain = styled.div`
  background: #e7e1ee;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-block: 40px;
  padding-left: 40px;
  padding-right: 80px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  @media (max-width: 990px) {
    padding-inline: 40px;
  }
  @media (max-width: 450px) {
    padding-inline: 30px;
    padding-block: 30px;
  }
`;
export const LessonTitle = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  font-weight: 600;
  color: #3f1168;
  span {
    color: #a733e4;
  }
  @media (max-width: 990px) {
    font-size: 16px;
  }
`;
export const ModalBackground = styled.div`
  display: flex;
  position: relative;
  min-height: 270px;
  @media (max-width: 991px) {
    margin-bottom: 20px;
  }
  @media (max-width: 550px) {
    margin: 0;
  }
`;
export const ModalCont = styled.div`
  display: flex;
  flex-direction: column;
  background: #ede7f2;
`;
export const SeasonContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 520px) {
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }
`;
export const TextContainer = styled.div`
  display: flex;
  width: 100%;
  bottom: 40px;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;
  padding-block-end: 15px;
  @media (max-width: 991px) {
    padding-block-end: 8px;
  }
  @media (max-width: 450px) {
    padding-block-end: 4px;
  }
  p {
    color: white;
    margin: 0;
    line-height: initial;
  }
  .course {
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 6px;
  }
  .title {
    font-size: 28px;
    font-weight: 700;
    @media (max-width: 450px) {
      font-size: 24px;
    }
  }
  .price {
    color: #ff9b00;
    font-size: 20px;
    font-weight: 700;
  }

  button {
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    justify-content: center;
    padding-inline: 15px;
    padding-block: 8px;
    background: linear-gradient(135deg, #952ced 22%, #ca41d4 80%);
    color: #fff;
    border-radius: 100px;
    border: none;
    &:hover {
      background-color: #5000b5;
      transform: scale(1.03);
      transition: 0.5s ease all;
    }
    @media (max-width: 991px) {
      font-size: 12px;
      padding-block: 6px;
    }
    @media (max-width: 450px) {
      padding-block: 4px;
      font-size: 10px;
    }
  }
  .type-2 {
    background: #3f1168;
  }
`;
export const VideoContain = styled.div`
  display: flex;
  gap: 20px;
`;
export const InformationIcon = styled.label`
  font-family: 'Raleway', sans-serif;
  display: inline-block;
  font-size: 8px;
  font-weight: 500;
  text-transform: none;
  font-style: italic;
  line-height: 8px;
  letter-spacing: 3px;
  position: relative;
  top: -5px;
  border-radius: 100%;
  background-color: gray;
  color: white;
  height: 12px;
  width: 12px;
  text-align: center;
  padding-top: 2px;
  padding-left: 2px;
  left: 1px;
  @media (max-width: 1023px) {
    padding-left: 1px;
  }
  cursor: pointer;
  @media (max-width: 450px) {
    top: -2px !important;
    font-size: 6px;
    line-height: 6px;
    letter-spacing: 2px;
    height: 10px;
    width: 10px;
  }
  .info-box {
    display: none;
    position: absolute;
  }
  &:hover {
    .info-box {
      font-weight: 400;
      font-style: normal;
      display: block;
      width: 200px;
      background: gray;
      border-radius: 10px 10px 0px 10px;
      transform: translate(-99%, -110%);
      padding: 10px;
      text-align: left;
      font-size: 14px;
      line-height: 14px;
      color: white;
      letter-spacing: 1px;
      font-weight: 400;
      z-index: 3;
      @media (max-width: 990px) {
        left: 200px;
        border-radius: 10px 10px 10px 0px;
      }
      @media (max-width: 450px) {
        // transform: translate(-50%, -150%);
      }
    }
  }
`;
