import styled from "styled-components";

export const SeasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  button {
    &:hover {
      transform: scale(1.1);
      transition: 1s ease all;
    }
  }
  p {
    margin: 0;
  }
  .season-contain {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
    .title-contain {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-complete-contain {
        display: flex;
        gap: 10px;
        position: relative;
        input::file-selector-button {
          display: none;
        }
        .season-input {
          padding-inline: 20px;
          padding-block: 5px;
          border-radius: 100px;
          border: 1px solid #6717cd;
          :focus {
            outline: 1px solid #6717cd;
          }
        }
        .season-title {
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
        }
        .edit-icon {
          position: absolute;
          font-size: 16px;
          right: -17px;
          top: -2px;
          cursor: pointer;
        }
        .button-save {
          display: flex;
          align-items: center;
          gap: 5px;
          border-radius: 100px;
          padding-block: 5px;
          padding-inline: 20px;
          background-color: #6717cd;
          color: white;
          border: none;
        }
      }
      .arrow-button {
        display: flex;
        .button-edit {
          display: flex;
          align-items: center;
          gap: 5px;
          border-radius: 100px;
          padding-block: 5px;
          padding-inline: 20px;
          background-color: white;
          color: #6717cd;
          border: 1px solid #6717cd;
        }
        .arrow {
          cursor: pointer;
          font-size: 40px;
        }
      }
    }
    .lesson-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .lesson-contain {
        display: flex;
        gap: 30px;
        p {
          margin: 0;
        }
        .img-banner {
        }
        .lesson-data {
          display: flex;
          flex-direction: column;
          gap: 5px;
          .lesson-title {
            font-size: 16px;
            font-weight: 600;
          }
          .lesson-about {
            font-size: 14px;
          }
          .lesson-duration {
            font-size: 12px;
            color: gray;
          }
          .lesson-edit {
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            color: #6717cd;
          }
        }
      }
    }
  }
`;
