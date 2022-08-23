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
  courseID: string,
}

export const AllSeasons = ({ documentID, index, courseID }: IAllSeasons) => {
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

  const runEpisodes = async () => {
    console.log("THIS COURSE: ", courseID)
    //const query = db.collection("courses").doc(courseID).collection("seasons").doc(documentID).collection("lessons");
  }

  return (
    <><MainContainer>
      <SeasonContain>
        <TitleContain>
          <Title>
            Temporada {index + 1}
            {openSeason != 1 &&
              <EpisodesNumber>{lessons}4 episodios</EpisodesNumber>}
          </Title>
          <ButtonContain>
            {openSeason == 1 &&
              <>
                <Link href="/admin/NewLesson">
                  <Button>Añadir Lección <Add /></Button>
                </Link>
                <Button onClick={() => { setShow(true), setDeleteMessage(2) }}>Eliminar temporada <TrashIcon /></Button>
                <ChevU onClick={() => { setOpenSeason(0); }} />
              </>}
            {openSeason != 1 &&
              <ChevD onClick={() => { setOpenSeason(1); getSeasonID(); runEpisodes() }} />}
          </ButtonContain>
        </TitleContain>
        {openSeason == 1 &&
          <EpisodesContain>
            <Episode>
              <EpisodeContain>
                {lessons !== null &&
                  lessons.map((item: any, i: any) => (
                    <AllLeassons
                      documentID={item.documentID}
                      index={i}
                      courseID={courseID}
                      lessonTitle={item.lessonTitle}
                      lessonDuration={item.lessonDuration}
                      lessonDescription={item.lessonDescription} />
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
