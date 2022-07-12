import styled from "styled-components";

export const MainContain = styled.div`
  display:flex;
  padding-inline: 30px;
  margin-top: 20px;
`;
export const Container = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 30px;
  padding-inline: 25px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px -6px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const OffContainer = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 30px;
  padding-inline: 25px;
  cursor:pointer;
`;
export const MainTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family:'Montserrat', sans-serif;
  color: #6717CD;
  margin: 0;
`;
export const RewardContainer = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  position: relative;
  padding-top: 30px;
  padding-bottom:60px;
  padding-inline: 40px;
  border-radius: 10px;
  gap: 3px;
  box-shadow: 0px -3px 20px 2px rgba(0, 0, 0, 0.3)
`;
export const LevelText = styled.p`
  font-size: 14px;
  font-family:'Raleway', sans-serif;
  color: black;
  margin: 0;
  text-align:center;
  position: absolute;
  bottom: 15px;
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
`;
export const Circle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid black;
`;
export const CompleteCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
`;
export const Divisor = styled.div`
  background-color: black;
  width: 100px;
  height: 4px;
`;
export const CompleteDivisor = styled.div`
  background-color: #8E2DE2;
  width: 100px;
  height: 4px;
`;
export const ContainLevel = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 10px;
`;