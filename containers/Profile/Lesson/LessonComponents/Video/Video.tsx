import React from 'react'
import { Title, VideoContain, VideoImage } from './Video.styled';

const Video = () => {
  return (
    <VideoContain>
      <Title>
        Bienvenida y presentación del curso de uñas con técnica express
      </Title>
      <VideoImage src="/images/Video/video.png" width={900} height={500} />
    </VideoContain>
  )
}
export default Video;