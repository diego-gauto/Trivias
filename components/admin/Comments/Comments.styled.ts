import styled, { css } from "styled-components";

export const AdminCommentsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  .pl {
    padding-left: 20px;
  }
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
      flex-direction: column;
      gap: 15px;
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
      @media (max-width: 500px) {
        flex-direction: column;
      }
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
      flex-direction: column;
      gap: 20px;
      .add {
        background: #6717cd;
      }
      button {
        margin-right: auto;
        padding: 5px;
        border: none;
        border-radius: 10px;
        color: #fff;
      }
      .left {
        display: flex;
        flex-direction: column;
      }
      svg {
        color: #da0505;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .pop-up {
    position: fixed;
    left: 50%;
    transform: translateX(-65%);
    border-radius: 40px;
    border: 3px solid #6717cd;
    background: #fff;
    max-width: 500px;
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: center;
    @media (max-width: 1000px) {
      transform: translateX(-50%);
    }
    svg {
      position: absolute;
      right: 40px;
      top: 20px;
      color: #6717cd;
      cursor: pointer;
    }
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
