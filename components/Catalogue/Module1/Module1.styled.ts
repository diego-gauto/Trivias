import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
  .skeleton-product {
    background: grey;
  }
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
  width: 100%;
  height: 600px;
  .absolute {
    video {
      object-fit: cover;
    }
  }
`;

export const TextContain = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(60px);
  height: 100%;
  width: calc(30% + 60px);
  padding-left: 60px;
  justify-content: center;
  bottom: 0px;
  left: 0px;
  gap: 10px;
  .top {
    display: flex;
    gap: 10px;
    color: #3f1168;
    align-items: center;
    margin-bottom: 20px;
    p {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

export const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.016) 97%
  );
`;
export const ButtonContain = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 30px;
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
  color: #3f1168;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 24px;
  }
  @media (max-width: 650px) {
    font-size: 18px;
  }
`;
export const SubText = styled.p`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  color: #3f1168;
  font-weight: 500;
  margin: 0;
`;
export const Banner = styled(Image)`
  width: 100%;
  postion: absolute;
`;
export const PurpleButton = styled.button`
  height: 40px;
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  justify-content: center;
  padding-inline: 15px;
  background: linear-gradient(135deg, #952ced 22%, #ca41d4 80%);
  color: #fff;
  border-radius: 30px;
  border: none;
  svg {
    transform: rotate(90deg);
  }
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1204px) {
    font-size: 10px;
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
  align-items: center;
  width: max-content;
  height: 40px;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  padding-inline: 15px;
  color: #fff;
  border-radius: 30px;
  display: flex;
  gap: 10px;
  background: none;
  border: #fff 2px solid;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1204px) {
    font-size: 10px;
  }
  @media (max-width: 650px) {
    font-size: 12px;
    padding-block: 10px;
    padding-inline: 15px;
    color: #fff;
  }
  @media (max-width: 450px) {
    padding-block: 8px;
    font-size: 10px;
    color: #fff;
  }
`;
export const PlayIcon = styled.i`
  background-repeat: no-repeat;
  background-image: url(../images/Preview/fillArrow.svg);
  height: 24px;
  width: 18px;
  background-position: center;
`;
