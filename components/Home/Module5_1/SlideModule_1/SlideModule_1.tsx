import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule_1 } from "./ISlideModule_1";
import React, { Component, useEffect, useState } from "react";

import { ContainerMain, NewTag, SlideImg, Text01, Text02, TextNew, TextSectionWrapper } from "./SlideModule_1.styled";
import { title } from "process";

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

  const awaitImg = async () => {
    const resolvedImg = await imgURL
    setImg(resolvedImg)
  }

  useEffect(() => {
    awaitImg()
  }, [])


  return (
    <Container>
      <ContainerMain>
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

          <TextSectionWrapper>
            <Row>
              <Text01>{username} </Text01>
            </Row>
            <Row>
              <Text02>{descripcion} </Text02>
            </Row>
          </TextSectionWrapper>
        </Col>
      </ContainerMain >
    </Container >
  )
}
