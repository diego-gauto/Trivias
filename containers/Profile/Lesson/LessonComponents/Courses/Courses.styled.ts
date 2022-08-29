import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 10px;
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
  font-family:'Montserrat', sans-serif;
  cursor: pointer;
  margin: 0;
`;
export const Episode = styled.p`
  font-size: 14px;
  font-family:'Raleway', sans-serif;
  cursor: pointer;
  margin: 0;
`;
export const UploadIcon = styled.i<{active:any}>`
  background-image: url(../images/Video/DownNarrow.png);
  height: 14px;
  width: 14px;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(-90deg);
  transition: .5s ease all;

}
${props => props.active == true && css`
transform: rotate(0deg);
transition: .5s ease all;
  `}
`;
export const Divider = styled.div`
  display: flex;
  width: 100%;
  height: 1.5px;
  background: black;
`;
export const CoursesContainer = styled.div<{active:any}>`
  height: 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  transition: 1s ease all;
  ${props => props.active == true && css`
    height:100%;
    max-height:1000px;
    transition: 1s ease all;
  `}
`;