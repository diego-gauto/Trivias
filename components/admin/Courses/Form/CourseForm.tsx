import React, { useState } from 'react'
import { CourseFormContain, InputForm, InputContain, Label, Input, Select, InputBig, InputContain2, TagContain, TagTitle, TagDiv, Tags, TagLabel } from './CourseForm.styled';

const CourseForm = () => {

  const [select, setSelect] = useState("");
  const handleSelectChange = (e: any) => {
    const value = e.target.value;
    setSelect(value);
  };

  return (
    <CourseFormContain>
      {/* LINEA 1 */}
      <InputForm>
        <InputContain>
          <Label>Título del Curso</Label>
          <Input
            placeholder="Curso de Uñas Francesas"
          />
        </InputContain>
        <InputContain>
          <Label>Profesor(es)</Label>
          <Select>
          </Select>
        </InputContain>
        <InputContain>
          <Label>Duración de Suscripción (Días)</Label>
          <Input
            placeholder="90"
          />
        </InputContain>
      </InputForm>
      {/* LINEA 2 */}
      <InputForm>
        <InputContain>
          <Label>Subtítulo del Curso</Label>
          <Input
            placeholder="Descubre un nuevo método para tus uñas este San Valentín"
          />
        </InputContain>
        <InputContain>
          <Label>Categorías</Label>
          <Select>
          </Select>
        </InputContain>
        <InputContain>
          <Label>Portada del Curso</Label>
          <Input
            placeholder="Seleccionar archivo"
          />

        </InputContain>
      </InputForm>
      {/* LINEA 3 */}
      <InputForm>
        <InputContain>
          <Label>Sobre el Curso</Label>
          <InputBig
            placeholder="Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit. Nisi, sem rutrum 
          blandit convallis. Penatibus scelerisque tempus, 
          volutpat magna venenatis, volutpat. Ut nisl urna, 
          pharetra et ultrices. Sapien lacinia fringilla rhoncus 
          egestas nisl aliquam. Pellentesque ornare luctus 
          lobortis non id in vestibulum."
          />
        </InputContain>
        <InputContain2>
          <InputContain>
            <Label>Año de Publicación</Label>
            <Input
              placeholder="2022"
            />
          </InputContain>
          <InputContain>
            <Label>Precio (MXN)</Label>
            <Input
              placeholder="998"
            />
          </InputContain>
        </InputContain2>
        <TagContain>
          <TagTitle>Etiquetas</TagTitle>
          <TagDiv>
            <Tags
              type="radio"
              name="radio"
              value="new"
              checked={select === "new"}
              onChange={(e) => handleSelectChange(e)}
            />
            <TagLabel >Nuevo</TagLabel>
          </TagDiv>
          <TagDiv>
            <Tags
              type="radio"
              name="radio"
              value="popular"
              checked={select === "popular"}
              onChange={(e) => handleSelectChange(e)}
            />
            <TagLabel >Popular</TagLabel>
          </TagDiv>
          <TagDiv>
            <Tags
              type="radio"
              name="radio"
              value="outstand"
              checked={select === "outstand"}
              onChange={(e) => handleSelectChange(e)}
            />
            <TagLabel >Destacado</TagLabel>
          </TagDiv>
          <TagDiv>
            <Tags
              type="radio"
              name="radio"
              value="sale"
              checked={select === "sale"}
              onChange={(e) => handleSelectChange(e)}
            />
            <TagLabel >En Oferta</TagLabel>
          </TagDiv>
        </TagContain>
      </InputForm>
    </CourseFormContain>
  )
}
export default CourseForm;