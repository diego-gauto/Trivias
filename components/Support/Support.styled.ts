import styled from 'styled-components';

export const SupportContainer = styled.div`
  background-color: #ede7f2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 50px;
  p {
    margin: 0;
  }
  .header-contain {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 5px;
    .go-back {
      display: flex;
      width: 100%;
      justify-content: start;
    }
    .title {
      margin: 0;
      color: #3f1168;
      font-weight: 800 !important;
      span {
        color: #942ced;
      }
    }
  }
  .option-contain {
    display: flex;
    gap: 20px;
  }
  button {
    display: flex;
    align-items: center;
    gap: 15px;
    border: none;
    padding-block: 4px;
    padding-inline: 20px;
    border-radius: 100px;
    background: linear-gradient(45deg, #9b5ed0 0%, #3f1168 100%);
    font-size: 14px;
    p {
      color: white;
    }
    .icon {
      color: white;
    }
    &:hover {
      opacity: 0.6;
    }
  }
  @media (max-width: 1050px) {
    .option-contain {
      gap: 10px;
    }
  }
  @media (max-width: 1023px) {
    .header-contain {
      gap: 20px;
    }
    .option-contain {
      flex-direction: column;
      gap: 40px;
    }
  }
`;
