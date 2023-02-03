import React, { useEffect, useState } from 'react'
import { addTeacher, deleteTeacher, getTeacher, updateTeacher } from '../../../store/actions/courseActions';
import { CourseFormContain } from '../Courses/CourseMain.styled';
import { ButtonNewCourse } from '../Courses/Form/CourseForm_Create.styled';
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
  const [edit, setEdit] = useState<number>(-1);
  const [teachers, setTeachers] = useState<any>([]);
  const [editImage, setEditImage] = useState<any>("");
  const [editSignImage, setEditSignImage] = useState<any>("");
  const [addImage, setAddImage] = useState<any>("");
  const [addSign, setAddSign] = useState<any>("");
  const [teacher, setTeacher] = useState<any>({
    name: "",
    about: "",
    path: "",
    sign: ""
  });
  const getSign = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setAddSign(reader.result)
      setTeacher({ ...teacher, sign: reader.result })
    };
  }
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
  const changeSign = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setEditSignImage(reader.result)
      setTeacher({ ...teacher, formatSign: reader.result })
    };
  }
  const createTeacher = () => {
    setLoading(true);
    if (Object.keys(teacher).some(key => teacher[key] === '')) {
      alert("Complete todos los campos")
      setLoading(false);
    }
    else {
      teacher.courses = [];
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
      })
    }
  }
  const update = (val: any, valFormat: any, valFormatSign: any) => {
    let tempVal: any = {
      format: valFormat,
      formatSign: valFormatSign,
      ...val
    };
    updateTeacher(tempVal, val.id).then(() => {
      setEdit(-1);
      alert("Profesor actualizado")
      getAllteachers();
      delete teacher.format;
      delete teacher.formatSign;
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
              </div>
              <div className="inputs">
                <InputContain>
                  <Label>Foto del Instructor</Label>
                  <Input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(e) => { getImage(e.target.files) }}
                  />
                </InputContain>
                <InputContain>
                  <Label>Firma de instructor</Label>
                  <Input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(e) => { getSign(e.target.files) }}
                  />
                </InputContain>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
                {
                  addImage !== "" && <img src={addImage} />
                }
                {
                  addSign !== "" && <img src={addSign} style={{ height: 40 }} />
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
                                <Label>Nombre del Instructor</Label>
                                <Input
                                  defaultValue={val.name}
                                  placeholder={"Editar nombre de: " + val.name}
                                  onChange={(e: any) => {
                                    teachers[i].name = e.target.value
                                  }}
                                />
                              </InputContain>
                              <InputContain style={{ width: 500 }}>
                                <Label>Descripción del Instructor</Label>
                                <Input
                                  defaultValue={val.about == undefined ? "Nueva descripción" : val.about}
                                  placeholder={val.about == undefined ? "Agregar descripción" : "Editar descripción: " + val.about}
                                  onChange={(e: any) => {
                                    teachers[i].about = e.target.value
                                  }}
                                />
                              </InputContain>
                              <InputContain
                                style={{ width: 500, gap: 10 }}>
                                <Label>Foto del Instructor</Label>
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
                              <InputContain
                                style={{ width: 500, gap: 10 }}>
                                <Label>Firma</Label>
                                <Input
                                  type="file"
                                  accept="image/png, image/jpg, image/jpeg"
                                  onChange={(e) => { changeSign(e.target.files) }}
                                />
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  {
                                    (teachers[i].sign && editSignImage == "") ? <img src={teachers[i].sign} style={{ height: 40 }} />
                                      :
                                      <>
                                        {
                                          editSignImage !== "" && <img src={editSignImage} />
                                        }
                                      </>
                                  }
                                </div>
                              </InputContain>
                              <ButtonContain >
                                <Button
                                  onClick={() => {
                                    update(val, teacher.format, teacher.formatSign);
                                  }}
                                >Editar</Button>
                              </ButtonContain>
                            </FormContain>
                          }
                        </div>

                      </EditCat>
                      <CatData>
                        <EditIcon onClick={() => { (edit !== i ? setEdit(i) : setEdit(-1)); setEditImage(""); setNewTeacher(false); setEditSignImage("") }} />
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