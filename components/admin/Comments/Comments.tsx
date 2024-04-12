import router from "next/router";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { deleteCommentAnswers, deleteCommentToAnswers, deleteThisComment, getComments, getGenericQueryResponse } from "../../api/admin";
import { getCoursesApi } from "../../api/courses";
import { addCommentAnswerApi, addCommentToAnswerApi } from "../../api/lessons";
import { getUserApi } from "../../api/users";
import { AdminContain, Table } from "../SideBar.styled";
import { AdminCommentsContainer } from "./Comments.styled";
import { GrClose } from "react-icons/gr";
import { createNotification } from "../../api/notifications";
import {
  generateCommentsByCourseIdQuery,
  generateAnswersByCommentIdQuery,
  generateAnswersOfAnswersByAnswerIdQuery,
  generateCoursesQuery,
  generateGetAdminUsersQuery,
  generateGetAllComments,
  CommentStructure,
  generateCountAllComments
} from './Querys';
import Pagination from '../../Pagination/Pagination';
import { DefaultColumn } from "../DefaultComponents/DefaultComponents.styled";

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
  title: string
}

export interface User {
  id: number
  name: string
  last_name: string
  email: string
  password: string
  phone_number: string
  role: string
  photo: string
  score: number
  stripe_id: string
  provider: string
  created_at: string
  past_user: string
  subscription: number
  last_sign_in: string
  country: string
  conekta_id: string
  terms: number
  come_from: string
  origin_state: any
  user_id: number
  final_date: number
  level: number
  method: any
  payment_method: any
  plan_id: any
  plan_name: any
  start_date: number
  type: any
  payment_methods: any[]
  user_courses: UserCourse[]
  user_progress: UserProgress[]
  user_history: UserHistory[]
  user_certificates: UserCertificate[]
  roles: Role[]
}

export interface UserCourse {
  id: number
  user_id: number
  course_id: number
  final_date: number
}

export interface UserProgress {
  id: number
  user_id: number
  seconds: number
  time: number
  lessons_id: number
  status: number
}

export interface UserHistory {
  id: number
  user_id: number
  course_id: number
  season_id: number
  lesson_id: number
  last_seen: string
}

export interface UserCertificate {
  id: number
  user_id: number
  course_id: number
  folio: string
  created_at: string
}

export interface Role {
  id: number
  role: string
  source_table: string
  create?: number
  edit?: number
  delete?: number
  view: number
  user_id: number
  courses?: string
  request?: number
  report?: number
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User>({} as User);
  const [adminUserIds, setAdminUserIds] = useState<number[]>([]);
  const [comment, setComment] = useState<Comment | undefined>(undefined)
  const [answer, setAnswer] = useState<Answer | undefined>(undefined)
  const [answerText, setAnswerText] = useState<any>("")
  const [answerComment, setAnswerComment] = useState<any>("")
  const [popUp, setPopUp] = useState<any>(false)
  const [courses, setCourses] = useState<Course[]>([]);
  // const [coursesId, setCoursesId] = useState<number[]>([]);
  const [level, setLevel] = useState<number>(1);
  const [loader, setLoader] = useState<number>(-1);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(-1);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getUserData();
    getCountOfComments();
    getCoursesForAdmin();
    getAdminUserIds();
  }, [])

  useEffect(() => {
    getCoursesForAdmin();
    retrievComments();
  }, [offset, selectedCourseId])

  const formatDate = (date: string) => {
    let today = new Date(date);
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const changePage = (page: number) => {
    setOffset(page * 50);
  }

  const getUserData = async () => {
    try {
      if (localStorage.getItem("email")) {
        const user = await getUserApi(localStorage.getItem("email"));
        setUser(user);
      } else {
        throw new Error(`No existe un email con el cual buscar la información del usuario en localStorage`);
      }
    } catch (error) {
      throw error;
    }
  }

  const getCountOfComments = async () => {
    try {
      const countQuery = generateCountAllComments(selectedCourseId);
      const countResponse = await getGenericQueryResponse(countQuery);
      const count = countResponse.data.data[0]["count"] as number;
      setCount(count);
    } catch (error) {
      console.error(error);
    }
  }

  const retrievCommentsNew = async () => {
    try {
      await getCountOfComments();
      const courseId = selectedCourseId === -1 ? undefined : selectedCourseId;
      const queryMainComments = generateCommentsByCourseIdQuery(courseId, offset);
      const response = await getGenericQueryResponse(queryMainComments);

      interface TempComment {
        id: number,
        comment: string,
        created_at: string,
        user_id: number,
        lessons_id: number,
        course_id: number,
        course_title: string,
        lesson_title: string,
        lesson_number: number,
        season_number: number,
        season_title: string,
      }

      interface TempAnswer {
        id: number,
        comment: string,
        created_at: string,
        comments_id: number,
        user_id: number,
        course_id: number,
      }

      const comments = response.data.data as TempComment[];

      let finalCommentsResult: Comment[] = [];
      finalCommentsResult = await Promise.all(comments.map(async (comment, indexComment) => {
        const queryAnswers = generateAnswersByCommentIdQuery(comment.id);
        const responseAnswer = await getGenericQueryResponse(queryAnswers);
        const answers = responseAnswer.data.data as TempAnswer[];

        const finalAnswers = await Promise.all(answers.map(async (answer, indexAnswer) => {
          const queryAnswersOfAnswer = generateAnswersOfAnswersByAnswerIdQuery(answer.id);
          const answersOfAnswerResponse = await getGenericQueryResponse(queryAnswersOfAnswer);
          const answersOfAnswer = answersOfAnswerResponse.data.data as CommentOfAnswer[];
          return {
            ...answer,
            comments: answersOfAnswer
          }
        }));
        return {
          ...comment,
          formatDate: formatDate(comment.created_at),
          answers: finalAnswers
        }
      }));

      setComments(finalCommentsResult);
    } catch (error) {
      console.error(error);
    }
  }

  const retrievComments = async () => {
    try {
      await getCountOfComments();
      const query = await generateGetAllComments('all', selectedCourseId, offset);
      console.log(query);
      const response = await getGenericQueryResponse(query);
      const data = response.data.data as CommentStructure[];


      const onlyComments = filterOnlyComments(data);
      const onlyAnswers = filterOnlyAnswers(data);
      const onlyAnswersWithAnswer = filterOnlyAnswersWithAnswer(data);

      const result: Comment[] = onlyComments.map((comment) => {
        const newComment: Comment = {
          course_title: comment.course_title,
          id: comment.comment_id,
          comment: comment.comment_comment,
          course_id: comment.comment_course_id,
          created_at: comment.comment_created_at,
          lesson_number: comment.lesson_number,
          season_number: comment.season_number,
          user_id: comment.comment_user_id,
          season_title: comment.season_title,
          lessons_id: comment.lessons_id,
          lesson_title: comment.lesson_title,
          formatDate: formatDate(comment.comment_created_at),
          answers: onlyAnswers.filter((a) => a.comment_id === comment.comment_id).map(a => {
            return {
              comment: a.comment_answer_comment,
              comments_id: comment.comment_id,
              course_id: a.comment_answer_course_id,
              id: a.comment_answer_id,
              user_id: a.comment_answer_user_id,
              created_at: a.comment_answer_created_at,
              comments: onlyAnswersWithAnswer.filter(aa => aa.comment_answer_id === a.comment_answer_id).map(aa => {
                return {
                  comment_answers_id: aa.comment_answer_id,
                  comment: aa.comment_answer_comment,
                  created_at: aa.comment_answer_comment_created_at,
                  user_id: aa.comment_answer_comment_user_id,
                  id: aa.comment_answer_comment_id
                }
              })
            }
          })
        };

        return {
          ...newComment
        }
      });

      console.log({ comments: result });
      setComments(result);
    } catch (error) {
      console.error(error);
    }
  }

  const filterOnlyComments = (comments: CommentStructure[]) => {
    const onlyCommentsData = comments.map(({
      comment_id,
      comment_comment,
      comment_created_at,
      comment_user_id,
      lessons_id,
      comment_course_id,
      course_title,
      lesson_number,
      lesson_title,
      season_number,
      season_title
    }) => {
      return {
        comment_id,
        comment_comment,
        comment_created_at,
        comment_user_id,
        lessons_id,
        comment_course_id,
        course_title,
        lesson_number,
        lesson_title,
        season_number,
        season_title
      }
    });
    console.log({ onlyCommentsData });
    const onlyComments = new Set([...onlyCommentsData.filter(c => c.comment_id !== null)]);
    return [...onlyComments];
  }

  const filterOnlyAnswers = (comments: CommentStructure[]) => {
    const onlyAnswersData = comments.map(({
      comment_id,
      comment_comment,
      comment_created_at,
      comment_user_id,
      lessons_id,
      comment_course_id,
      comment_answer_id,
      comment_answer_comment,
      comment_answer_created_at,
      comments_id,
      comment_answer_user_id,
      comment_answer_course_id
    }) => {
      return {
        comment_id,
        comment_comment,
        comment_created_at,
        comment_user_id,
        lessons_id,
        comment_course_id,
        comment_answer_id,
        comment_answer_comment,
        comment_answer_created_at,
        comments_id,
        comment_answer_user_id,
        comment_answer_course_id
      }
    });
    const filteredAnswers = onlyAnswersData.filter((a) => a.comment_id !== null && a.comment_answer_id !== null);
    const noRepeatAnswers = [...new Set(filteredAnswers)];
    return noRepeatAnswers;
  }

  const filterOnlyAnswersWithAnswer = (comments: CommentStructure[]) => {
    const filteredAnswersWithAnswer = comments.filter((c) => c.comment_id !== null && c.comment_answer_id !== null && c.comment_answer_comment_id !== null);
    return filteredAnswersWithAnswer;
  }

  /*
    const retrievComments = async () => {
      let user: any;
      if (localStorage.getItem("email")) {
        user = await getUserApi(localStorage.getItem("email"))
      }
      setUser(user);
      // 1. Establecer la info del usuario
      getComments().then(async (res) => {
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
    }*/
  const getCoursesForAdmin = async () => {
    try {
      const query = generateCoursesQuery();
      const res = await getGenericQueryResponse(query);
      setCourses(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getAdminUserIds = async () => {
    try {
      const query = generateGetAdminUsersQuery();
      const response = await getGenericQueryResponse(query);
      const data = response.data.data as { user_id: number }[];
      const userIds = data.map(data => data["user_id"]);
      setAdminUserIds(userIds);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteComment = (value: any, index: number) => {
    setLoader(index);
    if (user.role === "admin" && user.roles[8]?.delete === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    let body = {
      comment: value
    }
    deleteThisComment(body).then(() => {
      alert('Comentario eliminado')
      retrievComments();
    })
    setLoader(-1);
  }

  const deleteAnswer = (value: any) => {
    if (user.role === "admin" && user.roles[8]?.delete === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    let answer = {
      answer: value
    }
    deleteCommentAnswers(answer).then(() => {
      retrievComments();
    })
  }
  const deleteAnswerComment = (value: any) => {
    if (user.role === "admin" && user.roles[8]?.delete === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    let answer = {
      answer: value
    }
    deleteCommentToAnswers(answer).then(() => {
      retrievComments();
    })
  }

  const answerQuestion = () => {
    if (user.role === "admin" && user.roles[8]?.create === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    if (comment === undefined) {
      return;
    }
    let notification = {
      userId: user.id,
      type: "3",
      notificationId: '',
      courseId: comment.course_id,
      lesson: comment.lessons_id,
      season: comment.season_number - 1,
      userCommentId: answer === undefined ? comment.user_id : answer.user_id,
    }
    if (answerText) {
      addCommentAnswerApi({
        userId: user.id,
        comment: level === 1 ? answerText : answerComment,
        commentId: comment.id,
        courseId: comment.course_id
      }).then((res) => {
        retrievComments();
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
        retrievComments();
        setAnswerComment("");
        setPopUp(false);
        createNotification(notification);
      })
    }
  }

  const goTo = (value: any) => {
    router.push({
      pathname: '/Lesson',
      query: { id: value.course_id, season: value.season_number - 1, lesson: value.lesson_number - 1, admin: 1 },
    });
  }

  const isPriorityToShow = (comment: Comment) => {
    let isPriority = false;
    // Si el comentario no tiene respuesta, es que le hace falta una
    if (comment.answers.length === 0) {
      isPriority = true;
    }
    else {
      const lastComment = comment.answers[comment.answers.length - 1];
      const lastAnswerIsUserAdmin = adminUserIds.includes(lastComment!.user_id);
      // Si la ultima respuesta no es de un usuario admin, es que 
      if (!lastAnswerIsUserAdmin) {
        isPriority = true;
      }
    }
    return isPriority;
  }

  return (
    <AdminContain style={{ flexDirection: "column" }}>
      <div className="courses-header">
        <div className='header'>
          <DefaultColumn gap={5}>
            <div className='top-title'>
              <h2 className='title'>Comentarios</h2>
            </div>
          </DefaultColumn>
          <Pagination
            changePage={changePage}
            currentPage={(offset / 50)}
            totalPage={Math.ceil(count / 50)}
          />
        </div>
        {
          courses.length > 0 &&
          <div>
            <select onChange={(e) => {
              setSelectedCourseId(parseInt(e.target.value));
              setOffset(0);
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
            <div
              className="comment-row"
              key={"admin_comments_" + index}
              style={{
                backgroundColor: `${isPriorityToShow(comment) ? '#F7DBEA' : '#FFF'}`
              }}
            >
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