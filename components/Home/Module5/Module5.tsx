import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';

import Masonry from 'react-masonry-css'
import styles from "styles.css"
import {


} from "./Module5.styled";

import { IModule5 } from "./IModule5";

export const Module5 = (props: IModule5) => {

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
