import React, { useEffect, useState } from 'react'
import { DEFAULT_USER_IMG } from '../../../../../constants/paths'
import { CommentContain, CommentInput, MainContainer, Profile } from './Comments.styled'
import { TitleContain } from './Module.styled'
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa'
import { addCommentAnswerApi, addCommentAnswerLikeApi, addCommentApi, addCommentLikeApi, addCommentToAnswerApi, addCommentToAnswerLikeApi, deleteCommentAnswerLikeApi, deleteCommentLikeApi, deleteCommentToAnswerLikeApi, retrieveComments } from '../../../../../components/api/lessons'
import { createNotification } from '../../../../../components/api/notifications'
import { MdVerified } from 'react-icons/md'
import ModuleTabs from './ModuleTabs/ModuleTabs'
const Comments = ({ value, changeValue, user, data, comments, course, season, lesson, nextLesson, previousLesson, firstLesson, lastLesson }: any) => {

  const [currentComments, setCurrentComments] = useState<any>([]);
  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerComment, setAnswerComment] = useState("");
  const [responses, setResponses] = useState<any>([]);
  const [lastComments, setLastComments] = useState<any>([]);

  const addLessonComment = () => {
    let body: any;
    if (comment) {
      body = {
        userId: user.user_id ? user.user_id : "",
        comment: comment,
        lessonId: data.id,
        courseId: course.id
      }
      addCommentApi(body).then((res) => {
        setComment("");
        getComments();
      })
    }
  }
  useEffect(() => {
    if (data) {
      getComments()
    }
  }, [data])

  const getComments = () => {
    let temp: any = []
    let tempComments: any = []
    retrieveComments(data.id).then((res) => {
      res.data.data.forEach((element: any, i: number) => {
        temp.push(false);
        element.answers.forEach((ca: any) => {
          tempComments.push(false);
        });
      })
      setResponses(temp);
      setLastComments(tempComments);
      setCurrentComments(res.data.data)
    })
  }
  const like = (x: any) => {
    let temp = {
      userId: user.user_id,
      commentId: x.comment_id
    }
    if (x.likes.findIndex((x: any) => x.user_id == user.user_id) === -1) {
      let notification = {
        userId: x.user_id ? x.user_id : "",
        message: 'Alguien le dio like a tu comentario',
        type: 'like',
        notificationId: '',
        courseId: course.id,
        title: course.title,
        lesson: lesson,
        season: season,
        name: user.name
      }
      createNotification(notification);
      addCommentLikeApi(temp).then(() => {
        getComments();
      })
    } else {
      deleteCommentLikeApi(temp).then(() => {
        getComments();
      })
    }
  }

  const likeAnswer = (x: any) => {
    let temp = {
      userId: user.user_id,
      commentId: x.commentA_id
    }
    if (x.likes.findIndex((x: any) => x.user_id == user.user_id) === -1) {
      let notification = {
        userId: x.comment_user_id ? x.comment_user_id : "",
        message: 'Alguien le dio like a tu comentario',
        type: 'like',
        notificationId: '',
        courseId: course.id,
        title: course.title,
        lesson: lesson,
        season: season,
        name: user.name
      }
      createNotification(notification);
      addCommentAnswerLikeApi(temp).then(() => {
        getComments();
      })
    } else {
      deleteCommentAnswerLikeApi(temp).then(() => {
        getComments();
      })
    }
  }

  const likeCommentAnswer = (x: any) => {
    let temp = {
      userId: user.user_id,
      commentId: x.commentToAnswer_id
    }
    if (x.likes.findIndex((x: any) => x.user_id == user.user_id) === -1) {
      let notification = {
        userId: x.comment_user_id ? x.comment_user_id : "",
        message: 'Alguien le dio like a tu comentario',
        type: 'like',
        notificationId: '',
        courseId: course.id,
        title: course.title,
        lesson: lesson,
        season: season,
        name: user.name
      }
      createNotification(notification);
      addCommentToAnswerLikeApi(temp).then(() => {
        getComments();
      })
    } else {
      deleteCommentToAnswerLikeApi(temp).then(() => {
        getComments();
      })
    }
  }

  const getDate = (tempDate: any) => {
    let date: any = new Date(tempDate);
    if (date == "Invalid Date") {
      date = new Date(tempDate.created_at).toLocaleDateString()
    } else {
      date = new Date(tempDate).toLocaleDateString();
    }
    return date;
  }

  const toggle = (index: number) => {
    responses.forEach((element: any, i: number) => {
      if (index == i) {
        responses[index] = !responses[index];
      } else {
        responses[i] = false;
      }
    });
    setResponses([...responses]);
    setAnswer("");
  }

  const toggleAnswers = (index: number) => {
    lastComments.forEach((element: any, i: number) => {
      if (index == i) {
        lastComments[index] = !lastComments[index];
      } else {
        lastComments[i] = false;
      }
    });
    setLastComments([...lastComments]);
    setAnswerComment("");
  }

  const answerQuestion = (x: any) => {
    let body: any;
    if (answer) {
      body = {
        userId: user.user_id ? user.user_id : "",
        comment: answer,
        commentId: x.comment_id,
        courseId: course.id
      }
      let notification = {
        userId: x.user_id ? x.user_id : "",
        message: 'Alguien te ha comentado',
        type: 'comment',
        notificationId: '',
        courseId: course.id,
        title: course.title,
        lesson: lesson,
        season: season,
        name: user.name
      }
      createNotification(notification);
      addCommentAnswerApi(body).then((res) => {
        getComments();
      })
    }
    if (answerComment) {
      body = {
        userId: user.user_id ? user.user_id : "",
        comment: answerComment,
        commentId: x.commentA_id,
        courseId: course.id
      }
      let notification = {
        userId: x.comment_user_id ? x.comment_user_id : "",
        message: 'Alguien te ha comentado',
        type: 'comment',
        notificationId: '',
        courseId: course.id,
        title: course.title,
        lesson: lesson,
        season: season,
        name: user.name
      }
      createNotification(notification);
      addCommentToAnswerApi(body).then((res) => {
        getComments();
      })
    }
  }

  return (
    <>
      <TitleContain >
        <ModuleTabs value={value} changeValue={changeValue} nextLesson={nextLesson} previousLesson={previousLesson} courseId={course.id} firstLesson={firstLesson} lastLesson={lastLesson} />
        <div className='line'></div>
      </TitleContain>
      <MainContainer>
        <CommentContain>
          <div className='comments-info'>
            <p className='title'>Preguntas y comentarios</p>
            <div className='line'></div>
            <p className='total'>Total de preguntas en este curso <span>({currentComments.length})</span></p>
          </div>
          <div className='comment'>
            <Profile
              src={DEFAULT_USER_IMG}
            />
            <div className='comment-contain'>
              <CommentInput value={comment} maxLength={255} placeholder="Escribe tus comentarios" onChange={(e: any) => {
                setComment(e.target.value)
              }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addLessonComment()
                  }
                }} />
              <p className='comment-limit'>
                {comment.length}/255
              </p>
            </div>

            {/* <Button style={{ color: !comment ? 'gray' : '#6717cd', 'borderColor': !comment ? 'gray' : '#6717cd' }} onClick={addLessonComment}>Comentar</Button> */}
          </div>
        </CommentContain>
        <div className='line-m'></div>
        {currentComments.map((x: any, index: any) => {
          return (
            <div className='comment-container' key={'comments-' + index}>
              <div className="top">
                {comments && x.photo
                  ?
                  <Profile src={x.photo} />
                  :
                  <Profile
                    src={DEFAULT_USER_IMG}
                  />}
                <p>{x.name} <span>{getDate(x.comment_created_at)}</span></p>
              </div>
              <div className='middle'>
                <p>{x.comment}</p>
              </div>
              <div className="bottom">
                <div className='left'>
                  <div className='new-comment'>
                    <div className='like' onClick={() => { like(x) }}>
                      {x.likes.findIndex((x: any) => x.user_id == user.user_id) !== -1 ? <FaHeart /> :
                        <FiHeart />}
                      <p>{x.likes.length}</p>
                    </div>
                    <button onClick={() => { toggle(index) }}>Responder</button>
                  </div>
                  {responses[index] && <div className='answer-input'>
                    {user.photoURL
                      ?
                      <Profile src={user.photo} />
                      :
                      <Profile
                        src={DEFAULT_USER_IMG}
                      />}
                    <div className='comment-contain'>
                      <input value={answer} className='answer' placeholder='Escribe tu respuesta' type="text" maxLength={255}
                        onChange={(e: any) => {
                          setAnswer(e.target.value)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            answerQuestion(x);
                          }
                        }} />
                      <p className='comment-limit'>
                        {answer.length}/255
                      </p>
                    </div>
                  </div>
                  }
                </div>
              </div>
              {x.answers.map((ans: any, idx: any) => {
                return (
                  <div className='answer-container' key={"Comments " + idx}>
                    <div className="top">
                      {ans.photo
                        ?
                        <Profile src={ans.photo} />
                        :
                        <Profile
                          src={DEFAULT_USER_IMG}
                        />}
                      <p>{ans.name} {ans.role === "admin" && <MdVerified />} <span>{getDate(ans.commentA_created_at)}</span></p>
                    </div>
                    <div className='middle'>
                      <p>{ans.comment}</p>
                    </div>
                    <div className="bottom">
                      <div className='left'>
                        <div className='new-comment'>
                          <div className='like' onClick={() => { likeAnswer(ans) }}>
                            {ans.likes.findIndex((x: any) => x.user_id == user.user_id) !== -1 ? <FaHeart /> :
                              <FiHeart />}
                            <p>{ans.likes.length}</p>
                          </div>
                          <button onClick={() => { toggleAnswers(idx) }}>Responder</button>
                        </div>
                        {lastComments[idx] && <div className='answer-input'>
                          {user.photoURL
                            ?
                            <Profile src={user.photo} />
                            :
                            <Profile
                              src={DEFAULT_USER_IMG}
                            />}
                          <div className='comment-contain'>
                            <input value={answerComment} className='answer' placeholder='Escribe tu respuesta' type="text"
                              onChange={(e: any) => {
                                setAnswerComment(e.target.value)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  answerQuestion(ans);
                                }
                              }} />
                            <p className='comment-limit'>
                              {answerComment.length}/255
                            </p>
                          </div>

                        </div>}
                      </div>
                    </div>
                    {ans.comments.map((answer_comment: any, idx: any) => {
                      return (
                        <div className='answer-container' key={"Comments " + idx}>
                          <div className="top">
                            {answer_comment.photo
                              ?
                              <Profile src={answer_comment.photo} />
                              :
                              <Profile
                                src={DEFAULT_USER_IMG}
                              />}
                            <p>{answer_comment.name} {answer_comment.role === "admin" && <MdVerified />} <span>{getDate(answer_comment.commentToAnswer_created_at)}</span></p>
                            <div className='like' onClick={() => { likeCommentAnswer(answer_comment) }}>
                              {answer_comment.likes.findIndex((x: any) => x.user_id == user.user_id) !== -1 ? <FaHeart /> :
                                <FiHeart />}
                              <p>{answer_comment.likes.length}</p>
                            </div>
                          </div>
                          <div className='middle'>
                            <p>{answer_comment.comment}</p>
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
      </MainContainer>
    </>
  )
}
export default Comments;