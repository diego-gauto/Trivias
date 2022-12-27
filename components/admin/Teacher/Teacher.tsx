import React, { useEffect, useState } from 'react'
import { addTeacher, deleteTeacher, getTeacher, updateTeacher } from '../../../store/actions/courseActions';
import { CourseFormContain } from '../Courses/CourseMain.styled';
import { ButtonNewCourse } from '../Courses/Form/CourseForm_Create.styled';
import Delete from '../Courses/Form/Delete/Delete';
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';
import {
  Button, ButtonContain,
  CatContain, CatData, CategoryContain,
  CatText, CloseIcon, EditCat, EditIcon,
  FormContain, Input, InputContain, Label,
  Title, TitleContain
} from '../Category/Category.styled';
import { LoaderContain } from '../../../containers/Profile/User/User.styled';
import file from 'react-player/file';


const Teacher = () => {
  const [newTeacher, setNewTeacher] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<number>(-1);
  const [teachers, setTeachers] = useState<any>([]);
  const [editImage, setEditImage] = useState<any>("");
  const [addImage, setAddImage] = useState<any>("");
  const [teacher, setTeacher] = useState<any>({
    name: "",
    about: "",
    path: ""
  });
  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setAddImage(reader.result)
      setTeacher({ ...teacher, path: reader.result })
    };
  }
  const changeImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setEditImage(reader.result)
      setTeacher({ ...teacher, format: reader.result })
    };
  }
  console.log(teacher)
  const createTeacher = () => {
    setLoading(true);
    if (Object.keys(teacher).some(key => teacher[key] === '')) {
      alert("Complete todos los campos")
      setLoading(false);
    }
    else {
      addTeacher(teacher).then((res) => {
        alert("Profesor agregado con Exito")
        getAllteachers();
        setLoading(false);
      })
    }
  }
  const getAllteachers = () => {
    getTeacher().then((res) => {
      setTeachers(res);
      return res;
    })
  }
  const Delete = (val: any) => {
    if (window.confirm("Desea borrar este Profesor: " + val.name)) {
      deleteTeacher(val).then(() => {
        getAllteachers();
        // alert("Categoría: " + val.name + " eliminada con éxito")
      })
    }
  }
  const update = (val: any, valFormat: any) => {
    let tempVal: any = {
      format: valFormat,
      ...val
    };
    updateTeacher(tempVal, val.id).then(() => {
      setEdit(-1);
      alert("Profesor actualizado")
      getAllteachers();
      delete teacher.format;
    })
  }
  useEffect(() => {
    getAllteachers();
  }, [])
  return (
    <AdminContain>
      <SideBar />
      <CourseFormContain>
        <CategoryContain >
          <TitleContain onClick={() => { setNewTeacher(!newTeacher); setEdit(-1); setEditImage("") }}>
            <Title >
              Crear Instructor
            </Title>
            {
              !newTeacher &&
              <ButtonNewCourse>+</ButtonNewCourse>
            }
            {
              newTeacher &&
              <ButtonNewCourse onClick={(e) => {
                setNewTeacher(false)
              }}>-</ButtonNewCourse>
            }
          </TitleContain>
          {
            newTeacher &&
            <FormContain style={{ flexDirection: "column" }}>
              <div className="inputs">
                <InputContain>
                  <Label>Nombre del Instructor</Label>
                  <Input
                    placeholder="Nombre del instructor"
                    onChange={(e: any) => {
                      setTeacher({ ...teacher, name: e.target.value })
                    }}
                  />
                </InputContain>
                <InputContain>
                  <Label>Descripción del Instructor</Label>
                  <Input
                    placeholder="Descripción del instructor"
                    onChange={(e: any) => {
                      setTeacher({ ...teacher, about: e.target.value })
                    }}
                  />
                </InputContain>
                <InputContain
                >
                  <Label>Foto del Instructor</Label>
                  <Input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(e) => { getImage(e.target.files) }}
                  />
                </InputContain>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {
                  addImage !== "" && <img src={addImage} />
                }
              </div>
              <ButtonContain>
                {
                  !loading ?
                    <Button
                      onClick={() => {
                        createTeacher();
                      }}
                    >Guardar</Button>
                    :
                    <LoaderContain />
                }

              </ButtonContain>
            </FormContain>
          }
        </CategoryContain>
        <CategoryContain>
          <Title>
            Instructores
          </Title>
          {teachers !== null
            ? <>
              {
                teachers.map((val: any, i: any) => {
                  return (
                    <CatContain key={"Categorias " + i}>
                      <EditCat>
                        <CatText>
                          {val.name}
                        </CatText>
                        <div>
                          {
                            edit == i &&
                            <FormContain style={{ flexDirection: "column" }}>
                              <InputContain style={{ width: 500 }}>
                                <Input
                                  defaultValue={val.name}
                                  placeholder={"Editar nombre de: " + val.name}
                                  onChange={(e: any) => {
                                    teachers[i].name = e.target.value
                                  }}
                                />
                              </InputContain>
                              <InputContain style={{ width: 500 }}>
                                <Input
                                  defaultValue={val.about == undefined ? "Nueva descripción" : val.about}
                                  placeholder={val.about == undefined ? "Agregar descripción" : "Editar descripción: " + val.about}
                                  onChange={(e: any) => {
                                    teachers[i].about = e.target.value
                                  }}
                                />
                              </InputContain>
                              <InputContain
                                style={{ width: 500 }}>
                                <Input
                                  type="file"
                                  accept="image/png, image/jpg, image/jpeg"
                                  onChange={(e) => { changeImage(e.target.files) }}
                                />
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  {
                                    (teachers[i].path && editImage == "") ? <img src={teachers[i].path} />
                                      :
                                      <>
                                        {
                                          editImage !== "" && <img src={editImage} />
                                        }
                                      </>
                                  }
                                </div>
                              </InputContain>
                              <ButtonContain >
                                <Button
                                  onClick={() => {
                                    update(val, teacher.format);
                                  }}
                                >Editar</Button>
                              </ButtonContain>
                            </FormContain>
                          }
                        </div>

                      </EditCat>
                      <CatData>
                        <EditIcon onClick={() => { (edit !== i ? setEdit(i) : setEdit(-1)); setEditImage(""); setNewTeacher(false) }} />
                        <CloseIcon onClick={() => {
                          Delete(val); setEdit(-1);
                        }} />
                      </CatData>
                    </CatContain>
                  )
                })
              }
            </>
            :
            <> Sin Profesores...
            </>
          }
        </CategoryContain>
      </CourseFormContain>
    </AdminContain >
  )
}
export default Teacher;