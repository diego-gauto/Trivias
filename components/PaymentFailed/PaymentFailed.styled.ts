import styled from 'styled-components';

export const FailedContainer = styled.div`
  flex-wrap: wrap;
  background: rgb(237 231 242 / 60%);
  display: flex;
  gap: 100px;
  justify-content: center;
  width: 100%;
  padding: 60px;
  .form-input {
    width: 100%;
    flex-grow: 1;
    position: relative;
    label {
      color: #3f1168;
    }

    .select-contain {
      position: relative;
      select {
        border-radius: 100px;
        border: 1px solid rgb(148, 44, 237);
        color: rgb(63, 17, 104);
        background: rgba(218, 211, 229, 0.4);
      }
      svg {
        position: absolute;
        top: 52%;
        transform: translateY(-50%);
        right: 15px;
        pointer-events: none;
      }
    }
  }

  img {
    width: 100%;
    max-width: 500px;
    height: fit-content;
  }
  .left {
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    h1 {
      color: #3f1168;
      font-size: 1.6rem;
      span {
        color: #d244d1;
      }
    }
    p {
      color: #3f1168;
      font-weight: 500;
    }
    .buttons {
      display: flex;
      flex-direction: column;
      gap: 15px;
      font-weight: 500;
      button {
        border: none;
        border-radius: 20px;
        width: 180px;
        font-size: 14px;
        font-weight: 500;
        padding-block: 5px;
      }
      .top {
        background: linear-gradient(135deg, #952ced 22%, #ca41d4 80%);
        color: #fff;
        &:hover {
          opacity: 0.67;
        }
      }
      .bottom {
        background: #fff;
        color: #3f1168;
      }
    }
  }
`;
