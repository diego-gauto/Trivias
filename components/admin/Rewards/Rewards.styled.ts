import Image from "next/image";
import styled from "styled-components";

export const RewardContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
export const ImageContain = styled.div`
  position: relative;
  display: flex;
  height: 355px;
  z-index: -1;
`;
export const Banner = styled(Image)`
`;
export const TitleContain = styled.div`
  display: flex;
  position: absolute;
  padding-block: 40px;
  padding-inline: 20px;
`;
export const Title = styled.h1`
  font-family: 'Montserrat';
  color: white;
  font-size: 36px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-block: 20px;
  padding-inline: 40px;
`;
export const InputContain = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  background: white;
  padding: 20px;
  width: 100%;
  box-shadow: 0px -6px 6px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px 10px 0 0;
  z-index: 2;
`;
export const Unselect = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  cursor: pointer;
`;
export const Tab = styled.p`
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 600;
  color: #6717CD;
  margin: 0;
`;
export const PriceContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-block: 20px;
  flex-direction: column;
  padding-inline: 40px;
`;
export const PriceTitle = styled.p`
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;