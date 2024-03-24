import router from "next/router";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { deleteCommentAnswers, deleteCommentToAnswers, deleteThisComment, getComments } from "../../api/admin";
import { getCoursesApi } from "../../api/courses";
import { addCommentAnswerApi, addCommentToAnswerApi } from "../../api/lessons";
import { getUserApi } from "../../api/users";
import { AdminContain, Table } from "../SideBar.styled";
import { AdminCommentsContainer } from "./Comments.styled";
import { GrClose } from "react-icons/gr";
import { createNotification } from "../../api/notifications";

export interface Comment {
  id: number
  comment: string
  created_at: string
  user_id: number
  lessons_id: number
  course_id: number
  lesson_title: string
  lesson_number: number
  season_number: number
  course_title: string
  season_title: string
  answers: Answer[]
  formatDate: string
}

export interface Answer {
  id: number
  comment: string
  created_at: string
  comments_id: number
  user_id: number
  course_id: number
  comments: CommentOfAnswer[]
}

export interface CommentOfAnswer {
  id: number
  comment: string
  comment_answers_id: number
  user_id: number
  created_at: string
}

export interface Course {
  id: number
  about: string
  certificate_color: string
  difficulty: string
  mandatory: number
  image: string
  phrase: string
  price: number
  rating: number
  reviews: number
  subtitle: string
  title: string
  type: string
  sequential: number
  created_at: string
  duration: number
  published: number
  route: string
  course_number: number
  with_certificate: number
  material_route: string
  professors: Professor[]
  categories: Category[]
  materials: Material[]
}

export interface Professor {
  id: number
  course_id: number
  professors_id: number
  name: string
  about: string
  sign: string
  image: string
}

export interface Category {
  id: number
  course_id: number
  categories_id: number
  name: string
}

export interface Material {
  id: number
  course_id: number
  materials_id: number
  name: string
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>()
  const [userData, setUserData] = useState<any>(null);
  const [comment, setComment] = useState<Comment | undefined>(undefined)
  const [answer, setAnswer] = useState<Answer | undefined>(undefined)
  const [answerText, setAnswerText] = useState<any>("")
  const [answerComment, setAnswerComment] = useState<any>("")
  const [popUp, setPopUp] = useState<any>(false)
  const [courses, setCourse] = useState<Course[]>([]);
  const [coursesId, setCoursesId] = useState<number[]>([]);
  const [level, setLevel] = useState<number>(1);
  const [loader, setLoader] = useState<number>(-1);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(-1);

  useEffect(() => {
    retrievComments()
  }, [])

  const getFormattedDate = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const retrievComments = async () => {
    let user: any;
    if (localStorage.getItem("email")) {
      user = await getUserApi(localStorage.getItem("email"))
    }
    setUserData(user);
    getComments().then(async (res) => {
      console.log({ res: res.data });
      let tempComments = res.data.comments
      if (user.role === "admin") {
        let array = user.roles[7].courses.split(",");
        let temp: number[] = [];
        await Promise.all(array.map((x: any) => {
          temp.push(+x)
        }))
        tempComments = res.data.comments.filter((x: any) => temp.includes(x.course_id));
        getCoursesForAdmin(temp);
        setCoursesId(temp);
      }
      if (user.role === "superAdmin") {
        let temp: any = [];
        await Promise.all(tempComments.map((x: any) => {
          temp.push(+x.course_id)
        }))
        getCoursesForAdmin(temp);
        setCoursesId(temp);
      }
      tempComments.forEach((element: any) => {
        element.formatDate = getFormattedDate();
      });
      setComments(tempComments)
    })
  }
  const getCoursesForAdmin = (courses_id: any) => {
    getCoursesApi().then((res) => {
      let availableCourses: any = [];
      res.map((course: any) => {
        if (courses_id.includes(course.id)) {
          availableCourses.push(course);
        }
      })
      setCourse(availableCourses);
      console.log({ availableCourses });
    })
  }
  const FilteredComments = (course_id: number) => {
    getComments().then(async (res) => {
      res.data.comments.forEach((comment) => {
        comment.formatDate = getFormattedDate();
      });
      let tempComments = res.data.comments
      tempComments = res.data.comments.filter((x: any) => x.course_id === course_id);
      setComments(tempComments);
    })
  }
  const AllComments = () => {
    getComments().then(async (res) => {
      res.data.comments.forEach((comment) => {
        comment.formatDate = getFormattedDate();
      });
      let tempComments = res.data.comments
      tempComments = res.data.comments.filter((comment) => coursesId.includes(comment.course_id));
      setComments(tempComments);
    })
  }
  const deleteComment = (value: any, index: number) => {
    setLoader(index);
    console.log(value)
    if (userData.role === "admin" && userData.roles[8].delete === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    let body = {
      comment: value
    }
    deleteThisComment(body).then(() => {
      alert('Comentario eliminado')
      if (selectedCourseId === -1) {
        retrievComments();
      } else {
        FilteredComments(selectedCourseId);
      }
    })
    setLoader(-1);
  }

  const deleteAnswer = (value: any) => {
    if (userData.role === "admin" && userData.roles[8].delete === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    let answer = {
      answer: value
    }
    deleteCommentAnswers(answer).then(() => {
      if (selectedCourseId === -1) {
        retrievComments();
      } else {
        FilteredComments(selectedCourseId);
      }
    })
  }
  const deleteAnswerComment = (value: any) => {
    if (userData.role === "admin" && userData.roles[8].delete === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    let answer = {
      answer: value
    }
    deleteCommentToAnswers(answer).then(() => {
      if (selectedCourseId === -1) {
        retrievComments();
      } else {
        FilteredComments(selectedCourseId);
      }
    })
  }

  const answerQuestion = () => {
    if (userData.role === "admin" && userData.roles[8].create === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    if (comment === undefined) {
      return;
    }
    debugger;
    let notification = {
      userId: userData.id,
      type: "3",
      notificationId: '',
      courseId: comment.course_id,
      lesson: comment.lessons_id,
      season: comment.season_number - 1,
      userCommentId: answer === undefined ? comment.user_id : answer.user_id,
    }
    if (answerText) {
      addCommentAnswerApi({
        userId: userData.id,
        comment: level === 1 ? answerText : answerComment,
        commentId: comment.id,
        courseId: comment.course_id
      }).then((res) => {
        if (selectedCourseId === -1) {
          retrievComments();
        } else {
          FilteredComments(selectedCourseId);
        }
        setAnswerText("");
        setPopUp(false);
        createNotification(notification);
      })
    } else if (answerComment) {
      addCommentToAnswerApi({
        userId: answer === undefined ? comment.user_id : answer.user_id,
        comment: level === 1 ? answerText : answerComment,
        commentId: answer === undefined ? comment.id : answer.id,
      }).then((res) => {
        if (selectedCourseId === -1) {
          retrievComments();
        } else {
          FilteredComments(selectedCourseId);
        }
        setAnswerComment("");
        setPopUp(false);
        createNotification(notification);
      })
    }
  }

  const formatDate = (value: any) => {
    let tempDate: any = new Date(value);
    let tempDay = tempDate.getDate()
    let tempMonth = tempDate.getMonth() + 1;
    let tempYear = tempDate.getFullYear()
    return `${tempDay}/${tempMonth}/${tempYear}`
  }

  const goTo = (value: any) => {
    router.push({
      pathname: '/Lesson',
      query: { id: value.course_id, season: value.season_number - 1, lesson: value.lesson_number - 1, admin: 1 },
    });
  }


  return (
    <AdminContain style={{ flexDirection: "column" }}>
      <div className="courses-header">
        <h1 className="main-title">Comentarios</h1>
        {
          courses.length > 0 &&
          <div>
            <select onChange={(e) => {
              if (e.target.value === '-1') {
                AllComments();
              }
              else {
                FilteredComments(parseInt(e.target.value))
              }
              setSelectedCourseId(parseInt(e.target.value));
            }}>
              <option value={-1}>Ver todos</option>
              {
                courses.map((course, index: number) => {
                  return (
                    <option key={"course_comment_" + index} value={course.id}>
                      {course.title}
                    </option>
                  )
                })
              }
            </select>
          </div>
        }
      </div>
      <AdminCommentsContainer>
        {comments && comments.map((comment, index: number) => {
          return (
            <div className="comment-row" key={"admin_comments_" + index}>
              <div className="top">
                <p><span>Curso: </span>{comment.course_title}</p>
                <p><span>Temporada: </span>{comment.season_title}</p>
                <p><span>Lección: </span>{comment.lesson_title}</p>
                <p><span>Comentario: </span>{comment.comment}</p>
                <p><span>Fecha: </span>{comment.formatDate}</p>
                <div className="buttons">
                  <button className="add" onClick={() => { goTo(comment) }}>Ir a comentario</button>
                  <button className="add" onClick={() => {
                    setComment(comment);
                    setAnswer(undefined);
                    setPopUp(true);
                    setLevel(1);
                  }}>Responder Comentario</button>
                  {
                    loader === index ? <p>Cargando...</p>
                      : <button className="delete" onClick={() => { deleteComment(comment, index) }}>Eliminar</button>
                  }
                </div>
              </div>
              {comment.answers.length > 0 ? <p className="title">Respuestas</p> : <p className="title">Sin Respuestas</p>}
              {comment.answers && comment.answers.map((answer1, ans_ind: number) => {
                return (
                  <div className="answer" key={"admin_answer_" + ans_ind}>
                    <div className="left">
                      <p>Fecha: {formatDate(answer1.created_at)} <MdDeleteForever onClick={() => { deleteAnswer(answer1) }} /></p>
                      <p>{answer1.comment}</p>
                      <button className="add" onClick={() => {
                        setComment(comment);
                        setAnswer(answer1);
                        setPopUp(true);
                        setLevel(2);
                      }
                      }>Responder Comentario</button>
                    </div>
                    {answer1.comments.length > 0 ? <p className="title pl">Respuestas</p> : <p className="title pl">Sin Respuestas</p>}
                    {answer1.comments && answer1.comments.map((answer2, ans_ind: number) => {
                      console.log(answer2.comment);
                      console.log({ answerLastLevel: answer2 });
                      return (
                        <div className="answer pl" key={"admin_answer_comment_" + ans_ind}>
                          <div className="left">
                            <p>Fecha: {formatDate(answer2.created_at)} <MdDeleteForever onClick={() => { deleteAnswerComment(answer2) }} /></p>
                            <p>{answer2.comment}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )
        })}
        {popUp && <div className="pop-up">
          <GrClose onClick={() => { setPopUp(false); setAnswerText(""); setAnswerComment("") }} />
          <h1>Responder comentario</h1>
          <div className="comment-contain">
            <textarea placeholder="La solución es..." maxLength={255} onChange={(e) => { level === 1 ? setAnswerText(e.target.value) : setAnswerComment(e.target.value) }} />
            <p className="indicator"> {answerText.length} / 255</p>
          </div>
          <button onClick={() => { answerQuestion() }}>Agregar</button>
        </div>}
      </AdminCommentsContainer>
    </AdminContain>
  )
}
export default Comments;