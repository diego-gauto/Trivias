import styled from "styled-components";

export const BlogBackground = styled.div`
  p {
    margin: 0;
  }
  display: flex;
  padding: 40px;
  width: 100%;
  .blog-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    gap: 30px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    height: fit-content;
    .title-contain {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      flex-wrap: wrap;
      .title-container {
        display: flex;
        gap: 5px;
        align-items: center;
        .return-icon {
          font-size: 30px;
          cursor: pointer;
          &:hover {
            color: #6717cd;
          }
        }
      }
      .title {
        font-size: 24px;
        font-weight: 600;
      }
    }
    .blog-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .add-theme {
      border: 1px solid #6717cd;
      padding-block: 5px;
      padding-inline: 20px;
      border-radius: 100px;
      background-color: transparent;
      .theme-text {
        color: #6717cd;
      }
      &:hover {
        background-color: #ede6f5;
        transition: 0.2s ease all;
      }
    }
    .create-blog {
      border: none;
      padding-block: 5px;
      padding-inline: 20px;
      border-radius: 100px;
      background-color: #6717cd;
      .theme-text {
        color: white;
      }
      &:hover {
        background-color: #8b59cb;
        transition: 0.2s ease all;
      }
    }
    .delete-blog {
      border: none;
      padding-block: 5px;
      padding-inline: 20px;
      border-radius: 100px;
      background-color: red;
      .theme-text {
        color: white;
      }
      &:hover {
        background-color: #bd0000;
        transition: 0.2s ease all;
      }
    }
    .blog-form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 30px;
      .blog-row {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 20px;
        @media (max-width: 850px) {
          flex-wrap: wrap;
        }
      }
      .blog-column {
        display: flex;
        flex-direction: column;
      }
      .close-container {
        display: flex;
        justify-content: flex-end;
        font-size: 24px;
        .close {
          cursor: pointer;
        }
      }
    }
  }
`;
export const BlogInputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  #quill {
    .ql-container {
      height: auto;
    }
  }
  .quill {
    min-height: 0;
    .ql-container {
      height: auto;
    }
  }
  .blog-label {
    color: #6717cd;
    font-weight: 600;
  }
  input::file-selector-button {
    display: none;
  }
  .blog-input {
    border: 1px solid #6717cd;
    border-radius: 100px;
    padding-block: 5px;
    padding-inline: 30px;
    outline: none;
    :focus {
      border: 2px solid #6717cd;
    }
    @media (max-width: 850px) {
      width: 100% !important;
    }
  }
`;
