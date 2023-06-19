import React, { useState } from "react";

import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";

import { updLandingInfo } from "../../../api/landing";
import {
  AllEditInputs,
  ColumnsContainer,
  ColumnsContainer2,
  EditButtons,
  EditInput,
  EditText,
  FolderInput,
  Inputs,
  ProfileData,
  SaveButton,
} from "../Landing.styled";
import { IHeroSectionProps } from "./IHeroSection";

const ReactQuill = dynamic(import('react-quill'), { ssr: false })
const HeroSection = (props: IHeroSectionProps) => {
  const { heroSectionData } = props;
  const [heroData, setHeroData] = useState(heroSectionData);

  const updateState = (e: any, key: string) => {
    console.log(e)
    console.log(key)
    const newState = { ...heroData };
    // @ts-expect-error
    newState[key] = key === "image" ? e.target.files[0] : key === "parrafoInicial" ? e : e.target.value;
    setHeroData(newState);
  }

  const onSave = async () => {
    console.log(heroData)
    const success = await updLandingInfo(heroData)
    console.log(success)
    let alertText = "Cambios realizados correctamente"
    if (!success) {
      alertText = "Hubo un error"
    }
    alert(alertText)
  }

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", "normal", "large", "huge"] }, {
          color: [
            "red",
            "blue",
            "#6717cd",
            "#3F2F71",
            "black",
          ]
        }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] }
        ],
        ['link', 'image', 'video'],
        ["clean"]
      ],
    },
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align"
  ];

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
                value={!!heroData ? heroData.tituloInicial : ''}
                placeholder="Aprende a aplicar uñas desde Cero"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Párrafo inicial
              </EditText>
              <ReactQuill
                placeholder="Descubre tu verdadero potencial a través de nuestros 
                entrenamientos personalizados. En Gonvar descubrirás la manera más fácil, 
                rápida y divertida de convertirte en un aplicador profesional. Entrenamientos de 
                primer nivel para lograr resultados extraordinarios." theme="snow"
                formats={formats} modules={modules}
                value={!!heroData ? heroData.parrafoInicial : ''}
                onChange={(e) => {
                  updateState(e, "parrafoInicial")
                }}
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
                value={!!heroData ? heroData.botonPrimario : ''}
                placeholder="Comienza desde $49"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Botón Secundario
              </EditText>
              <EditInput
                onChange={(e) => updateState(e, "botonSecundario")}
                value={!!heroData ? heroData.botonSecundario : ''}
                placeholder="Ve más cursos"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Hero Image
              </EditText>
              <FolderInput
                onChange={(e) => updateState(e, "image")}
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
                onChange={(e) => updateState(e, "caracteristica1")}
                value={!!heroData ? heroData.caracteristica1 : ''}
                placeholder="+4700 Alumnos"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Característica 2
              </EditText>
              <EditInput
                onChange={(e) => updateState(e, "caracteristica2")}
                value={!!heroData ? heroData.caracteristica2 : ''}
                placeholder="+250 Cursos"
              />
            </Inputs>
            <Inputs>
              <EditText>
                Característica 3
              </EditText>
              <EditInput
                onChange={(e) => updateState(e, "caracteristica3")}
                value={!!heroData ? heroData.caracteristica3 : ''}
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