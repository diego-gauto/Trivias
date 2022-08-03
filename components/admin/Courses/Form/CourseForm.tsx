import {
  CourseFormContain, InputForm, InputContain,
  Label, Input, Select, InputBig, InputContain2,
  TagContain, TagTitle, TagLabel, IconContain,
  Folder, InputIcon, CaretD,
  Button, ButtonContain,
} from './CourseForm.styled';
import React, { useState } from 'react'
import {
  Label2, Option, OptionContain,
  SelectContain, Selected, CaretD2
} from './Select/SelectStyles.styled'

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { accessWithAuthProvider, signUpWithCreds } from "../../../../store/actions/AdminActions";

const formSchema = yup.object().shape({
  courseTittle: yup
    .string()
    .required("Campo requerido"),
  courseDuration: yup
    .number()
    .required("Campo requerido"),
  courseSubtittle: yup
    .string()
    .required("Campo requerido"),
  courseAbout: yup
    .string()
    .required("Campo requerido"),
  coursePublishYear: yup
    .number()
    .required("Campo requerido"),
  coursePrice: yup
    .number()
    .required("Campo requerido"),
});

type FormValues = {
  courseTittle: string;
  courseDuration: number;
  courseSubtittle: string;
  courseAbout: string;
  coursePublishYear: number;
  coursePrice: number;
};

const CourseForm = () => {

  const [select, setSelect] = useState("");
  const handleSelectChange = (e: any) => {
    const value = e.target.value;
    setSelect(value);
  };


  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState("Darth Vader, Grand Moff Tarkin")
  const [value2, setValue2] = useState("Uñas")



  const onSubmit: SubmitHandler<FormValues> = formData => {
    console.log("a")
    var professor = ""
    if (value !== undefined && value !== null) {
      professor = value
    }
    var category = ""
    if (value2 !== undefined && value2 !== null) {
      category = value2
    }

    let signUpData = {
      credentials: {
        courseTittle: formData.courseTittle,
        courseDuration: formData.courseDuration,
        courseSubtittle: formData.courseSubtittle,
        courseAbout: formData.courseAbout,
        coursePublishYear: formData.coursePublishYear,
        coursePrice: formData.coursePrice,
        courseProfessor: professor,
        courseCategory: category,
      },
    };
    console.log(signUpData)
    /*   signUpWithCreds(signUpData).then(() => {
        window.location.href = "/Preview";
      }); */
  }


  return (
    <CourseFormContain>
      {/* LINEA 1 */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm >
          <InputContain>
            <Label>Título del Curso</Label>
            <Input
              placeholder="Curso de Uñas Francesas"
              type="text"
              className={`form-control ${errors.courseTittle ? 'is-invalid' : ''}`}
              {...register("courseTittle")}
            />
          </InputContain>
          <InputContain>
            <Label2>Profesor(es)</Label2>
            <IconContain>

              <SelectContain key={1}>
                <Selected onClick={() => { setOpen(!open) }}>
                  {value}
                  <CaretD2 />
                </Selected>
                {
                  open == true &&
                  <OptionContain>
                    <Option onClick={() => { setValue("Darth Vader, Grand Moff Tarkin"); setOpen(false) }}>
                      <input
                        type="radio"
                        id="Temporada1"
                        name="category"
                        value="Temporada 1"
                      />
                      <Label2 > Darth Vader, Grand Moff Tarkin</Label2>
                    </Option>
                    <Option onClick={() => { setValue("Yoda"); setOpen(false) }}>
                      <input
                        type="radio"
                        id="Temporada2"
                        name="category"
                        value="Temporada 2"
                      />
                      <Label2> Yoda</Label2>
                    </Option>
                  </OptionContain>
                }
              </SelectContain>

            </IconContain>
          </InputContain>
          <InputContain>
            <Label>Duración de Suscripción (Días)</Label>
            <Input
              placeholder="90"
              type="number"
              className={`form-control ${errors.courseDuration ? 'is-invalid' : ''}`}
              {...register("courseDuration")}
            />
          </InputContain>
        </InputForm>
        {/* LINEA 2 */}
        <InputForm>
          <InputContain>
            <Label>Subtítulo del Curso</Label>
            <Input
              placeholder="Descubre un nuevo método para tus uñas este San Valentín"
              type="text"
              className={`form-control ${errors.courseSubtittle ? 'is-invalid' : ''}`}
              {...register("courseSubtittle")}
            />
          </InputContain>
          <InputContain>
            <Label>Categorías</Label>
            <IconContain>

              <SelectContain key={2}>
                <Selected onClick={() => { setOpen2(!open2) }}>
                  {value2}
                  <CaretD2 />
                </Selected>
                {
                  open2 == true &&
                  <OptionContain>
                    <Option onClick={() => { setValue2("Uñas de salón"); setOpen2(false) }}>
                      <input
                        type="radio"
                        id="Temporada1"
                        name="category"
                        value="Temporada 1"
                      />
                      <Label2 > Uñas de salón</Label2>
                    </Option>
                    <Option onClick={() => { setValue2("Uñas francesas"); setOpen2(false) }}>
                      <input
                        type="radio"
                        id="Temporada2"
                        name="category"
                        value="Temporada 2"
                      />
                      <Label2> Uñas francesas</Label2>
                    </Option>
                  </OptionContain>
                }
              </SelectContain>
            </IconContain>

          </InputContain>
          <InputContain>
            <Label>Portada del Curso</Label>
            <IconContain>
              <Folder />
              <InputIcon
                placeholder="Seleccionar archivo"
              />
            </IconContain>
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

              className={`form-control ${errors.courseAbout ? 'is-invalid' : ''}`}
              {...register("courseAbout")}
            />
          </InputContain>
          <InputContain2>
            <InputContain>
              <Label>Año de Publicación</Label>
              <Input
                placeholder="2022"
                type="number"
                className={`form-control ${errors.coursePublishYear ? 'is-invalid' : ''}`}
                {...register("coursePublishYear")}
              />
            </InputContain>
            <InputContain>
              <Label>Precio (MXN)</Label>
              <Input
                placeholder="998"
                type="number"
                className={`form-control ${errors.coursePrice ? 'is-invalid' : ''}`}
                {...register("coursePrice")}
              />
            </InputContain>
          </InputContain2>
          {/* <TagContain>
          <TagTitle>Etiquetas</TagTitle>
          <TagLabel >Nuevo
            <input
              type="radio"
              name="radio"
              value="new"
              checked={select === "new"}
              onChange={(e) => handleSelectChange(e)}
            />
            <span></span>
          </TagLabel>
          <TagLabel >Popular
            <input
              type="radio"
              name="radio"
              value="popular"
              checked={select === "popular"}
              onChange={(e) => handleSelectChange(e)}
            />
            <span></span>
          </TagLabel>

          <TagLabel >Destacado
            <input
              type="radio"
              name="radio"
              value="outstand"
              checked={select === "outstand"}
              onChange={(e) => handleSelectChange(e)}
            />
            <span></span>
          </TagLabel>
          <TagLabel >En Oferta
            <input
              type="radio"
              name="radio"
              value="sale"
              checked={select === "sale"}
              onChange={(e) => handleSelectChange(e)}
            />
            <span></span>
          </TagLabel>
        </TagContain> */}
          <ButtonContain>
            <Button type='submit'>Guardar Cambios</Button>
          </ButtonContain>

        </InputForm>
      </form>
    </CourseFormContain>
  )
}
export default CourseForm;