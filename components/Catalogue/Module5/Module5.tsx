import React from 'react'
import { ImageContent, CardImage, InsideContent, InsideText, Text1, Text2, Text3, VideoInfo } from '../Module3/Module3.styled';
import { Banner2, ImageContain, CardContain, Cardcontent, Content, LimitTime, MainContainer, SpanText, SuscribeText, TextContent, Title, TextContain, TextContainer, PurpleButton, ButtonContain, Divider, RespContain, Cardcontent2, Cardcontent3 } from './Module5.styled';

const Module5 = () => {
  return (
    <MainContainer>
      <ImageContain>
        <Banner2
          src="/images/Preview/fondo2.png"
          layout='fill'
        />
      </ImageContain>
      <Content>
        <TextContainer>
          <Title>
            Conoce nuestra suscripción
          </Title>
          <TextContent>
            <LimitTime>
              Tiempo ilimitado por $89.99 al mes
            </LimitTime>
            <SuscribeText>
              Suscríbete a
              <SpanText>
                Gonvar Plus
              </SpanText>
            </SuscribeText>
          </TextContent>
        </TextContainer>
        <RespContain>
          <CardContain>
            <Cardcontent2>
              <ImageContent>
                <CardImage
                  src="/images/Preview/card3.png"
                  width={450}
                  height={210}
                />
                <InsideContent>
                  <InsideText>
                    Unica Lección
                  </InsideText>
                </InsideContent>
              </ImageContent>
              <VideoInfo>
                <TextContain>
                  <Text1>
                    Curso 1: Lorem Ipsum
                    <Text2>
                      Subtítulo de categoría
                    </Text2>
                  </Text1>
                  <Text3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam est tempor, egestas mauris pulvinar.
                  </Text3>
                </TextContain>
              </VideoInfo>
            </Cardcontent2>
            <Divider>
              +
            </Divider>
            <Cardcontent>
              <ImageContent>
                <CardImage
                  src="/images/Preview/card5.png"
                  width={450}
                  height={210}
                />
                <InsideContent>
                  <InsideText>
                    24 lecciones
                  </InsideText>
                </InsideContent>
              </ImageContent>
              <VideoInfo>
                <TextContain>
                  <Text1>
                    Curso 1: Lorem Ipsum
                    <Text2>
                      Subtítulo de categoría
                    </Text2>
                  </Text1>
                  <Text3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam est tempor, egestas mauris pulvinar.
                  </Text3>
                </TextContain>
              </VideoInfo>
            </Cardcontent>
            <Divider>
              +
            </Divider>
            <Cardcontent3>
              <ImageContent>
                <CardImage
                  src="/images/Preview/card6.png"
                  width={450}
                  height={210}
                />
                <InsideContent>
                  <InsideText>
                    12 lecciones
                  </InsideText>
                </InsideContent>
              </ImageContent>
              <VideoInfo>
                <TextContain>
                  <Text1>
                    Curso 4: Lorem Ipsum
                    <Text2>
                      Subtítulo de categoría
                    </Text2>
                  </Text1>
                  <Text3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam est tempor, egestas mauris pulvinar.
                  </Text3>
                </TextContain>
              </VideoInfo>
            </Cardcontent3>
          </CardContain>
        </RespContain>
        <ButtonContain>
          <PurpleButton>
            Adquiere Gonvar Plus
          </PurpleButton>
        </ButtonContain>
      </Content>
    </MainContainer >
  )
}
export default Module5;
