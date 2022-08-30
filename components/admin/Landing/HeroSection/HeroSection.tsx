

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
import { IHeroSectionProps } from "./IHeroSection";

const HeroSection = (props: IHeroSectionProps) => {
  const { heroSectionData } = props;

  return (
    <ProfileData style={{ boxShadow: "none", background: "none" }}>
      <ColumnsContainer2 style={{ width: "100%" }}>
        <ColumnsContainer>
          <AllEditInputs>
            <Inputs>
              <EditText>
                Título Inicial
              </EditText>
              <EditInput value={heroSectionData.tituloInicial} placeholder="Aprende a aplicar uñas desde Cero" />
            </Inputs>
            <Inputs>
              <EditText>
                Párrafo inicial
              </EditText>
              <EditInput2 value={heroSectionData.parrafoInicial} style={{ height: "210px" }} placeholder="Descubre tu verdadero potencial a través de nuestros entrenamientos personalizados. En Gonvar descubrirás la manera más fácil, rápida y divertida de convertirte en un aplicador profesional. Entrenamientos de primer nivel para lograr resultados extraordinarios." />
            </Inputs>
          </AllEditInputs>
          <AllEditInputs>
            <Inputs>
              <EditText>
                Botón Primario
              </EditText>
              <EditInput value={heroSectionData.botonPrimario} placeholder="Comienza desde $49" />
            </Inputs>
            <Inputs>
              <EditText>
                Botón Secundario
              </EditText>
              <EditInput value={heroSectionData.botonSecundario} placeholder="Ve más cursos" />
            </Inputs>
            <Inputs>
              <EditText>
                Hero Image
              </EditText>
              <FolderInput type="file" placeholder="Seleccionar archivo" />
            </Inputs>
          </AllEditInputs>
          <AllEditInputs>
            <Inputs>
              <EditText>
                Característica 1
              </EditText>
              <EditInput value={heroSectionData.primerCaracteristica} placeholder="+4700 Alumnos" />
            </Inputs>
            <Inputs>
              <EditText>
                Característica 2
              </EditText>
              <EditInput value={heroSectionData.segundaCaracteristica} placeholder="+250 Cursos" />
            </Inputs>
            <Inputs>
              <EditText>
                Característica 3
              </EditText>
              <EditInput value={heroSectionData.terceraCaracteristica} placeholder="+50 Presenciales" />
            </Inputs>
          </AllEditInputs>
        </ColumnsContainer>
      </ColumnsContainer2>
      <EditButtons>
        <SaveButton>
          Guardar
        </SaveButton>
      </EditButtons>
    </ProfileData>
  )
}

export default HeroSection