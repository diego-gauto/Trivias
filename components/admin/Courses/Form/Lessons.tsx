import Link from 'next/link';
import React, { useState } from 'react'
import { Add, Button, ButtonContain, ChevD, ChevU, Demo1, EditEpisode, Episode, EpisodeContain, EpisodeInfo, EpisodesContain, EpisodesNumber, EpisodeTime, EpisodeTitle, LessonContain, LessonTitle, NewSeason, NewSeasonContain, SeasonContain, Title, TitleContain } from './Lessons.styled'

const Lessons = () => {

  const [open, setOpen] = useState(0);

  return (
    <LessonContain>
      <LessonTitle>Lista de Lecciones</LessonTitle>
      <SeasonContain >
        <TitleContain>
          <Title>
            Temporada 1
            {
              open != 1 &&
              <EpisodesNumber>4 episodios</EpisodesNumber>
            }
          </Title>
          <ButtonContain >
            {
              open == 1 &&
              <>
                <Button >Añadir Lección <Add /></Button>
                <ChevU onClick={() => { setOpen(0) }} />
              </>
            }
            {
              open != 1 &&
              <ChevD onClick={() => { setOpen(1) }} />
            }
          </ButtonContain>
        </TitleContain>
        {
          open == 1 &&
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
                <Link href="/admin/Edit">
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
          </EpisodesContain>
        }
      </SeasonContain>
      {/* BORRAR  2*/}
      <SeasonContain >
        <TitleContain>
          <Title>
            Temporada 2
            {
              open != 2 &&
              <EpisodesNumber>8 episodios</EpisodesNumber>
            }
          </Title>
          <ButtonContain >
            {
              open == 2 &&
              <>
                <Button >Añadir Lección <Add /></Button>
                <ChevU onClick={() => { setOpen(0) }} />
              </>
            }
            {
              open != 2 &&
              <ChevD onClick={() => { setOpen(2) }} />
            }
          </ButtonContain>
        </TitleContain>
        {
          open == 2 &&
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
                <EditEpisode>Editar Lección</EditEpisode>
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
          </EpisodesContain>
        }
      </SeasonContain>
      {/* BORRAR  2*/}
      {/* BORRAR  3*/}
      <SeasonContain >
        <TitleContain>
          <Title>
            Temporada 3
            {
              open != 3 &&
              <EpisodesNumber>10 episodios</EpisodesNumber>
            }
          </Title>
          <ButtonContain >
            {
              open == 3 &&
              <>
                <Button >Añadir Lección <Add /></Button>
                <ChevU onClick={() => { setOpen(0) }} />
              </>
            }
            {
              open != 3 &&
              <ChevD onClick={() => { setOpen(3) }} />
            }
          </ButtonContain>
        </TitleContain>
        {
          open == 3 &&
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
                <EditEpisode>Editar Lección</EditEpisode>
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
          </EpisodesContain>
        }
      </SeasonContain>
      {/* BORRAR  3*/}
      <NewSeasonContain>
        <NewSeason>+ Añadir nueva temporada</NewSeason>
      </NewSeasonContain>
    </LessonContain>
  )
}
export default Lessons;