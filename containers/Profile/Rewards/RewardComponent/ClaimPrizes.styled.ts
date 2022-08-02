import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  margin-left: 12px;
`;
export const TitleClaim = styled.h1`
  font-size: 18px;
  font-weight: 600;
  font-family:'Montserrat', sans-serif;
  margin: 0;
`;
export const PrizeImage = styled.div`
  border-radius:10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  @media (max-width: 870px) {
    width: 150px;
  }
  &:hover{
    box-shadow: 0px 0px 10px 2px #6717CD;
  }
`;
export const AllPrizes = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 60px;
  @media (max-width: 870px) {
    flex-wrap: wrap;
    gap: 30px;
  }
`;
export const PrizeContain = styled.div`
  display: flex;
  width: 150px;
  flex-direction: column;
  gap: 3px;
`;
export const PrizeTitle = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-family:'Montserrat', sans-serif;
  margin: 0;
`;
export const PrizeInfo = styled.span`
  text-align: center;
  font-size: 14px;
  font-family:'Raleway', sans-serif;
  margin: 0;
`;