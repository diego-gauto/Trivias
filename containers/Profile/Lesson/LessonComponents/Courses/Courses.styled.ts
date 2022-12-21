import styled, { css } from "styled-components";

export const MainContainer = styled.div<{ open: any }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  width: 30%;
  ::-webkit-scrollbar {
    display: none;
  }
  .course-info {
    background: #f8e4cc;
    padding-left: 40px;
    padding-block: 15px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    p {
      font-size: 14px;
      color: #3f1168;
      margin: 0;
      span {
        font-weight: bold;
      }
    }
    .level-container {
      display: flex;
      gap: 5px;
    }
  }
  /******/
  .course-progress {
    position: relative;
    background: #f8e494;
    padding-left: 40px;
    padding-block: 15px;
    .title {
      font-size: 16px;
      font-weight: bold;
      b {
        font-weight: 700;
        color: #942ced;
      }
      span {
        font-weight: 400;
        color: #942ced;
      }
    }
    p {
      font-size: 14px;
      color: #3f1168;
      margin: 0;
      span {
        font-weight: bold;
      }
    }
    .certificate-label {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 0;
      height: 100%;
      background: #6717cd;
      text-align: center;
      p {
        color: #fff;
        margin: auto;
        font-size: 12px;
      }
    }
  }

  @media (max-width: 900px) {
    position: fixed;
    z-index: 40;
    padding: 10px;
    background: white;
    box-shadow: 0px 0px 20px 2px rgb(0 0 0 / 25%);
    border-radius: 10px;
    width: 100%;
    top: 0;
    right: -100%;
    transition: 1s ease all;
    height: 100%;
  }
  ${(props) =>
    props.open == true &&
    css`
      right: 0 !important;
      transition: 1s ease all;
    `}
`;
export const SeasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const CloseButton = styled.div`
  color: #8E2DE2;
  font-size: 40px;
  font-weight: 900;
  font-family: 'Nunito';
  line-height: 100%;
  cursor: pointer;
  display: none;
  @media (max-width: 900px){
    display: block;
  }
}
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.h1`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  margin: 0;
`;
export const Episode = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
  margin: 0;
`;
export const UploadIcon = styled.i<{ active: any }>`
  background-image: url(../images/Video/icons/arrowDown.svg);
  height: 14px;
  width: 14px;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(-90deg);
  transition: .5s ease all;

}
${(props) =>
  props.active == true &&
  css`
    transform: rotate(0deg);
    transition: 0.5s ease all;
  `}
`;
export const Divider = styled.div`
  display: flex;
  width: 100%;
  height: 1.5px;
  background: black;
`;
export const CoursesContainer = styled.div<{ active: boolean }>`
  height: 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  transition: 1s ease all;
  ${(props) =>
    props.active == true &&
    css`
      height: auto;
      max-height: 70vh;
      transition: 1s ease all;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 6px;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      -webkit-appearance: none;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
      ...
    }
    `}
  ${(props) =>
    props.active == false &&
    css`
      overflow: auto;
    `}
`;
