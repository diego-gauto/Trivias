import styled from "styled-components";
import { ContinueText } from "../Module2/Module2.styled";

export const Title = styled(ContinueText)`
  padding:10px;
  @media( max-width: 1023px){
    font-size: 24px;
    margin-left: 10px;
  }
`;

export const Viewpay = styled.p`
  padding-block-end: 25px;
  color: #6717CD;
  text-align: center;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 0;
  &:hover{
    text-decoration: underline;
  }
  @media( max-width: 1023px){
    padding-block: 10px;
    font-size: 14px;
  }
`;
export const Maincontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const CardContain = styled.div`
  display: flex;
  padding: 10px;
  gap: 20px;
  overflow: auto;
  float: left;
  overscroll-behavior-inline: contain;
  ::-webkit-scrollbar{
    display: none;
  }
`;
export const Cardcontent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 452px;
  width:100%;
  height: 402px;
  border-radius: 10px;
  @media( max-width: 1023px){
    height: auto;
  }
`;
export const CardImage = styled.img`
  width: -webkit-fill-available;
`;
export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  justify-content:space-between;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 10px 10px;
`;