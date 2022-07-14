import React from 'react'
import { DownloadText, DownlowadContain, ExtraContain, FileIcon, Paragraph, Weight } from './Extra.styled'
import { TitleContain, PositionTitle, Titles } from './Module.styled'

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
      <ExtraContain>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra, cursus sapien ac magna. Consectetur amet eu tincidunt quis. Non habitasse viverra malesuada facilisi vel nunc.
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