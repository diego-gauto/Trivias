import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule_2 } from "./ISlideModule_2";
import React, { Component, useEffect, useState } from "react";

import {
  ContainerMain, NewTag, SlideImg,
  Text01, Text02, TextNew,
  UserDataContainer,
  GeneralContainer,
  Text03,
  Text04,
  CompraRapida,
} from "./SlideModule_2.styled";
import { Line } from "../Module6_1.styled";
import Link from "next/link";

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
    <ContainerMain id="shop-container">
      <SlideImg style={{ backgroundImage: 'url(' + img + ')' }}>
        {
          isNew ?
            <NewTag>
              <TextNew>Nuevo</TextNew>
            </NewTag>
            : <></>
        }
        {/*  {
          compraRapida ?
            <CompraRapida>Compra rápida</CompraRapida>
            : <></>
        } */}
        <Link href={clickURL} >
          <CompraRapida>Compra rápida</CompraRapida>
        </Link>
        <Line></Line>
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
    </ContainerMain >
  )
}
