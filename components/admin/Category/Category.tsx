import React, { useEffect, useState } from 'react'
import { createCategoryApi, deleteCategoryApi, getCategoriesApi, updateCategoryApi } from '../../api/categories';
import { CourseFormContain } from '../Courses/CourseMain.styled';
import { ButtonNewCourse } from '../Courses/Form/CourseForm_Create.styled';
import { AdminContain } from '../SideBar.styled';
import { Button, ButtonContain, CatContain, CatData, CategoryContain, CatText, CloseIcon, EditCat, EditIcon, FormContain, Input, InputContain, Label, Title, TitleContain } from './Category.styled';



const Category = () => {
  const [newCategory, setNewCategory] = useState<boolean>(false);
  const [edit, setEdit] = useState<number>();
  const [categories, setCategories] = useState<any>([]);
  const [category, setCategory] = useState<any>({
    name: ""
  });
  const createCategory = () => {
    if (Object.keys(category).some(key => category[key] === '')) {
      alert("Complete todos los campos")
    }
    else {
      createCategoryApi(category).then(() => {
        alert("Categoría Agregada con Exito")
        getAllCategories();
      })
    }
  }
  const getAllCategories = () => {
    getCategoriesApi().then((res) => {
      setCategories(res);
    })
  }
  const Delete = (val: any) => {
    if (window.confirm("Desea borrar esta categoría: " + val.name)) {
      deleteCategoryApi(val).then(() => {
        getAllCategories();
      })
    }
  }
  const update = (val: any) => {
    updateCategoryApi(val).then(() => {
      alert("Categoría actualizada")
      getAllCategories();
    })
  }
  useEffect(() => {
    getAllCategories();
  }, [])

  return (
    <AdminContain>
      <CourseFormContain>
        <CategoryContain >
          <TitleContain onClick={() => { setNewCategory(!newCategory) }}>
            <Title >
              Crear Categoría
            </Title>
            {
              !newCategory &&
              <ButtonNewCourse>+</ButtonNewCourse>
            }
            {
              newCategory &&
              <ButtonNewCourse onClick={(e) => {
                setNewCategory(false)
              }}>-</ButtonNewCourse>
            }
          </TitleContain>
          {
            newCategory &&
            <FormContain>
              <InputContain>
                <Label>Nombre de la Categoría</Label>
                <Input
                  placeholder="Uñas-Basico-Acrilico"
                  onChange={(e: any) => {
                    setCategory({ ...category, name: e.target.value })
                  }}
                />
              </InputContain>
              <ButtonContain>
                <Button
                  onClick={() => {
                    createCategory();
                  }}
                >Guardar</Button>
              </ButtonContain>
            </FormContain>
          }
        </CategoryContain>
        <CategoryContain>
          <Title>
            Categorías
          </Title>
          {categories !== null
            ? <>
              {
                categories.map((val: any, i: any) => {
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
                                defaultValue={val.name}
                                placeholder={"Editar nombre de: " + val.name}
                                onChange={(e: any) => {
                                  categories[i].name = e.target.value
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
            <> Sin Categorías...
            </>
          }
        </CategoryContain>
      </CourseFormContain>
    </AdminContain>
  )
}
export default Category;