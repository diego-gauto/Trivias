import styled from "styled-components";

export const ImageContainter = styled.div`
  display: flex;
  background-color: #dad3e5;
  border-radius: 20px;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  position: relative;
  .text-contain {
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 40px;
    .purple {
      color: #3e0f67;
    }
    b {
      font-weight: 700;
      color: #d344d1;
    }
    .note {
      position: absolute;
      top: 45px;
      font-size: 12px;
      color: #45009c;
      margin: 0;
    }
  }
  .responsive {
    display: none;
  }
  @media (max-width: 991px) {
    .normal {
      display: none;
    }
    .responsive {
      display: unset;
    }
  }
  .button-contain {
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
    }
    .btn {
      padding-inline: 70px;
      font-weight: 600;
      background: rgb(150, 42, 238);
      background: linear-gradient(
        90deg,
        rgba(150, 42, 238, 1) 0%,
        rgba(208, 68, 210, 1) 100%
      );
    }
    .btn:hover {
      opacity: 0.5;
      color: #ffffff;
    }
    .btn-down {
      padding-inline: 70px;
      font-weight: 600;
      background: rgb(150, 42, 238);
      background: linear-gradient(
        90deg,
        rgba(150, 42, 238, 1) 0%,
        rgba(208, 68, 210, 1) 100%
      );
      @media (min-width: 1200px) {
        display: none;
      }
    }
    .btn-down:hover {
      opacity: 0.5;
      color: #ffffff;
      @media (min-width: 1200px) {
        display: none;
      }
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
    border-radius: 14px;
    height: 70vh;
    width: 100%;
    margin-top: 50px;
    max-width: 1138px;
    @media (max-width: 1200px) {
      height: 90vh;
    }
  }
  @media (max-width: 600px) {
  }
`;
