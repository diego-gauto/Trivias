import React, { useEffect, useRef, useState } from 'react';

import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import {
  CommentContain,
  CommentInput,
  MainContainer,
  Profile,
} from './Comments.styled';
import router from 'next/router';
import {
  addCommentAnswerApi,
  addCommentAnswerLikeApi,
  addCommentApi,
  addCommentLikeApi,
  addCommentToAnswerApi,
  addCommentToAnswerLikeApi,
  deleteCommentAnswerLikeApi,
  deleteCommentLikeApi,
  deleteCommentToAnswerLikeApi,
  retrieveComments,
} from '../../../../../../components/api/lessons';
import { useAuth } from '../../../../../../hooks/useAuth';
import { DEFAULT_USER_IMG } from '../../../../../../constants/paths';
import { createNotification } from '../../../../../../components/api/notifications';

export interface Comment {
  answers: Answer[];
  comment: string;
  comment_created_at: string;
  comment_id: number;
  lessons_id: number;
  likes: CommentLike[];
  name: string;
  photo: string;
  user_id: number;
}

export interface CommentLike {
  id: number;
  user_id: number;
  comments_id: number;
}

export interface Answer {
  commentA_id: number;
  comment: string;
  commentA_created_at: string;
  name: string;
  photo: string;
  role: string;
  comment_user_id: number;
  likes: AnswerLike[];
  comments: FinalComment[];
}

export interface AnswerLike {
  id: number;
  comment_user_id: number;
  comment_answers_id: number;
  comment: string;
  created_at: string;
  comments_id: number;
  user_id: number;
  course_id: number;
}

export interface FinalComment {
  commentToAnswer_id: number;
  comment: string;
  commentToAnswer_created_at: string;
  name: string;
  photo: string;
  role: string;
  comment_user_id: number;
  likes: FinalCommentLike[];
}

export interface FinalCommentLike {
  id: number;
  comment_user_id: number;
  comment_answer_comment_id: number;
  comment: string;
  comment_answers_id: number;
  user_id: number;
  created_at: string;
}

export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
  photo: string;
  score: number;
  stripe_id: string;
  provider: string;
  created_at: string;
  past_user: string;
  subscription: number;
  last_sign_in: string;
  country: string;
  conekta_id: string;
  terms: number;
  come_from: string;
  origin_state: any;
  user_id: number;
  final_date: number;
  level: number;
  method: any;
  payment_method: any;
  plan_id: any;
  plan_name: any;
  start_date: number;
  type: any;
}

interface IComments {
  course: any;
  lesson: any;
}
const Comments = (props: IComments) => {
  const { course, lesson } = props;
  const [currentComments, setCurrentComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerComment, setAnswerComment] = useState('');
  const [responses, setResponses] = useState<any>([]);
  const [lastComments, setLastComments] = useState<any>([]);
  const context = useAuth();
  const user = context.user as User;

  const addLessonComment = () => {
    let body: any;
    if (comment) {
      body = {
        userId: user.user_id ? user.user_id : '',
        comment: comment,
        lessonId: lesson.id,
        courseId: course.id,
      };
      addCommentApi(body).then((res) => {
        setComment('');
        getComments();
      });
    }
  };

  useEffect(() => {
    if (lesson) {
      getComments();
    }
  }, [lesson]);

  const getComments = () => {
    let temp: any = [];
    let tempComments: any = [];
    retrieveComments(lesson.id).then((res) => {
      res.data.data.forEach((element: any, i: number) => {
        temp.push(false);
        tempComments.push([]);
        element.answers.forEach((ca: any) => {
          tempComments[i].push(false);
        });
      });
      setResponses(temp);
      setLastComments(tempComments);
      setCurrentComments(res.data.data);
      generateHrefClickEvent(res.data.data);
    });
  };

  const generateHrefClickEvent = (comments: any) => {
    const array = getCommentsByUserId(user.user_id, comments);

    const pendingCommentFocusData = localStorage.getItem(
      'pending-comment-focus',
    );
    if (pendingCommentFocusData == null) {
      return;
    }
    const focusData = JSON.parse(pendingCommentFocusData);
    localStorage.removeItem('pending-comment-focus');
    let commentResult: any = undefined;
    if (focusData.is_like || focusData.is_comment) {
      if (focusData.is_like) {
        commentResult = array.find((element) =>
          element.like_user_ids.includes(focusData.other_user_id),
        );
      } else {
        commentResult = array.find(
          (element) => element.user_id === focusData.other_user_id,
        );
      }

      if (!commentResult) {
        return;
      }
      setTimeout(() => {
        createAElementAndClick(user.user_id, commentResult.id);
      }, 1000);
    }
  };

  const getCommentsByUserId = (userId: number, currentComments: Comment[]) => {
    // comment-${comment.user_id}
    // id={`comment-${comment.user_id}-${comment.comment_id}`}
    console.log({ currentComments });
    const commentsOfUser = currentComments.map(
      ({ comment_id, user_id, likes }) => {
        return {
          id: comment_id,
          user_id: user_id,
          like_user_ids: [...likes.map((l) => l.user_id)],
        };
      },
    );
    return commentsOfUser.filter((c) => c.user_id === userId);
  };

  const createAElementAndClick = (userId: number, commentId: number) => {
    const a = document.createElement('a');
    // id={`comment-${comment.user_id}-${comment.comment_id}`}
    a.setAttribute('href', `#comment-${userId}-${commentId}`);
    a.click();
  };

  const like = (comment: Comment) => {
    if (comment.user_id === user.user_id) {
      return;
    }
    let temp = {
      userId: user.user_id,
      commentId: comment.comment_id,
    };
    if (
      comment.likes.findIndex(
        (commentLike) => commentLike.user_id == user.user_id,
      ) === -1
    ) {
      let notification = {
        userId: comment.user_id,
        type: '4',
        notificationId: '',
        courseId: course.id,
        lesson: router.query.lesson,
        season: router.query.season,
        userLikeId: user.user_id,
      };

      createNotification(notification);
      addCommentLikeApi(temp).then(() => {
        getComments();
      });
    } else {
      deleteCommentLikeApi(temp).then(() => {
        getComments();
      });
    }
  };

  const likeAnswer = (answer: Answer) => {
    if (answer.comment_user_id === user.user_id) {
      return;
    }

    let temp = {
      userId: user.user_id,
      commentId: answer.commentA_id,
    };

    if (
      answer.likes.findIndex(
        (answerLike) => answerLike.comment_user_id == user.user_id,
      ) === -1
    ) {
      let notification = {
        userId: answer.comment_user_id,
        type: '4',
        notificationId: '',
        courseId: course.id,
        lesson: router.query.lesson,
        season: router.query.season,
        userLikeId: user.user_id,
      };

      createNotification(notification);
      addCommentAnswerLikeApi(temp).then(() => {
        getComments();
      });
    } else {
      deleteCommentAnswerLikeApi(temp).then((res) => {
        getComments();
      });
    }
  };

  const likeCommentAnswer = (comment: FinalComment) => {
    if (comment.comment_user_id === user.user_id) {
      return;
    }

    let temp = {
      userId: user.user_id,
      commentId: comment.commentToAnswer_id,
    };
    if (
      comment.likes.findIndex((x: any) => x.comment_user_id == user.user_id) ===
      -1
    ) {
      let notification = {
        userId: comment.comment_user_id,
        type: '4',
        notificationId: '',
        courseId: course.id,
        lesson: router.query.lesson,
        season: router.query.season,
        userLikeId: user.user_id,
      };
      createNotification(notification);
      addCommentToAnswerLikeApi(temp).then(() => {
        getComments();
      });
    } else {
      deleteCommentToAnswerLikeApi(temp).then(() => {
        getComments();
      });
    }
  };

  const getDate = (tempDate: any) => {
    let date: any = new Date(tempDate);
    if (date == 'Invalid Date') {
      date = new Date(tempDate.created_at).toLocaleDateString();
    } else {
      date = new Date(tempDate).toLocaleDateString();
    }
    return date;
  };

  const toggle = (index: number) => {
    responses.forEach((element: any, i: number) => {
      if (index == i) {
        responses[index] = !responses[index];
      } else {
        responses[i] = false;
      }
    });
    setResponses([...responses]);
    setAnswer('');
  };

  const toggleAnswers = (index: number, idxC: number) => {
    lastComments.forEach((element: any, i: number) => {
      if (index == i) {
        element.forEach((el: any, idx: number) => {
          if (idxC === idx) {
            element[idx] = !element[idx];
          } else {
            element[idx] = false;
          }
        });
      } else {
        element.forEach((el: any, idx: number) => {
          element[idx] = false;
        });
      }
    });
    setLastComments([...lastComments]);
    setAnswerComment('');
  };

  const answerQuestion = (x: any) => {
    let body: any;
    if (answer) {
      body = {
        userId: user.user_id ? user.user_id : '',
        comment: answer,
        commentId: x.comment_id,
        courseId: course.id,
      };
      let notification = {
        userId: x.user_id,
        type: '3',
        notificationId: '',
        courseId: course.id,
        lesson: router.query.lesson,
        season: router.query.season,
        userCommentId: user.user_id,
      };
      createNotification(notification);
      addCommentAnswerApi(body).then((res) => {
        getComments();
      });
    }
    if (answerComment) {
      body = {
        userId: user.user_id ? user.user_id : '',
        comment: answerComment,
        commentId: x.commentA_id,
        courseId: course.id,
      };
      let notification = {
        userId: x.user_id,
        type: '3',
        notificationId: '',
        courseId: course.id,
        lesson: router.query.lesson,
        season: router.query.season,
        userCommentId: user.user_id,
      };
      createNotification(notification);
      addCommentToAnswerApi(body).then((res) => {
        getComments();
      });
    }
  };

  return (
    <>
      <MainContainer>
        <CommentContain>
          <div className='comments-info'>
            <p className='title'>Preguntas y comentarios</p>
            <div className='line'></div>
            <p className='total'>
              Total de preguntas en este curso{' '}
              <span>({currentComments.length})</span>
            </p>
          </div>
          <p className='regular-text'>
            En esta sección puedes realizar comentarios, preguntas o sugerencias
            relacionadas a esta clase.
          </p>
          <div className='comment'>
            <Profile src={user.photo ? user.photo : DEFAULT_USER_IMG} />
            <div className='comment-contain'>
              <CommentInput
                value={comment}
                maxLength={255}
                placeholder='Escribe tus comentarios'
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addLessonComment();
                  }
                }}
              />
              <p className='comment-limit'>{comment.length}/255</p>
            </div>
          </div>
        </CommentContain>
        <div className='line-m'></div>
        {currentComments.map((comment, index) => {
          return (
            <div
              className='comment-container'
              key={`comment-${comment.comment_id}`}
              id={`comment-${comment.user_id}-${comment.comment_id}`}
            // comment-${comment.user_id}-${comment.comment_id}
            >
              <div className='top'>
                <Profile
                  src={comment.photo ? comment.photo : DEFAULT_USER_IMG}
                />
                <p>
                  {comment.name}{' '}
                  <span>{getDate(comment.comment_created_at)}</span>
                </p>
              </div>
              <div className='middle'>
                <p>{comment.comment}</p>
              </div>
              <div className='bottom'>
                <div className='left'>
                  <div className='new-comment'>
                    <div
                      className='like'
                      onClick={() => {
                        like(comment);
                      }}
                    >
                      {comment.likes.findIndex(
                        (x) => x.user_id == user.user_id,
                      ) !== -1 ? (
                        <FaHeart />
                      ) : (
                        <FiHeart />
                      )}
                      <p>{comment.likes.length}</p>
                    </div>
                    <button
                      onClick={() => {
                        toggle(index);
                      }}
                    >
                      Responder
                    </button>
                  </div>
                  {responses[index] && (
                    <div className='answer-input'>
                      <Profile
                        src={user.photo ? user.photo : DEFAULT_USER_IMG}
                      />
                      <div className='comment-contain'>
                        <input
                          value={answer}
                          className='answer'
                          placeholder='Escribe tu respuesta'
                          type='text'
                          maxLength={255}
                          onChange={(e) => {
                            setAnswer(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              answerQuestion(comment);
                            }
                          }}
                        />
                        <p className='comment-limit'>{answer.length}/255</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {comment.answers.map((answer, idx) => {
                return (
                  <div
                    className='answer-container'
                    key={'Comments ' + idx}
                    id={`answer-${answer.comment_user_id}-${answer.commentA_id}`}
                  >
                    <div className='top'>
                      <Profile
                        src={answer.photo ? answer.photo : DEFAULT_USER_IMG}
                      />
                      <p>
                        {answer.name}{' '}
                        {answer.role === 'admin' && <MdVerified />}{' '}
                        <span>{getDate(answer.commentA_created_at)}</span>
                      </p>
                    </div>
                    <div className='middle'>
                      <p>{answer.comment}</p>
                    </div>
                    <div className='bottom'>
                      <div className='left'>
                        <div className='new-comment'>
                          <div
                            className='like'
                            onClick={() => {
                              likeAnswer(answer);
                            }}
                          >
                            {answer.likes.findIndex(
                              (x) => x.comment_user_id == user.user_id,
                            ) !== -1 ? (
                              <FaHeart />
                            ) : (
                              <FiHeart />
                            )}
                            <p>{answer.likes.length}</p>
                          </div>
                          <button
                            onClick={() => {
                              toggleAnswers(index, idx);
                            }}
                          >
                            Responder
                          </button>
                        </div>
                        {lastComments[index][idx] && (
                          <div className='answer-input'>
                            <Profile
                              src={user.photo ? user.photo : DEFAULT_USER_IMG}
                            />
                            <div className='comment-contain'>
                              <input
                                value={answerComment}
                                className='answer'
                                placeholder='Escribe tu respuesta'
                                type='text'
                                onChange={(e) => {
                                  setAnswerComment(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    answerQuestion(answer);
                                  }
                                }}
                              />
                              <p className='comment-limit'>
                                {answerComment.length}/255
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {answer.comments.map((answer_comment, idx) => {
                      return (
                        <div
                          className='answer-container'
                          key={'Comments ' + idx}
                          id={`lastanswer-${answer_comment.comment_user_id}-${answer_comment.commentToAnswer_id}`}
                        // `answer-${answer.comment_user_id}-${answer.commentA_id}`
                        >
                          <div className='top'>
                            <Profile
                              src={
                                answer_comment.photo
                                  ? answer_comment.photo
                                  : DEFAULT_USER_IMG
                              }
                            />
                            <p>
                              {answer_comment.name}{' '}
                              {answer_comment.role === 'admin' && (
                                <MdVerified />
                              )}{' '}
                              <span>
                                {getDate(
                                  answer_comment.commentToAnswer_created_at,
                                )}
                              </span>
                            </p>
                            <div
                              className='like'
                              onClick={() => {
                                likeCommentAnswer(answer_comment);
                              }}
                            >
                              {answer_comment.likes.findIndex(
                                (x) => x.comment_user_id == user.user_id,
                              ) !== -1 ? (
                                <FaHeart />
                              ) : (
                                <FiHeart />
                              )}
                              <p>{answer_comment.likes.length}</p>
                            </div>
                          </div>
                          <div className='middle'>
                            <p>{answer_comment.comment}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </MainContainer>
    </>
  );
};
export default Comments;
