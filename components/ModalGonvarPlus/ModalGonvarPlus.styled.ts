import styled from "styled-components";

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
  }
  .img-hand-paint {
    width: 300px;
    position: absolute;
    bottom: 0;
    right: -70px;
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
    .first-container {
      display: flex;
      gap: 30px;
      .text-contain {
        .text {
          font-size: 20px;
          font-weight: 600;
          color: #3f1168;
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
      }
    }
    .second-container {
      .title {
        font-size: 20px;
        color: #d7d7d6;
        font-weight: 500;
        letter-spacing: 3px;
        text-shadow: 0px 1px 4px black;
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
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    .first-container {
      display: flex;
      .text {
        font-size: 16px;
        font-weight: 500;
        color: #3f1168;
        line-height: 16px;
        text-align: center;
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
      .text {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 3px;
        color: white;
        font-weight: 500;
        text-shadow: 0px 1px 7px black;
      }
      .chevron-down {
        font-size: 20px;
        color: white;
        filter: drop-shadow(0 0 5px black);
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
  .main-title {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    position: relative;
    .text-title {
      font-size: 16px;
      font-weight: 500;
      color: #3f1168;
      text-align: center;
      span {
        font-weight: 800;
      }
      .span2 {
        color: #c96409;
      }
      .span3 {
        color: #ff9b00;
        font-size: 24px;
        span {
          font-size: 14px;
          font-weight: 500px;
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
      }
      .left-text {
        position: absolute;
        right: 0;

        .text {
          text-align: end;
          font-size: 12px;
          font-weight: 600;
          color: #3f1168;
          line-height: 14px;
          .span1 {
            color: #ff9b00;
          }
          .span2 {
            font-size: 14px;
            font-weight: 800;
          }
        }
      }
    }
    .cards {
      width: 100%;
      top: 158px;
      position: absolute;
      display: flex;
      justify-content: space-between;
      .card-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        .index {
          font-size: 24px;
          font-weight: 800;
          color: #9900ed;
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
          }
          .plus-icon {
            color: #d244d1;
            font-size: 20px;
            margin-inline: auto;
          }
          .price-text {
            font-size: 15px;
            line-height: 18px;
            text-align: center;
            color: #a733e4;
            font-weight: 600;
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
  padding-inline: 30px;
  border-radius: 0 0 20px 20px;
  p {
    margin: 0;
  }
  .main-text {
    font-size: 16px;
    font-weight: 600;
    color: #3f1168;
    span {
      color: #d244d1;
    }
  }
  .courses {
    display: flex;
    justify-content: space-between;
  }
  .footer-text {
    display: flex;
    justify-content: center;
    .text-1 {
      text-align: center;
      font-size: 10px;
      font-weight: 500;
      color: gray;
      span {
        font-weight: 800;
      }
    }
  }
`;
export const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  img {
    width: 130px;
    border-radius: 10px;
  }
  .course-info {
    display: flex;
    flex-direction: column;
    .course-name {
      color: #a733e4;
      font-size: 10px;
      font-weight: 600;
    }
    .course-professor {
      color: #3f1168;
      font-size: 10px;
      font-weight: 500;
      span {
        font-weight: 800;
      }
    }
  }
`;
