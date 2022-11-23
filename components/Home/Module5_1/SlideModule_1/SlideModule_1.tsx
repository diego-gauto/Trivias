import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule_1 } from "./ISlideModule_1";
import React, { Component, useEffect, useState } from "react";

import { ContainerMain, DisabledMask, NewTag, SlideImg, Text01, Text02, TextNew, TextSectionWrapper, UsernameSectionWrapper } from "./SlideModule_1.styled";
import { title } from "process";

import IMG1 from "../MediaSources/filtroGris.png";

export const SlideModule_1 = (props: ISlideModule_1) => {

  const {
    isNew,
    descripcion,
    usrFacebookURL,
    date,
    imgURL,
    usrImgURL,
    username,
  } = props;
  const [img, setImg] = useState("")
  const [disabled, setDisabled] = useState(true);

  const awaitImg = async () => {
    const resolvedImg = await imgURL
    setImg(resolvedImg)
  }

  const onMouseEnter = () => {
    setDisabled(false)
  };
  const onMouseLeave = () => {
    setDisabled(true)
  };

  useEffect(() => {
    awaitImg()
  }, [])


  return (
    <Container>
      <DisabledMask>

      </DisabledMask>
      <ContainerMain
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>


        <Col>
          <Row>
            <SlideImg style={{ backgroundImage: 'url(' + img + ')' }}>

              {
                isNew ?
                  <NewTag>
                    <TextNew>Nuevo</TextNew>
                  </NewTag>
                  : <></>
              }

            </SlideImg>
          </Row>

          <TextSectionWrapper id="expandable">
            <Row>
              <Text02>{descripcion} </Text02>
            </Row>

          </TextSectionWrapper>
          <UsernameSectionWrapper>

            <Row>
              <Text01>{username} </Text01>
            </Row>
          </UsernameSectionWrapper>
        </Col>
      </ContainerMain >
    </Container >
  )
}
