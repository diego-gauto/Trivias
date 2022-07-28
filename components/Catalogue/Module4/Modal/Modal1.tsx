import React from 'react'
import { PurpleButton, TransparentButton } from '../../Module1/Module1.styled';
import {
  AboutContain, BackgroundOverlay, ButtonContain,
  Container, CourseContain, Cross, Data, CardImage,
  Datacontain, DataSpan, Description,
  EpisodeContain, EpisodeInfo, EpisodeTime, EpisodeTitle,
  ImageBack, LessonContain, LessonTitle, ModalBackground,
  ModalCont, ModalContain, ModalMod, SeasonContain, SubTitle,
  Text, TextContainer, Title, Titles, VideoContain, Lock, PlayIcon, InsideContent, InsideText, ContainVideo,
} from '../../Module3/Modal/Modal1.styled';
import SelectModule4 from './SelectModule4';

const Modal1 = ({ show, setShow }: any) => {
  const handleClose = () => setShow(false);
  return (
    <ModalContain>
      <ModalMod show={show} onHide={handleClose} size="lg" centered>
        <ModalCont>
          <ModalBackground>
            <ImageBack src="/images/Preview/modalf2.png"
              width={1000}
              height={600}
            />
            <BackgroundOverlay />
            <Container>
              <Cross onClick={handleClose}>
                x
              </Cross>
              <TextContainer>
                <InsideContent>
                  <InsideText>
                    Nuevo
                  </InsideText>
                </InsideContent>
                <Title>
                  Curso de Uñas Francesas
                </Title>
                <SubTitle>
                  Descubre un nuevo método para tus uñas este San Valentín
                </SubTitle>
                <ButtonContain>
                  <PurpleButton>
                    Comprar - $2,149.00
                  </PurpleButton>
                  <TransparentButton>
                    Ver un Adelanto
                    <PlayIcon />
                  </TransparentButton>
                </ButtonContain>
              </TextContainer>
            </Container>
          </ModalBackground>

          <CourseContain>
            <AboutContain>
              <Titles>
                Sobre el curso:
              </Titles>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi, sem rutrum blandit convallis. Penatibus scelerisque tempus, volutpat magna venenatis, volutpat. Ut nisl urna, pharetra et ultrices. Sapien lacinia fringilla rhoncus egestas nisl aliquam. Pellentesque ornare luctus lobortis non id in vestibulum.
              </Text>
            </AboutContain>
            <Datacontain>
              <Data>Profesor(es):
                <DataSpan>
                  Darth Vader, Grand Moff Tarkin
                </DataSpan>
              </Data>
              <Data>
                Categorías:
                <DataSpan>
                  Uñas de salón
                </DataSpan>
              </Data>
              <Data>
                Temporadas:
                <DataSpan>
                  3 temporadas
                </DataSpan>
              </Data>
              <Data>
                Año de publicación:
                <DataSpan>
                  2022
                </DataSpan>
              </Data>
              <Data>
                Tiempo estimado:
                <DataSpan>
                  28 horas
                </DataSpan>
              </Data>
            </Datacontain>
          </CourseContain>
          <LessonContain>
            <SeasonContain>
              <LessonTitle>
                Lista de lecciones
              </LessonTitle>
              <SelectModule4 />
            </SeasonContain>
            <VideoContain>
              <ContainVideo>
                <EpisodeContain>
                  <CardImage src="/images/Preview/card8.png" width={350} height={200} />
                  <Lock />
                </EpisodeContain>
              </ContainVideo>
              <EpisodeInfo>
                <EpisodeTitle>
                  Epidosio 1: Lorem Ipsum
                </EpisodeTitle>
                <EpisodeTime>
                  24 minutos
                </EpisodeTime>
                <Description>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus nisi, sit vel cursus ac elementum, et porta. Imperdiet nullam facilisis vestibulum quis gravida sed aliquet consectetur orci. Netus egestas gravida mollis vitae pellentesque id nisl nunc.
                </Description>
              </EpisodeInfo>
            </VideoContain>
          </LessonContain>
        </ModalCont>
      </ModalMod>
    </ModalContain>
  )
}
export default Modal1;