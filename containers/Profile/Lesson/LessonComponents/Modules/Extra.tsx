import React from 'react'
import { DownloadText, DownlowadContain, ExtraContain, FileIcon, Paragraph, Weight } from './Extra.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'
import Link from 'next/link';

const Extra = ({ value, setValue, data }: any) => {

  return (
    <>
      <TitleContain >
        <Titles onClick={() => {
          setValue(1)
        }}>
          Acerca de
        </Titles>
        <PositionTitle position={value}>
          Material Extra
        </PositionTitle>
        {data.homeworkAvailable && <Titles onClick={() => {
          setValue(3)
        }}>
          Tareas
        </Titles>}
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
        {data.extra.map((extra: any) => {
          return (
            <Link href={extra.path}>
              <a target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
                <DownlowadContain>
                  <DownloadText>
                    <FileIcon />
                    {extra.title}
                  </DownloadText>
                  <Weight>
                    3.1 MB
                  </Weight>
                </DownlowadContain>
              </a>
            </Link>
          )
        })}

      </ExtraContain>
    </>
  )
}
export default Extra;