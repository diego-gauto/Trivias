import styled, { keyframes } from "styled-components";

export const CoursesContain = styled.div`
  display: flex;
  flex-direction: Column;
  width: 100%;
  gap: 20px;
  background: #ede7f2;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @media (max-width: 1023px) {
    gap: 20px;
  }
  .module-contain {
    display: flex;
    flex-direction: Column;
    gap: 40px;
    .reveal-arrows {
      width: 100%;
      position: relative;
      display: initial;
      .arrows {
        opacity: 0;
      }
      &:hover {
        .arrows {
          z-index: 50;
          transition: 0.1s ease all;
          opacity: 1;
        }
      }
    }
    .line {
      margin-left: 60px;
      height: 1px;
      width: auto;
      background: #00000033;
      margin-right: 30px;
      @media (max-width: 1023px) {
        margin-left: 30px;
        margin-right: 30px;
      }
    }
    @media (max-width: 1023px) {
      gap: 20px;
      padding-inline: 0px;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
  .video-display {
    width: 100%;
    position: relative;
    display: initial;
    .image-container {
      width: 100%;
      height: 600px;
      position: relative;
      @media (max-width: 1000px) {
        height: auto;
      }
      .video-container {
        position: relative;
        width: 100%;
        height: 600px;
        .absolute {
          video {
            object-fit: cover;
          }
        }
      }
    }
    .skeleton-product {
      background: grey;
    }
    .text-container {
      position: absolute;
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(60px);
      height: 100%;
      width: calc(30% + 60px);
      padding-left: 60px;
      justify-content: center;
      bottom: 0px;
      left: 0px;
      gap: 10px;
      .button-contain {
        display: flex;
        margin-top: 20px;
        gap: 30px;
      }
      .top {
        display: flex;
        gap: 10px;
        color: #3f1168;
        align-items: center;
        margin-bottom: 20px;
        h1 {
          font-size: 20px;
          margin: 0;
        }
        p {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }
      }
      @media (max-width: 1023px) {
        padding-right: 20px;
        width: min-content;
      }
      @media (max-width: 700px) {
        left: 50%;
        transform: translateX(-50%);
        padding: 20px 60px;
        height: auto;
        border-radius: 20px;
        text-align: center;
        padding-inline: 20px;
        align-items: center;
        .top {
          justify-content: center;
          img {
            width: 25px;
          }
          p {
            font-size: 16px;
          }
        }
      }
    }
  }
`;
export const Title = styled.h3`
  font-size: 36px;
  font-family: "Montserrat", sans-serif;
  line-height: 44px;
  font-weight: 600;
  color: #3f1168;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;
export const SubText = styled.p`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  color: #3f1168;
  font-weight: 500;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
export const PurpleButton = styled.button`
  height: 40px;
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  justify-content: center;
  padding-inline: 15px;
  background: linear-gradient(135deg, #952ced 22%, #ca41d4 80%);
  color: #fff;
  border-radius: 30px;
  border: none;
  svg {
    transform: rotate(90deg);
  }
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1204px) {
    font-size: 10px;
  }
  @media (max-width: 1023px) {
    user-select: none;
    &:hover {
      transform: scale(1);
      transition: 0.5s ease all;
    }
    &:active{
      transform scale(1.03);
      transition: 0.5s ease all;
    }
  }
  @media (max-width: 650px) {
    font-size: 12px;
    padding-block: 8px;
    padding-inline: 15px;
  }
  @media (max-width: 450px) {
    padding-block: 4px;
    font-size: 10px;
  }
`;
export const TransparentButton = styled.button`
  align-items: center;
  width: max-content;
  height: 40px;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  padding-inline: 15px;
  color: #6717cd;
  border-radius: 30px;
  display: flex;
  gap: 10px;
  background: none;
  border: #6717cd 2px solid;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1204px) {
    font-size: 10px;
  }
  @media (max-width: 1023px) {
    user-select: none;
    &:hover {
      transform: scale(1);
      transition: 0.5s ease all;
    }
    &:active{
      transform scale(1.03);
      transition: 0.5s ease all;
    }
  }
  @media (max-width: 650px) {
    font-size: 12px;
    padding-block: 10px;
    padding-inline: 15px;
    color: #6717cd;
  }
  @media (max-width: 450px) {
    padding-block: 8px;
    font-size: 10px;
    color: #6717cd;
  }
`;
export const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.016) 90%
  );
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const GonvarLoader = styled.div`
  display: flex;
  width: 100%;
  min-height: 90vh;
  align-items: center;
  justify-content: center;
  .loader-image {
    display: flex;
    width: 80px;
    height: 80px;
    background-image: url(../images/logo2.png);
    background-size: 80px;
    background-repeat: no-repeat;
    align-items: center;
    justify-content: center;
    .loader-contain {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 100px;
      height: 100px;
      margin: 6px;
      border-width: 9px;
      border-style: solid;
      border-radius: 50%;
      border-color: #6717cd transparent transparent;
      animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal
        none running;
    }
  }
`;
