import styled from "styled-components";

export const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  p {
    margin: 0;
  }
  .text-container {
    text-align: center;
    font-size: 12px;
    .title-text {
      font-weight: 600;
      color: #3f1168;
      span {
        font-weight: 800;
        color: #f77c26;
      }
    }
    .about-text {
      font-weight: 600;
      background: linear-gradient(to right, #42126c, #922cea);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }
  }
  .image-container {
    width: 85%;
    min-height: 55%;
    max-height: 55%;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  .info {
    font-size: 12px;
    padding: 10px;
    border: none;
    border-radius: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
