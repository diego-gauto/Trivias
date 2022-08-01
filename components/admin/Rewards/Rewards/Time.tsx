import React from 'react'
import { InputContain, Tab, Unselect } from '../Rewards.styled';
import { TabContain, Container, LevelContain, LevelCircle, Level, Divider, ButtonContain, TransparentButton, ContainerLevel, Grid } from './Points.styled';


const Time = ({ setPlace }: any) => {
  return (
    <>
      <TabContain>
        <Unselect onClick={() => { setPlace("points") }}>
          <Tab>Recompensas por Puntuaje</Tab>
        </Unselect>
        <InputContain>
          <Tab>Recompensas por Tiempo</Tab>
        </InputContain>
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
                1 mes
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 2
              <label>
                2 meses
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 3
              <label>
                3 meses
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 4
              <label>
                6 meses
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 5
              <label>
                9 meses
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 6
              <label>
                12 meses
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 7
              <label>
                18 meses
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 8
              <label>
                24 meses
              </label>
            </Level>
          </LevelContain>
          <Divider />
          <LevelContain>
            <LevelCircle />
            <Level>
              Nivel 9
              <label>
                36 meses
              </label>
            </Level>
          </LevelContain>
        </ContainerLevel>

        <ButtonContain>
          <TransparentButton>Editar Niveles<Grid /></TransparentButton>
        </ButtonContain>

      </Container>
    </>

  )
}
export default Time;