import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule_2 } from "./ISlideModule_2";
import React, { Component, useEffect, useState } from "react";

import {
  ContainerMain, NewTag, SlideImg,
  Text01, Text02, TextNew, TextSectionWrapper,
  UsernameSectionWrapper,
  UserDataContainer,
  GeneralContainer,
  Text03,
  Text04,
} from "./SlideModule_2.styled";
import { title } from "process";

import IMG1 from "../MediaSources/facebookIcon.png";

export const SlideModule_1 = (props: ISlideModule_2) => {

  const {
    isNew,
    title,
    precio,
    imgURL,
    clickURL,
    id,
    compraRapida,
    disponible,
    currency,
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
    <GeneralContainer>
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
            <UserDataContainer>

              <Text02>{title} </Text02>
              {
                disponible ? <>
                  <Text01   >$ {precio} </Text01> <Text03   >{currency} </Text03>
                </>
                  :
                  <>
                    <Text04   >Agotado</Text04>
                  </>
              }


            </UserDataContainer>
          </Row>

        </Col>
      </ContainerMain >
    </GeneralContainer >
  )
}
