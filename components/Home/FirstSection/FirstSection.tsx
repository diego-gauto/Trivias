

import { Col, Image, Row } from "react-bootstrap";
import { RiArrowDownSLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

import { useRouter } from "next/router";

import { parseText, parseTitle } from "../../../utils/parse";
import { Feature } from "../../common/Home/Feature/Feature";
import { PurpleButton } from "../../common/PurpleButton/PurpleButton";
import GradientCanvas from "../../GradientCanvas/GradientCanvas";
import Img1 from "../Module1/MediaSources/Icon01.png";
import Img2 from "../Module1/MediaSources/Icon02.svg";
import Img3 from "../Module1/MediaSources/Icon03.svg";
import Img4 from "../Module1/MediaSources/Icon04.svg";
import { ArrowDownContainer, BlurDiv, FirstSectionContainer } from "./FirstSection.styled";
import { IFirstSectionProps } from "./IFirstSectionProps";
import { FaArrowRight } from "react-icons/fa";

export const FirstSection = (props: IFirstSectionProps) => {
  const { data, img } = props;
  const router = useRouter();

  const responsiveXl = useMediaQuery({ query: "(min-width: 991px) and (max-width: 1200px)" });
  const responsiveHeight700 = useMediaQuery({ query: "(max-height: 772px)" });
  const responsive991 = useMediaQuery({ query: "(max-width: 991px)" });

  const scrollToModule2 = () => {
    window.scrollTo(0, window.innerHeight * 0.75)
  }


  return (
    <FirstSectionContainer>
      <GradientCanvas id="gradient-canvas" height="83vh" />
      <Row>
        {responsive991 && <Col sm={12} lg={6} className="right-side">
          <Image src={img} fluid />
        </Col>}
        <BlurDiv />
        <Col sm={12} lg={6} className="left-side">
          <h1>{parseTitle(data.tituloInicial)}</h1>
          {!responsive991 && <div className="paragraphs">
            <h3>{parseText(data.parrafoInicial)}</h3>
            <h3>{parseText(data.parrafoFinal)}</h3>
          </div>}
          <Row className="button-group">
            <Col xs={12} sm={6} md={6} lg={7}>
              <PurpleButton text={data.botonPrimario} onClick={() => router.push("/auth/Register")} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={5} >
              <a onClick={() => router.push("/Preview")}>
                {data.botonSecundario}
                <FaArrowRight></FaArrowRight>
              </a>
            </Col>
          </Row>
          {!responsiveXl && !responsiveHeight700 && <Row className="features mt-5">
            <Col xs={6} sm={6} md={6} lg={6} xl={4} className="text-center">
              <Feature title={data.primerCaracteristica} image={Img2.src} />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={4} className="text-center">
              <Feature title={data.segundaCaracteristica} image={Img4.src} />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={4} className="text-center">
              <Feature title={data.terceraCaracteristica} image={Img3.src} />
            </Col>
          </Row>}
        </Col>
        {!responsive991 && <Col sm={12} lg={6} className="right-side">
          <Image src={img} fluid />
        </Col>}
        <Col className="text-center mt-2">
          <ArrowDownContainer onClick={scrollToModule2}>
            <RiArrowDownSLine size={30} />
          </ArrowDownContainer>
        </Col>
      </Row>
    </FirstSectionContainer>
  )
}
