import styled from "styled-components";

export const TermsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  position: relative;
  padding: 40px;
  .close {
    top: 15px;
    right: 15px;
    position: absolute;
    color: #3f1168;
    font-size: 20px;
    cursor: pointer;
  }
  .tables {
    .center {
      text-align: center;
      font-size: 14px;
    }
  }
  ul {
    margin: 0;
    li {
      color: #3f1168;
      font-size: 12px;
      font-weight: 600;
    }
  }
  h1 {
    color: #a733e4;
    text-align: center;
    font-size: 20px;
    margin: 0;
  }
  p {
    color: #3f1168;
    font-size: 12px;
    font-weight: 600;
    text-align: justify;
    margin: 0;
    span {
      color: #a733e4;
    }
  }
`;
