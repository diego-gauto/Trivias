

import {
  ButtonContain,
  Container,
  ImageContain,
  PlayIcon,
  PurpleButton,
  SubText,
  TextContain,
  Title,
  TransparentButton,
  VideoContain,
} from "./Module1.styled";

const Module1 = () => {
  return (
    <Container>
      <ImageContain>
        {/* <Banner
          src="/images/Preview/fondo1.png"
          layout="fill"
          priority
        /> */}
        <VideoContain>
          <video style={{ width: "100vw", }} autoPlay loop muted>
            <source src="/images/Video/video1.mp4" type="video/mp4"></source>
          </video>
        </VideoContain>
      </ImageContain>

      <TextContain>
        <Title>
          Curso 1: Episodio 05 “El Regreso”
        </Title>
        <SubText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus adipiscing amet, enim quis. Quis massa tempus felis id tellus nunc, eu.
        </SubText>
        <ButtonContain>
          <PurpleButton>
            Reproducir
            <PlayIcon />
          </PurpleButton>
          <TransparentButton>
            Más información
          </TransparentButton>
        </ButtonContain>
      </TextContain>
    </Container>
  )
}
export default Module1;