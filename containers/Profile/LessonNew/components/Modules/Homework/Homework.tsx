import React, { useContext, useEffect, useState } from "react";

import { BsCheckCircleFill } from "react-icons/bs";

import router from "next/router";
import { HomeWorkContain, HomeWorkStatus, TaskTitle } from "./Homework.styled";
import { LoaderContainSpinner } from "../../../../Purchase/Purchase.styled";
import { useAuth } from "../../../../../../hooks/useAuth";
import { uploadImageHomework } from "../../../../../../store/actions/courseActions";
import { addHomeworkApi, getHomeworkUserApi } from "../../../../../../components/api/homeworks";
import { ICourse } from "../../../../../../interfaces/ICourse";
import ImagePreview from "../imagePreview/imagePreview";
import Quiz from "./components/Quiz";
import { BiUpload } from "react-icons/bi";
import { hexToRgba } from "../../../../../../utils/functions";
import { IoIosCloseCircle } from "react-icons/io";
import { IUserHomework } from "../../../../../../interfaces/IUserHomeworks";
import { HomeworksContext } from "../../../../../../hooks/useHomeworks";

interface IHomeWork {
  course: ICourse,
  lesson: any,
  // handleClick: any,
}
const HomeWork = (props: IHomeWork) => {
  const { lesson, course } = props;
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [homework, setHomework] = useState<IUserHomework | null>();
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [imageDisplay, setImageDisplay] = useState<any>('');
  const [imageLoader, setImageLoader] = useState<boolean>(false);
  const [typeFile, setTypeFile] = useState("");
  const context = useAuth();
  const user = context.user;
  const [isLoading, setIsLoading] = useState(false);
  const { loadHomeworks } = useContext(HomeworksContext);

  const approvalHomeWork = (file: FileList | null) => {
    if (file === null) {
      return;
    }
    if (file.length > 0) {
      var reader = new FileReader();
      if (file[0] === undefined) {
        return;
      }
      reader.readAsDataURL(file[0]);
      reader.onload = async (_event) => {
        setImageDisplay(reader.result);
        setImageModal(true);
        setTypeFile(file[0]!.type)
      }
    }
  }

  const getImage = async (imageAccepted: any) => {
    setImageLoader(true);
    if (router.query.season) {
      let tempHomework: any = {
        approved: false,
        comment: "",
        image: "",
        lessonId: lesson.id,
        courseId: course.id,
        seasonId: course.seasons[+router.query.season].id,
        season: router.query.season,
        status: false,
        user_id: user.user_id,
        title: lesson.lesson_homeworks.title,
      }
      let tempData = {
        path: imageAccepted,
        lessonId: lesson.id,
        userId: user.user_id
      }
      const url = await uploadImageHomework(tempData);
      tempHomework.image = url;
      //Homework create notification
      console.log(tempHomework);

      addHomeworkApi(tempHomework).then(() => {
        setImageLoader(false);
        alert("Tarea enviada")
        setImageModal(false);
        setStatus("pending");
        loadHomeworks({ user_id: context.user!.id, course_id: course.id });
      })
    }
    else {
      alert('Vuelva a intentar, sino refresque el sitio, gracias!');
    }
  }
  useEffect(() => {

    getUserHomework()
  }, [lesson])

  const getUserHomework = async () => {
    setIsLoading(true);
    let tempData = {
      lessonId: lesson.id,
      user_id: user.user_id
    }

    try {
      const hwk = await getHomeworkUserApi(tempData);
      if (hwk.data) {
        if (hwk.data.data.length > 0) {
          let temp = hwk.data.data[0]
          if (temp !== undefined) {
            if (temp.user_id === user.user_id && temp.status === 1 && temp.approved === 0) {
              setHomework(temp);
              setStatus("");
            }
            if (temp.user_id === user.user_id && temp.status === 0) {
              setStatus("pending");
              setHomework(null);
            }
            if (temp.user_id === user.user_id && temp.approved === 1) {
              setStatus("approved");
              setHomework(temp);
            }
          }
        } else {
          setStatus("");
          setHomework(null);
        }
      } else {
        window.location.reload()
      }
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <>
      <HomeWorkContain >
        {(lesson.quiz === 0) &&
          <div className="complete-hw">
            <div className='right'>
              <TaskTitle style={{ color: "#f78803" }}>
                Sube aquí tus prácticas <br />
                <span>
                  Da click en el botón correspondiente <br />
                  y sube tu tarea manualmente.
                </span>
              </TaskTitle>
              <div className='upload-info'>
                <p className='title'>Tamaño máximo: <b>5 Mb</b></p>
                <p className='title'>Formatos permitidos:</p>
                <div className='files'>
                  <p>PNG</p>
                  <div className='line'></div>
                  <p>JPG</p>
                  <div className='line'></div>
                  <p>DOC</p>
                  <div className='line'></div>
                  <p>DOCX</p>
                  <div className='line'></div>
                  <p>PPT</p>
                  <div className='line'></div>
                  <p>PPTX</p>
                  <div className='line'></div>
                  <p>PDF</p>
                </div>
              </div>
              <div className='line'></div>
              {lesson.homework === 1 ? <div className='upload-container'>
                <p>Tarea: <span>{lesson.lesson_homeworks.title}</span></p>
              </div> :
                <p>Lección sin tarea...</p>}
            </div>
            {isLoading && <LoaderContainSpinner />}
            {
              (lesson.homework === 1 && !isLoading) &&
              <>
                <p dangerouslySetInnerHTML={{ __html: lesson.lesson_homeworks.about }} className="quill-hw" />
                {(homework && homework.status === 1 && homework.approved === 0 && status !== "pending") &&
                  <HomeWorkStatus color="#FF0000" rgb={hexToRgba("#FF0000")} text="#CE0036" icon="#EB5757">
                    <IoIosCloseCircle className="icon" />
                    <div className="right-data">
                      <p className="title">Tarea rechazada</p>
                      <p className="content">
                        {homework.comment}
                      </p>
                    </div>
                  </HomeWorkStatus>
                }
                {
                  status === "" &&
                  <p style={{ margin: 0 }}>Haz click en el botón “Entregar tarea” para subir tu archivo.</p>
                }
                {
                  status === "" &&
                  <div id="btn-homework-upload" className='homework' onClick={() => { document.getElementById('hide')?.click() }} >
                    <BiUpload></BiUpload>
                    Entregar Tarea
                    <input id="hide" type="file" onChange={(e) => { approvalHomeWork(e.target.files) }} onClick={(e: any) => { e.target.value = '' }} hidden />
                  </div>
                }
                {
                  status === "pending" &&
                  <HomeWorkStatus color="#942CED" rgb={hexToRgba("#942CED")} text="#3F1168" icon="#942CED">
                    <BsCheckCircleFill className="icon" />
                    <div className="right-data">
                      <p className="title">Tarea enviada</p>
                      <p className="content">
                        Tu tarea ha sido enviada y esta en espera de evaluación y retroalimentación.
                        En 24 horas obtendrás una respuesta.
                      </p>
                    </div>
                  </HomeWorkStatus>
                }
                {
                  status === "approved" &&
                  <HomeWorkStatus color="#00CC99" rgb={hexToRgba("#00CC99")} text="#006b51" icon="#00CC99">
                    <BsCheckCircleFill className="icon" />
                    <div className="right-data">
                      <p className="title">Tarea aprobada</p>
                      <p className="content">
                        {homework?.comment}
                      </p>
                    </div>
                  </HomeWorkStatus>
                }
              </>
            }
          </div>}
        {
          lesson.quiz === 1 && <Quiz lesson={lesson} user={user} />
        }
        {loader && <LoaderContainSpinner />}
      </HomeWorkContain>
      <ImagePreview
        lesson={lesson.title}
        user={user.name}
        show={imageModal}
        setShow={setImageModal}
        imageDisplay={imageDisplay}
        type={typeFile}
        getImage={getImage}
        loader={imageLoader}
        setImageDisplay={setImageDisplay}
        setTypeFile={setTypeFile}
      />
    </>

  )
}
export default HomeWork;