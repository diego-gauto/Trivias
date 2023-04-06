import React, { useEffect, useState } from 'react'
import { addTeacher, deleteTeacher, updateProfessorImage, updateProfessorSignature, updateTeacher } from '../../../store/actions/courseActions';
import { CourseFormContain } from '../Courses/CourseMain.styled';
import { ButtonNewCourse } from '../Courses/Form/CourseForm_Create.styled';
import { AdminContain } from '../SideBar.styled';
import {
  Button, ButtonContain,
  CatContain, CatData, CategoryContain,
  CatText, CloseIcon, EditCat, EditIcon,
  FormContain, Input, InputContain, Label,
  Title, TitleContain
} from '../Category/Category.styled';
import { LoaderContain } from '../../../containers/Profile/User/User.styled';
import { createProfessorApi, deleteProfessorApi, getProfessorApi, updateImagesfromProfessorApi, updateProfessorApi } from '../../api/professors';

const Teacher = () => {
  const [newTeacher, setNewTeacher] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<number>(-1);
  const [teachers, setTeachers] = useState<any>([]);
  const [editImage, setEditImage] = useState<any>("");
  const [editSignImage, setEditSignImage] = useState<any>("");
  const [addImage, setAddImage] = useState<any>("");
  const [addSign, setAddSign] = useState<any>("");
  const [updateTeacher, setUpdateTeacher] = useState<any>({
    name: "",
    about: "",
    image: "",
    sign: "",
    id: 0
  })
  const [teacher, setTeacher] = useState<any>({
    name: "",
    about: "",
    image: "",
    sign: ""
  });
  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setAddImage(reader.result)
      setTeacher({ ...teacher, image: reader.result })
    };
  }
  const getSign = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setAddSign(reader.result)
      setTeacher({ ...teacher, sign: reader.result })
    };
  }
  const changeImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setEditImage(reader.result)
      setUpdateTeacher({ ...updateTeacher, image: reader.result })
    };
  }
  const changeSign = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setEditSignImage(reader.result)
      setUpdateTeacher({ ...updateTeacher, sign: reader.result })
    };
  }
  const createTeacher = () => {
    let tempImage = teacher.image;
    let tempSign = teacher.image;
    setLoading(true);
    if (Object.keys(teacher).some(key => teacher[key] === '')) {
      alert("Complete todos los campos")
      setLoading(false);
    }
    else {
      teacher.image = "";
      teacher.sign = "";
      createProfessorApi(teacher).then((res) => {
        teacher.id = res;
        updateProfessorImage(tempImage, res).then((img) => {
          console.log(img);
          updateProfessorSignature(tempSign, res).then((sign) => {
            teacher.image = img;
            teacher.sign = sign;
            updateImagesfromProfessorApi(teacher).then(() => {
              alert("Profesor agregado con Exito")
              getAllteachers();
              setLoading(false);
              delete teacher.id;
              setTeacher({
                name: "",
                about: "",
                image: "",
                sign: ""
              })
            })
          })
        })

      })

    }
  }
  const getAllteachers = () => {
    getProfessorApi().then((res) => {
      setTeachers(res);
    })
  }
  const changeUpdateData = (professor: any) => {
    setEditImage("");
    setEditSignImage("");
    setUpdateTeacher({
      name: professor.name,
      about: professor.about,
      image: professor.image,
      sign: professor.sign,
      id: professor.id
    })
  }
  const Delete = (val: any) => {
    if (window.confirm("Desea borrar este Profesor: " + val.name)) {
      deleteProfessorApi(val).then(() => {
        getAllteachers();
      })
    }
  }
  const update = async (val: any) => {
    if (editImage !== "") {
      await updateProfessorImage(updateTeacher.image, updateTeacher.id).then((res) => {
        updateTeacher.image = res;
      })
    }
    if (editSignImage !== "") {
      await updateProfessorSignature(updateTeacher.sign, updateTeacher.id).then((res) => {
        updateTeacher.sign = res;
      })
    }
    updateProfessorApi(updateTeacher).then(() => {
      setEdit(-1);
      alert("Profesor actualizado")
      getAllteachers();
      setEditImage("");
      setEditSignImage("");
      setUpdateTeacher({
        name: "",
        about: "",
        image: "",
        sign: "",
        id: 0
      })
    })
  }
  useEffect(() => {
    getAllteachers();
  }, [])

  return (
    <AdminContain>
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
                                    setUpdateTeacher({ ...updateTeacher, name: e.target.value })
                                  }}
                                />
                              </InputContain>
                              <InputContain style={{ width: 500 }}>
                                <Label>Descripción del Instructor</Label>
                                <Input
                                  defaultValue={val.about == undefined ? "Nueva descripción" : val.about}
                                  placeholder={val.about == undefined ? "Agregar descripción" : "Editar descripción: " + val.about}
                                  onChange={(e: any) => {
                                    setUpdateTeacher({ ...updateTeacher, about: e.target.value })
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
                                    (val.image && editImage == "") ? <img src={val.image} />
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
                                    (val.sign && editSignImage == "") ? <img src={val.sign} style={{ height: 40 }} />
                                      :
                                      <>
                                        {
                                          editSignImage !== "" && <img src={editSignImage} style={{ width: 120 }} />
                                        }
                                      </>
                                  }
                                </div>
                              </InputContain>
                              <ButtonContain >
                                <Button
                                  onClick={() => {
                                    update(val);
                                  }}
                                >Editar</Button>
                              </ButtonContain>
                            </FormContain>
                          }
                        </div>

                      </EditCat>
                      <CatData>
                        <EditIcon onClick={() => { (edit !== i ? setEdit(i) : setEdit(-1)); changeUpdateData(val); setNewTeacher(false) }} />
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