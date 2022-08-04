

import {
  Background,
  CardContainer,
  Container,
  ContinueText,
  ImageContain,
  PlayIcon,
  PlayIconS,
  Progress,
  Video,
  VideoContain,
  VideoInfo,
  VideoTitle,
} from "./Module2.styled";

const Module2 = () => {
  return (
    <Container>
      <ContinueText>
        Continua viendo
      </ContinueText>
      <CardContainer>
        <Video>
          <VideoContain>
            <ImageContain>
              <Background
                src="/images/Preview/card1.png"
                width={420}
                height={240}
              />
            </ImageContain>
            <PlayIconS />
            <PlayIcon />
            <Progress style={{ width: '50%' }} />
          </VideoContain>
          <VideoTitle>
            Episodio 01: Revelaciones
          </VideoTitle>
          <VideoInfo>
            Curso 1: Lorem Ipsum
          </VideoInfo>
        </Video>

        <Video>
          <VideoContain>
            <Background
              src="/images/Preview/card2.png"
              width={420}
              height={240}
            />
            <PlayIconS />
            <PlayIcon />
            <Progress style={{ width: '30%' }} />
          </VideoContain>
          <VideoTitle>
            Episodio 12: La Ruta de Kessel
          </VideoTitle>
          <VideoInfo>
            Curso 2: Lorem Ipsum
          </VideoInfo>
        </Video>

      </CardContainer>

    </Container>
  )
}
export default Module2;