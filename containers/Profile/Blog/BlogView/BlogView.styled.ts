import styled from "styled-components";

export const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  background-color: #ede7f2;
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
    }
    .right-content {
      width: 20%;
    }
  }
`;
export const FirstSection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  @media (max-width: 1400px) {
    justify-content: space-between;
  }
  .title-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
    max-width: 600px;
    @media (max-width: 1250px) {
      max-width: 45%;
    }
    .title {
      font-size: 36px;
      font-weight: 600;
      margin: 0;
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
    // .socials{
    //   display: flex;
    // }
  }
  .img-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 45%;
    @media (max-width: 1023px) {
      display: none;
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
    }
  }
`;
export const BoxSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #949494;
  border-radius: 5px;
  .title-contain {
    display: flex;
    padding-inline: 20px;
    padding-block: 20px 30px;
    border-bottom: 1px solid #949494;
    .title {
      font-size: 18px;
    }
  }
  .subtitle-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-inline: 20px;
    padding-block: 20px 30px;
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
    }
    .topic-subtitle {
      font-size: 16px;
      margin: 0;
    }
    .topic-image {
      img {
      }
    }
  }
`;
export const RelatedArticles = styled.div`
  display: flex;
  width: 100%;
  p {
    margin: 0;
  }
  .titles {
    font-size: 14px;
    font-weight: 500;
  }
  .cards {
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
`;
