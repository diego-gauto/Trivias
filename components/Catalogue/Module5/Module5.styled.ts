import Image from "next/image";
import { Container } from "react-bootstrap";
import styled from "styled-components";

export const MainContainer = styled(Container)`
  margin-top: -40px !important;
  padding-bottom: 40px !important;
  padding-inline: 20px;
  margin: 0;
  @media (max-width: 1023px) {
    padding-inline: 10px;
    margin-top: -20px !important;
    padding-bottom: 20px !important;
  }
`;
export const Banner2 = styled(Image)`
  filter: brightness(40%);
  postion: absolute;
`;
export const Content = styled.div`
  display: flex;
  padding-inline: 10px;
  flex-direction: column;
  width: 100%;
`;
export const ImageContain = styled.div`
  width: 100%;
  height: 590px;
  position: relative;
  @media (max-width: 1023px) {
    height: 520px;
  }
  @media (max-width: 600px) {
    height: 400px;
  }
`;
export const TextContainer = styled.div`
  display: flex;
  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    padding-left: 20px;
    padding-right: 0;
  }
`;
export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  @media (max-width: 1023px) {
    align-items: flex-start;
  }
`;
export const Title = styled.h1`
  color: #3f1168;
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding-left: 20px;
  span {
    color: #a733e4;
  }
  @media (max-width: 1023px) {
    font-size: 24px;
  }
`;
export const LimitTime = styled.p`
  color: white;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const SuscribeText = styled.p`
  display: flex;
  gap: 10px;
  color: white;
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 20px;
  }
`;
export const SpanText = styled.span`
  color: #e0c3fc;
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;

export const CardContain = styled.div`
  display: flex;
  padding: 20px;
  padding-block-start: 5px;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  width: fit-content;
  @media (max-width: 1023px) {
    padding-inline: 10px;
  }
  .right-shadow {
    display: none;
  }
  @media (max-width: 1023px) {
    .right-shadow {
      right: 0;
    }
  }
  @media (max-width: 1023px) {
    .right-shadow {
      height: 120px;
    }
  }
`;
export const Cardcontent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media (max-width: 1023px) {
    position: absolute;
    top: 0;
    max-width: 250px;
    min-width: 200px;
  }
`;
export const Cardcontent2 = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
  @media (max-width: 1023px) {
    height: auto;
    width: 360px;
  }
  @media (max-width: 600px) {
    min-width: 180px;
    width: min-content;
  }
`;
export const Cardcontent3 = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  @media (max-width: 1023px) {
    position: absolute;
    top: 20px;
    right: 0;
    max-width: 250px;
    min-width: 200px;
  }
`;
export const RespContain = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  @media (max-width: 1023px) {
    height: auto;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const TextContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  @media (max-width: 600px) {
    display: none;
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
  margin-block: 40px;
  @media (max-width: 1023px) {
    margin-block: 20px;
  }
`;
export const PurpleButton = styled.button`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  background-color: #6717cd;
  padding-block: 15px;
  padding-inline: 25px;
  color: #fff;
  border-radius: 30px;
  border: none;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1023px) {
    bottom: 10px;
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 20px;
  }
`;
export const ImageContent = styled.div`
  overflow: hidden;
  display: flex;
  position: relative;
  @media (max-width: 1023px) {
    height: auto;
  }
`;
