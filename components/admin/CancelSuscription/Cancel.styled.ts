import styled from "styled-components";

export const CancelReview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  .title-contain {
    display: flex;
    h2 {
      font-weight: 600;
    }
  }
  .user-answers {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .headers {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid black;
    }
    p {
      width: 16%;
      margin: 0;
    }
    .review-container {
      display: flex;
      gap: 10px;
      border-bottom: 1px solid black;
      p {
        font-size: 14px;
      }
    }
  }
`;
