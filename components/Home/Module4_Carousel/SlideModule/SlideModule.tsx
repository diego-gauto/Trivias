import Link from "next/link";
import { useState } from "react";
import { Image, Row } from "react-bootstrap";
import { number } from "yup";
import { ISlideModule } from "./ISlideModule";
import { SlideModuleContainer, Text01, Text01_p, Text02, Text02_p, Text03, TextSectionWrapper } from "./SlideModule.styled";

export const SlideModule = (props: ISlideModule) => {
  const { imgURL, title, subtitle, number, type, level } = props;

  const sendTo = () => {

  }
  return (
    <SlideModuleContainer>
      <div className="hover">
        <Image src={imgURL} fluid style={{ borderRadius: "10px" }} />
        <div className="text-overlay">
          <button onClick={sendTo}>
            Más información
          </button>
        </div>
      </div>
      {type == "subscription" ? <TextSectionWrapper>
        <Row>
          <Text01_p>{title}</Text01_p>
        </Row>
        <Row>
          <Text02_p><span>de</span> default</Text02_p>
        </Row>
        <Row>
          <Text03 level={level}>{number} Módulos</Text03>
        </Row>
        <Row style={{ flexWrap: "nowrap" }}>
          {(level == "Muy Fácil" || level == "Fácil") && <img style={{ width: "auto" }} src="../images/Landing/blue.png" alt="" />}
          {(level == "Intermedio") && <img style={{ width: "auto" }} src="../images/Landing/green.png" alt="" />}
          {(level == "Avanzado" || level == "Máster") && <img style={{ width: "auto" }} src="../images/Landing/red.png" alt="" />}
          <Text03 style={{ padding: 0 }} level={level}><span>{level}</span></Text03>
        </Row>
      </TextSectionWrapper> :
        <TextSectionWrapper>
          <Row>
            <Text01_p>Lección {number}: <span>{title}</span></Text01_p>
          </Row>
          <Row>
            <Text02_p><span>de</span> default</Text02_p>
          </Row>
        </TextSectionWrapper>}
    </SlideModuleContainer>
  )
}
