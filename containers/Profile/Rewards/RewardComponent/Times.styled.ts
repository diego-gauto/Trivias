import styled, { css } from "styled-components";

export const LevelContainer = styled.div<{i:any,level:any,size:any}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 100%;
  ${props => (props.i == props.size) && css`
  width: fit-content;
  `}
  @media(max-width: 1023px) {
    width: 50px;
    display: none;
    ${props => (props.i == props.level || props.i ==props.level-1 || props.i == props.level + 1) && css`
    display: flex;
  `}
  }

`;
export const LevelText = styled("p")<{val:any, level:any}>`
  font-size: 14px;
  font-family:'Raleway', sans-serif;
  color: black;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  position: absolute;
  bottom: 15px;
  ${props => (props.level == props.val) && css`
  font-size: 16px;
  font-weight: 600;
  color: #6717CD;
  bottom: 10px;
  @media(max-width: 450px){
    font-size: 14px;
    bottom: 12px;
  }
  `}
  ${props => (props.level > props.val) && css`
  color: #6717CD;
  @media(max-width: 450px){
    font-size: 12px;

  }
  `}
  ${props => (props.level < props.val) && css`
  @media(max-width: 450px){
    font-size: 12px;
  }
  `}
`;
export const Circle = styled("div")<{val:any, level:any}>`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid gray;
  ${props => (props.level == props.val) && css`
  width: 50px;
  height: 50px;
  border: 2px solid #8E2DE2;
  `}
  ${props => (props.level > props.val) && css`
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  border: none;
  `}
`;
export const Divisor = styled("div")<{min:any, i:any, size:any, level:any, score:any,max:any}>`
  background-color: gray;
  // width: ${props=> 800/props.size}px;
  width: 100%;
  height: 4px;
  @media (max-width: 1023px) {
    display: none;
  }
  ${props => (props.i == props.size) && css`
  display: none;
  `}
  ${props => (props.i < props.level) && css`
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  `}
  ${props => (props.level == props.i) && css`
  background: white;
  border: 1px solid #8E2DE2;
  `}
`;

export const ContainLevel = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 10px;
`;