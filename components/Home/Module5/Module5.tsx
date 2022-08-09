import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { CardTitle, DecoImage, DecoImageWrapper, MasonryBox, MasonryCardAlignA, MasonryCardAlignB, MasonryCardCentered, MasonryCardLeft, MasonryCardRight, MasonryContainer, MasonryContent, MasonryImage, MasonrySpan, MasonryTitle, MasonryWindow, MasonryWindowParent, Row_Table, MasonryItem } from './Module5.styled'



import { IModule5 } from "./IModule5";

export const Module5 = (props: IModule5) => {


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

      <MasonryWindowParent>
        <MasonryWindow id="a">
          <MasonryContent>
            {/* Ejemplo Masonry */}
            <MasonryItem>
              <MasonryCardAlignB>
                <MasonryCardLeft>
                  <CardTitle>
                    Luke Skywalker
                  </CardTitle>
                  <MasonryImage src="/images/nail1.png" />
                </MasonryCardLeft>
              </MasonryCardAlignB>

            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignA>
                <MasonryCardCentered>
                  <CardTitle>
                    Han Solo
                  </CardTitle>
                  <MasonryImage src="/images/nail2.png" />
                </MasonryCardCentered>
              </MasonryCardAlignA>

            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignB>
                <MasonryCardRight>
                  <CardTitle>
                    Obi-Wan Kenobi
                  </CardTitle>
                  <MasonryImage src="/images/nail3.png" />
                </MasonryCardRight>
              </MasonryCardAlignB>
            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignB>
                <MasonryCardLeft>
                  <CardTitle>
                    Luke Skywalker
                  </CardTitle>
                  <MasonryImage src="/images/nail2.png" />
                </MasonryCardLeft>
              </MasonryCardAlignB>

            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignA>
                <MasonryCardCentered>
                  <CardTitle>
                    Han Solo
                  </CardTitle>
                  <MasonryImage src="/images/nail3.png" />
                </MasonryCardCentered>
              </MasonryCardAlignA>

            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignB>
                <MasonryCardRight>
                  <CardTitle>
                    Obi-Wan Kenobi
                  </CardTitle>
                  <MasonryImage src="/images/nail1.png" />
                </MasonryCardRight>
              </MasonryCardAlignB>
            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignB>
                <MasonryCardLeft>
                  <CardTitle>
                    Luke Skywalker
                  </CardTitle>
                  <MasonryImage src="/images/nail3.png" />
                </MasonryCardLeft>
              </MasonryCardAlignB>

            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignA>
                <MasonryCardCentered>
                  <CardTitle>
                    Han Solo
                  </CardTitle>
                  <MasonryImage src="/images/nail1.png" />
                </MasonryCardCentered>
              </MasonryCardAlignA>

            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignB>
                <MasonryCardRight>
                  <CardTitle>
                    Obi-Wan Kenobi
                  </CardTitle>
                  <MasonryImage src="/images/nail3.png" />
                </MasonryCardRight>
              </MasonryCardAlignB>
            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignB>
                <MasonryCardLeft>
                  <CardTitle>
                    Luke Skywalker
                  </CardTitle>
                  <MasonryImage src="/images/nail2.png" />
                </MasonryCardLeft>
              </MasonryCardAlignB>

            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignA>
                <MasonryCardCentered>
                  <CardTitle>
                    Han Solo
                  </CardTitle>
                  <MasonryImage src="/images/nail3.png" />
                </MasonryCardCentered>
              </MasonryCardAlignA>

            </MasonryItem>
            <MasonryItem>
              <MasonryCardAlignB>
                <MasonryCardRight>
                  <CardTitle>
                    Obi-Wan Kenobi
                  </CardTitle>
                  <MasonryImage src="/images/nail1.png" />
                </MasonryCardRight>
              </MasonryCardAlignB>
            </MasonryItem>
          </MasonryContent>
        </MasonryWindow>
      </MasonryWindowParent >
    </ Container >
  )
}
