import styled from "styled-components";

export const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  // background-color: #ede7f2;
  padding-block: 10px;
  padding-inline: min(100px, 5%);
  .content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .left-content {
      display: flex;
      flex-direction: column;
      gap: 50px;
      width: 60%;
      @media (max-width: 1023px) {
        width: 100%;
      }
    }
    .right-content {
      display: flex;
      flex-direction: column;
      gap: 30px;
      width: 24%;
      @media (max-width: 1023px) {
        display: none;
      }
      .img-container {
        display: flex;
        justify-content: flex-end;
        img {
          border-radius: 10px;
          width: 180%;
          max-height: 300px;
          max-width: 500px;
        }
      }
    }
  }
`;
export const FirstSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 20px;
  }
  .title-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
    max-width: 90%;
    .title {
      font-size: 36px;
      font-weight: 600;
      margin: 0;
      @media (max-width: 600px) {
        font-size: 30px;
      }
    }
    .sub-title {
      font-size: 16px;
      font-weight: 500;
      margin: 0;
    }
    .date {
      font-size: 14px;
      font-weight: 500;
      margin: 0;
    }
    .socials {
      display: flex;
      align-items: center;
      margin-top: 20px;
      padding: 20px;
      gap: 50px;
      .content {
        position: relative;
        display: flex;
        width: fit-content;
        .copy-link-text {
          position: absolute;
          white-space: nowrap;
          font-size: 14px;
          top: 30px;
          right: 50%;
          z-index: 3;
          display: flex;
          gap: 3px;
          align-items: center;
          transform: translateX(50%);
          background-color: white;
          .icon-check {
            color: green;
          }
        }
        .text-display {
          transition: 0.1s ease all;
          position: absolute;
          font-size: 12px;
          top: 30px;
          white-space: nowrap;
          opacity: 0;
          margin: 0;
          right: 50%;
          transform: translateX(50%);
          color: #3f1168;
          font-weight: 600;
        }
        &:hover {
          .text-display {
            transition: 0.5s ease all;
            opacity: 1;
          }
        }
      }
      .icon {
        font-size: 18px;
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }
  .img-container {
    display: none;
    align-items: center;
    justify-content: flex-end;
    min-width: 45%;
    @media (max-width: 1023px) {
      justify-content: center;
      min-width: unset;
      width: 100%;
    }
    @media (max-width: 770px) {
      display: flex;
    }
    img {
      border-radius: 10px;
      max-width: 500px;
      height: 350px;
      @media (max-width: 1250px) {
        max-width: 80%;
        height: 300px;
      }
      @media (max-width: 1180px) {
        height: 270px;
      }
      @media (max-width: 1100px) {
        height: 240px;
      }
      @media (max-width: 1023px) {
        max-width: 100%;
        width: 100%;
        height: auto;
      }
    }
  }
`;
export const BoxSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #949494;
  border-radius: 5px;
  margin-top: 10px;
  .title-contain {
    display: flex;
    padding-inline: 20px;
    padding-block: 25px 25px;
    border-bottom: 1px solid #949494;
    @media (max-width: 500px) {
      padding-inline: 15px;
      padding-block: 15px;
    }
    .title {
      font-weight: 600;
      font-size: 18px;
      margin: 0;
    }
  }
  .subtitle-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-inline: 20px;
    padding-block: 20px 30px;
    @media (max-width: 500px) {
      padding-inline: 15px;
      padding-block: 15px;
    }
    .section-title {
      display: flex;
      gap: 5px;
      .topic-title {
        cursor: pointer;
      }
      p {
        font-size: 14px;
        text-decoration: underline;
        margin: 0;
        @media (max-width: 500px) {
          font-size: 12px;
        }
      }
    }
  }
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  .text-container {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .topic-title {
      font-size: 28px;
      font-weight: 600;
      margin: 0;
      @media (max-width: 600px) {
        font-size: 24px;
      }
    }
    .topic-subtitle {
      font-size: 16px;
      margin: 0;
      @media (max-width: 600px) {
        font-size: 14px;
      }
    }
    .topic-image {
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
  }
`;
export const RelatedArticles = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 25px;
  p {
    margin: 0;
  }
  .titles {
    font-size: 14px;
    font-weight: 500;
  }
  .cards {
    display: flex;
    flex-direction: column;
    gap: 15px;
    .title {
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
    }
    .sub-title {
      font-size: 14px;
      line-height: 16px;
      overflow: hidden;
    }
    .img {
      border-radius: 10px;
      cursor: pointer;
      max-height: 250px;
    }
  }
`;
export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  p {
    margin: 0;
  }
  .title-contain {
    padding-block: 20px;
    border-bottom: 1px solid black;
    .title {
      font-size: 20px;
      font-weight: 500;
    }
  }
  .all-cards {
    display: grid;
    gap: 2%;
    justify-content: space-between;
    grid-template-columns: repeat(4, 23%);
    width: 100%;
    @media (max-width: 1023px) {
      grid-template-columns: repeat(2, 47%);
      gap: 5%;
      margin-bottom: 80px;
    }
    @media (max-width: 650px) {
      grid-template-columns: repeat(1, 100%);
      gap: 30px;
    }
    .cards {
      display: flex;
      flex-direction: column;

      gap: 15px;
      .title {
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
      }
      .sub-title {
        font-size: 14px;
        line-height: 15px;
        overflow: hidden;
      }
      .img {
        border-radius: 10px;
        cursor: pointer;
        width: 100%;
        height: 200px;
        @media (max-width: 1300px) {
          height: 170px;
        }
        @media (max-width: 1150px) {
          height: 150px;
        }
        @media (max-width: 1023px) {
          height: 300px;
        }
        @media (max-width: 750px) {
          height: 240px;
        }
      }
    }
  }
`;
export const GonvarAd = styled.div`
  display: flex;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #c6c6c6;
  padding: 20px;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 30px;
  }
  .img {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 100px;
    width: 50%;
    @media (max-width: 700px) {
      width: 100%;
      justify-content: space-between;
      gap: 20px;
      padding-bottom: 0;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
    .img-display {
      width: 50%;
      @media (max-width: 700px) {
        width: 70%;
      }
    }
  }
  .all-texts {
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 5px;
    @media (max-width: 700px) {
      width: 100%;
    }
    .space {
      margin-bottom: 10px;
    }
    p {
      margin: 0;
      font-size: 14px;
      @media (max-width: 600px) {
        font-size: 12px;
      }
    }
    .text-style {
      span {
        margin-left: 10px;
        color: #8300e9;
      }
    }
    .button-contain {
      display: flex;
      justify-content: center;
      .button-gonvar {
        margin-top: 10px;
        white-space: nowrap;
        border: none;
        border-radius: 100px;
        padding-block: 8px;
        padding-inline: 20px;
        width: fit-content;
        color: white;
        font-weight: 500;
        font-size: 14px;
        background: linear-gradient(218deg, #8300e9 26%, #b746cd 95%);
        &:hover {
          opacity: 0.8;
        }
        @media (max-width: 600px) {
          font-size: 12px;
          padding-inline: 15px;
        }
      }
    }
  }
`;
export const VideoBlog = styled.div`
  display: flex;
`;
