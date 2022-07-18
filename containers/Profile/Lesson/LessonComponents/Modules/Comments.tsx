import React from 'react'
import { Comment, CommentContain, CommentInput, CommentText, MainContainer, Pp1, Pp2, Pp3 } from './Comments.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'

const Comments = ({ value, setValue }: any) => {
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
          <CommentInput placeholder="¿Qué quieres decir?" />
        </CommentContain>
        <CommentContain>
          <Pp1 />
          <CommentText>
            <Comment>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat cras pulvinar in est gravida. Placerat elementum vitae pharetra eget dictum suspendisse tortor tellus. A egestas nisl erat amet ut cursus nullam sed. Faucibus tincidunt magna consectetur condimentum odio mauris.
            </Comment>
          </CommentText>
        </CommentContain>
        <CommentContain>
          <Pp3 />
          <CommentText>
            <Comment>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat cras pulvinar in est gravida. Placerat elementum vitae pharetra eget dictum suspendisse tortor tellus. A egestas nisl erat amet ut cursus nullam sed.
            </Comment>
          </CommentText>
        </CommentContain>
        <CommentContain>
          <Pp2 />
          <CommentText>
            <Comment>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat cras pulvinar in est gravida. Placerat elementum vitae pharetra eget dictum suspendisse tortor tellus. A egestas nisl erat amet ut cursus nullam sed. Faucibus tincidunt magna consectetur condimentum odio mauris.
            </Comment>
          </CommentText>
        </CommentContain>
      </MainContainer>

    </>
  )
}
export default Comments;