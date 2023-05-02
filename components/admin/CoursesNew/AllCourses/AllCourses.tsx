import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { updateCourseImage } from '../../../../store/actions/courseActions';
import { updateCourseApi } from '../../../api/courses';
import { getUserApi } from '../../../api/users';
import { LoaderButton, OptionColor, SelectOption } from '../Courses.styled';
import { IAllCourses, ICategories, IMaterials, IProfessors } from './IAllCourses';
const AllCourses = (props: IAllCourses) => {
  const router = useRouter();
  const [startEdit, setStartEdit] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [openDifficultySelect, setOpenDifficultySelect] = useState<boolean>(false);
  const [openSequentialSelect, setOpenSequentialSelect] = useState<boolean>(false);
  const [openColorSelect, setOpenColorSelect] = useState<boolean>(false);
  const [openProductTypeSelect, setOpenProductTypeSelect] = useState<boolean>(false);
  const [openProfessorsSelect, setOpenProfessorsSelect] = useState<boolean>(false);
  const [openCategoriesSelect, setOpenCategoriesSelect] = useState<boolean>(false);
  const [openMaterialsSelect, setOpenMaterialsSelect] = useState<boolean>(false);
  const [openPublishSelect, setOpenPublishSelect] = useState<boolean>(false);
  const [courseImage, setCourseImage] = useState("");
  const [errors, setErrors] = useState<any>({
    errorTitle: false,
    errorSubtitle: false,
    errorAbout: false,
    errorDifficulty: false,
    errorImage: false,
    errorPhrase: false,
    errorColor: false,
    errorPrice: false,
    errorRating: false,
    errorReviews: false,
    errorDuration: false,
    errorProfessor: false,
    errorCategory: false,
  });
  const {
    title,
    subtitle,
    about,
    difficulty,
    sequential,
    certificate_color,
    rating,
    reviews,
    image,
    type,
    price,
    duration,
    phrase,
    mandatory,
    route,
    course_number,
    professors,
    categories,
    materials,
    openCourseEdit,
    openCourse,
    moveTo,
    allProfessors,
    allCategories,
    allMaterials,
    published,
    id,
    index,
    getAllCourses,
  } = props;
  const [course, setCourse] = useState<any>({
    id: props.id,
    title: props.title,
    subtitle: props.subtitle,
    about: props.about,
    difficulty: props.difficulty,
    mandatory: props.mandatory,
    image: props.image,
    phrase: props.phrase,
    certificate_color: props.certificate_color,
    price: props.price,
    rating: props.rating,
    reviews: props.reviews,
    duration: props.duration,
    course_number: props.course_number,
    route: props.route,
    type: props.type,
    sequential: props.sequential,
    professors: props.professors,
    categories: props.categories,
    materials: props.materials,
    published: props.published,
  })
  const difficultyData = [
    "Muy Fácil",
    "Fácil",
    "Intermedio",
    "Avanzado",
    "Máster",
  ];
  const sequentialData = [
    "Flexible",
    "Obligatorio",
  ];
  const membershipType = [
    "Gratis",
    "Mensual",
    "Producto",
  ];
  const color = [
    "azul", "amarillo", "morado", "naranja", "rosa", "verde"
  ];
  const publishedData = [
    "Publicado", "No Publicado"
  ]
  const GonvarImg = "/images/purchase/logo.png";
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUserData(res);
      })
    }
  }, [])
  const addProfessors = (val: any) => {
    let tempProfessor = course.professors;
    let tempIndex = 0;
    if (tempProfessor.some((e: any) => e.professors_id === val.professors_id)) {
      tempIndex = tempProfessor.findIndex((x: any) =>
        x.professors_id == val.professors_id
      )
      tempProfessor.splice(tempIndex, 1);
    }
    else {
      tempProfessor.push(val)
    }
    setCourse({ ...course, professors: tempProfessor })
  }
  const getImage = (file: any) => {
    var reader: any = new FileReader();
    var imageComp: any = new Image();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event: any) => {
      imageComp.src = reader.result;
    };
    setTimeout(() => {
      setCourse({ ...course, image: reader.result })
      setCourseImage(reader.result)
      // if ((imageComp.width == 760 && imageComp.height == 420) || (imageComp.width == 4000 && imageComp.height == 2250)) {
      //   setLesson({ ...lesson, banner: reader.result })
      //   alert("Imagen aceptada")
      // }
      // else {
      //   alert("La imagen debe tener una resolución de 4000 px x 2250 px o 760 px × 420 px")
      // }
    }, 1000);
  }
  const addCategories = (val: any) => {
    let tempCategory = course.categories;
    let tempIndex = 0;
    if (tempCategory.some((e: any) => e.categories_id === val.categories_id)) {
      tempIndex = tempCategory.findIndex((x: any) =>
        x.categories_id == val.categories_id
      )
      tempCategory.splice(tempIndex, 1);
    }
    else {
      tempCategory.push(val)
    }
    setCourse({ ...course, categories: tempCategory })
  }
  const addMaterials = (val: any) => {
    let tempMaterials = course.materials;
    let tempIndex = 0;
    if (tempMaterials.some((e: any) => e.materials_id === val.materials_id)) {
      tempIndex = tempMaterials.findIndex((x: any) =>
        x.materials_id == val.materials_id
      )
      tempMaterials.splice(tempIndex, 1);
    }
    else {
      tempMaterials.push(val)
    }
    setCourse({ ...course, materials: tempMaterials })
  }
  const editCourse = async () => {
    if (userData.role === "admin" && userData.roles[0].edit === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    setLoader(true);
    let tempErrors: any = {
      errorTitle: course.title === "" ? true : false,
      errorSubtitle: course.subtitle === "" ? true : false,
      errorAbout: course.about === "" ? true : false,
      errorDifficulty: course.difficulty === "" ? true : false,
      errorImage: course.image === "" ? true : false,
      errorPhrase: course.phrase === "" ? true : false,
      errorColor: course.certificate_color === "" ? true : false,
      errorPrice: (course.type === "Gratis" || course.type === "Mensual") ? false : (course.price === 0 ? true : false),
      errorRating: course.rating === 0 ? true : false,
      // errorReviews: course.reviews === 0 ? true : false,
      errorDuration: (course.type === "Gratis" || course.type === "Mensual") ? false : (course.duration === 0 ? true : false),
      errorProfessor: course.professors.length === 0 ? true : false,
      // errorCategory: course.categories.length === 0 ? true : false,
    }
    setErrors(tempErrors)
    let checkErrors = Object.values(tempErrors).includes(true);
    if (!checkErrors) {
      if (course.type === "Gratis") {
        course.price = 0;
        course.duration = 0;
      }
      if (course.type === "Mensual") {
        course.duration = 30;
      }
      if (courseImage !== "") {
        await updateCourseImage(course.id, course.image).then((res: any) => {
          course.image = res;
        })
      }
      setLoader(true);
      updateCourseApi(course).then(() => {
        setStartEdit(false);
        getAllCourses();
        setLoader(false);
      })
    }
    else {
      setLoader(false);
    }

  }
  const goToSeasons = () => {
    router.push({
      pathname: "/admin/CourseSeason",
      query: {
        course: id,
      }
    })
  }
  const deleteCourse = () => {

  }
  return (
    <div className="edit-course" id={`course-${index}`}>
      <div className="title-contain" onClick={() => { openCourse(index), moveTo(index) }}>
        <p className="title">{type === "Mensual" && <img src={GonvarImg} style={{ width: 30 }} />} {title} </p>
        {
          index === openCourseEdit
            ? <RiArrowDropUpLine className="arrow" />
            : <RiArrowDropDownLine className="arrow" />
        }
      </div>

      {
        index === openCourseEdit &&
        <div className="course-content">
          <div className="course-image" >
            <img src={course.image} />
          </div>
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Título
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {title}
                  </p>
                  :
                  <input
                    className="input-edit"
                    defaultValue={title}
                    placeholder="Titulo del Curso"
                    style={errors.errorTitle ? { border: "1px solid red" } : {}}
                    onChange={(e: any) => {
                      setCourse({
                        ...course, title: e.target.value
                      })
                    }}
                  />
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Subtítulo
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {subtitle}
                  </p>
                  :
                  <input
                    className="input-edit"
                    defaultValue={subtitle}
                    placeholder="Subtitulo del Curso"
                    style={errors.errorSubtitle ? { border: "1px solid red" } : {}}
                    onChange={(e: any) => {
                      setCourse({
                        ...course, subtitle: e.target.value
                      })
                    }}
                  />
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Descripción
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {about}
                  </p>
                  :
                  <input
                    className="input-edit"
                    defaultValue={about}
                    placeholder="Descripcion del Curso"
                    style={errors.errorAbout ? { border: "1px solid red" } : {}}
                    onChange={(e: any) => {
                      setCourse({
                        ...course, about: e.target.value
                      })
                    }}
                  />
              }
            </div>
          </div>
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Dificultad
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {difficulty}
                  </p>
                  :
                  <SelectOption
                    onClick={() => setOpenDifficultySelect(!openDifficultySelect)}
                    style={errors.errorDifficulty ? { border: "1px solid red" } : {}}
                  >
                    {
                      course.difficulty ? course.difficulty : "Seleccione una dificultad"
                    }
                    {
                      openDifficultySelect
                        ? <RiArrowDropUpLine className="arrow" />
                        : <RiArrowDropDownLine className="arrow" />
                    }
                    {
                      openDifficultySelect &&
                      <div className="options">
                        {
                          difficultyData.map((val: string, index: number) => {
                            return (
                              <div
                                className="map-options"
                                key={"difficulty-edit_" + index}
                                onClick={() => setCourse({
                                  ...course, difficulty: val
                                })}
                              >
                                {val}
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </SelectOption>
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Secuencial
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {sequential ? "Obligatorio" : "Flexible"}
                  </p>
                  :
                  <SelectOption
                    onClick={() => setOpenSequentialSelect(!openSequentialSelect)}>
                    {
                      course.sequential ? "Obligatorio" : "Flexible"
                    }
                    {
                      openSequentialSelect
                        ? <RiArrowDropUpLine className="arrow" />
                        : <RiArrowDropDownLine className="arrow" />
                    }
                    {
                      openSequentialSelect &&
                      <div className="options">
                        {
                          sequentialData.map((val: string, index: number) => {
                            return (
                              <div
                                className="map-options"
                                key={"secuencial-edit_" + index}
                                onClick={() => setCourse({
                                  ...course, sequential: val === "Flexible" ? false : true
                                })}
                              >
                                {val}
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </SelectOption>
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Color
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {certificate_color}
                  </p>
                  :
                  <SelectOption
                    onClick={() => setOpenColorSelect(!openColorSelect)}
                    style={errors.errorColor ? { border: "1px solid red" } : {}}
                  >
                    {
                      course.certificate_color ? course.certificate_color : "Seleccione un color"
                    }
                    {
                      openColorSelect
                        ? <RiArrowDropUpLine className="arrow" />
                        : <RiArrowDropDownLine className="arrow" />
                    }
                    {
                      openColorSelect &&
                      <div className="options">
                        {
                          color.map((val: string, index: number) => {
                            return (
                              <OptionColor
                                color={val}
                                key={"color-edit_" + index}
                                onClick={() => setCourse({
                                  ...course, certificate_color: val
                                })}
                              >
                                {val}
                              </OptionColor>
                            )
                          })
                        }
                      </div>
                    }
                  </SelectOption>
              }
            </div>
          </div>
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Calificación
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {rating}
                  </p>
                  :
                  <input
                    className="input-edit"
                    defaultValue={rating}
                    placeholder="Rating del Curso"
                    style={errors.errorRating ? { border: "1px solid red" } : {}}
                    onChange={(e: any) => {
                      setCourse({
                        ...course, rating: parseInt(e.target.value)
                      })
                    }}
                  />
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Reviews
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {reviews}
                  </p>
                  :
                  <input
                    className="input-edit"
                    defaultValue={reviews}
                    placeholder="Reviews del Curso"
                    style={errors.errorReviews ? { border: "1px solid red" } : {}}
                    onChange={(e: any) => {
                      setCourse({
                        ...course, reviews: parseInt(e.target.value)
                      })
                    }}
                  />
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Tipo
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {type}
                  </p>
                  :
                  <SelectOption onClick={() => setOpenProductTypeSelect(!openProductTypeSelect)}>
                    {
                      course.type
                    }
                    {
                      openProductTypeSelect
                        ? <RiArrowDropUpLine className="arrow" />
                        : <RiArrowDropDownLine className="arrow" />
                    }
                    {
                      openProductTypeSelect &&
                      <div className="options">
                        {
                          membershipType.map((val: string, index: number) => {
                            return (
                              <div
                                className="map-options"
                                key={"membresia_" + index}
                                onClick={() => setCourse({
                                  ...course, type: val
                                })}
                              >
                                {val}
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </SelectOption>
              }
            </div>
          </div>
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Precio
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {price}
                  </p>
                  :
                  <input
                    className="input-edit"
                    defaultValue={price}
                    placeholder="Precio del Curso"
                    style={errors.errorPrice ? { border: "1px solid red" } : {}}
                    onChange={(e: any) => {
                      setCourse({
                        ...course, price: parseInt(e.target.value)
                      })
                    }}
                  />
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Duracion (dias)
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {type === "Monthly" ? "30 Dias" : duration}
                  </p>
                  :
                  <input
                    className="input-edit"
                    defaultValue={duration}
                    placeholder="Duracion del Curso"
                    style={errors.errorDuration ? { border: "1px solid red" } : {}}
                    onChange={(e: any) => {
                      setCourse({
                        ...course, duration: parseInt(e.target.value)
                      })
                    }}
                  />
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Frase descriptiva
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {phrase}
                  </p>
                  :
                  <input
                    className="input-edit"
                    defaultValue={phrase}
                    placeholder="Frase del Curso"
                    style={errors.errorPhrase ? { border: "1px solid red" } : {}}
                    onChange={(e: any) => {
                      setCourse({
                        ...course, phrase: e.target.value
                      })
                    }}
                  />
              }
            </div>
          </div>
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Instructor (es)
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {
                      professors.length > 0
                        ? professors.map((prof: IProfessors, index: number) => {
                          return <React.Fragment key={"showProf_" + index}>{prof.name}<br /></React.Fragment>
                        })
                        : "Sin Instructor"
                    }
                  </p>
                  :
                  <SelectOption
                    onClick={() => setOpenProfessorsSelect(!openProfessorsSelect)}
                    style={errors.errorProfessor ? { border: "1px solid red" } : {}}
                  >
                    {
                      course.professors.length > 0
                        ? course.professors.map((val: IProfessors, index: number) => { return <React.Fragment key={"profNameEdit_" + index}>{val.name}<br /></React.Fragment> })
                        : "Seleccione un professor"
                    }
                    {
                      openProfessorsSelect
                        ? <RiArrowDropUpLine className="arrow" />
                        : <RiArrowDropDownLine className="arrow" />
                    }
                    {
                      openProfessorsSelect &&
                      <div className="options">
                        {
                          allProfessors.map((val: IProfessors, index: number) => {
                            return (
                              <div
                                className="map-options"
                                key={"professors-edit_" + index}
                                onClick={() => addProfessors(val)}
                              >
                                {val.name}
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </SelectOption>
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Categoría
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {
                      categories.length > 0
                        ? categories.map((cat: ICategories, index: number) => {
                          return <React.Fragment key={"showCat_" + index}>{cat.name}<br /></React.Fragment>
                        })
                        : "Sin Categorías"
                    }
                  </p>
                  :
                  <SelectOption
                    onClick={() => setOpenCategoriesSelect(!openCategoriesSelect)}
                    style={errors.errorCategory ? { border: "1px solid red" } : {}}
                  >
                    {
                      course.categories.length > 0
                        ? course.categories.map((val: ICategories, index: number) => { return <React.Fragment key={"catNameEdit_" + index}>{val.name}<br /></React.Fragment> })
                        : "Seleccione una categoria"
                    }
                    {
                      openCategoriesSelect
                        ? <RiArrowDropUpLine className="arrow" />
                        : <RiArrowDropDownLine className="arrow" />
                    }
                    {
                      openCategoriesSelect &&
                      <div className="options">
                        {
                          allCategories.map((val: ICategories, index: number) => {
                            return (
                              <div
                                className="map-options"
                                key={"category-edit_" + index}
                                onClick={() => addCategories(val)}
                              >
                                {val.name}
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </SelectOption>
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Materiales
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {
                      materials.length > 0
                        ? materials.map((mat: IMaterials, index: number) => {
                          return <React.Fragment key={"showMat_" + index}>{mat.name}<br /></React.Fragment>
                        })
                        : "Sin Materiales"
                    }
                  </p>
                  :
                  <SelectOption
                    onClick={() => setOpenMaterialsSelect(!openMaterialsSelect)}
                  >
                    {
                      course.materials.length > 0
                        ? course.materials.map((val: IMaterials, index: number) => { return <React.Fragment key={"matNameEdit_" + index}>{val.name}<br /></React.Fragment> })
                        : "Seleccione un material"
                    }
                    {
                      openMaterialsSelect
                        ? <RiArrowDropUpLine className="arrow" />
                        : <RiArrowDropDownLine className="arrow" />
                    }
                    {
                      openMaterialsSelect &&
                      <div className="options">
                        {
                          allMaterials.map((val: IMaterials, index: number) => {
                            return (
                              <div
                                className="map-options"
                                key={"material-edit_" + index}
                                onClick={() => addMaterials(val)}
                              >
                                {val.name}
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </SelectOption>
              }
            </div>
          </div>
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Publicado
              </label>
              {
                !startEdit
                  ?
                  <p className="content">
                    {published ? "Publicado" : "No Publicado"}
                  </p>
                  :
                  <SelectOption onClick={() => setOpenPublishSelect(!openPublishSelect)}>
                    {
                      course.published ? "Publicado" : "No publicado"
                    }
                    {
                      openPublishSelect
                        ? <RiArrowDropUpLine className="arrow" />
                        : <RiArrowDropDownLine className="arrow" />
                    }
                    {
                      openPublishSelect &&
                      <div className="options">
                        {
                          publishedData.map((val: string, index: number) => {
                            return (
                              <div
                                className="map-options"
                                key={"published_" + index}
                                onClick={() => setCourse({
                                  ...course, published: val === "Publicado" ? true : false
                                })}
                              >
                                {val}
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </SelectOption>
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Ruta de Aprendizaje
              </label>
              {
                !startEdit ?
                  <p className="content">
                    {route ? route : "Sin ruta"}
                  </p>
                  :
                  <select onChange={(e) => { setCourse({ ...course, route: e.target.value }) }} value={course.route} >
                    <option value="estructura">Estructura</option>
                    <option value="arte">Arte</option>
                  </select>
              }
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Numero del curso
              </label>
              {
                !startEdit ?
                  <p className="content">
                    {course_number}
                  </p>
                  :
                  <input
                    className="input-edit"
                    type="number"
                    defaultValue={course_number}
                    placeholder="Orden del curso"
                    onChange={(e: any) => {
                      setCourse({
                        ...course, course_number: parseInt(e.target.value)
                      })
                    }}
                  />
              }
            </div>
          </div>
          {
            startEdit &&
            <div className='rows'>
              <div className="course-data">
                <label className="course-data-title">Portada del curso</label>
                <input
                  type="file"
                  className="input-edit"
                  placeholder="Seleccione una imagen"
                  onChange={(e) => { getImage(e.target.files) }}
                />
              </div>
            </div>
          }
          <div className="rows" style={{ justifyContent: "center", marginTop: 10 }}>
            <div className="button-data">
              <button
                className="edit-button"
                onClick={() => setStartEdit(!startEdit)}
              >
                {!startEdit ? "Iniciar Edición" : "Cancelar Edición"}
              </button>
            </div>
            {
              !startEdit &&
              <div className="button-data">
                <button
                  className="save-button"
                  onClick={() => goToSeasons()}
                >
                  Ver Temporadas
                </button>
              </div>
            }
            <div className="button-data">
              {
                startEdit
                &&
                <>
                  {
                    !loader ?
                      <button
                        className="save-button"
                        onClick={() => editCourse()}
                      >
                        Editar Curso
                      </button>
                      : <LoaderButton />
                  }
                </>

              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}
export default AllCourses;