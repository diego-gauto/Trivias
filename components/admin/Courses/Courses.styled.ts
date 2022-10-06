import Image from "next/image";
import styled from "styled-components";

export const CourseContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
export const ImageBack = styled.img`
  width: 100%;
  height: 400px;
`;
export const Imagecontain = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  z-index: -1;
`;
export const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    360deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0) 39.51%
  );
  position: absolute;
`;
export const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  flex-direction: column;
  top: 150px;
  padding-inline: 20px;
  gap: 5px;
`;
export const NewText = styled.div`
  color: white;
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  padding-block: 5px;
  padding-inline: 20px;
  width: max-content;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 10px;
  opacity: 0.8;
`;
export const Title = styled.h1`
  font-size: 36px;
  opacity: 0.9;
  color: white;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const Subtitle = styled.p`
  font-size: 24px;
  opacity: 0.9;
  color: white;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;

export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
