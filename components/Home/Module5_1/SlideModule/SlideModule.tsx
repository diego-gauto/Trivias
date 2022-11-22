import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule } from "./ISlideModule";
import React, { Component, useEffect, useState } from "react";

import { ContainerMain, NewTag, SlideImg, Text01, Text02, TextNew, TextSectionWrapper } from "./SlideModule.styled";

export const SlideModule = (props: ISlideModule) => {
  const { isNew, title, subtitle, imgURL } = props;
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
              <Text01>{title} </Text01>
            </Row>
            <Row>
              <Text02>{subtitle} </Text02>
            </Row>
          </TextSectionWrapper>
        </Col>
      </ContainerMain >
    </Container >
  )
}
