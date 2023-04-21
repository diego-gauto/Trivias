import styled from "styled-components";

export const LessonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  button {
    &:hover {
      opacity: 0.9;
    }
  }
  .lesson-contain {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
    .rows {
      display: flex;
      gap: 20px;
      width: 100%;
      justify-content: flex-start;
      .toggle {
        cursor: pointer;
        display: flex;
        border: 1px solid #6717cd;
        width: fit-content;
        border-radius: 10px;
        .left,
        .right {
          padding: 10px;
        }
        .left {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }
        .right {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
      .input-contain {
        display: flex;
        width: 32%;
        flex-direction: column;
        gap: 5px;
        .extra-materials {
          padding-left: 10px;
          .hw-contain {
            display: flex;
            align-items: center;
            gap: 10px;
            .close {
              cursor: pointer;
            }
            .extra-hmk {
              margin: 0;
              font-size: 14px;
            }
          }
        }
        p {
          margin: 0;
        }
        .img-preview {
          width: 100%;
          max-height: 160px;
          border-radius: 10px;
        }
        .save-button {
          font-size: 14px;
          border-radius: 100px;
          padding-inline: 25px;
          padding-block: 5px;
          background-color: #6717cd;
          color: white;
          border: none;
        }
        .answer-contain {
          display: flex;
          flex-direction: column;
          gap: 5px;
          .answer-text {
            font-weight: 600;
            font-size: 14px;
          }
          .all-answers {
            display: flex;
            align-items: center;
            gap: 10px;
            .answer {
              font-size: 20px;
            }
            .trash {
              font-size: 20px;
              cursor: pointer;
              &:hover {
                color: #6717cd;
              }
            }
            .circle {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              cursor: pointer;
              &:hover {
                opacity: 0.7;
              }
            }
          }
        }
        .question-title {
          display: flex;
          justify-content: space-between;
          p {
            font-size: 16px;
            font-weight: 600;
          }
          .answer-data {
            display: flex;
            gap: 10px;
            button {
              font-size: 14px;
              width: fit-content;
              border-radius: 100px;
              padding-inline: 10px;
              padding-block: 5px;
            }
            .answer-input {
              font-size: 14px;
              border-radius: 100px;
              padding-inline: 20px;
              padding-block: 5px;
              border: 1px solid #6717cd;
              border-radius: 20px;
              :focus {
                outline: 1px solid #8e2de2;
              }
            }
            .add-btn {
              background-color: white;
              color: #6717cd;
              border: 1px solid #6717cd;
            }
            .delete-btn {
              background-color: red;
              color: white;
              border: none;
            }
          }
        }
        .button {
          width: fit-content;
          border-radius: 100px;
          padding-inline: 30px;
          padding-block: 5px;
          background-color: #6717cd;
          border: none;
          color: white;
          font-weight: 500;
        }
        .quill-lesson {
          .ql-container {
            height: 115px;
          }
        }
        .create-button {
          width: fit-content;
          border-radius: 100px;
          padding-inline: 30px;
          padding-block: 5px;
          background-color: #6717cd;
          border: none;
          color: white;
          font-weight: 500;
        }
        .input-label {
          font-size: 16px;
          color: #6717cd;
          margin: 0;
        }
        input::file-selector-button {
          display: none;
        }
        .input-create {
          font-size: 14px;
          border-radius: 100px;
          padding-inline: 20px;
          padding-block: 5px;
          width: 100%;
          border: 1px solid #6717cd;
          border-radius: 20px;

          :focus {
            outline: 1px solid #8e2de2;
          }
        }
        .input-textarea {
          font-size: 14px;
          font-family: "Montserrat", sans-serif;
          text-align: justify;
          padding-block: 10px;
          padding-inline: 20px;
          height: 160px;
          border: 1px solid #6717cd;
          border-radius: 10px;
          overflow: hidden;
          resize: none;
          :focus {
            outline: 1px solid #8e2de2;
          }
        }
      }
    }
  }
`;
