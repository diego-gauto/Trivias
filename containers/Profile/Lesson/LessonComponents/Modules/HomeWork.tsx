import React from 'react'
import { TaskTitle, TaskText, ButtonDiv, UploadButton, UploadIcon, HomeWorkContain } from './HomeWork.styled'
import { TitleContain, PositionTitle, Titles } from './Module.styled'

const HomeWork = ({ value, setValue }: any) => {
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
        <PositionTitle >
          Tareas
        </PositionTitle>
        <Titles onClick={() => {
          setValue(4)
        }}>
          Comentarios
        </Titles>
      </TitleContain>
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