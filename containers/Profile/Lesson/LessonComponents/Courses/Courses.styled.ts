import styled, { css } from "styled-components";

export const MainContainer = styled.div<{ open: any }>`
  display: flex;
  flex-direction: column;
  right: 0;
  width: 30%;
  background: #ede7f2;
  ::-webkit-scrollbar {
    display: none;
  }
  .bg {
    background: #e8ddf2;
    width: 100%;
    height: 100%;
    @media (max-width: 1124px) {
      display: none;
    }
  }
  .course-info {
    background: #f8e4cc;
    padding-left: 40px;
    padding-block: 15px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    p,
    h1 {
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
    .certificate-box {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 100%;
      display: flex;
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
    }
  }
  ${(props) =>
    props.open == true &&
    css`
      display: flex !important;
      right: 0 !important;
      transition: 1s ease all;
      height: max-content !important;
    `}
  .certificate-responsive {
    display: none;
  }
  @media (max-width: 1124px) {
    display: none;
    transition: 1s ease all;
    position: absolute;
    overflow: hidden;
    top: 64px;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    .course-info,
    .course-progress {
      padding-left: 20px;
      width: 50%;
      .certificate-box {
        display: none;
      }
    }
    .course-progress {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .certificate-responsive {
      display: flex;
      background: #6717cd;
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 20px;
      p {
        margin: 0;
        color: white;
        font-weight: 500;
      }
    }
  }
`;
export const SeasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #e8ddf2;
  border-radius: 0px 0px 35px 35px;
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
export const Container = styled.div<{ active: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -11px 10px -10px rgb(0 0 0 / 20%) inset;
  background: #e8ddf2;
  padding: 20px 10px 20px 30px;
  cursor: pointer;
  i {
    width: 20px;
    height: 20px;
    background-size: contain;
  }
  .module {
    display: flex;
    align-items: center;
    gap: 10px;
    p {
      margin: 0;
      color: #3f1168;
      font-weight: 700;
      font-size: 16px;
    }
    .title {
      display: flex;
      flex-direction: column;
    }
  }
  ${(props) =>
    props.active == true &&
    css`
      transition: 0.5s ease all;
      background: #ede7f2;
      box-shadow: none;
      .module {
        p {
          color: #d244d1;
        }
        .title {
          color: #942ced;
        }
      }
    `}
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
  font-weight: 500 !important;
`;
export const UploadIcon = styled.i<{ active: any }>`
  background-image: url(../images/Video/icons/arrowDown.svg);
  height: 14px;
  width: 14px;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(0deg);
  transition: .5s ease all;

}
${(props) =>
  props.active == true &&
  css`
    transform: rotate(180deg);
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
  border-radius: 0px 0px 35px 35px;
  transition: 1s ease all;
  background: #dad3e5;
  ${(props) =>
    props.active == true &&
    css`
      height: auto;
      position: relative;
      max-height: 100%;
      transition: 1s ease all;
      z-index: 3;
    `}
  ${(props) =>
    props.active == false &&
    css`
      overflow: hidden;
    `}
`;
export const DEMO = styled.div<{ active: boolean }>`
  height: 0px;
  display: flex;
  flex-direction: column;
  transition: 1s ease all;
  background: #e8ddf2;
  ${(props) =>
    props.active == true &&
    css`
      height: auto;
      max-height: 100%;
      transition: 1s ease all;
      z-index: 3;
    `}
  ${(props) =>
    props.active == false &&
    css`
      overflow: auto;
    `}
`;
export const HamburgerContainer = styled.div`
  position: absolute;
  display: none;
  background: #411369;
  padding-block: 18px;
  justify-content: space-between;
  padding-inline: 40px;
  align-items: center;
  right: 0;
  color: #ede7f2;
  svg {
    color: #ede7f2;
    font-size: 24px;
  }
  p {
    margin: 0;
    position: absolute;
    left: 20px;
    top: 40px;
    font-size: 12px;
  }
  @media (max-width: 1124px) {
    display: flex;
  }
`;
