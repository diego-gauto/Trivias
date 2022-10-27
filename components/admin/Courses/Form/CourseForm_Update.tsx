import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderContain } from "../../../../containers/Profile/User/User.styled";
import { updateCourse } from "../../../../store/actions/AdminActions";
import { getCategory, getUsers } from "../../../../store/actions/courseActions";
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
  OptionCat,
} from "./Select/SelectStyles.styled";

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
  courseType: string;
  courseHomeWork: boolean;
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
  const { courseType } = props;
  const { courseHomeWork } = props;
  const { coursePublishYear } = props;
  const { courseSubtittle } = props;
  const { documentID } = props;
  const { coursePath } = props;
  const { reference } = props;

  const [IsUpdating, setIsUpdating] = useState<boolean>(false);
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
  const [openProfessor, setOpenProfessor] = useState<boolean>(false);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openMembership, setOpenMembership] = useState<boolean>(false);
  const [openHw, setOpenHw] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>([]);
  const [name, setName] = useState(courseProfessor.name);
  const [value, setValue] = useState<any>({})
  const [homeWork, setHomeWork] = useState(courseHomeWork);
  const [free, setFree] = useState(courseType == "Gratis" ? 0 : 1)
  const [value2, setValue2] = useState<any>([])
  const [image, setImage] = useState<any>(coursePath)
  const [images, setimages] = useState<any>("")
  const [value3, setValue3] = useState(courseType)
  const [userData, setUserData] = useState<any>([]);

  const addCategories = (val: any, index: any) => {
    let tempCategories = value2
    let tempIndex = 0;
    console.log(index)
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
  useEffect(() => {
    setValue2(courseCategory)
    setValue(courseProfessor)
  }, []);


  const onSubmit: SubmitHandler<FormValues> = formData => {
    setIsUpdating(true);
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
        coursePrice: formData.coursePrice,
        courseProfessor: professor,
        courseCategory: category,
        courseType: type,
        courseHomeWork: homeWork,
        documentID: documentID,
      },
    };

    updateCourse(signUpData, images).then(() => {
      window.location.href = `/admin/Edit?documentID=${signUpData.data.documentID}`;
      setIsUpdating(false);
    });

  }
  const getImage = (file: any) => {
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
  const getAllCategories = () => {
    getCategory().then((res) => {
      setCategories(res);
      return res;
    })
  }
  const handleOpenHomeWork = () => {
    setOpenHw(!openHw);
    setOpenProfessor(false);
    setOpenCategory(false);
    setOpenMembership(false);
  }
  const handleOpenProfessor = () => {
    setOpenHw(false);
    setOpenProfessor(!openProfessor);
    setOpenCategory(false);
    setOpenMembership(false);
  }
  const handleOpenCategory = () => {
    setOpenHw(false);
    setOpenProfessor(false);
    setOpenCategory(!openCategory);
    setOpenMembership(false);
  }
  const handleOpenMembership = () => {
    setOpenHw(false);
    setOpenProfessor(false);
    setOpenCategory(false);
    setOpenMembership(!openMembership);
  }

  useEffect(() => {
    getProffessors();
    getAllCategories();
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
                <Selected onClick={() => { handleOpenProfessor() }}>
                  {name}
                  <CaretD2 />
                </Selected>
                {
                  openProfessor == true &&
                  <OptionContain>
                    {
                      userData.map((val: any, index: any) => {
                        return (
                          <Option
                            key={"SelectProfessor" + index}
                            onClick={() => {
                              setName(val.name);
                              setValue({ id: val.id, name: val.name });
                              setOpenProfessor(false)
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
                        name="category"
                        value="Temporada 1"
                      />
                      <Label2 > Gratis</Label2>
                    </Option>
                    <Option onClick={() => { setValue3("Mensual"); setOpenMembership(false); setFree(0) }}>
                      <input
                        type="radio"
                        id="Temporada1"
                        name="category"
                        value="Temporada 1"
                      />
                      <Label2 > Gonvar +</Label2>
                    </Option>
                    <Option onClick={() => { setValue3("Producto"); setOpenMembership(false); setFree(1) }}>
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
          {/* <InputContain>
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

          </InputContain> */}
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

            {
              free != 0 &&
              <>
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
              </>
            }

          </InputContain2>
          <InputButtonContain>


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
              <InputContain onClick={(e) => { e.stopPropagation(); }}>
                <Label>Categorías</Label>
                <IconContain>

                  <SelectContain key={2}>
                    <Selected onClick={() => { handleOpenCategory() }}>
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
              {!IsUpdating ? <Button type='submit'>Guardar Cambios</Button>
                :
                <LoaderContain />}
            </ButtonContain2>
          </InputButtonContain>
        </InputForm>
      </form>
    </CourseFormContain>
  )
}
export default CourseForm;