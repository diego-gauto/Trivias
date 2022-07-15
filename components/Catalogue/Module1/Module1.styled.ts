import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
`;
export const TextContain = styled.div`
  display: flex;
  flex-direction: column;
  bottom: 100px;
  left: 20px;
  gap: 10px;
  position: absolute;
`;
export const ButtonContain = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
`;
export const Title = styled.h1`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  margin: 0;
`;
export const SubText = styled.p`
  width: 50%;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  margin: 0;
`;
export const Banner = styled(Image)`
  postion: absolute;
  clip-path: polygon(100% 0%,
    100% 0%,
    100% 80%,
    0% 100%,
    0% 0%);
  `;
  export const PurpleButton = styled.button`
  display: flex;
  gap: 5px;
  align-items:center;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background-color: #6717CD;
  color: #fff;
  border-radius: 30px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const TransparentButton = styled.button`
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background:transparent;
  color: #fff;
  border-radius: 30px;
  border:1px solid white;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const PlayIcon = styled.i`
  background-image: url(../images/Preview/play.png);
  height: 24px;
  width: 18px;
  background-position: center;
`;