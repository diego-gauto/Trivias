import styled from "styled-components";

export const AlertModalContain = styled.div`
  display: flex;
  background-color: #ede7f2;
  position: relative;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  p {
    font-size: 24px;
    font-weight: 600;
    color: #3f1168;
    margin: 0;
  }
  .close-icon {
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    color: #3f1168;
  }
`;
