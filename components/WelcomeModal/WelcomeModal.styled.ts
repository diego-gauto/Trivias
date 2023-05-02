import styled from "styled-components";

export const WelcomeContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  position: relative;
  padding: 40px;
  background-color: #dad3e5;
  border-radius: 20px;
  h1 {
    margin: 0;
  }
  .title-container {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 20px;
      color: #3f1168;
      span {
        color: #942ced;
      }
    }
    .close {
      font-size: 30px;
      cursor: pointer;
    }
  }
`;
