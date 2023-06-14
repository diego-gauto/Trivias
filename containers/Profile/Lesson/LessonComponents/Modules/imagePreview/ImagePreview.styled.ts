import styled from "styled-components";

export const ImageContainter = styled.div`
  display: flex;
  background-color: #dad3e5;
  border-radius: 20px;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  position: relative;
  .button-contain {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 40px;
    h1 {
      font-size: 24px;
      color: #45009c;
    }
    .note {
      position: absolute;
      top: 45px;
      font-size: 12px;
      color: #45009c;
      margin: 0;
    }
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
    }
    .cancel-btn {
      background-color: red;
    }
    .continue-btn {
      background-color: #6717cd;
    }
  }
  button {
    border-radius: 100px;
    border: none;
    padding-inline: 20px;
    padding-block: 8px;
    color: white;
  }
  .close {
    font-size: 25px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .document {
    width: 100%;
    height: 700px;
  }
  .image {
    // width: 100%;
    margin-top: 50px;
    max-width: 1138px;
  }
  @media (max-width: 600px) {
  }
`;
