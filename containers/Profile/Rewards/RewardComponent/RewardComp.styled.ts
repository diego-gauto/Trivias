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
  position: relative;
  padding-block: 30px;
  padding-inline: 20px;
  border-radius: 10px;
  box-shadow: 0px -3px 20px 2px rgba(0, 0, 0, 0.3)
`;
export const LevelText = styled.p`
  font-size: 14px;
  font-family:'Raleway', sans-serif;
  color: #6717CD;
`;
export const Circle1 = styled.div`
  background-color: #8E2DE2;
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
export const Divisor1 = styled.div`
  background-color: #8E2DE2;
  width: 50px;
  height: 4px;
`;
export const Circle2 = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #8E2DE2;
`;
export const Divisor2 = styled.div`
  border: .5px solid #8E2DE2;
  width: 50px;
  height: 4px;
`;
export const Circle3 = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid black;
`;
export const Divisor3 = styled.div`
  background-color: black;
  width: 50px;
  height: 4px;
`;