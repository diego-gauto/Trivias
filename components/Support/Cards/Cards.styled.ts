import styled from "styled-components";

export const SupportCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 330px;
  align-items: center;
  .image-display {
    width: 330px;
    height: 390px;
  }
  .title {
    color: #3f1168;
    font-size: 20px;
    font-weight: 600;
  }
  p {
    text-align: center;
    font-weight: 500;
  }
  button {
    margin-top: auto;
  }
`;
