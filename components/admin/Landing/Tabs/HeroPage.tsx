

import { useMediaQuery } from "react-responsive";

import {
  AllEditInputs,
  ColumnsContainer,
  DataTitle,
  EditButtons,
  EditInput,
  EditText,
  FolderInput,
  Inputs,
  ProfileData,
  SaveButton,
} from "./HeroPage.styled";

const HeroPage = ({ show, setShow }: any) => {

  const responsive870 = useMediaQuery({ query: "(max-width: 870px)" });

  const handleShow = () => setShow(true);

  return (
    <>
      <ProfileData>
        <DataTitle>
          Datos de la Cuenta
        </DataTitle>
        <ColumnsContainer>
          <AllEditInputs>
            <Inputs>
              <EditText>
                Título Inicial
              </EditText>
              <EditInput placeholder="Aprende a aplicar uñas desde Cero" />
            </Inputs>
            <Inputs>
              <EditText>
                Párrafo inicial
              </EditText>
              <EditInput style={{ height: "210px" }} placeholder="Descubre tu verdadero potencial a través de nuestros entrenamientos personalizados. En Gonvar descubrirás la manera más fácil, rápida y divertida de convertirte en un aplicador profesional. Entrenamientos de primer nivel para lograr resultados extraordinarios." />
            </Inputs>

          </AllEditInputs>
          <AllEditInputs>
            <Inputs>
              <EditText>
                Botón Primario
              </EditText>
              <EditInput placeholder="Aprende a aplicar uñas desde Cero" />
            </Inputs>
            <Inputs>
              <EditText>
                Botón Secundario
              </EditText>
              <EditInput style={{}} placeholder="Descubre tu verdadero potencial a través de nuestros entrenamientos personalizados. En Gonvar descubrirás la manera más fácil, rápida y divertida de convertirte en un aplicador profesional. Entrenamientos de primer nivel para lograr resultados extraordinarios." />
            </Inputs>
            <Inputs>
              <EditText>
                Hero Image
              </EditText>
              <FolderInput placeholder="Seleccionar archivo" >
              </FolderInput>
            </Inputs>
          </AllEditInputs>
          <AllEditInputs>
            <Inputs>
              <EditText>
                Característica 1
              </EditText>
              <EditInput placeholder="+4700 Alumnos" />
            </Inputs>
            <Inputs>
              <EditText>
                Característica 2
              </EditText>
              <EditInput style={{}} placeholder="+250 Cursos" />
            </Inputs>
            <Inputs>
              <EditText>
                Característica 3
              </EditText>
              <EditInput placeholder="Seleccionar país" />
            </Inputs>
          </AllEditInputs>
        </ColumnsContainer>
        <EditButtons>
          <SaveButton>
            Guardar
          </SaveButton>
        </EditButtons>
      </ProfileData>
    </>
  )
}
export default HeroPage