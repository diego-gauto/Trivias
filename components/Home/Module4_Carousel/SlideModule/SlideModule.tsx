import Link from "next/link";
import { useState } from "react";
import { Image, Row } from "react-bootstrap";
import { number } from "yup";
import CourseModal from "../../../CourseModal/CourseModal";
import { ISlideModule } from "./ISlideModule";
import { SlideModuleContainer, Text01, Text01_p, Text02, Text02_p, Text03, TextSectionWrapper } from "./SlideModule.styled";

export const SlideModule = (props: ISlideModule) => {
  const { imgURL, title, subtitle, number, type, level, professors, user, course, responsive1023 } = props;
  const [show, setShow] = useState(false);
  const sendTo = () => {
    setShow(true);
  }
  return (
    <SlideModuleContainer>
      <div className="hover" onClick={() => {
        responsive1023 && sendTo();
      }}>
        <Image src={imgURL} fluid style={{ borderRadius: "10px" }} />
        <div className="text-overlay">
          {(type == "subscription") && <button onClick={sendTo}>
            Más información
          </button>}
        </div>
      </div>
      {(type == "subscription") ? <TextSectionWrapper>
        <Row>
          <Text01_p>{title}</Text01_p>
        </Row>
        <Row>
          {
            professors.length > 0 &&
            <Text02_p><span>de </span>{professors[0].name}</Text02_p>
          }

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
          {/* <Row>
            <Text02_p><span>de</span> default</Text02_p>
          </Row> */}
        </TextSectionWrapper>}
      <CourseModal show={show} setShow={setShow} course={course} user={user} />
    </SlideModuleContainer>
  )
}
