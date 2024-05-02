import { Col, Container, Image, Row } from 'react-bootstrap';

import styled from 'styled-components';

export const ModuleContainer = styled(Container)`
  @media only screen and (max-width: 1024px) {
    margin: 25px auto;
    padding: 0;
  }
`;
export const RibbonImage = styled(Image)`
  @media only screen and (max-width: 1024px) {
    margin-top: -50px;
  }
`;
export const IconImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: end;
  row-gap: 75px;
  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    margin-top: 50px;
    row-gap: 35px;
  }
`;
export const ImageTag = styled.div``;
export const SectionCentered = styled.div`
  background-color: white;
  height: 500px;
  z-index: 1;
  position: absolute;
  width: 1073.125px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  .skeleton-product {
    display: initial;
  }
  @media (min-width: 1800px) {
    height: 550px;
    top: 30px;
    width: 1225px;
  }
  @media only screen and (max-width: 1024px) {
    position: relative;
    width: 100%;
    height: 430.5px;
    overflow: hidden;
    margin-top: 0;
  }
`;
export const SectionCenteredWrapper = styled.div`
  bottom: 445px;
  position: relative;
  display: flex;
  justify-content: space-around;
  @media (min-width: 1800px) {
    bottom: 500px;
  }
  @media only screen and (max-width: 1024px) {
    bottom: 0;
  }
`;
export const LeftImage = styled.div`
  display: flex;
  width: 95%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 15px;
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

export const RightImage = styled.div`
  display: flex;
  width: 95%;
  align-items: flex-start;
  height: 100%;

  justify-content: flex-end;
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;
export const SectionCenteredBackground = styled(Row)`
  padding-top: 30px;
  display: flex;
  align-items: flex-start;

  height: 500px;
  @media only screen and (max-width: 1024px) {
    height: auto;
    padding-top: 0;
  }
`;
export const SectionCenteredTopColumn = styled(Col)`
  height: 10px;
  bottom: 70px;
  position: relative;
`;

export const IconImage = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const IconText = styled.p`
  margin-top: 27px;
  text-align: center;
  width: 100%;
`;
export const IconText_B = styled.label`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;

  text-align: center;
`;
export const TitleTextContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 2.5px;
  @media only screen and (max-width: 1024px) {
    margin-top: 50px;
    > * {
      min-width: 120px;
    }
  }
`;
export const TitleCenter = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  text-align: center;
  color: black;
  span {
    color: #6717cd;
    @font-face {
      font-family: Montserrat;
      src: url(../fonts/Montserrat-VariableFont_wght.ttf);
    }
  }
`;
