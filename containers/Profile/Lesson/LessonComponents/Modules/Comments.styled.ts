import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  .line-m {
    background: #d4cedc;
    height: 1.5px;
    width: 100%;
  }
  @media (max-width: 1023px) {
    padding: 20px;
    gap: 10px;
    border-radius: 10px;
  }
  @media (max-width: 600px) {
    padding-inline: 10px;
  }
  .comment-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .top {
      display: flex;
      align-items: center;
      gap: 10px;
      p {
        text-transform: capitalize;
        color: #74549c;
        margin: 0;
        font-weight: 600;
        span {
          font-size: 14px;
          font-weight: 500;
        }
      }
      button {
        font-size: 18px;
        color: #3f1168;
        font-weight: 700;
        border: none;
        background: none;
      }
    }
    .middle {
      p {
        font-weight: 500;
        color: #74549c;
        margin: 0;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        margin: 0;
      }
      .left {
        width: 100%;
        display: flex;
        gap: 10px;
        @media (max-width: 1023px) {
          flex-direction: column;
        }
        .new-comment {
          display: flex;
          gap: 30px;
        }
        .like {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #fa3838;
          svg {
            cursor: pointer;
            font-size: 22px;
          }
          p {
            font-size: 18px;
            font-weight: bold;
          }
        }
        button {
          font-size: 18px;
          color: #3f1168;
          font-weight: 700;
          border: none;
          background: none;
        }
        .answer-input {
          display: flex;
          gap: 10px;
          width: 100%;
          .answer {
            background: none;
            color: #8e2de2;
            padding-inline: 20px;
            outline: none;
            border: 1px solid #8e2de2;
            width: 100%;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 500;
            ::placeholder {
              color: #8e2de2;
            }
          }
        }
      }
      .report {
        font-size: 18px;
        color: #74549c;
        font-weight: 600;
        border: none;
        background: none;
      }
    }
    .answer-container {
      margin-left: 130px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      @media (max-width: 650px) {
        margin-left: 30px;
      }
      .top {
        display: flex;
        align-items: center;
        gap: 10px;
        .like {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #fa3838;
          svg {
            cursor: pointer;
            font-size: 22px;
          }
          p {
            font-size: 18px;
            font-weight: bold;
            color: #fa3838;
          }
        }
        p {
          text-transform: capitalize;
          color: #74549c;
          margin: 0;
          font-weight: 600;
          span {
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
      .middle {
        p {
          font-weight: 500;
          color: #74549c;
          margin: 0;
        }
      }
    }
  }
`;
export const CommentContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .comments-info {
    display: flex;
    gap: 20px;
    .line {
      width: 1.5px;
      height: auto;
      background: #d4cedc;
    }
    .title {
      color: #f8a44c;
    }
    p {
      color: #74549c;
      margin: 0;
      font-weight: 600;
      span {
        font-weight: 500;
      }
    }
  }
  .comment {
    display: flex;
    gap: 10px;
  }
  @media (max-width: 1023px) {
    gap: 10px;
  }
`;
export const CommentInput = styled.input`
  background: none;
  color: #8e2de2;
  padding-inline: 20px;
  outline: none;
  border: 1px solid #8e2de2;
  width: 80%;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  ::placeholder {
    color: #8e2de2;
  }
`;
export const Profile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
export const CommentText = styled.div`
  display: flex;
  padding-block: 12px;
  padding-inline: 15px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
`;
export const Comment = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 12px;
  }
`;
export const Pp1 = styled.i`
  background-image: url(../images/Video/Comments/profile1.png);
  height: 60px;
  min-width: 60px;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Pp2 = styled.i`
  background-image: url(../images/Video/Comments/profile2.png);
  height: 60px;
  min-width: 60px;
  background-position: center;
  background-repeat: no-repeat;
`;
export const Pp3 = styled.i`
  background-image: url(../images/Video/Comments/profile3.png);
  height: 60px;
  min-width: 60px;
  background-position: center;
  background-repeat: no-repeat;
`;
export const Button = styled.button`
  display: flex;
  gap: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  font-size: 12px;
  // padding-inline: 25px;
  background: transparent;
  color: #6717cd;
  border-radius: 30px;
  border: 1px solid #6717cd;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
