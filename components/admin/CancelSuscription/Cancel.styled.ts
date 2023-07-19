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
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    border-radius: 30px 30px 0px 0px;
    th {
      &:first-child {
        border-radius: 30px 0px 0px 0px;
      }
      &:last-child {
        border-radius: 0px 30px 0px 0px;
      }
    }
    td {
      font-size: 12px;
    }
  }
`;
