import Image from 'next/image';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

export const Container = styled.div`
  background-image: url(../images/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
export const MasonryContainer = styled.div`
  padding-top: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  margin-top: 200px;
  background-color: white;
  width: 100%;
  gap: 20px;
  padding-inline: 160px;
`;
export const MasonryBox = styled.div`
  display: flex;
  justify-content: center;
`;
export const MasonryTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  @media only screen and (max-width: 1024px) {
    text-align: center;
    font-size: 24px;
  }
`;
export const MasonrySpan = styled.span`
  color: #0768fd;
`;
export const MasonryContent = styled.div`
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-left: 6.5%;
  margin-right: 6.5%;
  @media only screen and (max-width: 1024px) {
    margin-left: 0;
    margin-right: 0;
  }
`;
export const MasonryDesktop = styled.div`
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;
export const MasonryMobile = styled.div`
  display: none;
  @media only screen and (max-width: 1024px) {
    display: block;
  }
`;
export const MasonryItem = styled.div`
  width: 360px;
  margin: 0 auto;
  @media only screen and (max-width: 1024px) {
    width: 170px;
  }
`;

export const MasonryWindowParent = styled.div`
  overflow: hidden;
  @media only screen and (max-width: 1024px) {
    overflow: visible;
  }
`;
export const MasonryWindow = styled.div`
  height: auto;
  padding-bottom: 80px;
  width: 100%;
  margin-bottom: 20px;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  @media only screen and (max-width: 1024px) {
    height: auto;
    padding-bottom: 0;
  }
`;
export const MasonryImage = styled.img`
  width: auto;
  border-radius: 12px;
  height: 75%;
  max-height: 170px;
  object-fit: cover;
  @media only screen and (max-width: 1024px) {
    height: auto;
  }
`;
export const MasonryCard = styled.div`
  display: flex;
  flex-direction: column;
  break-inside: avoid;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #6717cd;
  width: 350px;
  padding: 15px;
  height: 250px;
  margin-bottom: 20px;
  @media only screen and (max-width: 1024px) {
    width: 170px;
    padding: 7.5px;
    height: 210px;
  }
`;
export const MasonryCardLeft = styled(MasonryCard)``;
export const MasonryCardRight = styled(MasonryCard)``;
export const MasonryCardCentered = styled(MasonryCard)`
  margin-top: 80px;
  position: absolute;
  @media only screen and (max-width: 1024px) {
    position: relative;
    margin-top: 0;
  }
`;
export const Row_Table = styled.div`
  @media only screen and (max-width: 1024px) {
  }
`;
export const MasonryCardAlignA = styled.div`
  position: relative;
  @media only screen and (max-width: 1024px) {
  }
`;
export const MasonryCardAlignB = styled.div`
  bottom: 80px;
  @media only screen and (max-width: 1024px) {
  }
`;
export const CardTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
`;
export const DecoImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
`;

export const DecoImageWrapper = styled.div`
  margin-left: -1510px;
  position: absolute;
  margin-top: 290px;
`;
