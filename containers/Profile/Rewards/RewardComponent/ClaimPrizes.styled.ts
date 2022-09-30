import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  margin-left: 12px;
  @media(max-width: 620px){
    margin-left: 0px;
  }
`;
export const TitleClaim = styled.h1`
  font-size: 18px;
  font-weight: 600;
  font-family:'Montserrat', sans-serif;
  margin: 0;
`;
export const PrizeImage = styled.div`
  display: flex;
  width: 260px;
  height: 260px;
  position: relative;
  border-radius: 10px;
  &:hover{
    box-shadow: 0px 0px 10px 2px #6717CD;
  }
  cursor: pointer;
  @media(max-width: 620px){ 
    width: 200px;
    height: 200px;
  }
  @media(max-width: 560px){ 
    width: 150px;
    height: 150px;
  }
`;
export const Overlay = styled.div<{points:any,score:any}>`
${props=> props.points > props.score && css`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 10px;
  opacity: .5;
  z-index: 10;
`}
`;
export const Band = styled.i`
  background-image: url(../images/bandComplete.png);
  background-repeat: no-repeat;
  height: 130px;
  width: 155px;
  position: absolute;
  top:-4px;
  left: -4px;
`;
export const Overlay2 = styled.div<{points:any,score:any}>`
${props=> props.points*30 > props.score && css`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 10px;
  opacity: .5;
  z-index: 10;
`}
`;
export const AllPrizes = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 60px;
  padding: 20px;

  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 877px) {
    padding-inline: 0px;
    flex-wrap: wrap;
    gap: 10px;
    overflow: initial;
    justify-content: space-between;
  }
`;
export const PrizeContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
`;
export const PrizeTitle = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-family:'Montserrat', sans-serif;
  margin: 0;
  @media(max-width: 620px){ 
    width: 200px;
  }
  @media(max-width: 560px){ 
    width: 150px;
  }
`;
export const PrizeInfo = styled.span`
  text-align: center;
  font-size: 14px;
  font-family:'Raleway', sans-serif;
  margin: 0;
`;
export const ImageReward = styled.img`
  background-position: center;
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;