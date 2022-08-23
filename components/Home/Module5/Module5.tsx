import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React from 'react';
import { CardTitle, DecoImage, DecoImageWrapper, MasonryBox, MasonryCardAlignA, MasonryCardAlignB, MasonryCardCentered, MasonryCardLeft, MasonryCardRight, MasonryContainer, MasonryContent, MasonryImage, MasonrySpan, MasonryTitle, MasonryWindow, MasonryWindowParent, Row_Table, MasonryItem, MasonryDesktop, MasonryMobile } from './Module5.styled'
import { IModule5 } from "./IModule5";
import { divideArrayInChunks } from "./helpers";
import { Module5_Carousel } from "./Module5_Carousel/Module5_Carousel";

export const Module5 = (props: IModule5) => {
  const { reviewsData } = props

  const desktopChunks = divideArrayInChunks(reviewsData, 3)
  const desktopCarousels = desktopChunks.map((chunk: Array<any>, i: number) => {
    return (
      <Module5_Carousel
        slideData={chunk}
        reverseDirection={i % 2 === 1}
      />
    )
  })

  const mobileChunks = divideArrayInChunks(reviewsData, 2)
  const mobileCarousels = mobileChunks.map((chunk: Array<any>, i: number) => {
    return (
      <Module5_Carousel
        slideData={chunk}
        reverseDirection={i % 2 === 1}
      />
    )
  })

  return (
    <Container style={{ paddingTop: "75px" }}>
      <MasonryBox>
        <DecoImageWrapper>
          <DecoImage src="/images/mancha1.png" width={340} height={400}></DecoImage>
        </DecoImageWrapper>
        <MasonryTitle>
          Experiencias de
          <MasonrySpan>
            {" "} nuestros clientes
          </MasonrySpan>
        </MasonryTitle>
      </MasonryBox>
      <MasonryDesktop>
        <MasonryContent>
          {desktopCarousels}
        </MasonryContent>
      </MasonryDesktop>
      <MasonryMobile>
        <MasonryContent>
          {mobileCarousels}
        </MasonryContent>
      </MasonryMobile>
    </ Container >
  )
}
