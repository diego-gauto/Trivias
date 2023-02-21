import styled from "styled-components";

export const BlogContainer = styled.div`
  p {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
  .title-contain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .title {
      font-size: 36px;
      font-weight: 500;
    }
    .add-course {
      border: 1px solid #6717cd;
      padding-block: 5px;
      padding-inline: 20px;
      border-radius: 100px;
      background-color: transparent;
      .add-text {
        color: #6717cd;
      }
      &:hover {
        background-color: #ede6f5;
        transition: 0.2s ease all;
      }
    }
  }
  .blogs {
  }
`;
