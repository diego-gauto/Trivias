import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { CardTitle, Col_Table, DecoImage, DecoImageWrapper, MasonryBox, MasonryCardAlignA, MasonryCardAlignB, MasonryCardCentered, MasonryCardLeft, MasonryCardRight, MasonryContainer, MasonryContent, MasonryImage, MasonrySpan, MasonryTitle, MasonryWindow, MasonryWindowParent, Row_Table } from './Module5.styled'



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
    <Container style={{ paddingTop: "75px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
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
