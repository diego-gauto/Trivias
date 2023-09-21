import styled from "styled-components";

export const HelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  p {
    font-weight: 500;
    color: #74549c;
  }
  button {
    font-weight: 600;
    padding: 8px 20px;
    color: #8e2de2;
    border-radius: 100px;
    border: 1px solid #8e2de2;
    background: transparent;
    width: 100%;
    &:hover {
      opacity: 0.7;
    }
  }
`;
