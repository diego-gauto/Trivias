import React, { useState } from 'react'
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';
import { AllCourses } from './AllCourses';
import {
  CourseFormContain, InputForm, InputContain,
  Label, Input, InputBig, InputContain2,
  IconContain, Folder, InputIcon,
  Button, ButtonContain, Title,
} from './CourseMain.styled';
import {
  Label2, Option, OptionContain,
  SelectContain, Selected, CaretD2
} from './Form/Select/SelectStyles.styled';
const CourseMain = () => {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState("Darth Vader, Grand Moff Tarkin")
  const [value2, setValue2] = useState("Uñas")
  return (
    <AdminContain>
      <SideBar />
      <CourseFormContain>
        {/* LINEA 1 */}

        <Title>Nuevo Curso</Title>

        <form >
          <InputForm >
            <InputContain>
              <Label>Título del Curso</Label>
              <Input
                placeholder="Curso de Uñas Francesas"
                type="text"

              />
            </InputContain>
            <InputContain>
              <Label2>Profesor(es)</Label2>
              <IconContain>

                <SelectContain key={1}>
                  <Selected onClick={() => { setOpen(!open), setOpen2(false) }}>
                    {value}
                    <CaretD2 />
                  </Selected>
                  {
                    open == true &&
                    <OptionContain>
                      <Option onClick={() => { setValue("Darth Vader, Grand Moff Tarkin"); setOpen(false) }}>
                        <input
                          type="radio"
                          id="Temporada1"
                          name="category"
                          value="Temporada 1"
                        />
                        <Label2 > Darth Vader, Grand Moff Tarkin</Label2>
                      </Option>
                      <Option onClick={() => { setValue("Yoda"); setOpen(false) }}>
                        <input
                          type="radio"
                          id="Temporada2"
                          name="category"
                          value="Temporada 2"
                        />
                        <Label2> Yoda</Label2>
                      </Option>
                    </OptionContain>
                  }
                </SelectContain>

              </IconContain>
            </InputContain>
            <InputContain>
              <Label>Duración de Suscripción (Días)</Label>
              <Input
                placeholder="90"
                type="number"

              />
            </InputContain>
          </InputForm>
          {/* LINEA 2 */}
          <InputForm>
            <InputContain>
              <Label>Subtítulo del Curso</Label>
              <Input
                placeholder="Descubre un nuevo método para tus uñas este San Valentín"
                type="text"

              />
            </InputContain>
            <InputContain>
              <Label>Categorías</Label>
              <IconContain>

                <SelectContain key={2}>
                  <Selected onClick={() => { setOpen2(!open2), setOpen(false) }}>
                    {value2}
                    <CaretD2 />
                  </Selected>
                  {
                    open2 == true &&
                    <OptionContain>
                      <Option onClick={() => { setValue2("Uñas de salón"); setOpen2(false) }}>
                        <input
                          type="radio"
                          id="Temporada1"
                          name="category"
                          value="Temporada 1"
                        />
                        <Label2 > Uñas de salón</Label2>
                      </Option>
                      <Option onClick={() => { setValue2("Uñas francesas"); setOpen2(false) }}>
                        <input
                          type="radio"
                          id="Temporada2"
                          name="category"
                          value="Temporada 2"
                        />
                        <Label2> Uñas francesas</Label2>
                      </Option>
                    </OptionContain>
                  }
                </SelectContain>
              </IconContain>

            </InputContain>
            <InputContain>
              <Label>Portada del Curso</Label>
              <IconContain>
                <Folder />
                <InputIcon
                  placeholder="Seleccionar archivo"
                />
              </IconContain>
            </InputContain>
          </InputForm>
          {/* LINEA 3 */}
          <InputForm>
            <InputContain>
              <Label>Sobre el Curso</Label>
              <InputBig
                placeholder="Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit. Nisi, sem rutrum 
          blandit convallis. Penatibus scelerisque tempus, 
          volutpat magna venenatis, volutpat. Ut nisl urna, 
          pharetra et ultrices. Sapien lacinia fringilla rhoncus 
          egestas nisl aliquam. Pellentesque ornare luctus 
          lobortis non id in vestibulum."


              />
            </InputContain>
            <InputContain2>
              <InputContain>
                <Label>Año de Publicación</Label>
                <Input
                  placeholder="2022"
                  type="number"

                />
              </InputContain>
              <InputContain>
                <Label>Precio (MXN)</Label>
                <Input
                  placeholder="998"
                  type="number"

                />
              </InputContain>
            </InputContain2>
            <ButtonContain>
              <Button type='submit'>Guardar Cambios</Button>
            </ButtonContain>

          </InputForm>
        </form>
        <AllCourses />
      </CourseFormContain>
    </AdminContain>
  )
}
export default CourseMain;