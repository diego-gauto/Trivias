import styled from "styled-components";

export const FailedContainer = styled.div`
  background: rgb(237 231 242 / 60%);
  display: flex;
  margin: auto;
  .modal-costum {
    padding: 30px;
    border-radius: 30px;
    text-align: center;
    margin: auto;
    background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
    display: flex;
    flex-direction: column;
    gap: 20px;
    h1 {
      color: #00e2b4;
      margin: 0;
      span {
        color: white;
      }
    }
    p {
      color: #ede7f2;
      font-size: 17px;
      span {
        color: #ffdd67;
        font-size: 22px;
        font-weight: bold;
      }
    }
    button {
      width: 220px;
      height: 42px;
      margin: auto;
      border-radius: 20px;
      border: 1px solid #fff;
      padding: 5px 20px;
      background: none;
      color: white;
      font-size: 15px;
      a {
        color: inherit;
        text-decoration: none;
      }
    }
    .full {
      background: #fff;
      color: #942ced;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;
