import React, { useState } from 'react'
import { InputContain, Tab, Unselect } from '../Rewards.styled';
import EditLevel from './Modal/EditLevel';
import { TabContain, Container, LevelContain, LevelCircle, Level, Divider, ButtonContain, TransparentButton, ContainerLevel, Grid } from './Points.styled';

const Points = ({ setPlace }: any) => {

  const [show, setShow] = useState(false);
  return (
    <>
      <TabContain>
        <InputContain>
          <Tab>Recompensas por Puntuaje</Tab>
        </InputContain>
        <Unselect onClick={() => { setPlace("time") }}>
          <Tab>Recompensas por Tiempo</Tab>
        </Unselect>
        <Unselect onClick={() => { setPlace("request") }}>
          <Tab>Solicitudes de Recompensas</Tab>
        </Unselect>
      </TabContain>
      <Container>
        <ContainerLevel>
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 1
              <label>
                100 puntos
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 2
              <label>
                400 puntos
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 3
              <label>
                800 puntos
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 4
              <label>
                1.000 puntos
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 5
              <label>
                2.000 puntos
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 6
              <label>
                3.500 puntos
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 7
              <label>
                4.800 puntos
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 8
              <label>
                6.000 puntos
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 9
              <label>
                8.000 puntos
              </label>
            </Level>
          </LevelContain>
        </ContainerLevel>

        <ButtonContain onClick={() => { setShow(true) }}>
          <TransparentButton>Editar Niveles<Grid /></TransparentButton>
        </ButtonContain>
        <EditLevel show={show} setShow={setShow} />
      </Container>
    </>

  )
}
export default Points;