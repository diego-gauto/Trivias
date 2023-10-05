import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ede7f2;
  height: 100%;
`;

export const SeasonCard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SeasonInfo = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -11px 10px -10px rgb(0 0 0 / 20%) inset;
  background: #e8ddf2;
  padding: 20px 10px 20px 30px;
  cursor: pointer;
  transition: 0.5s ease all;
  .seasonDetail {
    display: flex;
    flex-direction: column;
    * {
      margin: 0;
      font-size: 16px;
    }
    h4 {
      color: #3f1168;
      font-weight: 700;
    }
    p {
      color: #3f1168;
      font-weight: 500;
    }
  }
  ${(props) =>
    props.active == true &&
    css`
      transition: 0.5s ease all;
      background: #ede7f2;
      box-shadow: none;
      .seasonDetail {
        display: flex;
        flex-direction: column;
        h4 {
          color: #942ced;
        }
        p {
          color: #d244d1;
        }
      }
    `}
`;

export const ArrowUpIcon = styled.i<{ active: any }>`
  background-image: url(../images/Video/icons/arrowDown.svg);
  height: 20px;
  width: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotate(0deg);
  transition: 0.5s ease all;
  ${(props) =>
    props.active == true &&
    css`
      transform: rotate(180deg);
      transition: 0.5s ease all;
    `}
`;

export const LessonCard = styled.div`
  display: flex;
  gap: 15px;
  align-items: self-start;
  padding-left: 30px;
  cursor: pointer;
  * {
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #3f1168;
  }

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .right {
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
  }
`;

export const CourseLength = styled.div`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  color: #3f1168;
  margin: 0;
  display: flex;
  gap: 5px;
  .icon {
    font-size: 16px;
  }
`;

export const Circle = styled.div<{ status: string }>`
  display: flex;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid gray;

  ${(props) =>
    props.status === "completed" &&
    css`
      border: 2px solid #3f1168;
      background: #3f1168;
    `}

  ${(props) =>
    props.status === "actual" &&
    css`
      border: 2px solid #3f1168;
    `}
`;

export const Line = styled.div<{ status: string }>`
  border-radius: 10px;
  width: 2px;
  background: gray;
  height: 100%;

  ${(props) =>
    props.status === "completed" &&
    css`
      background: #3f1168;
    `}

  ${(props) =>
    props.status === "actual" &&
    css`
      background: gray;
    `}
`;

export const LessonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  border-radius: 0px 0px 35px 35px;
  background: #e8ddf2;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 20px -7px;
  z-index: 1;
`;
