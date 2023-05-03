import styled, { css } from "styled-components";

export const AdminCommentsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  .comment-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-block: 10px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
    p {
      margin: 0;
      font-weight: 600;
    }
    .top {
      display: flex;
      justify-content: space-between;
      span {
        color: #6717cd;
      }
    }
    .title {
      color: #8e2de2;
    }
    .buttons {
      display: flex;
      gap: 15px;
      .add {
        background: #6717cd;
      }
      .delete {
        background: #da0505;
      }
      button {
        padding: 5px;
        border: none;
        border-radius: 10px;
        color: #fff;
      }
    }
    .answer {
      display: flex;
      align-items: center;
      gap: 20px;
      svg {
        color: #da0505;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .pop-up {
    position: absolute;
    left: 50%;
    transform: translateX(-65%);
    border-radius: 40px;
    border: 3px solid #6717cd;
    background: #fff;
    width: 500px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: center;
    h1 {
      font-size: 24px;
    }
    textarea {
      outline: none;
      border-radius: 10px;
      border: 1px solid #6717cd;
    }
    button {
      background: #6717cd;
      border: none;
      color: #fff;
      width: 150px;
      margin: auto;
      padding: 5px;
      border-radius: 10px;
    }
  }
`;
