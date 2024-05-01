import styled, { css } from 'styled-components';

export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  .content {
    position: relative;
    background: #f8e494;
    padding-left: 40px;
    padding-block: 15px;
    * {
      margin: 0;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #3f1168;
      b {
        font-weight: 700;
        color: #942ced;
      }
      span {
        font-weight: 400;
        color: #942ced;
      }
    }
  }
`;

export const CertificateContainer = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  bottom: 0;
  height: 100%;
  .half {
    width: 40px;
    height: 100%;
    background: #6717cd;
    clip-path: circle(40px at right);
  }
  .certificate-label {
    padding-right: 20px;
    display: flex;
    height: 100%;
    background: #6717cd;
    text-align: center;
    p {
      font-weight: 500;
      color: #fff;
      margin: auto;
      font-size: 12px;
    }
  }
`;

export const CertificateOn = styled.button`
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
  color: #fff;
  border: none;
  width: 100%;
  padding: 5px 15px;
  p {
    animation-name: scale;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    margin: 0;
    font-weight: 500;
    font-style: italic;
  }
`;
