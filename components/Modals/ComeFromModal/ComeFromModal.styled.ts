import styled from "styled-components";

export const ComeFromContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #dad3e5;
  border-radius: 30px;
  p,
  h2 {
    margin: 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 30px;
      font-weight: 600;
      color: #3f1168;
      span {
        color: #942ced;
      }
    }
    .icon {
      font-size: 20px;
      color: #3f1168;
    }
  }
  .bottom-data {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .select-container {
      position: relative;
      .error {
        color: red;
        font-weight: 600;
        position: absolute;
        bottom: -25px;
        left: 8px;
      }
    }
  }
  .btn-contain {
    display: flex;
    justify-content: end;
  }
`;
