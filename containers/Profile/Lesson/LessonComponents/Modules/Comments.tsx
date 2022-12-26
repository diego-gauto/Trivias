import React, { useEffect, useState } from 'react'
import { DEFAULT_USER_IMG } from '../../../../../constants/paths'
import { addComment } from '../../../../../store/actions/courseActions'
import { Button, Comment, CommentContain, CommentInput, CommentText, MainContainer, Pp1, Pp2, Pp3, Profile } from './Comments.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'
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
          Acerca del curso
        </Titles>
        {<Titles onClick={() => {
          setValue(3)
        }}>
          Materiales y tareas
        </Titles>}
        <PositionTitle position={value}>
          Comentarios
        </PositionTitle>
        <div className='line'></div>
      </TitleContain>
      <MainContainer>
        <CommentContain>
          {comments && user.userPhoto
            ?
            <Profile src={user.userPhoto} />
            :
            <Profile
              src={DEFAULT_USER_IMG}
            />}
          <CommentInput value={comment} placeholder="¿Qué quieres decir?" onChange={(e: any) => {
            setComment(e.target.value)
          }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addLessonComment()
              }
            }} />
          <Button style={{ color: !comment ? 'gray' : '#6717cd', 'borderColor': !comment ? 'gray' : '#6717cd' }} onClick={addLessonComment}>Comentar</Button>
        </CommentContain>
        {currentComments.map((x: any, index: any) => {
          return (
            <CommentContain key={'comments-' + index}>
              {comments && x.userPhoto
                ?
                <Profile src={x.userPhoto} />
                :
                <Profile
                  src={DEFAULT_USER_IMG}
                />}
              <CommentText>
                <Comment>
                  {x.comment}
                </Comment>
              </CommentText>
            </CommentContain>
          )
        })}
      </MainContainer>
    </>
  )
}
export default Comments;