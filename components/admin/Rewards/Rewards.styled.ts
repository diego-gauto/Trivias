import Image from "next/image";
import styled from "styled-components";

export const RewardContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
export const ImageContain = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  position: relative;
  filter: brightness(50%);
img{
  width: 100%;
  height: auto;
}
`;
export const Banner = styled(Image)`
`;
export const TitleContain = styled.div`
  display: flex;
  position: absolute;
  padding-block: 40px;
  padding-inline: 20px;
`;
export const ButtonPosition = styled.div`

  input{
    display: none;
  }
  label{
    position: absolute;
    top: 100px;
    left: 20px;
    font-size: 16px;
    font-family:'Montserrat',sans-serif;
    background: white;
    color: #6717CD;;
    padding-block: 10px;
    padding-inline: 30px;
    border: 1px solid #6717CD;;
    border-radius: 100px;
    cursor: pointer;
  }
  button{
    position: absolute;
    top: 160px;
    left: 20px;
    font-size: 16px;
    font-family:'Montserrat',sans-serif;
    background: white;
    color: #6717CD;;
    padding-block: 10px;
    padding-inline: 30px;
    border: 1px solid #6717CD;;
    border-radius: 100px;
    cursor: pointer;
  }
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