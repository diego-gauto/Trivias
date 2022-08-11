import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";

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
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <Container>
      <ImageContain>

        <VideoContain>
          <ReactPlayer
            className='absolute'
            url='https://cadefivideo.com.mx/media/2022/JUNIO/COMPLIANCE/master.m3u8'
            playing={true}
            muted={true}
            //controls
            width='100%'
            height='180%'
            style={{ position: "absolute", top: responsive1023 ? "-95px" : "-170px", }}
          />
        </VideoContain>
      </ImageContain>

      <TextContain>
        <Title style={{ textShadow: "1px 1px 5px black" }}>
          Curso 1: Episodio 05 “El Regreso”
        </Title>
        <SubText style={{ textShadow: "1px 1px 5px black" }}>
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