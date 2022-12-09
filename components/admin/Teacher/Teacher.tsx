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


const Teacher = () => {
  const [newTeacher, setNewTeacher] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<number>();
  const [teachers, setTeachers] = useState<any>([]);
  const [teacher, setTeacher] = useState<any>({
    name: ""
  });
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
  const update = (val: any) => {
    console.log(val)
    updateTeacher(val, val.id).then(() => {
      alert("Profesor actualizado")
      getAllteachers();
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
          <TitleContain onClick={() => { setNewTeacher(!newTeacher) }}>
            <Title >
              Crear Profesor
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
            <FormContain>
              <InputContain>
                <Label>Nombre del Profesor</Label>
                <Input
                  placeholder="Nombre del profesor"
                  onChange={(e: any) => {
                    setTeacher({ ...teacher, name: e.target.value })
                  }}
                />
              </InputContain>
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
            Profesores
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

                        {
                          edit == i &&
                          <FormContain>
                            <InputContain style={{ width: 500 }}>
                              <Input
                                placeholder={"Editar nombre de: " + val.name}
                                onChange={(e: any) => {
                                  teachers[i].name = e.target.value
                                }}
                              />
                            </InputContain>
                            <ButtonContain>
                              <Button
                                onClick={() => {
                                  update(val);
                                }}
                              >Editar</Button>


                            </ButtonContain>
                          </FormContain>
                        }
                      </EditCat>
                      <CatData>
                        <EditIcon onClick={() => { setEdit(i) }} />
                        <CloseIcon onClick={() => {
                          Delete(val);
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
    </AdminContain>
  )
}
export default Teacher;