import React, { useState } from "react";

import Link from "next/link";

import { MainContainer } from "../AllCourses.styled";
import Delete from "./Delete/Delete";
import {
  EditEpisode,
  Episode,
  EpisodesContain,
  EpisodeContain,
  EpisodeInfo,
  EpisodeTime,
  EpisodeTitle,
  ImageContain,
} from "./Lessons.styled";

interface IAllSeasons {
  documentID: string,
  index: number,
  courseID: string,
  seasonID: string,
  lessonTitle: string,
  lessonDuration?: number,
  about: string,
  path: string,
}

export const AllLessons = ({ documentID, index, courseID, lessonTitle, about, seasonID, path }: IAllSeasons) => {

  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);

  return (
    <><MainContainer>
      <EpisodesContain>
        <Episode>
          <ImageContain>
            <img src={path} />
          </ImageContain>
          <EpisodeContain>
            <EpisodeTitle>Epidosio {index + 1}: {lessonTitle}</EpisodeTitle>
            <EpisodeTime>30 minutos</EpisodeTime>
            <EpisodeInfo>{about}</EpisodeInfo>
            <Link href={{
              pathname: "/admin/EditLesson",
              query: {
                lessonID: documentID,
                courseID: courseID,
                seasonID: seasonID,
              }
            }}
            >
              <EditEpisode>Editar Lección</EditEpisode>
            </Link>
          </EpisodeContain>
        </Episode>
      </EpisodesContain>
      <Delete setShow={setShow}
        show={show}
        deleteMessage={deleteMessage}
        seasonID={documentID}
        courseID={courseID}
      />
    </MainContainer>
    </>
  )
}
