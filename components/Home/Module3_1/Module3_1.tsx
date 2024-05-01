import React, { useEffect, useState } from 'react';

import { Col, Container, Image, Row } from 'react-bootstrap';

import { IModule3 } from './IModule3_1';
import Icon1 from './MediaSources/Icon1.png';
import Icon2 from './MediaSources/Icon2.png';
import Icon3 from './MediaSources/Icon3.png';
import Icon4 from './MediaSources/Icon4.png';
import Icon5 from './MediaSources/Icon5.png';
import Icon6 from './MediaSources/Icon6.png';
import Hand from './MediaSources/Hand.png';
import {
  ColorContainer,
  Column_1,
  Column_2,
  Column_3,
  LiElement,
  ListText,
  ModuleContainer,
  ModuleContainerBG1,
  ModuleContainerBG2,
  Subtittle_1,
  Subtittle_2,
  Tittle,
  UlElement,
  ColorContainerMobile,
  LiElementMobile,
  ListTextMobile,
  ModuleContainerMobile,
  ModuleContainerBG1Mobile,
  ModuleContainerBG2Mobile,
  Subtittle_1Mobile,
  Subtittle_2Mobile,
  TittleMobile,
  UlElementMobile,
  Row_1Mobile,
  Row_2Mobile,
  Row_3Mobile,
} from './Module3_1.styled';
import { ModuleContainer_Mobile } from '../Module2_1/Module2_1.styled';

// TODO: Borrar componente cuando esté lista la landing page (queda depreciado con el nuevo: CourseModule)
export const Module3_1 = (props: IModule3) => {
  const {} = props;

  const [groupTag, setGroupTag] = useState('');

  useEffect(() => {}, []);
  return (
    <>
      <ModuleContainer id='webView'>
        <ColorContainer>
          <Row>
            <Col>
              <Column_1>
                <UlElement>
                  <LiElement>
                    <ModuleContainerBG1
                      style={{
                        backgroundImage: `url(${Icon1.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListText>
                      <Subtittle_1>Aprendizaje </Subtittle_1>{' '}
                      <Subtittle_2> 24/7</Subtittle_2>
                    </ListText>
                  </LiElement>
                  <LiElement>
                    <ModuleContainerBG1
                      style={{
                        backgroundImage: `url(${Icon2.src})`,
                        backgroundSize: '75%',
                        backgroundPositionX: '7.5px',
                      }}
                    />
                    <ListText>
                      <Subtittle_1> Reconocimiento y </Subtittle_1>{' '}
                      <Subtittle_2> Certificados</Subtittle_2>
                    </ListText>
                  </LiElement>
                  <LiElement>
                    <ModuleContainerBG1
                      style={{
                        backgroundImage: `url(${Icon3.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListText>
                      <Subtittle_1>Revisión de prácticas</Subtittle_1>
                    </ListText>
                  </LiElement>
                </UlElement>
              </Column_1>
            </Col>
            <Col>
              <Column_2>
                <Tittle>¿Qué te ofrece Gonvar?</Tittle>
              </Column_2>
            </Col>
            <Col>
              <Column_3>
                <UlElement>
                  <LiElement>
                    <ModuleContainerBG1
                      style={{
                        backgroundImage: `url(${Icon4.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListText>
                      <Subtittle_1> Asesorías </Subtittle_1>
                      <Subtittle_2> ilimitadas</Subtittle_2>
                    </ListText>
                  </LiElement>
                  <LiElement>
                    <ModuleContainerBG1
                      style={{
                        backgroundImage: `url(${Icon5.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListText>
                      <Subtittle_1> Niveles básicos y avanzados</Subtittle_1>
                    </ListText>
                  </LiElement>
                  <LiElement>
                    <ModuleContainerBG1
                      style={{
                        backgroundImage: `url(${Icon6.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListText>
                      <Subtittle_1>Instructores </Subtittle_1>{' '}
                      <Subtittle_2> internacionales </Subtittle_2>
                    </ListText>
                  </LiElement>
                </UlElement>
              </Column_3>
            </Col>
          </Row>
          <ModuleContainerBG2
            style={{
              backgroundImage: `url(${Hand.src})`,
              backgroundSize: 'contain',
            }}
          />
        </ColorContainer>
      </ModuleContainer>

      <ModuleContainerMobile id='mobileView'>
        <ColorContainerMobile>
          <Col>
            <Row>
              <Row_2Mobile>
                <TittleMobile>¿Qué te ofrece Gonvar?</TittleMobile>
              </Row_2Mobile>
            </Row>
            <Row>
              <Row_1Mobile>
                <UlElementMobile>
                  <LiElementMobile>
                    <ModuleContainerBG1Mobile
                      style={{
                        backgroundImage: `url(${Icon1.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListTextMobile>
                      <Subtittle_1Mobile>Aprendizaje </Subtittle_1Mobile>{' '}
                      <Subtittle_2Mobile> 24/7</Subtittle_2Mobile>
                    </ListTextMobile>
                  </LiElementMobile>
                  <LiElementMobile>
                    <ModuleContainerBG1Mobile
                      style={{
                        backgroundImage: `url(${Icon2.src})`,
                        backgroundSize: '75%',
                        backgroundPositionX: '7.5px',
                      }}
                    />
                    <ListTextMobile>
                      <Subtittle_1Mobile> Reconocimiento y </Subtittle_1Mobile>{' '}
                      <Subtittle_2Mobile> Certificados</Subtittle_2Mobile>
                    </ListTextMobile>
                  </LiElementMobile>
                  <LiElementMobile>
                    <ModuleContainerBG1Mobile
                      style={{
                        backgroundImage: `url(${Icon3.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListTextMobile>
                      <Subtittle_1Mobile>
                        Revisión de prácticas
                      </Subtittle_1Mobile>
                    </ListTextMobile>
                  </LiElementMobile>
                  <LiElementMobile>
                    <ModuleContainerBG1Mobile
                      style={{
                        backgroundImage: `url(${Icon4.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListTextMobile>
                      <Subtittle_1Mobile> Asesorías </Subtittle_1Mobile>
                      <Subtittle_2Mobile> ilimitadas</Subtittle_2Mobile>
                    </ListTextMobile>
                  </LiElementMobile>
                  <LiElementMobile>
                    <ModuleContainerBG1Mobile
                      style={{
                        backgroundImage: `url(${Icon5.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListTextMobile>
                      <Subtittle_1Mobile>
                        {' '}
                        Niveles básicos y avanzados
                      </Subtittle_1Mobile>
                    </ListTextMobile>
                  </LiElementMobile>
                  <LiElementMobile>
                    <ModuleContainerBG1Mobile
                      style={{
                        backgroundImage: `url(${Icon6.src})`,
                        backgroundSize: '100%',
                      }}
                    />
                    <ListTextMobile>
                      <Subtittle_1Mobile>Instructores </Subtittle_1Mobile>{' '}
                      <Subtittle_2Mobile> internacionales </Subtittle_2Mobile>
                    </ListTextMobile>
                  </LiElementMobile>
                </UlElementMobile>
              </Row_1Mobile>
            </Row>
            <Row>
              <Row_3Mobile>
                <ModuleContainerBG2Mobile
                  style={{
                    backgroundImage: `url(${Hand.src})`,
                    backgroundSize: 'contain',
                  }}
                />
              </Row_3Mobile>
            </Row>
          </Col>
        </ColorContainerMobile>
      </ModuleContainerMobile>
    </>
  );
};
