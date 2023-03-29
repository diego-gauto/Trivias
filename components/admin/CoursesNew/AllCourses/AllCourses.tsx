import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { OptionColor, SelectOption } from '../Courses.styled';
import { IAllCourses, ICategories, IMaterials, IProfessors } from './IAllCourses';
const AllCourses = (props: IAllCourses) => {
  const router = useRouter();
  const [startEdit, setStartEdit] = useState<boolean>(false);
  const [openDifficultySelect, setOpenDifficultySelect] = useState<boolean>(false);
  const [openSequentialSelect, setOpenSequentialSelect] = useState<boolean>(false);
  const [openColorSelect, setOpenColorSelect] = useState<boolean>(false);
  const [openProductTypeSelect, setOpenProductTypeSelect] = useState<boolean>(false);
  const [openProfessorsSelect, setOpenProfessorsSelect] = useState<boolean>(false);
  const [openCategoriesSelect, setOpenCategoriesSelect] = useState<boolean>(false);
  const [openMaterialsSelect, setOpenMaterialsSelect] = useState<boolean>(false);
  const [openPublishSelect, setOpenPublishSelect] = useState<boolean>(false);
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
  } = props;
  const [course, setCourse] = useState({
    title: title,
    subtitle: subtitle,
    about: about,
    difficulty: difficulty,
    mandatory: mandatory,
    image: image,
    phrase: phrase,
    certificate_color: certificate_color,
    price: price,
    rating: rating,
    reviews: reviews,
    duration: duration,
    type: type,
    sequential: sequential,
    professors: professors,
    categories: categories,
    materials: materials,
    published: published,
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
    "Free",
    "Monthly",
    "Product",
  ];
  const color = [
    "azul", "amarillo", "morado", "naranja", "rosa", "verde"
  ];
  const publishedData = [
    "Publicado", "No Publicado"
  ]
  const GonvarImg = "/images/purchase/logo.png";
  const addProfessors = (val: any) => {
    let tempProfessor = course.professors;
    let tempIndex = 0;
    if (tempProfessor.some((e: any) => e.id === val.id)) {
      tempIndex = tempProfessor.findIndex((x: any) =>
        x.id == val.id
      )
      tempProfessor.splice(tempIndex, 1);
    }
    else {
      tempProfessor.push(val)
    }
    setCourse({ ...course, professors: tempProfessor })
  }
  const addCategories = (val: any) => {
    let tempCategory = course.categories;
    let tempIndex = 0;
    if (tempCategory.some((e: any) => e.id === val.id)) {
      tempIndex = tempCategory.findIndex((x: any) =>
        x.id == val.id
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
    if (tempMaterials.some((e: any) => e.id === val.id)) {
      tempIndex = tempMaterials.findIndex((x: any) =>
        x.id == val.id
      )
      tempMaterials.splice(tempIndex, 1);
    }
    else {
      tempMaterials.push(val)
    }
    setCourse({ ...course, materials: tempMaterials })
  }
  const editCourse = () => {

  }
  const goToSeasons = () => {
    router.push({ pathname: `/admin/Courses/${id}` })
  }
  const deleteCourse = () => {

  }
  return (
    <div className="edit-course" id={`course-${index}`}>
      <div className="title-contain" onClick={() => { openCourse(index), moveTo(index) }}>
        <p className="title">{title} {type === "Monthly" && <img src={GonvarImg} style={{ width: 30 }} />}</p>
        {
          index === openCourseEdit
            ? <RiArrowDropUpLine className="arrow" />
            : <RiArrowDropDownLine className="arrow" />
        }
      </div>
      {
        index === openCourseEdit &&
        <div className="course-content">
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
                  <SelectOption onClick={() => setOpenDifficultySelect(!openDifficultySelect)}>
                    {
                      course.difficulty
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
                  <SelectOption onClick={() => setOpenSequentialSelect(!openSequentialSelect)}>
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
                  <SelectOption onClick={() => setOpenColorSelect(!openColorSelect)}>
                    {
                      course.certificate_color
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
                Duracion
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
                  <SelectOption onClick={() => setOpenProfessorsSelect(!openProfessorsSelect)}>
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
                  <SelectOption onClick={() => setOpenCategoriesSelect(!openCategoriesSelect)}>
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
                  <SelectOption onClick={() => setOpenMaterialsSelect(!openMaterialsSelect)}>
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
                Published
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
          </div>
          <div className="rows" style={{ justifyContent: "center", marginTop: 10 }}>
            <div className="button-data">
              <button
                className="edit-button"
                onClick={() => setStartEdit(!startEdit)}
              >
                {!startEdit ? "Iniciar Edición" : "Cancelar Edición"}
              </button>
            </div>
            <div className="button-data">
              {
                !startEdit
                  ?
                  <button
                    className="delete-button"
                    onClick={() => deleteCourse()}
                  >
                    Eliminar
                  </button>
                  :
                  <button
                    className="save-button"
                    onClick={() => editCourse()}
                  >
                    Editar Curso
                  </button>
              }
            </div>
          </div>

          {
            !startEdit &&
            <div className="rows" style={{ justifyContent: "center" }}>
              <div className="button-data">
                <button
                  className="save-button"
                  onClick={() => goToSeasons()}
                >
                  Ver Lecciones
                </button>
              </div>
            </div>
          }

        </div>
      }
    </div>
  )
}
export default AllCourses;