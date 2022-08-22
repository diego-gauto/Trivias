import React, { useState } from "react";

import Link from "next/link";

import { MainContainer } from "../AllCourses.styled";
import Delete from "./Delete/Delete";
import { TrashIcon } from "./Edit.styled";
import {
  Add,
  Button,
  ButtonContain,
  ChevD,
  ChevU,
  Demo1,
  EditEpisode,
  Episode,
  EpisodesContain,
  EpisodesNumber,
  EpisodeContain,
  EpisodeInfo,
  EpisodeTime,
  EpisodeTitle,
  SeasonContain,
  Title,
  TitleContain,
} from "./Lessons.styled";

interface IAllSeasons {
  documentID: string,
  index: number,
  courseID: string
}

export const AllSeasons = (props: IAllSeasons) => {
  const { documentID } = props;
  const { index } = props;
  const { courseID } = props;
  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);
  const [openSeason, setOpenSeason] = useState(0);

  return (
    <><MainContainer>
      <SeasonContain>
        <TitleContain>
          <Title>
            Temporada {index + 1}
            {openSeason != 1 &&
              <EpisodesNumber>4 episodios</EpisodesNumber>}
          </Title>
          <ButtonContain>
            {openSeason == 1 &&
              <>
                <Link href="/admin/NewLesson">
                  <Button>Añadir Lección <Add /></Button>
                </Link>
                <Button onClick={() => { setShow(true), setDeleteMessage(2) }}>Eliminar temporada <TrashIcon /></Button>
                <ChevU onClick={() => { setOpenSeason(0); }} />
              </>}
            {openSeason != 1 &&
              <ChevD onClick={() => { setOpenSeason(1); }} />}
          </ButtonContain>
        </TitleContain>
        {openSeason == 1 &&
          <EpisodesContain>
            <Episode>
              <Demo1 />
              <EpisodeContain>
                <EpisodeTitle>Epidosio 1: Lorem Ipsum</EpisodeTitle>
                <EpisodeTime>24 minutos</EpisodeTime>
                <EpisodeInfo>Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Risus nisi, sit vel cursus ac elementum,
                  et porta. Imperdiet nullam facilisis vestibulum quis
                  gravida sed aliquet consectetur orci. Netus egestas gravida
                  mollis vitae pellentesque id nisl nunc.</EpisodeInfo>
                <Link href="/admin/EditLesson">
                  <EditEpisode>Editar Lección</EditEpisode>
                </Link>
              </EpisodeContain>
            </Episode>
            <Episode>
              <Demo1 />
              <EpisodeContain>
                <EpisodeTitle>Epidosio 2: Lorem Ipsum</EpisodeTitle>
                <EpisodeTime>31 minutos</EpisodeTime>
                <EpisodeInfo>Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Risus nisi, sit vel cursus ac elementum,
                  et porta. Imperdiet nullam facilisis vestibulum quis
                  gravida sed aliquet consectetur orci. Netus egestas gravida
                  mollis vitae pellentesque id nisl nunc.</EpisodeInfo>
                <EditEpisode>Editar Lección</EditEpisode>
              </EpisodeContain>
            </Episode>
            <Episode>
              <Demo1 />
              <EpisodeContain>
                <EpisodeTitle>Epidosio 3: Lorem Ipsum</EpisodeTitle>
                <EpisodeTime>12 minutos</EpisodeTime>
                <EpisodeInfo>Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Risus nisi, sit vel cursus ac elementum,
                  et porta. Imperdiet nullam facilisis vestibulum quis
                  gravida sed aliquet consectetur orci. Netus egestas gravida
                  mollis vitae pellentesque id nisl nunc.</EpisodeInfo>
                <EditEpisode>Editar Lección</EditEpisode>
              </EpisodeContain>
            </Episode>
            <Episode>
              <Demo1 />
              <EpisodeContain>
                <EpisodeTitle>Epidosio 4: Lorem Ipsum</EpisodeTitle>
                <EpisodeTime>25 minutos</EpisodeTime>
                <EpisodeInfo>Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Risus nisi, sit vel cursus ac elementum,
                  et porta. Imperdiet nullam facilisis vestibulum quis
                  gravida sed aliquet consectetur orci. Netus egestas gravida
                  mollis vitae pellentesque id nisl nunc.</EpisodeInfo>
                <EditEpisode>Editar Lección</EditEpisode>
              </EpisodeContain>
            </Episode>
          </EpisodesContain>}
        <Delete setShow={setShow}
          show={show}
          deleteMessage={deleteMessage}
          seasonDocId={documentID}
          courseID={courseID}
          setOpenSeason={setOpenSeason} />
      </SeasonContain>
    </MainContainer>
    </>
  )
}
