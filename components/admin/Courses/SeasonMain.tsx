import React, { useEffect, useState } from "react";

import { collection, doc, onSnapshot, orderBy, DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { db } from "../../../firebase/firebaseConfig";
import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import { PurpleButton } from "./AllCourses.styled";
import {
  BackgroundOverlay,
  ButtonContain,
  Container,
  CourseContain,
  Imagecontain,
  ImageBack,
  NewText,
  Subtitle,
  Title,
} from "./Courses.styled";
import { AllSeasons } from "./Form/AllSeasons";
import CourseForm_Update from "./Form/CourseForm_Update";
import { LessonContain, LessonTitle, NewSeason, NewSeasonContain } from "./Form/Lessons.styled";
import SeasonEditModal from "./Form/SeasonEditModal";
import { editSeasonIndex } from "../../../store/actions/AdminActions";
import Modules from "./Form/Modules";

interface ISeasonEditModalData {
  seasonID: string;
  currentName: string;
}

const SeasonsMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCoursesData] = useState<any>(null);
  const [seasons, setSeasons] = useState<any>(null);
  const [change, setChange] = useState<any>(false);
  const [seasonEditModalData, setSeasonEditModalData] = useState<ISeasonEditModalData>();
  const router = useRouter()
  const { type, id } = router.query;

  const createNewSeason = async () => {
    if (seasons.length > 0) {
      return await db.collection("courses").doc(courseID).collection("seasons").add({
        season: seasons.length + 1
      });
    }
    else {
      return await db.collection("courses").doc(courseID).collection("seasons").add({
        season: 1
      });
    }
  }

  var courseID: any = ""

  try {
    var str: any = ""
    var arr: any = []
    str = window.location.search;
    arr = str.split("?documentID=")
    str = arr[1]
    courseID = str

  } catch (error) {
    courseID = "none"
  }

  //firestore query from specific document in a collection with ID
  const fetchDB_data = async () => {
    try {
      return await db.collection('courses').get().then((response) => {
        var data: DocumentData = [];
        response.forEach((e) => {
          if (e.id == courseID) {
            console.log(1);
            console.log(e.data());

            var obj: any = {}
            obj = e.data()
            data.push(obj)
          }
        });
        console.log(data);

        setCoursesData(data)
        return data
      })
    } catch (error) {
      return false
    }
  }

  //GETS ALL SEASONS DATA
  const fetchDBSeasonData = async () => {
    try {
      const querySeasons = db.collection("courses").doc(courseID).collection("seasons").orderBy("season");
      return onSnapshot(querySeasons, (response) => {
        var data: DocumentData = [];

        response.forEach((e) => {
          var obj: any = {}
          obj = e.data()
          obj["documentID"] = e.id
          data.push(obj)
        });
        setSeasons(data)
        return data
      })
    } catch (error) {
      return false
    }
  }
  useEffect(() => {
    fetchDBSeasonData();
    fetchDB_data();
  }, [courseID])

  useEffect(() => {
    if (courseData !== null) {
      setIsLoading(false)
    }
  }, [courseData])

  const onDragEnd = ({ destination, source }: any) => {
    // dropped outside the list
    if (!destination) return;
    const result = seasons;
    const [removed] = result.splice(source.index, 1);
    result.splice(destination.index, 0, removed);
    result.forEach((element: any, index: number) => {
      editSeasonIndex(courseID, element.documentID, index + 1)
    });

    setSeasons(result);
    setChange(!change);
  };

  return (
    <>
      {!isLoading ? (

        <AdminContain>
          {seasonEditModalData?.seasonID && (
            <SeasonEditModal
              courseID={courseID}
              seasonID={seasonEditModalData?.seasonID}
              currentName={seasonEditModalData?.currentName}
              onClose={() => setSeasonEditModalData(undefined)}
            />
          )}
          <SideBar />
          <CourseContain>
            <Imagecontain>
              <ImageBack
                src={courseData[0].coursePath}
              />
              <BackgroundOverlay />
            </Imagecontain>

            <Container>
              <NewText>Nuevo</NewText>
              <Title>{courseData[0].courseTittle}</Title>
              <Subtitle>{courseData[0].courseSubtittle}</Subtitle>

            </Container>
            {/* Form de cursos */}
            {
              courseData !== null
                ?
                <CourseForm_Update
                  reference={courseData[0].reference}
                  courseTittle={courseData[0].courseTittle}
                  courseAbout={courseData[0].courseAbout}
                  courseRating={courseData[0].courseRating}
                  courseCategory={courseData[0].courseCategory}
                  coursePath={courseData[0].coursePath}
                  courseDuration={courseData[0].courseDuration}
                  coursePrice={courseData[0].coursePrice}
                  courseHomeWork={courseData[0].courseHomeWork}
                  courseProfessor={courseData[0].courseProfessor}
                  coursePublishYear={courseData[0].coursePublishYear}
                  courseSubtittle={courseData[0].courseSubtittle}
                  coursePhrase={courseData[0].coursePhrase}
                  courseMaterial={courseData[0].courseMaterial}
                  courseDifficulty={courseData[0].courseDifficulty}
                  courseType={courseData[0].courseType}
                  courseCertificateColor={courseData[0].courseCertificateColor}
                  index={0}
                  documentID={courseID} />
                :
                <></>
            }
            {/* Botones Agregar profesor, categoria , materiales */}
            <Modules />

            {/* Lista de lecciones */}
            <LessonContain>
              <LessonTitle>Lista de Lecciones</LessonTitle>
              {seasons !== null
                ? <>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-list" >
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: "flex", flexDirection: "column", gap: "10px", minHeight: 96 * seasons.length }}>
                          {
                            seasons.map((e: any, i: any) => {
                              return (
                                <Draggable draggableId={`season-` + i} index={i} key={"season-item-" + i}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={(snapshot.isDragging ? "dragging" : "")}
                                    >
                                      <AllSeasons
                                        change={change}
                                        setSeasonEditModalData={setSeasonEditModalData}
                                        key={"adminSeasons" + i}
                                        documentID={e.documentID}
                                        index={e.season}
                                        courseID={courseID}
                                        seasonID={seasons}
                                        name={e.name || `Temporada ${e.season}`}

                                      />
                                    </div>
                                  )}
                                </Draggable>

                              )
                            })
                          }
                        </div>
                      )}

                    </Droppable>
                  </DragDropContext>
                </>
                :
                <>
                  Sin temporadas...
                </>
              }
              <NewSeasonContain>
                <NewSeason onClick={createNewSeason}>+ Añadir nueva temporada</NewSeason>
              </NewSeasonContain>
            </LessonContain>
            <ButtonContain>
              <Link href="/admin/Courses">
                <PurpleButton>Regresar</PurpleButton>
              </Link>
            </ButtonContain>
          </CourseContain>
        </AdminContain>

      ) : (
        <></>
      )}
    </>
  )
}
export default SeasonsMain;