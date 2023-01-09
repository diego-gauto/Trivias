import styled from "styled-components";

export const HomeWorkContain = styled.div`
  display: flex;
  gap: 2%;
  .left {
    width: 48%;
  }
  .middle {
    background: #d4cedc;
    width: 1.5px;
    height: 100%;
  }
  .right {
    width: 48%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .upload-info {
      .title {
        font-weight: 600;
        b {
          color: rgb(247, 136, 3);
        }
      }
      p {
        color: #3f1168;
        margin: 0;
      }
      .files {
        display: flex;
        justify-content: space-between;
        .line {
          width: 1px;
          height: auto;
          background: #8e2de2;
        }
      }
    }
    .line {
      width: 100%;
      height: 1.5px;
      background: #d4cedc;
    }
    .upload-container {
      p {
        margin: 0;
        font-weight: 600;
        color: #3f1168;
        span {
          font-weight: 500;
        }
      }
      .homework {
        margin-top: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
        font-weight: 500;
        opacity: 0.7;
        color: #8e5fc1;
        svg {
          font-size: 22px;
        }
        &:hover {
          opacity: 1;
          color: #8e2de2;
          font-weight: 600;
          transition: 0.5s ease all;
        }
      }
    }
  }
  ol {
    margin-top: 20px;
    padding-left: 1.5rem;
  }
  @media (max-width: 1124px) {
    flex-direction: column;
    .left {
      width: 100%;
    }
    .middle {
      width: 100%;
      height: 1.5px;
    }
    .right {
      width: 100%;
      padding: 0;
      padding-top: 40px;
    }
  }
`;
export const TaskTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #f8a44c;
  margin: 0;
  line-height: normal;
  span {
    font-weight: 500;
  }
  @media (max-width: 1023px) {
    font-size: 14px;
  }
`;
export const TaskText = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  text-align: justify;
  @media (max-width: 1023px) {
    font-size: 12px;
  }
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export const ReviewButton = styled.button`
  cursor: auto !important;
  display: flex;
  gap: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background: transparent;
  color: #6717cd;
  border: none;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const UploadButton = styled.button`
  display: flex;
  gap: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background: transparent;
  color: #6717cd;
  border-radius: 30px;
  border: 1px solid #6717cd;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const UploadIcon = styled.i`
  background-image: url(../images/Video/HomeWork/upload.png);
  height: 25px;
  width: 25px;
  background-position: center;
  background-repeat: no-repeat;
`;
