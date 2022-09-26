

import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";

import Image from "next/image";

import { PlayIcon, PurpleButton } from "../../Module1/Module1.styled";
import { Progress } from "../../Module2/Module2.styled";
import {
  AboutContain,
  BackgroundOverlay,
  ButtonContain,
  Container,
  ContainVideo,
  CourseContain,
  Cross,
  Data,
  Datacontain,
  DataSpan,
  Description,
  EpisodeContain,
  EpisodeInfo,
  EpisodeTime,
  EpisodeTitle,
  LessonContain,
  LessonTitle,
  ModalBackground,
  ModalCont,
  ModalContain,
  ModalMod,
  ModalVideo,
  SeasonContain,
  SubTitle,
  Text,
  TextContainer,
  Title,
  Titles,
  VideoContain,
} from "./Modal1.styled";
import Select from "./Select";

const Modal1 = ({ show, setShow }: any) => {
  const handleClose = () => setShow(false);
  const responsive1023 = useMediaQuery({ query: "(max-width: 1100px)" });
  const responsive800 = useMediaQuery({ query: "(max-width: 850px)" });
  const responsive600 = useMediaQuery({ query: "(max-width: 670px)" });
  const responsive520 = useMediaQuery({ query: "(max-width: 520px)" });
  const responsive380 = useMediaQuery({ query: "(max-width: 380px)" });

  return (
    <ModalContain>
      <ModalMod show={show} onHide={handleClose} size="lg" centered>
        <ModalCont>
          <ModalBackground>
            <ModalVideo>
              <ReactPlayer
                className='absolute'
                url='https://cadefivideo.com.mx/media/2022/JUNIO/COMPLIANCE/master.m3u8'
                playing={true}
                muted={true}
                //controls
                width='100%'
                height={responsive380 ? '175%' : '180%' &&
                  responsive520 ? '185%' : '180%' &&
                    responsive600 ? '150%' : '180%' &&
                      responsive800 ? '125%' : '180%' &&
                        responsive1023 ? '92%' : '180%'
                }
                style={{ position: "absolute", top: responsive1023 ? "-95px" : "-170px", }}
              />
            </ModalVideo>
            <BackgroundOverlay />
            <Container>
              <Cross onClick={handleClose}>
                x
              </Cross>
              <TextContainer>
                <Title>
                  Curso de Uñas Francesas
                </Title>
                <SubTitle>
                  Descubre un nuevo método para tus uñas este San Valentín
                </SubTitle>
                <ButtonContain>
                  <PurpleButton>
                    Reproducir
                    <PlayIcon />
                  </PurpleButton>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nisi, sem rutrum blandit convallis. Penatibus scelerisque
                tempus, volutpat magna venenatis, volutpat. Ut nisl urna,
                pharetra et ultrices. Sapien lacinia fringilla rhoncus egestas
                nisl aliquam. Pellentesque ornare luctus lobortis non id in
                vestibulum.
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
              <Select />
            </SeasonContain>
            <VideoContain>
              <ContainVideo>
                <EpisodeContain>
                  <Image src="/images/Preview/card1.png" width={350} height={200} />
                  <Progress style={{ width: '60%' }} />
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