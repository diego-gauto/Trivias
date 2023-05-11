import styled, { css } from "styled-components";

export const MainContainer = styled.div<{ color: any }>`
  display: flex;
  flex-direction: column;
  margin: auto;
  .button-contain {
    display: flex;
    gap: 20px;
    .icon {
      font-size: 30px;
      color: #1877f2;
    }
  }
  button {
    border: none;
    color: white;
    border-radius: 20px;
    width: 200px;
    margin: 40px auto;
    font-size: 24px;
    background: #6610f2;
  }
  .certificate {
    position: relative;
    margin-block-start: 4rem;
    width: 850px;
    height: 600px;
    ${(props) =>
      props.color == "azul" &&
      css`
        background-image: url("../images/Certificates/cert-blue.jpg");
      `}
    ${(props) =>
      props.color == "amarillo" &&
      css`
        background-image: url("../images/Certificates/cert-yellow.jpg");
      `}
       ${(props) =>
      props.color == "morado" &&
      css`
        background-image: url("../images/Certificates/cert-purple.jpg");
      `}
       ${(props) =>
      props.color == "naranja" &&
      css`
        background-image: url("../images/Certificates/cert-orange.jpg");
      `}
       ${(props) =>
      props.color == "rosa" &&
      css`
        background-image: url("../images/Certificates/cert-pink.jpg");
      `}
       ${(props) =>
      props.color == "verde" &&
      css`
        background-image: url("../images/Certificates/cert-green.jpg");
      `}
    background-repeat: no-repeat;
    background-size: 100%;
    margin-inline: auto;
    p {
      margin: 0;
      width: max-content;
    }
    .main-signature {
      width: 100px;
      position: absolute;
      z-index: 2;
      bottom: 14%;
      left: 53%;
    }
    .professor-signature {
      width: 100px;
      position: absolute;
      z-index: 2;
      bottom: 14%;
      left: 34%;
    }
    .title {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 175px);
      color: #e05c04;
      font-size: 50px;
      font-weight: 700;
      text-transform: capitalize;
    }
    .course-title {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 275px);
      color: #942ced;
      font-size: 20px;
      font-weight: 600;
    }
    .professor {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 340px);
      color: #6717cd;
      font-size: 20px;
      font-weight: 600;
    }
    .date {
      position: absolute;
      left: 46.5%;
      transform: translateY(378px);
      color: #6c4c7c;
      font-size: 18px;
      font-weight: 600;
    }
    .folio {
      position: absolute;
      left: 5%;
      transform: translateY(430px);
      color: #451466;
      font-size: 18px;
      font-weight: 400;
    }
    .professor-name {
      position: absolute;
      left: 32%;
      line-height: 15px;
      bottom: 75px;
      color: #451466;
      font-size: 14px;
      font-weight: 600;
    }
  }

  @media (max-width: 800px) {
    overflow: auto;
  }
`;
