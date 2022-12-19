import styled from "styled-components";

export const QuizContainer = styled.div`
  display: flex;
  flex-direction: Column;
  gap: 20px;
  padding: 40px;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  .button-save {
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    background: #6717cd;
    color: white;
    padding-block: 10px;
    padding-inline: 30px;
    border-radius: 100px;
    border: none;
    &:hover {
      background-color: #5000b5;
      transform: scale(1.03);
      transition: 0.5s ease all;
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 10px;
  flex-direction: column;
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  label {
    font-size: 14px;
    color: #6717cd;
  }
  input {
    font-size: 14px;
    padding-inline: 20px;
    padding-block: 10px;
    border: 1px solid #6717cd;
    border-radius: 30px;
    :focus {
      outline: 1px solid #8e2de2;
    }
  }
`;
export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .title {
    font-size: 30px;
    font-weight: bold;
    margin: 0;
  }
  .first-container {
    display: flex;
    .input-contain {
      display: flex;
      flex-direction: column;
      width: 50%;
      #quill {
        .ql-container {
          height: 100px;
        }
      }
      label {
        font-size: 14px;
        color: #6717cd;
        font-family: "Montserrat", sans-serif;
      }
    }
    .button {
      font-size: 16px;
      font-family: "Montserrat", sans-serif;
      background: #6717cd;
      color: white;
      padding-block: 10px;
      padding-inline: 30px;
      border-radius: 100px;
      border: none;
      &:hover {
        background-color: #5000b5;
        transform: scale(1.03);
        transition: 0.5s ease all;
      }
    }
  }
  .question-content {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 10px;
    .answers {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 20px;
      .status {
        display: flex;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
      .trash {
        &:hover {
          color: red;
          transition: 0.5s ease all;
        }
      }
      input {
        font-size: 14px;
        padding-inline: 20px;
        padding-block: 5px;
        border: 1px solid #6717cd;
        border-radius: 30px;
        :focus {
          outline: 1px solid #8e2de2;
        }
      }
    }
    p {
      margin: 0;
    }
    .questions {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      .question-title {
        font-size: 18px;
        font-weight: bold;
      }
      .button-contain {
        display: flex;
        gap: 20px;
        input {
          font-size: 14px;
          padding-inline: 20px;
          padding-block: 10px;
          border: 1px solid #6717cd;
          border-radius: 30px;
          :focus {
            outline: 1px solid #8e2de2;
          }
        }
        .button-add {
          font-size: 16px;
          font-family: "Montserrat", sans-serif;
          background: transparent;
          color: #6717cd;
          padding-block: 8px;
          padding-inline: 15px;
          border-radius: 100px;
          border: 1px solid #6717cd;
          &:hover {
            transform: scale(1.03);
            transition: 0.5s ease all;
          }
        }
        .button-delete {
          font-size: 16px;
          font-family: "Montserrat", sans-serif;
          background: #e34141;
          color: white;
          padding-block: 8px;
          padding-inline: 15px;
          border-radius: 100px;
          border: none;
          &:hover {
            transform: scale(1.03);
            transition: 0.5s ease all;
            background: #cd0606;
          }
        }
      }
    }
  }
`;
