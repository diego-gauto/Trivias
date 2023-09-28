import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-inline: 20px;
  padding-bottom: 10px;
  align-items: center;
  p {
    margin: 0;
  }
  .index {
    display: flex;
    gap: 15px;
    align-items: center;
    .current-number {
      cursor: pointer;
      font-size: 30px;
    }
    .default-number {
      cursor: pointer;
      font-size: 20px;
      color: #3f1168;
    }
    .arrows {
      font-size: 30px;
      cursor: pointer;
      color: #3f1168;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .max-number {
    font-weight: 600;
    font-size: 16px;
  }
`;
