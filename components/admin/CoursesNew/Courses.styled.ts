import styled, { css, keyframes } from "styled-components";

export const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  .create-course {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
      }
    }
  }
  .edit-course {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-block: 10px;
    padding-inline: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
    p {
      margin: 0;
    }
    .title-contain {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 20px;
        font-weight: 600;
      }
      .arrow {
        font-size: 50px;
        cursor: pointer;
      }
    }
    .course-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .rows {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 20px;
        .button-data {
          display: flex;
          flex-direction: column;
          button {
            border-radius: 100px;
            padding-block: 5px;
            padding-inline: 50px;
          }
          .edit-button {
            background-color: white;
            color: #6717cd;
            border: 1px solid #6717cd;
          }
          .delete-button {
            background-color: red;
            color: white;
            border: none;
          }
        }
        .course-data {
          display: flex;
          width: 32%;
          flex-direction: column;
          .course-data-title {
            font-size: 16px;
            color: #6717cd;
            margin: 0;
            span {
            }
          }
        }
      }
    }
  }
`;

export const SelectOption = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding-inline: 20px;
  padding-block: 5px;
  border: 1px solid #6717cd;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  p {
    margin: 0;
  }
  .arrow {
    font-size: 30px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .options {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 32px;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 2;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
    font-weight: 600;
    .map-options {
      display: flex;
      padding-inline: 10px;
      padding-top: 3px;
      padding-bottom: 3px;
      &:first-child {
        padding-top: 6px;
      }
      &:last-child {
        padding-bottom: 6px;
      }
      &:hover {
        color: white;
        background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
        &:first-child {
          border-radius: 10px 10px 0 0;
        }
        &:last-child {
          border-radius: 0 0 8px 8px;
        }
      }
    }
  }
`;

export const OptionColor = styled.div<{ color: string }>`
  display: flex;
  padding-inline: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  ${(props) =>
    props.color == "azul" &&
    css`
      background-color: #6778f9;
      border-radius: 10px 10px 0 0;
    `}
  ${(props) =>
    props.color == "amarillo" &&
    css`
      background-color: #e2a12d;
    `}
    ${(props) =>
    props.color == "morado" &&
    css`
      background-color: #9900ee;
    `}
    ${(props) =>
    props.color == "naranja" &&
    css`
      background-color: #f04a18;
    `}
    ${(props) =>
    props.color == "rosa" &&
    css`
      background-color: #d445d3;
    `}
    ${(props) =>
    props.color == "verde" &&
    css`
      background-color: #03bc80;
      border-radius: 0 0 10px 10px;
    `}
  &:first-child {
    padding-top: 6px;
  }
  &:last-child {
    padding-bottom: 6px;
  }
  &:hover {
    color: white;
    background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
    &:first-child {
      border-radius: 10px 10px 0 0;
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
`;
const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;
export const LoaderButton = styled.div`
  box-sizing: border-box;
  align-self: center;
  display: block;
  width: 30px;
  height: 30px;
  margin: 6px;
  border-width: 9px;
  border-style: solid;
  border-radius: 50%;
  border-color: #6717cd transparent transparent;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;
