import styled from "styled-components";

export const HelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  p {
    font-weight: 500;
    color: #74549c;
  }
  a {
    display: flex;
    justify-content: center;
    width: 100%;
    text-decoration: none;
  }
  button {
    display: flex;
    justify-content: center;
    width: 70%;
    align-items: center;
    gap: 5px;
    padding-block: 15px;
    border-radius: 100px;
    border: none;
    background: #3f1168;
    font-size: 20px;
    color: white;
    font-weight: 600;
    background: #942ced;
    p {
      margin: 0;
      margin-left: 50px;
    }
    svg {
    }
    span {
      color: #ffdd67;
    }
    &:hover {
      transform: scale(1.03);
      transition: 1s ease all;
    }
    @media (max-width: 500px) {
      width: 100%;
      padding-block: 10px;
      font-size: 14px;
    }
  }
`;
