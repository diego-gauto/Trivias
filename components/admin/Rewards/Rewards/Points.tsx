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

const Points = ({ setPlace, place }: any) => {

  const [show, setShow] = useState(false);
  const levelsRef = query(collection(db, "levelPoints"), orderBy("minimum"))
  const [levels, setLevels] = useState<any>([])

  const getLevels = async () => {
    const data = await getDocs(levelsRef);
    setLevels(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  useEffect(() => {
    getLevels();
  }, [])

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

        <AllLevels>
          {
            levels.map((val: any, i: any) => {
              return (
                <ContainerLevel key={"adminLevel" + i} size={levels.length} i={i + 1}>
                  <LevelContain >
                    <LevelCircle />
                    <Level>
                      Nivel {i + 1}
                      <br />
                      <label>
                        {val.maximum}
                      </label>
                    </Level>

                  </LevelContain>
                  <Divider size={levels.length} i={i + 1} />
                </ContainerLevel>
              )
            })
          }
        </AllLevels>
        <ButtonContain onClick={() => { setShow(true) }}>
          <TransparentButton>Editar Niveles<Grid /></TransparentButton>
        </ButtonContain>
        <EditLevel show={show} setShow={setShow} levels={levels} />
      </Container>
    </>

  )
}
export default Points;