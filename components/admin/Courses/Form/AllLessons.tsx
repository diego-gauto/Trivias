import React, { useEffect, useState } from "react";

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
import { db } from "../../../../firebase/firebaseConfig";
import { getDocs } from "firebase/firestore";

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

export const AllLessons = ({ documentID, index, courseID, seasonID, lesson }: any) => {

  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);


  return (
    <><MainContainer>
      <EpisodesContain>
        <Episode>
          <ImageContain>
            <img src={lesson.image} />
          </ImageContain>
          <EpisodeContain>
            <EpisodeTitle>Epidosio {lesson.number}: {lesson.title}</EpisodeTitle>
            <EpisodeTime>30 minutos</EpisodeTime>
            <EpisodeInfo>{lesson.about}</EpisodeInfo>
            <Link href={{
              pathname: "/admin/EditLesson",
              query: {
                courseID: courseID,
                seasonID: seasonID,
                lessonID: documentID,
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
