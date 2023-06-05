import { Col, Image, Row } from "react-bootstrap";
import { RiArrowDownSLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { parseText, parseTitle } from "../../../utils/parse";
import { Feature } from "../../common/Home/Feature/Feature";
import { PurpleButton } from "../../common/PurpleButton/PurpleButton";
import GradientCanvas from "../../GradientCanvas/GradientCanvas";
import Img2 from "../Module1/MediaSources/Icon02.svg";
import Img3 from "../Module1/MediaSources/Icon03.svg";
import Img4 from "../Module1/MediaSources/Icon04.svg";
import { ArrowDownContainer, BlurDiv, FirstSectionContainer } from "./FirstSection.styled";
import { IFirstSectionProps } from "./IFirstSectionProps";
import { FaArrowRight } from "react-icons/fa";
import { PREVIEW_PATH } from "../../../constants/paths";

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
          <div className={(!img) ? "skeleton-product" : ""}>

          </div>
          <div className="grey-field">
            <Image src={img} fluid />
          </div>
        </Col>}
        <BlurDiv />
        <Col sm={12} lg={6} className={"left-side" && (!img) ? " skeleton-product" : ""}>
          <div className="grey-field">
            <h1>{parseTitle(data?.tituloInicial)}</h1>
          </div>
          {!responsive991 && <div className="paragraphs">
            <div className="grey-field">
              <h3>{parseText(data?.parrafoInicial)}</h3>
            </div>
            <div className="grey-field">
              <h3>{parseText(data?.parrafoFinal)}</h3>
            </div>
          </div>}
          <Row className="button-group">
            <Col xs={12} sm={6} md={6} lg={7}>
              <div className="grey-field">
                <PurpleButton text={data?.botonPrimario} onClick={() => router.push("/auth/Register")} />
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={5} >
              <div className="grey-field">
                <a onClick={() => router.push(PREVIEW_PATH)}>
                  {data?.botonSecundario}
                  <FaArrowRight></FaArrowRight>
                </a>
              </div>
            </Col>
          </Row>
          {!responsiveXl && !responsiveHeight700 && <Row className="features mt-5">
            <Col xs={6} sm={6} md={6} lg={6} xl={4} className="text-center">
              <div className="grey-field">
                <Feature title={data?.primerCaracteristica} image={Img2.src} />
              </div>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={4} className="text-center">
              <div className="grey-field">
                <Feature title={data?.segundaCaracteristica} image={Img4.src} />
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={4} className="text-center">
              <div className="grey-field">
                <Feature title={data?.terceraCaracteristica} image={Img3.src} />
              </div>
            </Col>
          </Row>}
        </Col>
        {!responsive991 && <Col sm={12} lg={6} className="right-side">
          <div className={!img ? "skeleton-product" : ""}>
            <div className="grey-field">
              <Image src={img} fluid />
            </div>
          </div>
        </Col>}
        <Col className="text-center mt-2">
          <ArrowDownContainer onClick={scrollToModule2}>
            <RiArrowDownSLine size={60} />
          </ArrowDownContainer>
        </Col>
      </Row>
    </FirstSectionContainer >
  )
}
