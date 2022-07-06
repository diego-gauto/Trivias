import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { CardTitle, MainContainer, MasonryBox, MasonryCard, MasonryContainer, MasonryContent, MasonryImage, MasonrySpan, MasonryTitle } from './Module5.styled'

import {


} from "./Module5.styled";

import { IModule5 } from "./IModule5";

export const Module5 = (props: IModule5) => {

  return (
    <Container>
      <MasonryBox>
        <MasonryTitle>
          Experiencias de &nbsp;
          <MasonrySpan>
            nuestros clientes
          </MasonrySpan>
        </MasonryTitle>
      </MasonryBox>

      <MasonryContent>
        {/* Ejemplo Masonry */}
        <MasonryCard>
          <CardTitle>
            Luke Skywalker
          </CardTitle>
          <MasonryImage src="/images/nail1.png" />
        </MasonryCard>
        <MasonryCard>
          <CardTitle>
            Han Solo
          </CardTitle>
          <MasonryImage src="/images/nail2.png" />
        </MasonryCard>
        <MasonryCard>
          <CardTitle>
            Obi-Wan Kenobi
          </CardTitle>
          <MasonryImage src="/images/nail3.png" />
        </MasonryCard>
        <MasonryCard>
          <CardTitle>
            Luke Skywalker
          </CardTitle>
          <MasonryImage src="/images/nail1.png" />
        </MasonryCard>
        <MasonryCard>
          <CardTitle>
            Han Solo
          </CardTitle>
          <MasonryImage src="/images/nail2.png" />
        </MasonryCard>
        <MasonryCard>
          <CardTitle>
            Obi-Wan Kenobi
          </CardTitle>
          <MasonryImage src="/images/nail3.png" />
        </MasonryCard>
        <MasonryCard>
          <CardTitle>
            Luke Skywalker
          </CardTitle>
          <MasonryImage src="/images/nail1.png" />
        </MasonryCard>
        <MasonryCard>
          <CardTitle>
            Han Solo
          </CardTitle>
          <MasonryImage src="/images/nail2.png" />
        </MasonryCard>
        <MasonryCard>
          <CardTitle>
            Obi-Wan Kenobi
          </CardTitle>
          <MasonryImage src="/images/nail3.png" />
        </MasonryCard>
      </MasonryContent>
    </ Container >
  )
}
