import React, { useEffect, useState } from 'react';
import { CourseFormContain } from '../Courses/CourseMain.styled';
import { ButtonNewCourse } from '../Courses/Form/CourseForm_Create.styled';
import Delete from '../Courses/Form/Delete/Delete';
import { AdminContain } from '../SideBar.styled';
import {
  Button,
  ButtonContain,
  CatContain,
  CatData,
  CategoryContain,
  CatText,
  CloseIcon,
  EditCat,
  EditIcon,
  FormContain,
  Input,
  InputContain,
  Label,
  Title,
  TitleContain,
} from '../Category/Category.styled';
import {
  createMaterialApi,
  deleteMaterialsApi,
  getMaterialsApi,
  updateMaterialApi,
} from '../../api/materials';
import { useRouter } from 'next/router';
import { IoMdExit } from 'react-icons/io';

const Materials = () => {
  const [newMaterial, setNewMaterial] = useState<boolean>(false);
  const [edit, setEdit] = useState<number>();
  const [materials, setMaterials] = useState<any>([]);
  const router = useRouter();
  const [material, setMaterial] = useState<any>({
    name: '',
  });
  const returnToCourses = () => {
    router.push({
      pathname: '/admin/Courses',
    });
  };
  const createMaterial = () => {
    if (Object.keys(material).some((key) => material[key] === '')) {
      alert('Complete todos los campos');
    } else {
      createMaterialApi(material).then((res) => {
        alert('Material agregado con Exito');
        getAllMaterials();
      });
    }
  };
  const getAllMaterials = () => {
    getMaterialsApi().then((res) => {
      setMaterials(res);
    });
  };
  const Delete = (val: any) => {
    if (window.confirm('Desea borrar este Material: ' + val.name)) {
      deleteMaterialsApi(val).then(() => {
        getAllMaterials();
        // alert("Categoría: " + val.name + " eliminada con éxito")
      });
    }
  };
  const update = (val: any) => {
    updateMaterialApi(val).then(() => {
      alert('Material actualizado');
      getAllMaterials();
    });
  };
  useEffect(() => {
    getAllMaterials();
  }, []);

  return (
    <AdminContain>
      <IoMdExit className='icon-exit' onClick={returnToCourses} />
      <CourseFormContain>
        <CategoryContain>
          <TitleContain
            onClick={() => {
              setNewMaterial(!newMaterial);
            }}
          >
            <Title>Crear Material</Title>
            {!newMaterial && <ButtonNewCourse>+</ButtonNewCourse>}
            {newMaterial && (
              <ButtonNewCourse
                onClick={(e) => {
                  setNewMaterial(false);
                }}
              >
                -
              </ButtonNewCourse>
            )}
          </TitleContain>
          {newMaterial && (
            <FormContain>
              <InputContain>
                <Label>Nombre del Material</Label>
                <Input
                  placeholder='Material'
                  onChange={(e: any) => {
                    setMaterial({ ...material, name: e.target.value });
                  }}
                />
              </InputContain>
              <ButtonContain>
                <Button
                  onClick={() => {
                    createMaterial();
                  }}
                >
                  Guardar
                </Button>
              </ButtonContain>
            </FormContain>
          )}
        </CategoryContain>
        <CategoryContain>
          <Title>Materiales</Title>
          {materials !== null ? (
            <>
              {materials.map((val: any, i: any) => {
                return (
                  <CatContain key={'Categorias ' + i}>
                    <EditCat>
                      <CatText>{val.name}</CatText>

                      {edit == i && (
                        <FormContain>
                          <InputContain style={{ width: 500 }}>
                            <Input
                              placeholder={'Editar nombre de: ' + val.name}
                              defaultValue={val.name}
                              onChange={(e: any) => {
                                materials[i].name = e.target.value;
                              }}
                            />
                          </InputContain>
                          <ButtonContain>
                            <Button
                              onClick={() => {
                                update(val);
                              }}
                            >
                              Editar
                            </Button>
                          </ButtonContain>
                        </FormContain>
                      )}
                    </EditCat>
                    <CatData>
                      <EditIcon
                        onClick={() => {
                          setEdit(i);
                        }}
                      />
                      <CloseIcon
                        onClick={() => {
                          Delete(val);
                        }}
                      />
                    </CatData>
                  </CatContain>
                );
              })}
            </>
          ) : (
            <> Sin Materiales...</>
          )}
        </CategoryContain>
      </CourseFormContain>
    </AdminContain>
  );
};
export default Materials;
