import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { deleteCommentAnswers, deleteThisComment, getComments } from "../../api/admin";
import { addCommentAnswerApi } from "../../api/lessons";
import { createNotification } from "../../api/notifications";
import { getUserApi } from "../../api/users";
import { AdminContain, Table } from "../SideBar.styled";
import { AdminCommentsContainer } from "./Comments.styled";

const Comments = () => {

  const [comments, setComments] = useState<any>()
  const [userData, setUserData] = useState<any>(null);
  const [comment, setComment] = useState<any>()
  const [answer, setAnswer] = useState<any>("")
  const [popUp, setPopUp] = useState<any>(false)

  useEffect(() => {
    retrievComments()
  }, [])

  const retrievComments = async () => {
    let user: any;
    if (localStorage.getItem("email")) user = await getUserApi(localStorage.getItem("email"))
    setUserData(user);
    getComments().then(async (res) => {
      let tempComments = res.data.comments
      if (user.role === "admin") {
        let array = user.roles[7].courses.split(",");
        let temp: any = [];
        await Promise.all(array.map((x: any) => {
          temp.push(+x)
        }))
        tempComments = res.data.comments.filter((x: any) => temp.includes(x.course_id));
      }
      setComments(tempComments)
    })
  }

  const deleteComment = (value: any) => {
    if (userData.role === "admin" && userData.roles[8].delete === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    let body = {
      comment: value
    }
    deleteThisComment(body).then(() => {
      retrievComments()
    })
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
      retrievComments();
    })
  }

  const answerQuestion = () => {
    if (userData.role === "admin" && userData.roles[8].create === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    let body: any;
    if (answer) {
      body = {
        userId: userData.id,
        comment: answer,
        commentId: comment.id,
        courseId: comment.course_id
      }
      // let notification = {
      //   userId: x.user_id ? x.user_id : "",
      //   message: 'Alguien te ha comentado',
      //   type: 'comment',
      //   notificationId: '',
      //   courseId: course.id,
      //   title: course.title,
      //   lesson: lesson,
      //   season: season,
      //   name: user.name
      // }
      // createNotification(notification);
      addCommentAnswerApi(body).then((res) => {
        retrievComments();
        setAnswer("");
        setPopUp(false);
      })
    }
  }

  return (
    <AdminContain style={{ flexDirection: "column" }}>
      <div className="courses-header">
        <h1 className="main-title">Comentarios</h1>
      </div>
      <AdminCommentsContainer>
        {comments && comments.map((x: any) => {
          return (
            <div className="comment-row">
              <div className="top">
                <p><span>Comentario: </span>{x.comment}</p>
                <div className="buttons">
                  <button className="add" onClick={() => { setComment(x); setPopUp(true); }}>Agregar Comentario</button>
                  <button className="delete" onClick={() => { deleteComment(x) }}>Eliminar</button>
                </div>
              </div>
              {x.answers.length > 0 ? <p className="title">Respuestas</p> : <p className="title">Sin Respuestas</p>}
              {x.answers.map((answer: any) => {
                return (
                  <div className="answer">
                    <p>{answer.comment}</p>
                    <MdDeleteForever onClick={() => { deleteAnswer(answer) }} />
                  </div>
                )
              })}
            </div>
          )
        })}
        {popUp && <div className="pop-up">
          <h1>Responder comentario</h1>
          <textarea placeholder="La solución es..." onChange={(e) => { setAnswer(e.target.value) }} />
          <button onClick={() => { answerQuestion() }}>Agregar</button>
        </div>}
      </AdminCommentsContainer>
    </AdminContain>
  )
}
export default Comments;