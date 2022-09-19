import React, { useEffect, useState } from "react";

import { collection, doc, onSnapshot, orderBy, DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";

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

const SeasonsMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCoursesData] = useState<any>(null);
  const [seasons, setSeasons] = useState<any>(null);
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
  return (
    <>
      {!isLoading ? (

        <AdminContain>
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
                  courseCategory={courseData[0].courseCategory}
                  coursePath={courseData[0].coursePath}
                  courseDuration={courseData[0].courseDuration}
                  coursePrice={courseData[0].coursePrice}
                  courseProfessor={courseData[0].courseProfessor}
                  coursePublishYear={courseData[0].coursePublishYear}
                  courseSubtittle={courseData[0].courseSubtittle}
                  courseType={courseData[0].courseType}
                  index={0}
                  documentID={courseID} />
                :
                <></>
            }

            {/* Lista de lecciones */}
            <LessonContain>
              <LessonTitle>Lista de Lecciones</LessonTitle>
              {seasons !== null
                ? <>
                  {
                    seasons.map((e: any, i: any) => (
                      <AllSeasons key={"adminSeasons" + i}
                        documentID={e.documentID}
                        index={e.season}
                        courseID={courseID}
                        seasonID={seasons} />
                    ))
                  }
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