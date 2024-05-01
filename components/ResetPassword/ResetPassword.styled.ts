import styled, { keyframes } from 'styled-components';

export const ResetContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 90vh;
  align-items: center;
  justify-content: center;
  background-color: rgba(206, 91, 196, 0.5);
  form{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    border: 1px solid #942ced;
    border-radius: 20px;
    .form-row {
          display: flex;
          flex-direction: column;
          align-items: baseline;
          justify-content: space-between;
          width: 100%;
          gap: 5px;
          .form-input {
            flex-grow: 1;
            position: relative;
            width: 100%;
            .eye {
              cursor: pointer;
              position: absolute;
              bottom: 8px;
              right: 15px;
            }
            label {
              color: #3f1168;
              font-size: 18px;
              font-weight: 700;
              font-family: Montserrat, sans-serif;
              margin-bottom: 5px;
              @media (max-width: 1023px) {
                font-size: 16px;
              }
              @media (max-width: 400px) {
                font-size: 14px;
              }
            }
            span {
              font-weight: 400;
            }
            input {
              background: #e7c9eb;
              border: 1px solid #942ced;
              border-radius: 20px;
              color: #3f1168;
              padding-left: 25px;
              font-weight: bold;
              line-height: 10px;
              @media (max-width: 400px) {
                font-size: 14px;
              }
              &:valid {
                background-color: #ebe1f0;
                color: #402466;
              }
              &::placeholder {
                color: #6611c2;
                font-weight: 400;
              }
              &:focus {
                background: #ebe1f0;
              }
            }
          }
        }
      }
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  button {
    margin: auto;
    background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
    color: #fff;
    font-size: 16px;
    padding: 8px 25px;
    border-radius: 30px;
    border: none;
    font-weight: 700;
  }
`;
