import React from 'react'
import ReactPlayer from "react-player";
import { Title, VideoContain, VideoImage } from './Video.styled';
import { useMediaQuery } from "react-responsive";

const Video = ({ data }: any) => {

  return (
    <VideoContain>
      <Title>
        Bienvenida y presentación del curso de uñas con técnica express
      </Title>
      <ReactPlayer
        className='absolute'
        url={data.link}
        playing={false}
        muted={true}
        controls
        width={900} height={500}
      />
    </VideoContain>
  )
}
export default Video;