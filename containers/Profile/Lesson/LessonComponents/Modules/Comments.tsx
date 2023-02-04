import React, { useEffect, useState } from 'react'
import { DEFAULT_USER_IMG } from '../../../../../constants/paths'
import { addComment, updateComment } from '../../../../../store/actions/courseActions'
import { Button, Comment, CommentContain, CommentInput, MainContainer, Profile } from './Comments.styled'
import { TitleContain, PositionTitle, Titles } from './Module.styled'
import { FiHeart } from 'react-icons/fi';
import { BsPlayBtn } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { TfiCommentAlt } from 'react-icons/tfi';
import { FaHeart } from 'react-icons/fa'
const Comments = ({ value, setValue, user, data, comments }: any) => {

  const [currentComments, setCurrentComments] = useState<any>(comments);
  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState("");
  const [responses, setResponses] = useState<any>([]);

  const addLessonComment = () => {
    let temp_comments: any = currentComments;
    let body: any;
    if (comment) {
      if (user) {
        body = {
          createdAt: new Date(),
          userName: user.name,
          userEmail: user.email,
          userPhoto: user.photoURL,
          courseId: data.courseId,
          seasonId: data.seasonId,
          lessonId: data.id,
          comment: comment,
          likes: [],
          answers: []
        }
      } else {
        body = {
          createdAt: new Date(),
          userName: 'local',
          userEmail: 'user@local.com',
          userPhoto: '',
          courseId: data.courseId,
          seasonId: data.seasonId,
          lessonId: data.id,
          comment: comment
        }
      }
      addComment(body).then(() => {
        temp_comments.unshift(body);
        setCurrentComments([...temp_comments]);
        setComment("");
      })
    }
  }
  useEffect(() => {
    if (comments) {
      setCurrentComments(comments);
    }
  }, [comments])

  useEffect(() => {
    let tempResponses: any = [];
    comments.forEach((element: any) => {
      tempResponses.push(false);
    });
    setResponses(tempResponses)
  }, [comment])

  const like = (index: number) => {
    if (comments[index].likes.includes(user.id)) {
      const idx = comments[index].likes.indexOf(user.id);
      if (idx > -1) { // only splice array when item is found
        comments[index].likes.splice(idx, 1); // 2nd parameter means remove one item only
      }
    } else {
      comments[index].likes.push(user.id)
    }
    updateComment(comments[index]);
    setCurrentComments([...comments]);
  }

  const likeAnswer = (idxC: number, idxA: number) => {
    if (comments[idxC].answers[idxA].likes.includes(user.id)) {
      const idx = comments[idxC].answers[idxA].likes.indexOf(user.id);
      if (idx > -1) { // only splice array when item is found
        comments[idxC].answers[idxA].likes.splice(idx, 1); // 2nd parameter means remove one item only
      }
    } else {
      comments[idxC].answers[idxA].likes.push(user.id)
    }
    updateComment(comments[idxC]);
    setCurrentComments([...comments]);
  }

  const getDate = (tempDate: any) => {
    let date: any = new Date(tempDate);
    if (date == "Invalid Date") {
      date = new Date(tempDate.seconds * 1000).toLocaleDateString()
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

  const answerQuestion = (index: number) => {
    let tempAnswer = {
      comment: answer,
      createdAt: new Date(),
      likes: [],
      userName: user.name,
      userEmail: user.email,
      userPhoto: user.photoURL || DEFAULT_USER_IMG,
    }
    comments[index].answers.push(tempAnswer)
    updateComment(comments[index]).then(() => {
      toggle(index)
    });
  }
  return (
    <>
      <TitleContain >
        <Titles onClick={() => {
          setValue(1)
        }}>
          <BsPlayBtn></BsPlayBtn>
          Acerca del curso
        </Titles>
        {<Titles onClick={() => {
          setValue(3)
        }}>
          <SlNotebook></SlNotebook>
          Evaluación
        </Titles>}
        <PositionTitle position={value}>
          <TfiCommentAlt></TfiCommentAlt>
          Comentarios
        </PositionTitle>
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
            {comments && user.photoURL
              ?
              <Profile src={user.photoURL} />
              :
              <Profile
                src={DEFAULT_USER_IMG}
              />}
            <CommentInput value={comment} placeholder="Escribe tus comentarios" onChange={(e: any) => {
              setComment(e.target.value)
            }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addLessonComment()
                }
              }} />
            {/* <Button style={{ color: !comment ? 'gray' : '#6717cd', 'borderColor': !comment ? 'gray' : '#6717cd' }} onClick={addLessonComment}>Comentar</Button> */}
          </div>
        </CommentContain>
        <div className='line-m'></div>
        {currentComments.map((x: any, index: any) => {
          return (
            <div className='comment-container' key={'comments-' + index}>
              <div className="top">
                {comments && x.userPhoto
                  ?
                  <Profile src={x.userPhoto} />
                  :
                  <Profile
                    src={DEFAULT_USER_IMG}
                  />}
                <p>{x.userName} <span>{getDate(x.createdAt)}</span></p>
              </div>
              <div className='middle'>
                <p>{x.comment}</p>
              </div>
              <div className="bottom">
                <div className='left'>
                  <div className='like' onClick={() => { like(index) }}>
                    {comments[index]?.likes.includes(user.id) ? <FaHeart /> :
                      <FiHeart />}
                    <p>{x.likes.length}</p>
                  </div>
                  <button onClick={() => { toggle(index) }}>Responder</button>
                  {responses[index] && <div className='answer-input'>
                    {user.photoURL
                      ?
                      <Profile src={user.photoURL} />
                      :
                      <Profile
                        src={DEFAULT_USER_IMG}
                      />}
                    <input value={answer} className='answer' placeholder='Escribe tu respuesta' type="text"
                      onChange={(e: any) => {
                        setAnswer(e.target.value)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          answerQuestion(index);
                        }
                      }} /></div>}
                </div>
              </div>
              {x.answers.map((ans: any, idx: any) => {
                return (
                  <div className='answer-container' key={"Comments " + idx}>
                    <div className="top">
                      {ans.userPhoto
                        ?
                        <Profile src={ans.userPhoto} />
                        :
                        <Profile
                          src={DEFAULT_USER_IMG}
                        />}
                      <p>{ans.userName} <span>{getDate(ans.createdAt)}</span></p>
                      <div className='like' onClick={() => { likeAnswer(index, idx) }}>
                        {comments[index]?.answers[idx]?.likes.includes(user.id) ? <FaHeart /> :
                          <FiHeart />}
                        <p>{ans.likes.length}</p>
                      </div>
                    </div>
                    <div className='middle'>
                      <p>{ans.comment}</p>
                    </div>
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