import { Container } from 'react-bootstrap';
import React from 'react';
import {
  DecoImage,
  DecoImageWrapper,
  MasonryBox,
  MasonrySpan,
  MasonryTitle,
  MasonryDesktop,
  MasonryMobile,
  MasonryContent,
} from './Module5.styled';
import { IModule5 } from './IModule5';
import { divideArrayInChunks } from './helpers';
import { Module5_Carousel } from './Module5_Carousel/Module5_Carousel';

export const Module5 = (props: IModule5) => {
  const { reviewsData } = props;
  let desktopCarousels;
  let mobileCarousels;
  if (reviewsData) {
    const desktopChunks = divideArrayInChunks(reviewsData, 3);
    desktopCarousels = desktopChunks.map((chunk: Array<any>, i: number) => {
      return (
        <Module5_Carousel
          key={'chunk_1' + i}
          slideData={chunk}
          reverseDirection={i % 2 === 1}
        />
      );
    });

    const mobileChunks = divideArrayInChunks(reviewsData, 2);
    mobileCarousels = mobileChunks.map((chunk: Array<any>, i: number) => {
      return (
        <Module5_Carousel
          key={'chunk_2' + i}
          slideData={chunk}
          reverseDirection={i % 2 === 1}
        />
      );
    });
  }

  return (
    <Container style={{ paddingTop: '75px' }}>
      <MasonryBox>
        <DecoImageWrapper>
          <DecoImage
            src='/images/mancha1.png'
            width={340}
            height={400}
          ></DecoImage>
        </DecoImageWrapper>
        <MasonryTitle>
          Experiencias de
          <MasonrySpan> nuestros clientes</MasonrySpan>
        </MasonryTitle>
      </MasonryBox>
      <MasonryDesktop>
        <MasonryContent>{desktopCarousels}</MasonryContent>
      </MasonryDesktop>
      <MasonryMobile>
        <MasonryContent>{mobileCarousels}</MasonryContent>
      </MasonryMobile>
    </Container>
  );
};
