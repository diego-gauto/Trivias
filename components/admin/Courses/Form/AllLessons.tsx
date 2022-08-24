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
  lessonDuration: number,
  about: string,
  path: string,
}

export const AllLeassons = (props: IAllSeasons) => {
  const { documentID } = props;
  const { index } = props;
  const { courseID } = props;
  const { lessonTitle } = props;
  const { lessonDuration } = props;
  const { about } = props;
  const { seasonID } = props;
  const { path } = props;

  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);
  const [openSeason, setOpenSeason] = useState(0);
  //const [lessons, setLeassons] = useState<any>(null);

  // const fetchDBLessonData = async () => {
  //   try {
  //     const queryLessons = db.collection("courses").doc(courseID).collection("seasons").doc(documentID).collection("lessons");
  //     return onSnapshot(queryLessons, (response) => {
  //       var data: DocumentData = [];
  //       response.forEach((e) => {
  //         var obj: any = {}
  //         obj = e.data()
  //         obj["documentID"] = e.id
  //         data.push(obj)
  //       });
  //       setLeassons(data)
  //       return data
  //     })
  //   } catch (error) {
  //     return false
  //   }
  // }
  // useEffect(() => {
  //   console.log("LESSONS DATA: ", lessons);
  //fetchDBLessonData();
  //}, [courseID])

  return (
    <>
      <MainContainer>
        <EpisodesContain>
          <Episode>
            <ImageContain>
              <img src={path} />
            </ImageContain>
            <EpisodeContain>
              <EpisodeTitle>Epidosio {index + 1}: {lessonTitle}</EpisodeTitle>
              <EpisodeTime>{lessonDuration} minutos</EpisodeTime>
              <EpisodeInfo>{about}</EpisodeInfo>
              <Link
                href={{ pathname: '/admin/EditLesson', query: { courseId: courseID, seasonID: seasonID, lessonID: documentID } }}
              >
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
