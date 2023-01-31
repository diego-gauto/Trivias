import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const ModalContainer = styled(Modal)`
  padding-right: 0px !important;
  padding-left: 0px !important;
`;
export const BackgroundContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  p {
    margin: 0;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 20px;
    color: #3f1168;
    cursor: pointer;
    z-index: 5;
    @media (max-width: 991px) {
      font-size: 18px;
    }
  }
  .img-background {
    width: 100%;
    height: auto;
  }
  .img-hand-phone {
    width: 260px;
    position: absolute;
    bottom: 0;
    left: -90px;
    @media (max-width: 991px) {
      width: 195px;
    }
    @media (max-width: 550px) {
      width: 140px;
      left: -35px;
    }
    @media (max-width: 450px) {
      width: 115px;
      left: -35px;
    }
    @media (max-width: 400px) {
      width: 90px;
      left: -25px;
    }
  }
  .img-hand-paint {
    width: 300px;
    right: -70px;
    position: absolute;
    bottom: 0;
    @media (max-width: 991px) {
      width: 210px;
      right: -65px;
    }
    @media (max-width: 550px) {
      width: 160px;
      right: -35px;
    }
    @media (max-width: 450px) {
      width: 130px;
      right: -30px;
    }
    @media (max-width: 400px) {
      width: 100px;
      right: -20px;
    }
  }
  .upper-contain {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 40px;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    @media (max-width: 991px) {
      top: 15px;
      gap: 10px;
    }
    @media (max-width: 400px) {
      gap: 6px;
    }
    .first-container {
      display: flex;
      gap: 30px;
      .text-contain {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          width: 30px;
          @media (max-width: 550px) {
            width: 26px;
          }
          @media (max-width: 400px) {
            width: 22px;
          }
        }
        .text {
          font-size: 20px;
          font-weight: 600;
          color: #3f1168;
          @media (max-width: 991px) {
            font-size: 18px;
          }
          @media (max-width: 550px) {
            font-size: 16px;
          }
          @media (max-width: 400px) {
            font-size: 14px;
          }
        }
      }
      .subs-text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #3f1168;
        font-weight: 500;
        border: 1px solid #3f1168;
        padding-inline: 8px;
        border-radius: 100px;
        @media (max-width: 991px) {
          font-size: 12px;
        }
        @media (max-width: 550px) {
          font-size: 10px;
        }
        @media (max-width: 400px) {
          font-size: 8px;
        }
      }
    }
    .second-container {
      .title {
        font-size: 20px;
        color: #d7d7d6;
        font-weight: 500;
        letter-spacing: 3px;
        text-shadow: 0px 1px 4px black;
        @media (max-width: 991px) {
          font-size: 16px;
          letter-spacing: 2px;
        }
        @media (max-width: 550px) {
          font-size: 13px;
        }
        @media (max-width: 400px) {
          font-size: 11px;
        }
        span {
          font-weight: 800;
        }
      }
    }
  }
  .bottom-contain {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    position: absolute;
    width: 100%;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    @media (max-width: 991px) {
      bottom: 5px;
      gap: 10px;
    }
    @media (max-width: 400px) {
      gap: 6px;
    }
    .first-container {
      display: flex;
      .text {
        font-size: 16px;
        font-weight: 500;
        color: #3f1168;
        line-height: 16px;
        text-align: center;
        @media (max-width: 991px) {
          font-size: 14px;
        }
        @media (max-width: 550px) {
          font-size: 12px;
        }
        @media (max-width: 400px) {
          font-size: 10px;
          line-height: 10px;
        }
        span {
          font-weight: 800;
        }
      }
    }
    .second-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      width: fit-content;
      &:hover {
        .chevron-down {
          transition: 1s ease all;
          transform: scale(1.2);
        }
      }
      .text {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 3px;
        color: white;
        font-weight: 500;
        text-shadow: 0px 1px 7px black;
        @media (max-width: 991px) {
          font-size: 12px;
          line-height: 14px;
        }
        @media (max-width: 550px) {
          font-size: 10px;
          line-height: 12px;
        }
        @media (max-width: 400px) {
          line-height: 10px;
        }
      }
      .chevron-down {
        font-size: 20px;
        color: white;
        filter: drop-shadow(0 0 5px black);
        @media (max-width: 991px) {
          font-size: 18px;
        }
        @media (max-width: 550px) {
          font-size: 14px;
        }
        @media (max-width: 400px) {
          font-size: 10px;
        }
      }
    }
  }
`;
export const Middlecontainer = styled.div`
  background-color: #dad3e5;
  p {
    margin: 0;
  }
  padding-block: 30px 200px;
  padding-inline: 30px;
  @media (max-width: 550px) {
    padding-inline: 0;
  }
  @media (max-width: 510px) {
    padding-block: 30px 270px;
  }
  .main-title {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    position: relative;
    @media (max-width: 400px) {
      gap: 30px;
    }
    .text-title {
      font-size: 16px;
      font-weight: 500;
      color: #3f1168;
      text-align: center;
      @media (max-width: 991px) {
        font-size: 13px;
      }
      @media (max-width: 550px) {
        font-size: 10px;
      }
      @media (max-width: 400px) {
        font-size: 9px;
      }
      span {
        font-weight: 800;
      }
      .span2 {
        color: #c96409;
      }
      .span3 {
        color: #ff9b00;
        font-size: 24px;
        @media (max-width: 991px) {
          font-size: 20px;
        }
        @media (max-width: 550px) {
          font-size: 18px;
        }
        span {
          font-size: 14px;
          font-weight: 500px;
          @media (max-width: 550px) {
            font-size: 12px;
          }
          @media (max-width: 400px) {
            font-size: 10px;
          }
        }
      }
    }
    .bottom-container {
      display: flex;
      justify-content: center;
      position: relative;
      .start-button {
        padding-block: 10px;
        padding-inline: 20px;
        border-radius: 100px;
        color: white;
        border: none;
        background: linear-gradient(135deg, #942ced 0%, #cc42d4 100%);
        &:hover {
          transition: 1s ease all;
          transform: scale(1.1);
        }
        @media (max-width: 991px) {
          font-size: 14px;
        }
        @media (max-width: 550px) {
          font-size: 12px;
          padding-block: 5px;
          padding-inline: 10px;
        }
        @media (max-width: 400px) {
          font-size: 10px;
        }
      }
      .left-text {
        position: absolute;
        right: 0;
        @media (max-width: 991px) {
          bottom: 35px;
        }
        @media (max-width: 550px) {
          bottom: 20px;
          padding-right: 20px;
        }
        @media (max-width: 400px) {
          bottom: 25px;
        }
        .text {
          text-align: end;
          font-size: 12px;
          font-weight: 600;
          color: #3f1168;
          line-height: 14px;
          @media (max-width: 991px) {
            font-size: 10px;
            line-height: 12px;
          }
          @media (max-width: 550px) {
            font-size: 8px;
          }

          .span1 {
            color: #ff9b00;
          }
          .span2 {
            font-size: 14px;
            font-weight: 800;
            @media (max-width: 991px) {
              font-size: 12px;
            }
            @media (max-width: 400px) {
              font-size: 10px;
            }
          }
        }
      }
    }
    .cards {
      width: 100%;
      top: 158px;
      position: absolute;
      display: flex;
      gap: 50px;
      @media (max-width: 991px) {
        gap: 15px;
      }
      @media (max-width: 550px) {
        top: 120px;
        padding-inline: 10px;
      }
      @media (max-width: 510px) {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 25px;
      }
      .cards-position {
        display: flex;
        gap: 50px;
        @media (max-width: 991px) {
          gap: 15px;
        }
      }
      .card-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        @media (max-width: 510px) {
          gap: 5px;
        }
        .index {
          font-size: 24px;
          font-weight: 800;
          color: #9900ed;
          @media (max-width: 991px) {
            font-size: 20px;
          }
        }
        .second-index {
          color: #d244d1;
        }
        .third-index {
          color: #ff9b00;
        }
        .fourth-index {
          color: #6678f8;
        }
        .card-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 330px;
          background-color: white;
          padding: 20px;
          position: relative;
          border-radius: 0 0 20px 20px;
          max-width: 160px;
          @media (max-width: 991px) {
            padding-block: 15px;
            padding-inline: 10px;
            max-width: 100px;
            height: 270px;
          }
          @media (max-width: 510px) {
            max-width: 150px;
            height: 200px;
          }
          .divider {
            top: 0;
            left: 0;
            width: 100%;
            height: 8px;
            background-color: #9900ed;
            position: absolute;
          }
          .second-divide {
            background-color: #d244d1;
          }
          .third-divide {
            background-color: #ff9b00;
          }
          .fourth-divide {
            background-color: #6678f8;
          }
          .info-texts {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
          .first-text {
            font-size: 15px;
            line-height: 20px;
            font-weight: 800;
            color: #3f1168;
            @media (max-width: 991px) {
              font-size: 10px;
              line-height: 16px;
            }
            span {
              color: #ff9b00;
            }
            .span-small {
              font-size: 14px;
            }
          }
          .second-text {
            font-size: 13px;
            font-weight: 500;
            line-height: 14px;
            color: #3f1168;
            @media (max-width: 991px) {
              font-size: 8px;
              line-height: 12px;
            }
          }
          .plus-icon {
            color: #d244d1;
            font-size: 20px;
            margin-inline: auto;
            @media (max-width: 991px) {
              font-size: 16px;
            }
          }
          .price-text {
            font-size: 15px;
            line-height: 18px;
            text-align: center;
            color: #a733e4;
            font-weight: 600;
            @media (max-width: 991px) {
              font-size: 12px;
            }
            span {
              color: #ff9b00;
            }
          }
        }
      }
    }
  }
`;
export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ede7f2;
  padding-block: 220px 40px;
  border-radius: 0 0 20px 20px;
  @media (max-width: 991px) {
    padding-block: 180px 40px;
  }
  @media (max-width: 510px) {
    padding-block: 250px 40px;
  }
  p {
    margin: 0;
  }
  .main-text {
    font-size: 16px;
    font-weight: 600;
    color: #3f1168;
    padding-left: 30px;
    span {
      color: #d244d1;
    }
    @media (max-width: 400px) {
      font-size: 14px;
    }
    @media (max-width: 375px) {
      font-size: 12px;
    }
  }
  .courses {
    display: flex;
    gap: 20px;
    overflow: scroll;
    overflow-y: hidden;
  }
  .courses-2 {
    display: flex;
    gap: 20px;
  }
  .footer-text {
    display: flex;
    justify-content: center;
    .text-1 {
      text-align: center;
      font-size: 10px;
      font-weight: 500;
      color: gray;
      @media (max-width: 991px) {
        font-size: 8px;
      }
      @media (max-width: 400px) {
        font-size: 7px;
      }
      span {
        font-weight: 800;
      }
    }
  }
`;
export const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 130px;
  .image-contain {
    width: 130px;
    height: 72px;
    background-color: black;
    border-radius: 10px;
    position: relative;
    .btn-info {
      font-size: 12px;
      color: #3f1168;
      font-weight: 600;
      position: absolute;
      white-space: nowrap;
      padding-block: 5px;
      padding-inline: 8px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100px;
      border: none;
      z-index: 5;
      opacity: 0;
    }
    .img-course {
      width: 100%;
      border-radius: 10px;
      cursor: pointer;
    }
    &:hover {
      .img-course {
        opacity: 0.5;
      }
      .btn-info {
        opacity: 1;
      }
    }
  }
  .course-info {
    display: flex;
    flex-direction: column;
    .course-name {
      color: #a733e4;
      font-size: 10px;
      font-weight: 600;
      @media (max-width: 991px) {
        font-size: 8px;
      }
    }
    .course-professor {
      color: #3f1168;
      font-size: 10px;
      font-weight: 500;
      @media (max-width: 991px) {
        font-size: 8px;
      }
      span {
        font-weight: 800;
      }
    }
  }
`;
