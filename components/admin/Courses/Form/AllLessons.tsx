import React, { useState } from "react";

import Link from "next/link";

import { MainContainer } from "../AllCourses.styled";
import Delete from "./Delete/Delete";
import {
  Demo1,
  EditEpisode,
  Episode,
  EpisodesContain,
  EpisodeContain,
  EpisodeInfo,
  EpisodeTime,
  EpisodeTitle,
} from "./Lessons.styled";

interface IAllSeasons {
  documentID: string,
  index: number,
  courseID: string,
  lessonTitle: string,
  lessonDuration: number,
  lessonDescription: string,
}

export const AllLeassons = (props: IAllSeasons) => {
  const { documentID } = props;
  const { index } = props;
  const { courseID } = props;
  const { lessonTitle } = props;
  const { lessonDuration } = props;
  const { lessonDescription } = props;

  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);
  const [openSeason, setOpenSeason] = useState(0);

  return (
    <><MainContainer>
      <EpisodesContain>
        <Episode>
          <Demo1 />
          <EpisodeContain>
            <EpisodeTitle>Epidosio {index + 1}: {lessonTitle}</EpisodeTitle>
            <EpisodeTime>{lessonDuration} minutos</EpisodeTime>
            <EpisodeInfo>{lessonDescription}</EpisodeInfo>
            <Link href="/admin/EditLesson">
              <EditEpisode>Editar Lección</EditEpisode>
            </Link>
          </EpisodeContain>
        </Episode>
      </EpisodesContain>
      <Delete setShow={setShow}
        show={show}
        deleteMessage={deleteMessage}
        seasonDocId={documentID}
        courseID={courseID}
        setOpenSeason={setOpenSeason} />
    </MainContainer>
    </>
  )
}
