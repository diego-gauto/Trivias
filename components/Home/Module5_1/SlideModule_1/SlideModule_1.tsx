import { Container, Col, Row, Button, Image } from 'react-bootstrap';
import { ISlideModule_1 } from './ISlideModule_1';
import React, { Component, useEffect, useState } from 'react';

import {
  ContainerMain,
  DisabledMask,
  FacebookButton,
  NewTag,
  SlideImg,
  Text01,
  Text02,
  DateText,
  TextNew,
  TextSectionWrapper,
  UserImage,
  UsernameSectionWrapper,
  UserDataContainer,
  GeneralContainer,
} from './SlideModule_1.styled';
import { title } from 'process';

import IMG1 from '../MediaSources/facebookIcon.png';

export const SlideModule_1 = (props: ISlideModule_1) => {
  const {
    isNew,
    descripcion,
    usrFacebookURL,
    datePublication,
    imgURL,
    usrImgURL,
    username,
    index,
  } = props;
  const [img, setImg] = useState('');
  const [imgUsr, setImgUsr] = useState('');

  const awaitImg = async () => {
    const resolvedImg = await imgURL;
    setImg(resolvedImg);
  };
  const awaitImgUsr = async () => {
    const resolvedImg = await usrImgURL;
    setImgUsr(resolvedImg);
  };

  useEffect(() => {
    awaitImg();
    awaitImgUsr();
  }, []);

  return (
    <GeneralContainer>
      <DisabledMask></DisabledMask>
      <ContainerMain id={'general' + index}>
        <Col>
          <Row>
            <SlideImg
              style={{ backgroundImage: 'url(' + img + ')' }}
            ></SlideImg>
          </Row>
          <TextSectionWrapper>
            <Text02>{descripcion} </Text02>
          </TextSectionWrapper>
          <UsernameSectionWrapper>
            <UserImage
              style={{ backgroundImage: 'url(' + imgUsr + ')' }}
            ></UserImage>
            <UserDataContainer>
              <Text01>{username} </Text01>
              {datePublication && (
                <DateText>
                  {' '}
                  {
                    datePublication.substring(0, 10)
                    // datePublication.toISOString().split('T')[0]?.toString()
                  }
                </DateText>
              )}
            </UserDataContainer>
            <FacebookButton style={{ backgroundImage: `url(${IMG1.src})` }}>
              <a
                href={usrFacebookURL}
                target='_blank'
                style={{ height: '100%', display: 'block' }}
              ></a>
            </FacebookButton>
          </UsernameSectionWrapper>
        </Col>
      </ContainerMain>
    </GeneralContainer>
  );
};
