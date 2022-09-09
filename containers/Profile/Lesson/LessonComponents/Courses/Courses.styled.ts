import styled, { css } from "styled-components";

export const MainContainer = styled.div<{open:any}>`
  display: flex;
  flex-direction: column; 
  gap: 10px;
  flex:1 0;
  @media (max-width: 900px){
    position: absolute;
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
  ${props => props.open == true && css`
    right:0 !important;
    transition: 1s ease all;
  `}
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