import { validateFieldsNatively } from "@hookform/resolvers";
import styled, { css } from "styled-components";

export const MainContain = styled.div`
  display:flex;
  margin-top: 20px;
  @media(max-width: 1023px) {
    margin-top: -60px;
    justify-content: space-between;
    z-index: 1;
  }
  @media(max-width: 449px) {
    margin-top: -50px;
  }
  @media(max-width: 400px) {
    margin-top: -40px;
  }
`;
export const Container = styled.div`
  display: flex;
  z-index: 2;
  padding-top: 15px;
  padding-bottom: 20px;
  padding-inline: 25px;
  border-radius: 10px 10px 0 0;
  background-color: white;
  box-shadow: 0px -8px 10px 0px rgba(0, 0, 0, .2);
  @media(max-width: 1023px) {
    padding-inline: 20px;
    padding-block: 12px;
    border-radius: 100px;
    background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  }
  @media(max-width: 449px) {
    padding-inline: 15px;
    padding-block: 8px;
  }
  @media(max-width: 400px) {
    padding-inline: 15px;
    padding-block: 4px;
  }
`;
export const OffContainer = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 20px;
  padding-inline: 25px;
  cursor: pointer;
  @media(max-width: 1023px) {
    padding-inline: 20px;
    padding-block: 12px;
    border-radius: 100px;
    border: 1px solid #FFFFFF;
  }
  @media(max-width: 449px) {
    padding-inline: 15px;
    padding-block: 8px;
  }
  @media(max-width: 400px) {
    padding-inline: 15px;
    padding-block: 4px;
  }
`;
export const MainTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family:'Montserrat', sans-serif;
  color: #6717CD;
  margin: 0;
  @media(max-width: 1023px) {
    color: #FFFFFF;
  }
  @media(max-width: 600px) {
    font-size: 14px;
  }
  @media(max-width: 449px) {
    font-size: 12px;
  }
`;
export const RewardContainer = styled.div`
  display: flex;
  align-items:center;
  z-index: 1;
  position: relative;
  padding-top: 30px;
  padding-bottom: 60px;
  padding-inline: 40px;
  border-radius: 10px;
  gap: 3px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.3);
  @media(max-width: 1023px) {
    top: 25px;
    justify-content: space-between;
  }
  @media(max-width: 380px) {
    padding-top: 20px;
    padding-inline: 20px;
    padding-bottom: 55px;
  }
`;
export const LevelContainer = styled.div<{i:any,level:any}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 100%;
  ${props => (props.i == 0) && css`
  width: fit-content;
`}
  @media(max-width: 1023px) {
    width: 50px;
    display: none;
    ${props => (props.i == props.level || props.i == props.level-1 || props.i == props.level +1) && css`
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
  ${props => (props.i == 0) && css`
  display: none;
`}
  ${props => (props.level > props.min) && css`
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  `}
  ${props => (props.score >= props.min && props.score < props.max) && css`
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