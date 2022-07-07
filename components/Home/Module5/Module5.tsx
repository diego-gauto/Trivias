import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { CardTitle, Col_Table, MasonryBox, MasonryCard, MasonryCardAlignA, MasonryCardAlignB, MasonryCardCentered, MasonryCardLeft, MasonryCardRight, MasonryContainer, MasonryContent, MasonryImage, MasonrySpan, MasonryTitle, MasonryWindow, MasonryWindowParent, Row_Table } from './Module5.styled'

import {


} from "./Module5.styled";

import { IModule5 } from "./IModule5";

export const Module5 = (props: IModule5) => {


  /*   useEffect(
      () => {
        //document.getElementById("a")?.scroll({
        window.scroll({
          top: 1000,
          behavior: 'smooth'
        });
      },
  
    ); */

  return (
    <Container style={{ paddingTop: "75px" }}>
      <MasonryBox>
        <MasonryTitle>
          Experiencias de
          <MasonrySpan>
            {" "} nuestros clientes
          </MasonrySpan>
        </MasonryTitle>
      </MasonryBox>

      <MasonryWindowParent>
        <MasonryWindow id="a">
          <MasonryContent>
            {/* Ejemplo Masonry */}
            <Col_Table>
              <Row_Table>
                <Col>
                  <MasonryCardAlignB>
                    <MasonryCardLeft>
                      <CardTitle>
                        Luke Skywalker
                      </CardTitle>
                      <MasonryImage src="/images/nail1.png" />
                    </MasonryCardLeft>
                  </MasonryCardAlignB>

                </Col><Col>
                  <MasonryCardAlignA>
                    <MasonryCardCentered>
                      <CardTitle>
                        Han Solo
                      </CardTitle>
                      <MasonryImage src="/images/nail2.png" />
                    </MasonryCardCentered>
                  </MasonryCardAlignA>

                </Col><Col>
                  <MasonryCardAlignB>
                    <MasonryCardRight>
                      <CardTitle>
                        Obi-Wan Kenobi
                      </CardTitle>
                      <MasonryImage src="/images/nail3.png" />
                    </MasonryCardRight>
                  </MasonryCardAlignB>
                </Col>
              </Row_Table>

              <Row_Table>
                <Col>
                  <MasonryCardAlignB>
                    <MasonryCardLeft>
                      <CardTitle>
                        Luke Skywalker
                      </CardTitle>
                      <MasonryImage src="/images/nail2.png" />
                    </MasonryCardLeft>
                  </MasonryCardAlignB>

                </Col><Col>
                  <MasonryCardAlignA>
                    <MasonryCardCentered>
                      <CardTitle>
                        Han Solo
                      </CardTitle>
                      <MasonryImage src="/images/nail3.png" />
                    </MasonryCardCentered>
                  </MasonryCardAlignA>

                </Col><Col>
                  <MasonryCardAlignB>
                    <MasonryCardRight>
                      <CardTitle>
                        Obi-Wan Kenobi
                      </CardTitle>
                      <MasonryImage src="/images/nail1.png" />
                    </MasonryCardRight>
                  </MasonryCardAlignB>
                </Col>
              </Row_Table>


              <Row_Table>
                <Col>
                  <MasonryCardAlignB>
                    <MasonryCardLeft>
                      <CardTitle>
                        Luke Skywalker
                      </CardTitle>
                      <MasonryImage src="/images/nail3.png" />
                    </MasonryCardLeft>
                  </MasonryCardAlignB>

                </Col><Col>
                  <MasonryCardAlignA>
                    <MasonryCardCentered>
                      <CardTitle>
                        Han Solo
                      </CardTitle>
                      <MasonryImage src="/images/nail1.png" />
                    </MasonryCardCentered>
                  </MasonryCardAlignA>

                </Col><Col>
                  <MasonryCardAlignB>
                    <MasonryCardRight>
                      <CardTitle>
                        Obi-Wan Kenobi
                      </CardTitle>
                      <MasonryImage src="/images/nail3.png" />
                    </MasonryCardRight>
                  </MasonryCardAlignB>
                </Col>
              </Row_Table>


              <Row_Table>
                <Col>
                  <MasonryCardAlignB>
                    <MasonryCardLeft>
                      <CardTitle>
                        Luke Skywalker
                      </CardTitle>
                      <MasonryImage src="/images/nail2.png" />
                    </MasonryCardLeft>
                  </MasonryCardAlignB>

                </Col><Col>
                  <MasonryCardAlignA>
                    <MasonryCardCentered>
                      <CardTitle>
                        Han Solo
                      </CardTitle>
                      <MasonryImage src="/images/nail3.png" />
                    </MasonryCardCentered>
                  </MasonryCardAlignA>

                </Col><Col>
                  <MasonryCardAlignB>
                    <MasonryCardRight>
                      <CardTitle>
                        Obi-Wan Kenobi
                      </CardTitle>
                      <MasonryImage src="/images/nail1.png" />
                    </MasonryCardRight>
                  </MasonryCardAlignB>
                </Col>
              </Row_Table>


            </Col_Table>
          </MasonryContent>
        </MasonryWindow>
      </MasonryWindowParent >
    </ Container >
  )
}
