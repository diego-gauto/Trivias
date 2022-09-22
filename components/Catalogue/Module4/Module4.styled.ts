import styled from "styled-components";
import { ContinueText } from "../Module2/Module2.styled";

export const Title = styled(ContinueText)`
  padding:10px;
  @media( max-width: 1023px){
    font-size: 24px;
    }
`;

export const Viewpay = styled.p`
  padding-block: 15px;
  color: #6717CD;
  text-align: center;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 0;
  @media( max-width: 1023px){
    padding-block: 10px;
    font-size: 14px;
  }
  &:hover{
    color: white;
    background-color: #6717CD;
    border-radius: 0 0 10px 10px;
  }
`;
export const Maincontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const ScrollContainer = styled.div`
  overflow: auto;
  ::-webkit-scrollbar{
    display: none;
  }
`;
export const CardContain = styled.div`
  display: flex;
  padding: 10px;
  gap: 20px;
  overflow: auto;
  float: left;
  ::-webkit-scrollbar{
    display: none;
  }
`;
export const Cardcontent = styled.div`
  display: flex;
  flex-direction: column;
  width: 452px;
  height: 402px;
  border-radius: 10px;
  cursor: pointer;
  transition: all .2s ease-in-out;
  @media( max-width: 1023px){
    height: auto;
    width: 360px;
  }
  @media( max-width: 600px){
    min-width: 180px;
    width: min-content;
  }
  &:hover{
    transform: scale(1.02);
  }
`;
export const CardImage = styled.img`
  width: 100%;
  max-height:209px;
  border-radius: 10px 10px 0px 0px;
  @media( max-width: 1023px){
    height: 120px;
  }
`;
export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  justify-content:space-between;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 10px 10px;
  background: white;
`;