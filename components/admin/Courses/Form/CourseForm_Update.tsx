import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { updateCourse } from "../../../../store/actions/AdminActions";
import { Input2 } from "../../Rewards/Prizes/Modal/Modal.styled";
import { ICourseForm_Update } from "../Form/ICourseForm_Update";
import {
  ButtonContain2,
  CourseFormContain,
  Folder,
  IconContain,
  Input,
  InputBig,
  InputContain,
  InputContain2,
  InputForm,
  Label,
} from "./CourseForm.styled";
import { Button, InputButtonContain } from "./CourseForm_Create.styled";
import {
  CaretD2,
  Label2,
  Option,
  OptionContain,
  Selected,
  SelectContain,
} from "./Select/SelectStyles.styled";
import { getUsers } from "../../../../store/actions/courseActions";

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

const CourseForm = (props: ICourseForm_Update) => {

  const { courseTittle } = props;
  const { courseAbout } = props;
  const { courseCategory } = props;
  const { courseDuration } = props;
  const { coursePrice } = props;
  const { courseProfessor } = props;
  const { coursePublishYear } = props;
  const { courseSubtittle } = props;
  const { documentID } = props;
  const { coursePath } = props;
  const { reference } = props;

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
  const [open3, setOpen3] = useState(false);
  const [name, setName] = useState(courseProfessor.name);
  const [value, setValue] = useState<any>({})
  const [value2, setValue2] = useState("Uñas")
  const [image, setImage] = useState<any>(coursePath)
  const [images, setimages] = useState<any>("")
  const [value3, setValue3] = useState("Gratis")
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    setValue2(courseCategory)
    setValue(courseProfessor)
  }, []);

  const onSubmit: SubmitHandler<FormValues> = formData => {
    var professor = ""
    if (value !== undefined && value !== null) {
      professor = value
    }
    var category = ""
    if (value2 !== undefined && value2 !== null) {
      category = value2
    }
    var type = ""
    if (value3 !== undefined && value3 !== null) {
      type = value3;
    }

    let signUpData = {
      data: {
        courseTittle: formData.courseTittle,
        courseDuration: formData.courseDuration,
        courseSubtittle: formData.courseSubtittle,
        courseAbout: formData.courseAbout,
        reference: reference,
        coursePath: image,
        coursePublishYear: formData.coursePublishYear,
        coursePrice: formData.coursePrice,
        courseProfessor: professor,
        courseCategory: category,
        courseType: type,
        documentID: documentID,
      },
    };

    updateCourse(signUpData, images).then(() => {

      window.location.href = "/admin/Courses";
      console.log("done!")
    });

  }
  const getImage = (file: any) => {
    console.log(file)
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setImage(reader.result)
      setimages(reader.result)
    };
  }
  const getProffessors = () => {
    getUsers().then((res) => {
      res = res.filter((user: any, index: any) => user.role == "admin")
      setUserData(res);
    })
  }

  useEffect(() => {
    getProffessors();
  }, [])

  return (
    <CourseFormContain>
      {/* LINEA 1 */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm >
          <InputContain>
            <Label>Título del Curso</Label>
            <Input
              placeholder="Curso de Uñas Francesas"
              defaultValue={courseTittle}
              type="text"
              className={`form-control ${errors.courseTittle ? 'is-invalid' : ''}`}
              {...register("courseTittle")}
            />
          </InputContain>
          <InputContain>
            <Label>Profesor(es)</Label>
            <IconContain>

              <SelectContain key={1}>
                <Selected onClick={() => { setOpen(!open), setOpen2(false) }}>
                  {name}
                  <CaretD2 />
                </Selected>
                {
                  open == true &&
                  <OptionContain>
                    {
                      userData.map((val: any, index: any) => {
                        return (
                          <Option
                            key={"SelectProfessor" + index}
                            onClick={() => {
                              setName(val.name);
                              setValue({ id: val.id, name: val.name });
                              setOpen(false)
                            }}>
                            <input
                              type="radio"
                              id="Temporada1"
                              name="category"
                              value="Temporada 1"
                            />
                            <Label2>{val.name}</Label2>
                          </Option>
                        )
                      })
                    }
                  </OptionContain>
                }
              </SelectContain>

            </IconContain>
          </InputContain>
          <InputContain>
            <Label>Duración de Suscripción (Días)</Label>
            <Input
              placeholder="90"
              defaultValue={courseDuration}
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
              defaultValue={courseSubtittle}
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
                <Selected onClick={() => { setOpen2(!open2), setOpen(false) }}>
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
              <Input2>
                <input
                  type="file"
                  placeholder="Seleccionar archivo"
                  onChange={(e) => { getImage(e.target.files) }}>
                </input>
              </Input2>
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
              defaultValue={courseAbout}
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
                defaultValue={coursePublishYear}
                className={`form-control ${errors.coursePublishYear ? 'is-invalid' : ''}`}
                {...register("coursePublishYear")}
              />
            </InputContain>
            <InputContain>
              <Label>Precio (MXN)</Label>
              <Input
                placeholder="998"
                type="number"
                defaultValue={coursePrice}
                className={`form-control ${errors.coursePrice ? 'is-invalid' : ''}`}
                {...register("coursePrice")}
              />
            </InputContain>
          </InputContain2>
          <InputButtonContain>

            <InputContain>
              <Label>Membresia</Label>
              <IconContain>

                <SelectContain key={3}>
                  <Selected onClick={() => { setOpen3(!open3) }}>
                    {value3}
                    <CaretD2 />
                  </Selected>
                  {
                    open3 == true &&
                    <OptionContain>
                      <Option onClick={() => { setValue3("Gratis"); setOpen3(false) }}>
                        <input
                          type="radio"
                          id="Temporada1"
                          name="category"
                          value="Temporada 1"
                        />
                        <Label2 > Gratis</Label2>
                      </Option>
                      <Option onClick={() => { setValue3("Mensual"); setOpen3(false) }}>
                        <input
                          type="radio"
                          id="Temporada1"
                          name="category"
                          value="Temporada 1"
                        />
                        <Label2 > Mensual</Label2>
                      </Option>
                      <Option onClick={() => { setValue3("Producto"); setOpen3(false) }}>
                        <input
                          type="radio"
                          id="Temporada2"
                          name="category"
                          value="Temporada 2"
                        />
                        <Label2> Producto</Label2>
                      </Option>
                    </OptionContain>
                  }
                </SelectContain>
              </IconContain>

            </InputContain>
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
            <ButtonContain2>
              <Button type='submit'>Guardar Cambios</Button>
            </ButtonContain2>
          </InputButtonContain>
        </InputForm>
      </form>
    </CourseFormContain>
  )
}
export default CourseForm;