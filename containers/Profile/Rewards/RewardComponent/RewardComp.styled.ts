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
  justify-content:center;
  position: relative;
  padding-top: 30px;
  padding-bottom:60px;
  padding-inline: 40px;
  border-radius: 10px;
  gap: 3px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.3);
  @media(max-width: 1023px) {
    top: 25px;
    //margin-left: 3%;
    //margin-right: 3%;
    //height: 100%;
    gap: 86px;
    justify-content: space-between;
    overflow: auto;
  }
`;
export const LevelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
export const LevelText = styled("p")<{val:any, level:any}>`
  font-size: 14px;
  font-family:'Raleway', sans-serif;
  color: black;
  margin: 0;
  text-align:center;
  position: absolute;
  bottom: 15px;
  ${props => (props.level == props.val) && css`
  font-size: 16px;
  font-weight: 600;
  color: #6717CD;
  bottom: 10px;
  `}
  ${props => (props.level > props.val) && css`
  color: #6717CD;
  `}
  @media(max-width: 1023px) {
   width: 100%;
  }
  
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
  @media (max-width: 870px) {
    width: 32px;
    height: 32px;
  }
`;
export const Divisor = styled("div")<{val:any, i:any, size:any, level:any,name:any}>`
  background-color: gray;
  width: 100px;
  height: 4px;
  @media (max-width: 870px) {
    display: none;
  }
  ${props => (props.i == props.size) && css`
  display: none;
`}

  ${props => (props.level > props.val) && css<{i:any, name:any}>`
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
    ${props => (props.i == props.name) && css`
    background: white;
    border: 1px solid #8E2DE2;
    `}
  `}
`;

export const ContainLevel = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 10px;
`;