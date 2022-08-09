import styled from "styled-components";

export const MainContain = styled.div`
  display:flex;
  margin-top: 20px;
  @media(max-width: 1023px) {
    margin-top: -30px;
    justify-content: space-between;
    z-index: 1;
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
    width: 160px;
    height: 40px;
    margin-top:-20px;
    background: #6717CD;
    border-radius: 100px;
    padding-top: 8px;
    justify-content: center;
  }
`;
export const OffContainer = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 20px;
  padding-inline: 25px;
  cursor: pointer;
  @media(max-width: 1023px) {
    width: 160px;
    height: 40px;
    margin-top:-20px;
    border: 1px solid #FFFFFF;
    border-radius: 100px;
    padding-top: 8px;
    justify-content: center;
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
export const LevelText = styled.p`
  font-size: 14px;
  font-family:'Raleway', sans-serif;
  color: black;
  margin: 0;
  text-align:center;
  position: absolute;
  bottom: 15px;
  @media(max-width: 1023px) {
   width: 100%;
  }
`;
export const CompleteText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-family:'Raleway', sans-serif;
  color: #8E2DE2;
  margin: 0;
  text-align:center;
  position: absolute;
  bottom: 15px;
  @media(max-width: 1023px) {
    width: 100%;
   }
`;
export const Circle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid black;
  @media (max-width: 870px) {
    width: 32px;
    height: 32px;
  }
`;
export const CompleteCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  @media (max-width: 870px) {
    width: 32px;
    height: 32px;
  }
`;
export const Divisor = styled.div`
  background-color: black;
  width: 100px;
  height: 4px;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const CompleteDivisor = styled.div`
  background-color: #8E2DE2;
  width: 100px;
  height: 4px;
  @media (max-width: 870px) {
    display: none;
  }
`;
export const ContainLevel = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 10px;
`;