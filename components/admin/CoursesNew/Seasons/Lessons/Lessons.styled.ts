import styled from "styled-components";

export const LessonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
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
      .input-contain {
        display: flex;
        width: 32%;
        flex-direction: column;
        gap: 5px;
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
