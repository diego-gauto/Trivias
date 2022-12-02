import React, { useEffect, useState } from 'react'
import { addMaterial, deleteMaterial, getMaterial, updateMaterial } from '../../../store/actions/courseActions';
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


const Materials = () => {
  const [newMaterial, setNewMaterial] = useState<boolean>(false);
  const [edit, setEdit] = useState<number>();
  const [materials, setMaterials] = useState<any>([]);
  const [material, setMaterial] = useState<any>({
    name: ""
  });
  const createMaterial = () => {
    if (Object.keys(material).some(key => material[key] === '')) {
      alert("Complete todos los campos")
    }
    else {
      addMaterial(material).then((res) => {
        alert("Material agregado con Exito")
        getAllMaterials();
      })
    }
  }
  const getAllMaterials = () => {
    getMaterial().then((res) => {
      setMaterials(res);
      return res;
    })
  }
  const Delete = (val: any) => {
    if (window.confirm("Desea borrar este MAterial: " + val.name)) {
      deleteMaterial(val).then(() => {
        getAllMaterials();
        // alert("Categoría: " + val.name + " eliminada con éxito")
      })
    }
  }
  const update = (val: any) => {
    console.log(val)
    updateMaterial(val, val.id).then(() => {
      alert("Material actualizado")
      getAllMaterials();
    })
  }
  useEffect(() => {
    getAllMaterials();
  }, [])
  return (
    <AdminContain>
      <SideBar />
      <CourseFormContain>
        <CategoryContain >
          <TitleContain onClick={() => { setNewMaterial(!newMaterial) }}>
            <Title >
              Crear Material
            </Title>
            {
              !newMaterial &&
              <ButtonNewCourse>+</ButtonNewCourse>
            }
            {
              newMaterial &&
              <ButtonNewCourse onClick={(e) => {
                setNewMaterial(false)
              }}>-</ButtonNewCourse>
            }
          </TitleContain>
          {
            newMaterial &&
            <FormContain>
              <InputContain>
                <Label>Nombre del Material</Label>
                <Input
                  placeholder="Material"
                  onChange={(e: any) => {
                    setMaterial({ ...material, name: e.target.value })
                  }}
                />
              </InputContain>
              <ButtonContain>
                <Button
                  onClick={() => {
                    createMaterial();
                  }}
                >Guardar</Button>
              </ButtonContain>
            </FormContain>
          }
        </CategoryContain>
        <CategoryContain>
          <Title>
            Materiales
          </Title>
          {materials !== null
            ? <>
              {
                materials.map((val: any, i: any) => {
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
                                  materials[i].name = e.target.value
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
            <> Sin Materiales...
            </>
          }
        </CategoryContain>
      </CourseFormContain>
    </AdminContain>
  )
}
export default Materials;