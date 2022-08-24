import React, { useState } from "react";

import { onSnapshot, DocumentData } from "firebase/firestore";
import Link from "next/link";

import { db } from "../../../../firebase/firebaseConfig";
import { MainContainer } from "../AllCourses.styled";
import { AllLeassons } from "./AllLessons";
import Delete from "./Delete/Delete";
import { TrashIcon } from "./Edit.styled";
import {
  Add,
  Button,
  ButtonContain,
  ChevD,
  ChevU,
  Episode,
  EpisodesContain,
  EpisodesNumber,
  EpisodeContain,
  SeasonContain,
  Title,
  TitleContain,
} from "./Lessons.styled";

interface IAllSeasons {
  documentID: string,
  index: number,
  courseID: string
}

export const AllSeasons = (props: IAllSeasons) => {
  const { documentID } = props;
  const { index } = props;
  const { courseID } = props;

  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);
  const [openSeason, setOpenSeason] = useState(0);
  const [lessons, setLeassons] = useState<any>(null);

  //GETS ALL LESSONS DATA
  const getSeasonID = async () => {
    try {
      const query = db.collection("courses").doc(courseID).collection("seasons").doc(documentID).collection("lessons");
      return onSnapshot(query, (response) => {
        var data: DocumentData = [];
        response.forEach((e) => {
          var obj: any = {}
          obj = e.data()
          obj["documentID"] = e.id
          data.push(obj)
        });
        setLeassons(data)
        return data
      })
    } catch (error) {
      return false
    }
  }
  // const fetchDBSeasonData = async () => {
  //   try {
  //     const queryLessons = db.collection("courses").doc(courseID).collection("seasons");
  //     return onSnapshot(queryLessons, (response) => {
  //       var data: DocumentData = [];
  //       response.forEach((e) => {
  //         var obj: any = {}
  //         obj = e.data()
  //         obj["documentID"] = e.id
  //         data.push(obj)
  //       });
  //       return data
  //     })
  //   } catch (error) {
  //     return false
  //   }
  // }
  //useEffect(() => {
  //fetchDBSeasonData();
  //getSeasonID();
  //}, [courseID])

  return (
    <><MainContainer>
      <SeasonContain>
        <TitleContain>
          <Title>
            Temporada {index}
            {openSeason != 1 &&
              <EpisodesNumber>{lessons?.length} Episodios</EpisodesNumber>}
          </Title>
          <ButtonContain>
            {openSeason == 1 &&
              <>
                <Link href={{ pathname: '/admin/NewLesson', query: { courseId: courseID, seasonId: documentID } }}>
                  <Button>Añadir Lección <Add /></Button>
                </Link>
                <Button onClick={() => { setShow(true), setDeleteMessage(2) }}>Eliminar temporada <TrashIcon /></Button>
                <ChevU onClick={() => { setOpenSeason(0); }} />
              </>}
            {openSeason != 1 &&
              <ChevD onClick={() => { setOpenSeason(1); getSeasonID() }} />}
          </ButtonContain>
        </TitleContain>
        {openSeason == 1 &&
          <EpisodesContain>
            <Episode>
              <EpisodeContain>
                {lessons !== null &&
                  lessons.map((e: any, i: any) => (
                    <AllLeassons key={"adminSeasons" + i}
                      seasonID={documentID}
                      documentID={e.documentID}
                      index={i}
                      courseID={courseID}
                      lessonTitle={e.lessonTitle}
                      lessonDuration={e.lessonDuration}
                      lessonDescription={e.lessonDescription} />
                  ))
                }
              </EpisodeContain>
            </Episode>
          </EpisodesContain>}
        <Delete setShow={setShow}
          show={show}
          deleteMessage={deleteMessage}
          seasonDocId={documentID}
          courseID={courseID}
          setOpenSeason={setOpenSeason} />
      </SeasonContain>
    </MainContainer>
    </>
  )
}
