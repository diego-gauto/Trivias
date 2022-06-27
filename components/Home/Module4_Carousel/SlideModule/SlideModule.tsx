import { Container, Col, Row, Navbar, Button, Image } from "react-bootstrap";
import { ISlideModule } from "./ISlideModule";
import React, { Component, useEffect } from "react";
import Slider from "react-slick";

import { SlideImg } from "./SlideModule.styled";

export const SlideModule = (props: ISlideModule) => {


  const { isNew } = props;
  const { title } = props;
  const { subtitle } = props;
  const { imgURL } = props;


  return (
    <Container>
      <Col>
        <Row>
          <SlideImg className="slide" style={{ backgroundImage: "url(" + imgURL + ")" }} >

            {isNew ? <span>Nuevo</span> : <></>}

          </SlideImg>
        </Row>
        <Row>
          <h3>{title} </h3>
        </Row>
        <Row>
          <h5>{subtitle} </h5>
        </Row>
      </Col>
    </Container>

  )
}
