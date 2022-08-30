import React, { useState, useEffect } from "react";
import { InputContain, Tab, Unselect } from "../Rewards.styled";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import EditLevel from "./Modal/EditLevel";
import {
  AllLevels,
  ButtonContain,
  Container,
  ContainerLevel,
  Divider,
  Grid,
  Level,
  LevelCircle,
  LevelContain,
  TabContain,
  TransparentButton,
} from "./Points.styled";
import EditTimeLevel from "./Modal/EditTimeLevel";
import { getTimeLevels } from "../../../../store/actions/RewardActions";

const Time = ({ setPlace }: any) => {
  const [show, setShow] = useState(false);
  const [levels, setLevels] = useState<any>({
    minimum: 0,
    maximum: 0
  })
  const getLevels = () => {
    getTimeLevels().then(res => {
      setLevels(res)
    })
  }
  useEffect(() => {
    getLevels();
  }, [])
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
        {
          levels.length > 0 &&
          <AllLevels>
            {
              levels.map((val: any, i: any) => {
                return (
                  <ContainerLevel key={"adminLevelTime" + i} size={levels.length} i={i + 1} >
                    <LevelContain >
                      <LevelCircle />
                      <Level>
                        Nivel {i + 1}
                        <br />
                        <label>
                          {val.maximum}
                          {val.maximum == 1 ? " mes" : " meses"}
                        </label>
                      </Level>
                    </LevelContain>
                    <Divider size={levels.length} i={i + 1} />
                  </ContainerLevel>
                )
              })
            }
          </AllLevels>
        }

        <ButtonContain onClick={() => { setShow(true) }}>
          <TransparentButton>Editar Niveles<Grid /></TransparentButton>
        </ButtonContain>
        <EditTimeLevel show={show} setShow={setShow} levels={levels} />
      </Container>
    </>

  )
}
export default Time;