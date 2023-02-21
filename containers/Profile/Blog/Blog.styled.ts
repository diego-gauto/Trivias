import styled from "styled-components";

export const BlogContainer = styled.div`
  p {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 100px;
  .title-contain {
    display: flex;
    width: 100%;
    justify-content: center;
    .title {
      font-size: 30px;
      font-weight: 500;
      margin-top: 90px;
    }
  }
`;
export const BlogItems = styled.div`
  padding-inline: 5%;
`;
