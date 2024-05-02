import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  background-color: #ede7f2;
  border-radius: 20px;
  .title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
    width: 100%;
    .title {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      color: #3f1168;
    }
    .close-icon {
      color: #3f1168;
      position: absolute;
      font-size: 20px;
      cursor: pointer;
      top: 8px;
      right: 8px;
    }
  }
`;
