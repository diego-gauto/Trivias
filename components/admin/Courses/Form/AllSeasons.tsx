import React, { useEffect, useState } from "react";

import { onSnapshot, DocumentData } from "firebase/firestore";
import Link from "next/link";

import { db } from "../../../../firebase/firebaseConfig";
import { MainContainer } from "../AllCourses.styled";
import { AllLessons } from "./AllLessons";
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
  TitleEdit,
} from "./Lessons.styled";

interface IAllSeasons {
  documentID: string,
  index: number,
  courseID: string,
  seasonID: string,
  setSeasonEditModalData: Function,
  name: string,
}
interface AllLessonsProps {
  lessonTitle: string,
  lessonDescription: string,
  lessonDuration?: number,
  documentID?: string,
}

export const AllSeasons = ({
  documentID,
  index,
  courseID,
  seasonID,
  setSeasonEditModalData,
  name,
}: IAllSeasons) => {
  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);
  const [openSeason, setOpenSeason] = useState(false);
  const [lessons, setLeassons] = useState<Array<AllLessonsProps>>([]);

  //GETS ALL LESSONS DATA
  const getSeasonID = async () => {
    try {
      const query = db.collection("courses").doc(courseID).collection("seasons").doc(documentID).collection("lessons").orderBy("number");
      return onSnapshot(query, (response) => {
        var data: DocumentData | any = [];
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
  useEffect(() => {
    getSeasonID()
  }, [])

  const onSeasonEditClick = () => {
    setSeasonEditModalData({ seasonID: documentID, currentName: name });
  };


  return (
    <><MainContainer>
      <SeasonContain onClick={() => { setOpenSeason(!openSeason); getSeasonID() }}>
        <TitleContain>
          <TitleEdit>
            <Title>
              {name}
              {!openSeason &&
                <EpisodesNumber>{lessons?.length} Lecciónes</EpisodesNumber>}
            </Title>
            <Button
              onClick={onSeasonEditClick}
            >
              Editar
            </Button>
          </TitleEdit>
          <ButtonContain>
            {openSeason &&
              <>
                <Link href={{
                  pathname: "/admin/NewLesson",
                  query: {
                    courseID: courseID,
                    seasonID: documentID,
                  }
                }}>
                  <Button>Añadir Lección<Add /></Button>
                </Link>
                {
                  lessons.length == 0 &&
                  <Button onClick={() => { setShow(true), setDeleteMessage(2) }}>Eliminar temporada <TrashIcon /></Button>

                }
                <ChevU />
              </>}
            {!openSeason &&
              <ChevD />}
          </ButtonContain>
        </TitleContain>
        {openSeason &&
          <EpisodesContain>
            <Episode>
              <EpisodeContain>
                {lessons !== null &&
                  lessons.map((item: any, i: any) => (
                    <AllLessons key={"adminSeasons" + i}
                      seasonID={documentID}
                      documentID={item.documentID}
                      index={i}
                      courseID={courseID}
                      lesson={item}
                    />
                  ))
                }
              </EpisodeContain>
            </Episode>
          </EpisodesContain>}

        <Delete setShow={setShow}
          show={show}
          deleteMessage={deleteMessage}
          seasonID={documentID}
          courseID={courseID}
          setOpenSeason={setOpenSeason} />


      </SeasonContain>
    </MainContainer>
    </>
  )
}
