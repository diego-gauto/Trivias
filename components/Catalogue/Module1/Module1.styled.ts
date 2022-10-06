import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
`;
export const ImageContain = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  @media (max-width: 1000px) {
    height: auto;
  }
`;
export const VideoContain = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 600px;
  @media (max-width: 1000px) {
    height: auto;
  }
`;

export const TextContain = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  bottom: 100px;
  left: 20px;
  gap: 10px;
  position: absolute;
  @media (max-width: 1100px) {
    bottom: 60px;
  }
  @media (max-width: 650px) {
    left: 10px;
    bottom: 40px;
  }
  @media (max-width: 450px) {
    bottom: 20px;
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
  @media (max-width: 1023px) {
    flex-direction: column;
    width: fit-content;
  }
  @media (max-width: 650px) {
    flex-direction: column;
    margin-top: 0;
    gap: 5px;
  }
`;
export const Title = styled.h1`
  font-size: 36px;
  font-family: "Montserrat", sans-serif;
  color: white;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 24px;
  }
  @media (max-width: 650px) {
    font-size: 18px;
  }
`;
export const SubText = styled.p`
  width: 60%;
  font-size: 24px;
  text-align: justify;
  font-family: "Montserrat", sans-serif;
  color: white;
  margin: 0;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const Banner = styled(Image)`
  width: 100%;
  postion: absolute;
`;
export const PurpleButton = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  justify-content: center;
  padding-block: 15px;
  padding-inline: 25px;
  background-color: #6717cd;
  color: #fff;
  border-radius: 30px;
  border: none;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 650px) {
    font-size: 12px;
    padding-block: 8px;
    padding-inline: 15px;
  }
  @media (max-width: 450px) {
    padding-block: 4px;
    font-size: 10px;
  }
`;
export const TransparentButton = styled.button`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  color: #6717cd;
  border-radius: 30px;
  display: flex;
  gap: 10px;
  background: none;
  border: #6717cd 2px solid;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 650px) {
    font-size: 12px;
    padding-block: 10px;
    padding-inline: 15px;
    color: #6717cd;
  }
  @media (max-width: 450px) {
    padding-block: 8px;
    font-size: 10px;
    color: #6717cd;
  }
`;
export const PlayIcon = styled.i`
  background-repeat: no-repeat;
  background-image: url(../images/Preview/fillArrow.svg);
  height: 24px;
  width: 18px;
  background-position: center;
`;
