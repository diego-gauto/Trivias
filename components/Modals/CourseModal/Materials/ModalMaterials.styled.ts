import { Modal } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ede7f2;
  border-radius: 40px !important;
  .reg-text {
    font-size: 12px;
    font-weight: 600;
    padding-inline: 30px;
    color: #3f1168;
    line-height: initial;
    text-align: center;
    margin: 0;
  }
  .btn-contain {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
    p {
      margin: 0;
      color: #3f1168;
      font-weight: 500;
      text-align: center;
      padding-inline: 20px;
    }
    margin-bottom: 20px;
    .btn-buy {
      padding-inline: 20px;
      padding-block: 8px;
      border-radius: 100px;
      background-color: #3f1168;
      color: white;
      border: none;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .icon {
    cursor: pointer;
    background: #3f1168;
    position: absolute;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 24px;
    padding: 6px;
  }
  .bottom-section {
    background: #d2aff1;
    padding: 20px;
    padding-block: 40px;
    border-radius: 40px !important;
    h1 {
      font-size: 28px;
      font-weight: bold;
      color: #3f1168;
      border: none;
      padding: 0;
      span {
        color: #cc1854;
      }
      @media (max-width: 424px) {
        font-size: 20px;
      }
    }
    p {
      font-size: 17px;
      color: #3f1168;
      line-height: initial;
      margin: 0;
      span {
        color: #942ced;
        font-weight: bold;
      }
      .opacity {
        color: inherit;
        opacity: 0.5;
      }
    }
  }
  .top-section {
    padding: 20px;
    padding-block: 30px;
    padding-bottom: 20px;
    border-radius: 40px !important;
    .circle {
      width: 8px;
      height: 8px;
      background-color: #3f1168;
      position: absolute;
      top: 47%;
      transform: translateY(-50%);
      left: -15px;
      border-radius: 50%;
    }
    h1 {
      margin: 0;
      text-align: center;
      font-size: 37px;
      font-weight: bold;
      color: #3f1168;
      border: none;
      padding: 0;
      span {
        color: #cc1854;
      }
      @media (max-width: 424px) {
        font-size: 20px;
      }
    }
    p {
      font-size: 17px;
      color: #3f1168;
      line-height: initial;
      margin: 0;
      position: relative;
      margin-left: 20px;
      span {
        color: #942ced;
        font-weight: bold;
      }
      .opacity {
        font-weight: 400;
        color: inherit;
        opacity: 0.5;
      }
    }
  }
  @media (max-width: 424px) {
    gap: 20px;
  }
`;
