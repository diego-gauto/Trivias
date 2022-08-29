import React, { useState } from 'react'
import { saveHeroData } from '../../../../store/actions/LandingActions';
import {
  AllEditInputs,
  ColumnsContainer,
  ColumnsContainer2,
  EditButtons,
  EditInput,
  EditInput2,
  EditText,
  FolderInput,
  Inputs,
  ProfileData,
  SaveButton,
} from "../Landing.styled";
import { IHeroSectionProps } from './IHeroSection';

const HeroSection = (props: IHeroSectionProps) => {
  const { heroSectionData } = props;
  const [heroData, setHeroData] = useState(heroSectionData);

  const updateState = (e: any, key: string) => {
    const newState = { ...heroData };
    // @ts-expect-error
    newState[key] = key === "heroImage" ? e.target.files[0] : e.target.value;
    setHeroData(newState);
  }

  const onSave = async () => {
    const success = await saveHeroData(heroData)
    let alertText = "Cambios realizados correctamente"
    if (!success) {
      alertText = "Hubo un error"
    }
    alert(alertText)
  }

  return (
    <ProfileData style={{ boxShadow: "none", background: "none" }}>
      <ColumnsContainer2 style={{ width: "100%" }}>
        <ColumnsContainer>
          <AllEditInputs>
            <Inputs>
              <EditText>
                Título Inicial
              </EditText>
              <EditInput
                onChange={(e) => updateState(e, "tituloInicial")}
                value={heroData.tituloInicial}
                placeholder="Aprende a aplicar uñas desde Cero"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Párrafo inicial
              </EditText>
              <EditInput2
                onChange={(e) => updateState(e, "parrafoInicial")}
                value={heroData.parrafoInicial}
                style={{ height: "210px" }}
                placeholder="Descubre tu verdadero potencial a través de nuestros entrenamientos personalizados. En Gonvar descubrirás la manera más fácil, rápida y divertida de convertirte en un aplicador profesional. Entrenamientos de primer nivel para lograr resultados extraordinarios."
              />
            </Inputs>
          </AllEditInputs>
          <AllEditInputs>
            <Inputs>
              <EditText>
                Botón Primario
              </EditText>
              <EditInput
                onChange={(e) => updateState(e, "botonPrimario")}
                value={heroData.botonPrimario}
                placeholder="Comienza desde $49"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Botón Secundario
              </EditText>
              <EditInput
                onChange={(e) => updateState(e, "botonSecundario")}
                value={heroData.botonSecundario}
                placeholder="Ve más cursos"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Hero Image
              </EditText>
              <FolderInput
                onChange={(e) => updateState(e, "heroImage")}
                type="file"
                placeholder="Seleccionar archivo"
              />
            </Inputs>
          </AllEditInputs>
          <AllEditInputs>
            <Inputs>
              <EditText>
                Característica 1
              </EditText>
              <EditInput
                onChange={(e) => updateState(e, "primerCaracteristica")}
                value={heroData.primerCaracteristica}
                placeholder="+4700 Alumnos"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Característica 2
              </EditText>
              <EditInput
                onChange={(e) => updateState(e, "segundaCaracteristica")}
                value={heroData.segundaCaracteristica}
                placeholder="+250 Cursos"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Característica 3
              </EditText>
              <EditInput
                onChange={(e) => updateState(e, "terceraCaracteristica")}
                value={heroData.terceraCaracteristica}
                placeholder="+50 Presenciales"
              />
            </Inputs>
          </AllEditInputs>
        </ColumnsContainer>
      </ColumnsContainer2>
      <EditButtons>
        <SaveButton onClick={onSave}>
          Guardar
        </SaveButton>
      </EditButtons>
    </ProfileData>
  )
}

export default HeroSection