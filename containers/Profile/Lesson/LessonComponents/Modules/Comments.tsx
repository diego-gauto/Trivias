import React, { useEffect, useState } from 'react'
import { DEFAULT_USER_IMG } from '../../../../../constants/paths'
import { addComment } from '../../../../../store/actions/courseActions'
import { Button, Comment, CommentContain, CommentInput, MainContainer, Profile } from './Comments.styled'
import { TitleContain, PositionTitle, Titles } from './Module.styled'
import { FiHeart } from 'react-icons/fi';
import { BsPlayBtn } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { TfiCommentAlt } from 'react-icons/tfi';

const Comments = ({ value, setValue, user, data, comments }: any) => {

  const [currentComments, setCurrentComments] = useState<any>(comments);
  const [comment, setComment] = useState("");

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
          comment: comment
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
            {comments && user.userPhoto
              ?
              <Profile src={user.userPhoto} />
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
                <p>{x.userName} <span>Hace 2 semanas</span></p>
              </div>
              <div className='middle'>
                <p>{x.comment}</p>
              </div>
              <div className="bottom">
                <div className='left'>
                  <div className='like'>
                    <FiHeart />
                    <p>21</p>
                  </div>
                  <button>Responder</button>
                </div>
                <button className='report'>Reportar</button>
              </div>
            </div>
          )
        })}
      </MainContainer>
    </>
  )
}
export default Comments;