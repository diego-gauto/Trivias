import React from 'react'
import { DownloadText, DownlowadContain, ExtraContain, FileIcon, Paragraph, Weight } from './Extra.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'

const Extra = ({ value, setValue }: any) => {
  return (
    <>
      <TitleContain >
        <Titles onClick={() => {
          setValue(1)
        }}>
          Acerca de
        </Titles>
        <PositionTitle >
          Material Extra
        </PositionTitle>
        <Titles onClick={() => {
          setValue(3)
        }}>
          Tareas
        </Titles>
        <Titles onClick={() => {
          setValue(4)
        }}>
          Comentarios
        </Titles>
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
        <UnSelected>
          <ChatboxIcon onClick={() => {
            setValue(4)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
        <SelectContain>
          <EaselIcon />
        </SelectContain>
      </IconContain>
      <ExtraContain>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Pharetra, cursus sapien ac magna. Consectetur amet eu
          tincidunt quis. Non habitasse viverra malesuada facilisi
          vel nunc.
        </Paragraph>
        <DownlowadContain>
          <DownloadText>
            <FileIcon />
            Fotos_ejemplos.png
          </DownloadText>
          <Weight>
            3.1 MB
          </Weight>
        </DownlowadContain>

      </ExtraContain>
    </>
  )
}
export default Extra;