import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';

import Masonry from 'react-masonry-css'
import {


} from "./Module6.styled";

import { IModule6 } from "./IModule6";

export const Module6 = (props: IModule6) => {

  return (
    <Container>
      <div>
        hola
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {/* array of JSX items */}
          <div className="test">My Element</div>
          <div className="test">My Element</div>
          <div className="test">My Element</div>
          <div className="test">My Element</div>
        </Masonry>

      </div>
    </Container >
  )
}
