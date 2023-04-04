import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { updateCourseImage } from '../../../store/actions/courseActions';
import { createCategoryApi, getCategoriesApi, updateCategoryApi } from '../../api/categories';
import { createCoursesApi, deleteCourseApi, getCoursesApi, updateCourseApi, updateCourseImageFromApi } from '../../api/courses';
import { createMaterialApi, getMaterialsApi, updateMaterialApi } from '../../api/materials';
import { createProfessorApi, getProfessorApi, updateProfessorApi } from '../../api/professors';
import { AdminContain } from '../SideBar.styled';
import AllCourses from './AllCourses/AllCourses';
import { CourseContainer, LoaderButton, OptionColor, SelectOption } from './Courses.styled';
import { ICategories, ICourses, IMaterials, IProfessors } from './ICourses';

const Courses = () => {
  const [loader, setLoader] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [professors, setProfessors] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [materials, setMaterials] = useState<any>([]);
  const [openDifficultySelect, setOpenDifficultySelect] = useState<boolean>(false);
  const [openSequentialSelect, setOpenSequentialSelect] = useState<boolean>(false);
  const [openColorSelect, setOpenColorSelect] = useState<boolean>(false);
  const [openProductTypeSelect, setOpenProductTypeSelect] = useState<boolean>(false);
  const [openProfessorsSelect, setOpenProfessorsSelect] = useState<boolean>(false);
  const [openCategoriesSelect, setOpenCategoriesSelect] = useState<boolean>(false);
  const [openMaterialsSelect, setOpenMaterialsSelect] = useState<boolean>(false);
  const [openPublishSelect, setOpenPublishSelect] = useState<boolean>(false);
  const [openCourseEdit, setOpenCourseEdit] = useState<number>(-1);
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
    errorMaterial: false
  });
  const [course, setCourse] = useState<any>({
    title: "",
    subtitle: "",
    about: "",
    difficulty: "",
    mandatory: false,
    image: "",
    phrase: "",
    certificate_color: "",
    price: 0,
    rating: 0,
    reviews: 0,
    duration: 0,
    type: "Gratis",
    sequential: false,
    published: true,
    professors: [],
    categories: [],
    materials: [],
  })
  const difficulty = [
    "Muy Fácil",
    "Fácil",
    "Intermedio",
    "Avanzado",
    "Máster",
  ];
  const sequential = [
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
  const published = [
    "Publicado", "No Publicado"
  ]
  const openCourse = (courseIndex: number) => {
    if (openCourseEdit === courseIndex) {
      setOpenCourseEdit(-1);
    }
    else {
      setOpenCourseEdit(courseIndex);
    }
  }
  const moveTo = (index: number) => {
    let element = document.getElementById(`course-${index}`);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  const getImage = (file: any) => {
    var reader = new FileReader();
    var imageComp: any = new Image();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      imageComp.src = reader.result;
    };
    setTimeout(() => {
      setCourse({ ...course, image: reader.result })
      // if ((imageComp.width == 760 && imageComp.height == 420) || (imageComp.width == 4000 && imageComp.height == 2250)) {
      //   setLesson({ ...lesson, banner: reader.result })
      //   alert("Imagen aceptada")
      // }
      // else {
      //   alert("La imagen debe tener una resolución de 4000 px x 2250 px o 760 px × 420 px")
      // }
    }, 1000);
  }
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
  const createCourse = () => {
    setLoader(true);
    let tempErrors: any = {
      errorTitle: course.title === "" ? true : false,
      errorSubtitle: course.subtitle === "" ? true : false,
      errorAbout: course.about === "" ? true : false,
      errorDifficulty: course.difficulty === "" ? true : false,
      errorImage: course.image === "" ? true : false,
      errorPhrase: course.phrase === "" ? true : false,
      errorColor: course.certificate_color === "" ? true : false,
      errorPrice: course.type === "Gratis" ? false : (course.price === 0 ? true : false),
      errorRating: course.rating === 0 ? true : false,
      errorReviews: course.reviews === 0 ? true : false,
      errorDuration: (course.type === "Gratis" || course.type === "Mensual") ? false : (course.duration === 0 ? true : false),
      errorProfessor: course.professors.length === 0 ? true : false,
      errorCategory: course.categories.length === 0 ? true : false,
      errorMaterial: course.materials.length === 0 ? true : false
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
      let tempImage = course.image;
      course.image = "";
      createCoursesApi(course).then((res) => {
        course.id = res;
        updateCourseImage(course.id, tempImage).then((image) => {
          course.image = image;
          updateCourseImageFromApi(course).then(() => {
            getCoursesApi().then((res) => {
              setLoader(false);
              setCourses(res.data.data);
            });
          })
        })
      })
    }
    else {
      setLoader(false);
    }

  }
  useEffect(() => {
    getProfessorApi().then((profs) => {
      profs.forEach((element: any) => {
        element.professors_id = element.id;
      });
      setProfessors(profs)
    })
    getMaterialsApi().then((mats) => {
      mats.forEach((element: any) => {
        element.materials_id = element.id;
      });
      setMaterials(mats)
    })
    getCategoriesApi().then((cats) => {
      cats.forEach((element: any) => {
        element.categories_id = element.id;
      });
      setCategories(cats)
    })
    getCoursesApi().then((res) => {
      setCourses(res.data.data);
    });
  }, [])
  return (
    <AdminContain style={{ flexDirection: "column" }}>
      <div className="courses-header">
        <h1 className="main-title">Crear Curso</h1>
        <div className="courses-buttons">
          <Link href="/admin/Teacher">
            <button>Profesores</button>
          </Link>
          <Link href="/admin/CourseAttributes">
            <button>Categorías</button>
          </Link>
          <Link href="/admin/Materials">
            <button>Materiales</button>
          </Link>


        </div>
      </div>
      <CourseContainer>
        <div className="create-course">
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">Título</label>
              <input
                className="input-create"
                placeholder="Título del curso"
                style={errors.errorTitle ? { border: "1px solid red" } : {}}
                onChange={(e: any) => {
                  setCourse({
                    ...course, title: e.target.value
                  })
                }}
              />
            </div>
            <div className="input-contain">
              <label className="input-label">Subtítulo</label>
              <input
                className="input-create"
                placeholder="Subtítulo del curso"
                style={errors.errorSubtitle ? { border: "1px solid red" } : {}}
                onChange={(e: any) => {
                  setCourse({
                    ...course, subtitle: e.target.value
                  })
                }}
              />
            </div>
            <div className="input-contain">
              <label className="input-label">Descripción</label>
              <input
                className="input-create"
                placeholder="Descripción del curso"
                style={errors.errorAbout ? { border: "1px solid red" } : {}}
                onChange={(e: any) => {
                  setCourse({
                    ...course, about: e.target.value
                  })
                }}
              />
            </div>
          </div>
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">Dificultad</label>
              <SelectOption
                style={errors.errorDifficulty ? { border: "1px solid red" } : {}}
                onClick={() => setOpenDifficultySelect(!openDifficultySelect)}
              >
                {
                  course.difficulty === ""
                    ? "Seleccione la dificultad"
                    : course.difficulty
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
                      difficulty.map((val: string, index: number) => {
                        return (
                          <div
                            className="map-options"
                            key={"difficulty_" + index}
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
            </div>
            <div className="input-contain">
              <label className="input-label">Secuencial</label>
              <SelectOption onClick={() => setOpenSequentialSelect(!openSequentialSelect)}>
                {
                  course.sequential === true
                    ? "Obligatorio"
                    : "Flexible"
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
                      sequential.map((val: string, index: number) => {
                        return (
                          <div
                            className="map-options"
                            key={"secuencial_" + index}
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
            </div>
            <div className="input-contain">
              <label className="input-label">Color</label>
              <SelectOption
                onClick={() => setOpenColorSelect(!openColorSelect)}
                style={errors.errorColor ? { border: "1px solid red" } : {}}
              >
                {
                  course.certificate_color === ""
                    ? "Seleccione un color"
                    : course.certificate_color
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
                            key={"color_" + index}
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
            </div>
          </div>
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">Calificación</label>
              <input
                className="input-create"
                placeholder="Rate del curso"
                type="number"
                style={errors.errorRating ? { border: "1px solid red" } : {}}
                onChange={(e: any) => {
                  setCourse({
                    ...course, rating: parseInt(e.target.value)
                  })
                }}
              />
            </div>
            <div className="input-contain">
              <label className="input-label">Reviews</label>
              <input
                className="input-create"
                placeholder="Reviews del curso"
                type="number"
                style={errors.errorReviews ? { border: "1px solid red" } : {}}
                onChange={(e: any) => {
                  setCourse({
                    ...course, reviews: parseInt(e.target.value)
                  })
                }}
              />
            </div>
            <div className="input-contain">
              <label className="input-label">Portada del curso</label>
              <input
                type="file"
                className="input-create"
                style={errors.errorImage ? { border: "1px solid red" } : {}}
                placeholder="Seleccione una imagen"
                onChange={(e) => { getImage(e.target.files) }}
              />
            </div>
          </div>
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">Tipo</label>
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
            </div>
            {
              course.type !== "Gratis" &&
              <>
                <div className="input-contain">
                  <label className="input-label">Precio</label>
                  <input
                    className="input-create"
                    type="number"
                    placeholder="Costo del curso"
                    style={errors.errorPrice ? { border: "1px solid red" } : {}}
                    onChange={(e: any) => {
                      setCourse({
                        ...course, price: parseInt(e.target.value)
                      })
                    }}
                  />
                </div>
                {
                  course.type === "Producto" &&
                  <div className="input-contain">
                    <label className="input-label">Duración (dias)</label>
                    <input
                      className="input-create"
                      type="number"
                      placeholder="Duración de la membresia"
                      style={errors.errorDuration ? { border: "1px solid red" } : {}}
                      onChange={(e: any) => {
                        setCourse({
                          ...course, duration: parseInt(e.target.value)
                        })
                      }}
                    />
                  </div>
                }
              </>
            }
          </div>
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">Frase descriptiva</label>
              <input
                className="input-create"
                placeholder="Frase descriptiva del curso"
                style={errors.errorPhrase ? { border: "1px solid red" } : {}}
                onChange={(e: any) => {
                  setCourse({
                    ...course, phrase: e.target.value
                  })
                }}
              />
            </div>
            <div className="input-contain">
              <label className="input-label">Instructor (es)</label>
              <SelectOption
                onClick={() => setOpenProfessorsSelect(!openProfessorsSelect)}
                style={errors.errorProfessor ? { border: "1px solid red" } : {}}
              >
                <p>
                  {
                    course.professors.length > 0
                      ? course.professors.map((val: IProfessors, index: number) => { return <React.Fragment key={"profName_" + index}>{val.name}<br /></React.Fragment> })
                      : "Seleccione un professor"
                  }
                </p>
                {
                  openProfessorsSelect
                    ? <RiArrowDropUpLine className="arrow" />
                    : <RiArrowDropDownLine className="arrow" />
                }
                {
                  openProfessorsSelect &&
                  <div className="options">
                    {
                      professors.map((val: IProfessors, index: number) => {
                        return (
                          <div
                            className="map-options"
                            key={"professor_" + index}
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
            </div>
            <div className="input-contain">
              <label className="input-label">Categorías</label>
              <SelectOption
                onClick={() => setOpenCategoriesSelect(!openCategoriesSelect)}
                style={errors.errorCategory ? { border: "1px solid red" } : {}}
              >
                <p>
                  {
                    course.categories.length > 0
                      ? course.categories.map((val: ICategories, index: number) => { return <React.Fragment key={"catsName_" + index}>{val.name}<br /></React.Fragment> })
                      : "Seleccione una categoría"
                  }
                </p>
                {
                  openCategoriesSelect
                    ? <RiArrowDropUpLine className="arrow" />
                    : <RiArrowDropDownLine className="arrow" />
                }
                {
                  openCategoriesSelect &&
                  <div className="options">
                    {
                      categories.map((val: ICategories, index: number) => {
                        return (
                          <div
                            className="map-options"
                            key={"categories_" + index}
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
            </div>
          </div>
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">Materiales</label>
              <SelectOption
                onClick={() => setOpenMaterialsSelect(!openMaterialsSelect)}
                style={errors.errorMaterial ? { border: "1px solid red" } : {}}
              >
                <p>
                  {
                    course.materials.length > 0
                      ? course.materials.map((val: IMaterials, index: number) => { return <React.Fragment key={"matsName_" + index}>{val.name}<br /></React.Fragment> })
                      : "Seleccione un material"
                  }
                </p>
                {
                  openMaterialsSelect
                    ? <RiArrowDropUpLine className="arrow" />
                    : <RiArrowDropDownLine className="arrow" />
                }
                {
                  openMaterialsSelect &&
                  <div className="options">
                    {
                      materials.map((val: IMaterials, index: number) => {
                        return (
                          <div
                            className="map-options"
                            key={"materials_" + index}
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
            </div>
            <div className="input-contain">
              <label className="input-label">Publicado</label>
              <SelectOption onClick={() => setOpenPublishSelect(!openPublishSelect)}>
                {
                  course.published ? "Publicado" : "No Publicado"
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
                      published.map((val: string, index: number) => {
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
            </div>
          </div>
          <div className="rows" style={{ justifyContent: "center" }}>
            <div className="input-contain" style={{ alignItems: "center" }}>
              {
                !loader
                  ?
                  <button className="create-button" onClick={createCourse}>
                    Crear curso
                  </button>
                  :
                  <LoaderButton />
              }

            </div>
          </div>
        </div>
        {/* ALL COURSES */}
        {
          courses.map((course: ICourses, index: number) => {
            return (
              <AllCourses
                title={course.title}
                subtitle={course.subtitle}
                about={course.about}
                difficulty={course.difficulty}
                sequential={course.sequential}
                certificate_color={course.certificate_color}
                rating={course.rating}
                reviews={course.reviews}
                image={course.image}
                type={course.type}
                price={course.price}
                duration={course.duration}
                phrase={course.phrase}
                mandatory={course.mandatory}
                professors={course.professors}
                categories={course.categories}
                materials={course.materials}
                published={course.published}
                openCourseEdit={openCourseEdit}
                openCourse={openCourse}
                allProfessors={professors}
                allCategories={categories}
                allMaterials={materials}
                moveTo={moveTo}
                id={course.id}
                index={index}
                key={"AllCourses_" + index}
              />
            )
          })
        }

      </CourseContainer>
    </AdminContain>

  )
}
export default Courses;