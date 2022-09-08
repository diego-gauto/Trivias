import React, { useEffect, useState } from 'react'
import { DEFAULT_USER_IMG } from '../../../../../constants/paths'
import { addComment } from '../../../../../store/actions/courseActions'
import { Comment, CommentContain, CommentInput, CommentText, MainContainer, Pp1, Pp2, Pp3, Profile } from './Comments.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'
const Comments = ({ value, setValue, user, data, comments }: any) => {

  const [currentComments, setCurrentComments] = useState<any>(comments);

  const addLessonComment = (e: any) => {
    let temp_comments: any = currentComments;
    let body: any;
    if (e.code == "Enter") {
      if (user) {
        body = {
          createdAt: new Date(),
          userName: user.name,
          userEmail: user.email,
          userPhoto: user.photoURL,
          courseId: data.courseId,
          seasonId: data.seasonId,
          lessonId: data.id,
          comment: e.target.value
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
          comment: e.target.value
        }
      }
      addComment(body).then(() => {
        alert('Gracias por tus comentarios!');
        temp_comments.unshift(body);
        setCurrentComments([...temp_comments]);
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
          Acerca de
        </Titles>

        <Titles onClick={() => {
          setValue(2)
        }}>
          Material Extra
        </Titles>

        <Titles onClick={() => {
          setValue(3)
        }}>
          Tareas
        </Titles>

        <PositionTitle>
          Comentarios
        </PositionTitle>

      </TitleContain>
      <IconContain>
        <UnSelected>
          <ListIcon onClick={() => {
            setValue(1)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
        <UnSelected>
          <BookIcon onClick={() => {
            setValue(3)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
        <SelectContain>
          <ChatboxIcon />
        </SelectContain>
        <UnSelected>
          <EaselIcon
            onClick={() => {
              setValue(2)
            }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
      </IconContain>
      <MainContainer>
        <CommentContain>
          <Pp1 />
          <CommentInput placeholder="¿Qué quieres decir?" onKeyDown={(e: any) => {
            addLessonComment(e)
          }} />
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