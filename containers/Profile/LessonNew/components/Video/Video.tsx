import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";

const Video = ({ user, lesson }: any) => {

  return (
    <ReactPlayer
      className='absolute'
      // ref={p => p?.seekTo(handleViewed())}
      url={lesson.link}
      playing={true}
      playsinline={true}
      muted={false}
      controls
      width="100%" height="auto"
      style={{ position: "relative" }}
      // onEnded={finishedLesson}
      onDuration={(duration) => {
        // handleDuration(duration);
      }
      }
      onProgress={(state) => {
        // handleProgress(state.playedSeconds)
      }}
    />
  )
}
export default Video;