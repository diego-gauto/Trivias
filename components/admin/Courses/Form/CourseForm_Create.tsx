import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { LoaderContain } from "../../../../containers/Profile/User/User.styled";
import { createCourse } from "../../../../store/actions/AdminActions";
import { getUsers } from "../../../../store/actions/courseActions";
import { Input2, TitleContain } from "../../Rewards/Prizes/Modal/Modal.styled";
import { CourseName } from "../AllCourses.styled";
import {
  Button,
  ButtonContain,
  ButtonNewCourse,
  CourseFormContain,
  Folder,
  IconContain,
  Input,
  InputBig,
  InputContain,
  InputContain2,
  InputForm,
  Label,
} from "./CourseForm_Create.styled";
import {
  CaretD2,
  Label2,
  Option,
  OptionContain,
  Selected,
  SelectContain,
} from "./Select/SelectStyles.styled";

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

const CourseForm_Create = () => {

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
  const [openCourse, setOpenCourse] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [name, setName] = useState("Seleccionar un profesor");
  const [value, setValue] = useState<any>({});
  const [userData, setUserData] = useState<any>([]);
  const [value2, setValue2] = useState("Uñas");
  const [value3, setValue3] = useState("Gratis");
  const [image, setImage] = useState<any>("");
  const [price, setPrice] = useState(0);
  const [creatingNewCourse, setCreatingNewCourse] = useState<boolean>(false);




  const onSubmit: SubmitHandler<FormValues> = formData => {
    setCreatingNewCourse(true)
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

    let signUpData: any = {
      data: {
        courseTittle: formData.courseTittle,
        courseDuration: formData.courseDuration,
        courseSubtittle: formData.courseSubtittle,
        coursePath: image,
        courseAbout: formData.courseAbout,
        coursePublishYear: formData.coursePublishYear,
        coursePrice: formData.coursePrice,
        courseProfessor: professor,
        courseCategory: category,
        courseType: type,
        uid: "A5uQQ3JAyS8GvnnwLPdE"
      },
    };

    createCourse(signUpData).then(() => {
      alert("Curso creado correctamente");
      setCreatingNewCourse(false);
      window.location.href = "/admin/Courses";
    });

  }

  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setImage(reader.result)
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
    <CourseFormContain onClick={() => { setOpenCourse(!openCourse) }}>
      {/* LINEA 1 */}
      <TitleContain>
        <CourseName>
          Crear Curso Nuevo
        </CourseName>
        {
          openCourse == false &&
          <ButtonNewCourse>+</ButtonNewCourse>
        }
        {
          openCourse == true &&
          <ButtonNewCourse onClick={(e) => {
            setOpenCourse(false)
          }}>-</ButtonNewCourse>
        }

      </TitleContain>
      {openCourse && <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm >
          <InputContain >
            <Label>Título del Curso</Label>
            <Input
              placeholder="Curso de Uñas Francesas"
              type="text"
              className={`form-control ${errors.courseTittle ? 'is-invalid' : ''}`}
              {...register("courseTittle")} onClick={(e) => { e.stopPropagation(); }}
            />
          </InputContain>
          <InputContain onClick={(e) => { e.stopPropagation(); }}>
            <Label>Profesor(es)</Label>
            <IconContain>

              <SelectContain key={1}>
                <Selected onClick={(e) => { setOpen(!open), setOpen2(false) }}>
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
          <InputContain onClick={(e) => { e.stopPropagation(); }}>
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

        </InputForm>
        {/* LINEA 2 */}
        <InputForm>
          <InputContain onClick={(e) => { e.stopPropagation(); }}>
            <Label>Subtítulo del Curso</Label>
            <Input
              placeholder="Descubre un nuevo método para tus uñas este San Valentín"
              type="text"
              className={`form-control ${errors.courseSubtittle ? 'is-invalid' : ''}`}
              {...register("courseSubtittle")}
            />
          </InputContain>
          <InputContain onClick={(e) => { e.stopPropagation(); }}>
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
          <InputContain onClick={(e) => { e.stopPropagation(); }}>
            <Label>Portada del Curso</Label>
            <IconContain>
              <Folder />
              <Input2>
                <label htmlFor="input">
                  <input
                    type="file"
                    id="input"
                    onChange={(e) => { getImage(e.target.files) }}
                  />
                </label>
              </Input2>
            </IconContain>
          </InputContain>
        </InputForm>
        {/* LINEA 3 */}
        <InputForm>
          <InputContain onClick={(e) => { e.stopPropagation(); }}>
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
          <InputContain2 onClick={(e) => { e.stopPropagation(); }}>
            <InputContain>
              <Label>Año de Publicación</Label>
              <Input
                placeholder="2022"
                type="number"
                className={`form-control ${errors.coursePublishYear ? 'is-invalid' : ''}`}
                {...register("coursePublishYear")}
              />
            </InputContain>
            {
              value3 != "Gratis" &&
              <InputContain>
                <Label>Precio (MXN)</Label>
                <Input
                  placeholder="998"
                  type="number"
                  defaultValue={0}
                  className={`form-control ${errors.coursePrice ? 'is-invalid' : ''}`}
                  {...register("coursePrice")}
                />
              </InputContain>

            }


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
          <InputContain2>
            {
              value3 != "Gratis" &&
              <InputContain onClick={(e) => { e.stopPropagation(); }}>
                <Label>Duración de Suscripción (Días)</Label>
                <Input
                  placeholder="90"
                  type="number"
                  defaultValue={0}
                  className={`form-control ${errors.courseDuration ? 'is-invalid' : ''}`}
                  {...register("courseDuration")}
                />
              </InputContain>
            }
            <ButtonContain >
              {!creatingNewCourse ?
                <Button type='submit' onClick={(e) => { e.stopPropagation() }}>Crear Curso</Button>
                :
                <LoaderContain />
              }
            </ButtonContain>
          </InputContain2>


        </InputForm>
      </form>}
    </CourseFormContain>
  )
}
export default CourseForm_Create;