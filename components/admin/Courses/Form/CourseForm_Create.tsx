import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { LoaderContain } from "../../../../containers/Profile/User/User.styled";
import { createCourse } from "../../../../store/actions/AdminActions";
import { getCategory, getMaterial, getTeacher, getUsers } from "../../../../store/actions/courseActions";
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
  OptionCat,
  OptionProfessor,
  OptionColor,
} from "./Select/SelectStyles.styled";
import image from "next/image";

const formSchema = yup.object().shape({
  free: yup.number(),
  courseTittle: yup
    .string()
    .required("Campo requerido"),
  courseDuration: yup
    .number()
    .when('free', {
      is: 1,
      then: yup.string().required('Must enter email address'),
    }),
  courseSubtittle: yup
    .string()
    .required("Campo requerido"),
  coursePhrase: yup
    .string()
    .required("Campo requerido"),
  courseAbout: yup
    .string()
    .required("Campo requerido"),
  coursePrice: yup
    .number()
    .when('free', {
      is: 1,
      then: yup.string().required('Must enter email address'),
    }),
});

type FormValues = {
  courseTittle: string;
  courseDuration: number;
  courseSubtittle: string;
  courseAbout: string;
  coursePublishYear: number;
  coursePrice: number;
  coursePhrase: string;
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
  const [openCourse, setOpenCourse] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [openProfessor, setOpenProfessor] = useState<boolean>(false);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openMembership, setOpenMembership] = useState<boolean>(false);
  const [openMaterial, setOpenMaterial] = useState<boolean>(false);
  const [openHw, setOpenHw] = useState<boolean>(false);
  const [openLevel, setOpenLevel] = useState<boolean>(false);
  const [openColor, setOpenColor] = useState<boolean>(false);
  const [name, setName] = useState("Seleccionar un profesor");
  const [homeWork, setHomeWork] = useState(false);
  const [free, setFree] = useState(0)
  const [value, setValue] = useState<any>({});
  const [professors, setProfessors] = useState<any>([]);
  const [professor, setProfessor] = useState<any>([]);
  const [value2, setValue2] = useState<any>([]);
  const [material, setMaterial] = useState<any>([]);
  const [materials, setMaterials] = useState<any>([]);
  const [value3, setValue3] = useState("Gratis");
  const [difficultyValue, setDifficultyValue] = useState("");
  const [image, setImage] = useState<any>("");
  const [missing, setMissing] = useState(false)
  const [creatingNewCourse, setCreatingNewCourse] = useState<boolean>(false);
  const [colorRGB, setColorRGB] = useState("");
  const color = ([
    "azul", "amarillo", "morado", "naranja", "rosa", "verde"
  ]);
  const addCategories = (val: any, index: any) => {
    let tempCategories = value2
    let tempIndex = 0;
    if (tempCategories.includes(val)) {
      tempIndex = tempCategories.findIndex((x: any) =>
        x == val
      )
      tempCategories.splice(tempIndex, 1);
    }
    else {
      tempCategories.push(val)
    }
    setValue2([...tempCategories])
  }
  const addMaterial = (val: any, index: any) => {
    let tempMaterial = material
    let tempIndex = 0;
    if (tempMaterial.includes(val)) {
      tempIndex = tempMaterial.findIndex((x: any) =>
        x == val
      )
      tempMaterial.splice(tempIndex, 1);
    }
    else {
      tempMaterial.push(val)
    }
    setMaterial([...tempMaterial])
  }
  const addProfessors = (val: any, index: any) => {
    let tempProfessor = professor
    let tempIndex = 0;
    if (tempProfessor.some((e: any) => e.name === val.name)) {
      tempIndex = tempProfessor.findIndex((x: any) =>
        x.name == val.name
      )
      tempProfessor.splice(tempIndex, 1);
    }
    else {
      tempProfessor.push(val)
    }
    setProfessor([...tempProfessor])
  }

  const onSubmit: SubmitHandler<FormValues> = formData => {

    setCreatingNewCourse(true)
    var professors = ""
    if (professor !== undefined && professor !== null) {
      professors = professor
    }
    var category = ""
    if (value2 !== undefined && value2 !== null) {
      category = value2
    }
    var materials = ""
    if (material !== undefined && material !== null) {
      materials = material
    }
    var type = ""
    if (value3 !== undefined && value3 !== null) {
      type = value3;
    }
    var difficultyLevel = ""
    if (difficultyValue !== undefined && difficultyValue !== null) {
      difficultyLevel = difficultyValue
    }
    if (formData.courseDuration === undefined) {
      formData.courseDuration = 0;
    }
    if (formData.coursePrice === undefined) {
      formData.coursePrice = 0;
    }
    let signUpData: any = {
      data: {
        courseCertificateColor: colorRGB,
        courseTittle: formData.courseTittle,
        courseDuration: formData.courseDuration * free + 0,
        courseSubtittle: formData.courseSubtittle,
        coursePath: image,
        courseAbout: formData.courseAbout,
        coursePrice: formData.coursePrice * free + 0,
        courseProfessor: professors,
        courseCategory: category,
        courseDifficulty: difficultyLevel,
        courseType: type,
        courseHomeWork: homeWork,
        coursePhrase: formData.coursePhrase,
        courseMaterial: materials,
        uid: "A5uQQ3JAyS8GvnnwLPdE"
      },
    };

    if (image) {
      createCourse(signUpData).then(() => {
        alert("Curso creado correctamente");
        setCreatingNewCourse(false);
        window.location.href = "/admin/Courses";
      });
    } else {
      alert("Por favor agregue una imagen");
      setCreatingNewCourse(false);
    }
  }

  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    if (file[0].size == 573779 || file[0].size == 48830) {
      reader.onload = (_event) => {
        setImage(reader.result)
      };
    } else {
      alert("La imagen debe tener una resolución de 1520 × 840 px  ó 760 × 420 px")
    }
  }
  const getProffessors = () => {
    getTeacher().then((res) => {
      setProfessors(res);
      return res;
    })
  }
  const getAllCategories = () => {
    getCategory().then((res) => {
      setCategories(res);
      return res;
    })
  }
  const getAllMaterials = () => {
    getMaterial().then((res) => {
      setMaterials(res);
      return res;
    })
  }
  if (Object.keys(errors).length > 0 && missing == true) {
    alert(`Falta lo siguiente:\n${errors.courseTittle ? "-Título\n" : ""}${errors.courseSubtittle ? "-Subtítulo\n" : ""}${errors.courseAbout ? "-Sobre el Curso\n" : ""}${errors.coursePublishYear ? "-Año\n" : ""}${errors.courseDuration ? "-Duración\n" : ""}${errors.coursePrice ? "-Precio\n" : ""}${errors.coursePhrase ? "-Frase descriptiva\n" : ""}
    `);
    setMissing(false)
  }
  const handleOpenHomeWork = () => {
    setOpenHw(!openHw);
    setOpenProfessor(false);
    setOpenCategory(false);
    setOpenMembership(false);
    setOpenLevel(false);
    setOpenMaterial(false);
    setOpenColor(false);
  }
  const handleOpenProfessor = () => {
    setOpenHw(false);
    setOpenProfessor(!openProfessor);
    setOpenCategory(false);
    setOpenMembership(false);
    setOpenLevel(false);
    setOpenMaterial(false);
    setOpenColor(false);
  }
  const handleOpenCategory = () => {
    setOpenHw(false);
    setOpenProfessor(false);
    setOpenCategory(!openCategory);
    setOpenMembership(false);
    setOpenLevel(false);
    setOpenMaterial(false);
    setOpenColor(false);
  }
  const handleOpenMembership = () => {
    setOpenHw(false);
    setOpenProfessor(false);
    setOpenCategory(false);
    setOpenMembership(!openMembership);
    setOpenLevel(false);
    setOpenMaterial(false);
    setOpenColor(false);
  }
  const handleOpenLevel = () => {
    setOpenHw(false);
    setOpenProfessor(false);
    setOpenCategory(false);
    setOpenMembership(false);
    setOpenLevel(!openLevel);
    setOpenMaterial(false);
    setOpenColor(false);
  }
  const handleOpenMaterial = () => {
    setOpenHw(false);
    setOpenProfessor(false);
    setOpenCategory(false);
    setOpenMembership(false);
    setOpenLevel(false);
    setOpenMaterial(!openMaterial);
    setOpenColor(false);
  }
  const handleOpenColor = () => {
    setOpenHw(false);
    setOpenProfessor(false);
    setOpenCategory(false);
    setOpenMembership(false);
    setOpenLevel(false);
    setOpenMaterial(false);
    setOpenColor(!openColor);
  }

  const difficulty = [
    "Muy Fácil",
    "Fácil",
    "Intermedio",
    "Avanzado",
    "Máster",
  ]
  useEffect(() => {
    getProffessors();
    getAllCategories();
    getAllMaterials();
  }, [])

  return (
    <CourseFormContain >
      {/* LINEA 1 */}
      <TitleContain onClick={() => { setOpenCourse(!openCourse) }}>
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
            <Label>Instructor(es)</Label>
            <IconContain>

              <SelectContain key={1}>
                <Selected onClick={(e) => { handleOpenProfessor() }} style={professor.length === 0 ? { height: 43 } : { height: "fit-content" }}>
                  {
                    professor.length === 0
                      ? "Seleccione un professor"
                      : professor.map((val: any, index: any) => {
                        return (
                          <React.Fragment key={'Select Professors ' + index}>
                            {val.name}
                            <br />
                          </React.Fragment>
                        )
                      })
                  }
                  <CaretD2 />
                </Selected>
                {
                  openProfessor == true &&
                  <OptionContain>
                    {
                      professors.map((val: any, index: any) => {
                        return (
                          <OptionProfessor
                            professor={val.name}
                            marked={professor}
                            key={"SelectProfessor " + index}
                            onClick={() => {
                              addProfessors({ id: val.id, name: val.name }, index);
                            }}>
                            <input
                              type="radio"
                              id="professor"
                              name="professor"
                              value="professor"
                            />
                            <Label2>{val.name}</Label2>
                          </OptionProfessor>
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
                <Selected onClick={() => { handleOpenMembership() }}>
                  {value3 == "Mensual" ? "Gonvar +" : value3}
                  <CaretD2 />
                </Selected>
                {
                  openMembership == true &&
                  <OptionContain>
                    <Option onClick={() => { setValue3("Gratis"); setOpenMembership(false); setFree(0) }}>
                      <input
                        type="radio"
                        id="Temporada1"
                        value="Temporada 1"
                      />
                      <Label2 > Gratis</Label2>
                    </Option>
                    <Option onClick={() => { setValue3("Mensual"); setOpenMembership(false); setFree(1) }}>
                      <input
                        type="radio"
                        id="Temporada1"
                        value="Temporada 1"
                      />
                      <Label2 > Gonvar +</Label2>
                    </Option>
                    <Option onClick={() => { setValue3("Producto"); setOpenMembership(false); setFree(1) }}>
                      <input
                        type="radio"
                        id="Temporada1"
                        value="Temporada 1"
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
            <Label>Tarea</Label>
            <IconContain>

              <SelectContain key={3}>
                <Selected onClick={() => { handleOpenHomeWork() }}>
                  {
                    homeWork == false ? "Flexible" : "Obligatorio"
                  }
                  <CaretD2 />
                </Selected>
                {
                  openHw == true &&
                  <OptionContain>
                    <Option onClick={() => { setOpenHw(false), setHomeWork(false) }}>
                      <input
                        type="radio"
                        id="HomeWork"
                        value="homework 1"
                      />
                      <Label2 > Flexible</Label2>
                    </Option>
                    <Option onClick={() => { setOpenHw(false), setHomeWork(true) }}>
                      <input
                        type="radio"
                        id="HomeWork"
                        value="homework 1"
                      />
                      <Label2 >Obligatorio</Label2>
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
            <Label>Frase descriptiva icónica</Label>
            <InputBig
              placeholder="Frase descriptiva"
              className={`form-control ${errors.coursePhrase ? 'is-invalid' : ''}`}
              {...register("coursePhrase")}
            />
          </InputContain>

          <InputContain onClick={(e) => { e.stopPropagation(); }}>
            <Label>Nivel de Dificultad</Label>
            <IconContain>

              <SelectContain key={3}>
                <Selected onClick={() => { handleOpenLevel() }}>
                  {
                    difficultyValue == "" ? "Seleccione una Dificultad" : difficultyValue
                  }
                  <CaretD2 />
                </Selected>
                {
                  openLevel == true &&
                  <OptionContain>
                    {
                      difficulty.map((val) => {
                        return (
                          <Option onClick={() => { setOpenLevel(false), setDifficultyValue(val) }} key={"difficulty " + val}>
                            <input
                              type="radio"
                              id="difficulty"
                              value="difficulty"
                            />
                            <Label2 > {val}</Label2>
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
            <Label>Material</Label>
            <IconContain>

              <SelectContain key={2}>
                <Selected onClick={() => { handleOpenMaterial() }} style={{ height: "auto" }}>
                  {material.length == 0 ? "Seleccione un material" : material.length > 1 ? material + " " : material}
                  <CaretD2 />
                </Selected>
                {
                  openMaterial == true &&
                  <OptionContain>
                    {
                      materials.map((val: any, index: any) => {
                        return (
                          <OptionCat
                            category={val.name}
                            marked={value2}
                            key={"SelectCategory" + index}
                            onClick={() => {
                              addMaterial(val.name, index)
                            }}>
                            <input
                              type="radio"
                              id="category"
                              name="category"
                              value="Category"
                            />
                            <Label2>{val.name}</Label2>
                          </OptionCat>
                        )
                      })
                    }
                  </OptionContain>
                }
              </SelectContain>
            </IconContain>

          </InputContain>
        </InputForm>
        {/* LINEA 4 */}
        <InputForm>
          <InputContain onClick={(e) => { e.stopPropagation(); }}>
            <Label>Objetivos</Label>
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
            {
              (value3 == "Producto") &&
              <>
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
              </>
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
            <InputContain onClick={(e) => { e.stopPropagation(); }}>
              <Label>Categorías</Label>
              <IconContain>
                <SelectContain key={2}>
                  <Selected onClick={() => { handleOpenCategory() }} style={{ height: "auto" }}>
                    {value2.length == 0 ? "Seleccione una categoria" : value2.length > 1 ? value2 + " " : value2}
                    <CaretD2 />
                  </Selected>
                  {
                    openCategory == true &&
                    <OptionContain>
                      {
                        categories.map((val: any, index: any) => {
                          return (
                            <OptionCat
                              category={val.name}
                              marked={value2}
                              key={"SelectCategory" + index}
                              onClick={() => {
                                addCategories(val.name, index)
                              }}>
                              <input
                                type="radio"
                                id="category"
                                name="category"
                                value="Category"
                              />
                              <Label2>{val.name}</Label2>
                            </OptionCat>
                          )
                        })
                      }
                    </OptionContain>
                  }
                </SelectContain>
              </IconContain>
            </InputContain>
            <InputContain onClick={(e) => { e.stopPropagation(); }}>
              <Label>Color</Label>
              <IconContain>
                <SelectContain key={2}>
                  <Selected onClick={() => { handleOpenColor() }} style={{ height: "auto" }}>
                    {colorRGB == "" ? "Seleccione un color" : colorRGB}
                    <CaretD2 />
                  </Selected>
                  {
                    openColor == true &&
                    <OptionContain>
                      {
                        color.map((val: any, index: any) => {
                          return (
                            <OptionColor
                              color={val}
                              onClick={() => { setOpenColor(false), setColorRGB(val) }}
                              key={"SelectColor " + index}>
                              <input
                                type="radio"
                                id="color"
                                name="color"
                                value="color"
                              />
                              <Label2>{val}</Label2>
                            </OptionColor>
                          )
                        })
                      }
                    </OptionContain>
                  }
                </SelectContain>
              </IconContain>
            </InputContain>
          </InputContain2>
        </InputForm>
        <InputForm style={{ justifyContent: "center" }}>
          <ButtonContain >
            {!creatingNewCourse ?
              <Button type='submit' onClick={(e) => { e.stopPropagation(); setMissing(true) }}>Crear Curso</Button>
              :
              <LoaderContain />
            }
          </ButtonContain>
        </InputForm>
      </form>}
    </CourseFormContain>
  )
}
export default CourseForm_Create;