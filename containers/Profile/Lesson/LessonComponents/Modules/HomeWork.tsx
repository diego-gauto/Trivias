import React from 'react'
import { TaskTitle, TaskText, ButtonDiv, UploadButton, UploadIcon, HomeWorkContain } from './HomeWork.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'

const HomeWork = ({ value, setValue }: any) => {
  return (
    <>
      <TitleContain >
        <Titles onClick={() => {
          setValue(1)
        }}>
          Acerca de
        </Titles>
        <ListIcon onClick={() => {
          setValue(1)
        }} />
        <Titles onClick={() => {
          setValue(2)
        }}>
          Material Extra
        </Titles>
        <BookIcon onClick={() => {
          setValue(2)
        }} />
        <PositionTitle >
          Tareas
        </PositionTitle>
        <ChatboxIcon />
        <Titles onClick={() => {
          setValue(4)
        }}>
          Comentarios
        </Titles>
        <EaselIcon onClick={() => {
          setValue(4)
        }} />
      </TitleContain>
      <IconContain>
        <UnSelected>
          <ListIcon onClick={() => {
            setValue(1)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
        <SelectContain>
          <BookIcon />
        </SelectContain>
        <UnSelected>
          <ChatboxIcon onClick={() => {
            setValue(4)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
        <UnSelected>
          <EaselIcon onClick={() => {
            setValue(2)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
      </IconContain>
      <HomeWorkContain>
        <TaskTitle>
          Tarea 23: Intro a uñas francesas
        </TaskTitle>
        <TaskText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum purus sed at euismod. Sagittis, lacus donec massa feugiat urna, orci maecenas leo condimentum. Et id sed est justo sem. A phasellus nunc lobortis blandit nam vitae. Tristique pellentesque pulvinar in integer suspendisse tristique ut tortor malesuada.
          <br />
          <br />
          Velit vel, erat pellentesque ut diam. Lorem adipiscing pharetra viverra vestibulum non. Fringilla tellus mauris, mollis lorem eu. Scelerisque tempus metus lectus vulputate integer auctor ullamcorper sit.
          <br />
          <br />
          Orci, ante quis semper varius imperdiet et. Ipsum arcu quis condimentum massa, quam eget amet molestie imperdiet. Nulla aenean auctor rhoncus vulputate neque. Aliquam nunc tristique convallis tortor luctus orci, faucibus ut senectus. Imperdiet viverra sit venenatis curabitur nunc odio ultricies aliquam. In ipsum tincidunt mauris est interdum.
        </TaskText>
        <ButtonDiv>
          <UploadButton>
            Subir tarea
            <UploadIcon />
          </UploadButton>
        </ButtonDiv>
      </HomeWorkContain>
    </>

  )
}
export default HomeWork;