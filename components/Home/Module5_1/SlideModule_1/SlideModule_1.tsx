import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule_1 } from "./ISlideModule_1";
import React, { Component, useEffect, useState } from "react";

import {
  ContainerMain, DisabledMask, FacebookButton, NewTag, SlideImg,
  Text01, Text02, DateText, TextNew, TextSectionWrapper, UserImage,
  UsernameSectionWrapper,
  UserDataContainer
} from "./SlideModule_1.styled";
import { title } from "process";

import IMG1 from "../MediaSources/facebookIcon.png";

export const SlideModule_1 = (props: ISlideModule_1) => {

  const {
    isNew,
    descripcion,
    usrFacebookURL,
    datePublication,
    imgURL,
    usrImgURL,
    username,
  } = props;
  const [img, setImg] = useState("")
  const [imgUsr, setImgUsr] = useState("")

  const awaitImg = async () => {
    const resolvedImg = await imgURL
    setImg(resolvedImg)
  }
  const awaitImgUsr = async () => {
    const resolvedImg = await usrImgURL
    setImgUsr(resolvedImg)
  }


  useEffect(() => {
    awaitImg()
    awaitImgUsr()
  }, [])



  return (
    <Container>
      <DisabledMask>
      </DisabledMask>
      <ContainerMain >
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
          <TextSectionWrapper >
            <Text02>{descripcion} </Text02>
          </TextSectionWrapper>
          <UsernameSectionWrapper>
            <Col>
              <UserImage style={{ backgroundImage: 'url(' + imgUsr + ')' }}>
              </UserImage>
            </Col>
            <Col>
              <UserDataContainer>
                <Text01  >{username} </Text01>
                {
                  datePublication ? <DateText   > {
                    datePublication.toISOString().split('T')[0]?.toString()} </DateText>
                    : <></>
                }
              </UserDataContainer>
            </Col>
            <Col>
              <FacebookButton style={{ backgroundImage: `url(${IMG1.src})` }}
              >
                <a href={usrFacebookURL}
                  target="_blank"
                  style={{ height: "100%", display: "block" }}></a>
              </FacebookButton>
            </Col>
          </UsernameSectionWrapper>
        </Col>
      </ContainerMain >
    </Container >
  )
}
