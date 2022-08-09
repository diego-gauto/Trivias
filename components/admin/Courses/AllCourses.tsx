import Link from 'next/link'
import React, { useState } from 'react'
import { ChevD, ChevU, CourseContainer, CourseContent, CourseName, Info, Label, MainContainer, Column, Text, TitleContain, ButtonContain, TransparentButton, PurpleButton } from './AllCourses.styled'

export const AllCourses = () => {

  const [open, setOpen] = useState(false)
  return (
    <MainContainer>
      <CourseContainer>
        <TitleContain>
          <CourseName>
            Curso 2
          </CourseName>
          {
            open == false &&
            <ChevD onClick={() => { setOpen(true) }} />
          }
          {
            open == true &&
            <ChevU onClick={() => { setOpen(false) }} />
          }

        </TitleContain>
        {
          open == true &&
          <>
            <CourseContent>
              <Column>
                <Info>
                  <Label>Título del Curso</Label>
                  <Text>Curso de Uñas Francesas</Text>
                </Info>
                <Info>
                  <Label>Subtítulo del Curso</Label>
                  <Text>Descubre un nuevo método para
                    tus uñas este San Valentín</Text>
                </Info>
                <Info>
                  <Label>Sobre el Curso</Label>
                  <Text>Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nisi, sem rutrum blandit
                    convallis. Penatibus scelerisque tempus,
                    volutpat magna venenatis, volutpat. Ut nisl
                    urna, pharetra et ultrices. Sapien lacinia
                    fringilla rhoncus egestas nisl aliquam.
                    Pellentesque ornare luctus lobortis non id in
                    vestibulum.</Text>
                </Info>
              </Column>
              <Column>
                <Info>
                  <Label>Profesor(es)</Label>
                  <Text>Darth Vader, Grand Moff Tarkin</Text>
                </Info>
                <Info>
                  <Label>Categorías</Label>
                  <Text>Uñas de salón</Text>
                </Info>
                <Info>
                  <Label>Año de Publicación</Label>
                  <Text>2022</Text>
                </Info>
              </Column>
              <Column>
                <Info>
                  <Label>Duración de Suscripción (Días)</Label>
                  <Text>90</Text>
                </Info>
                <Info>
                  <Label>Portada del Curso</Label>
                  <Text>Seleccionar archivo</Text>
                </Info>
                <Info>
                  <Label>Precio (MXN)</Label>
                  <Text>998</Text>
                </Info>
              </Column>
            </CourseContent>
            <ButtonContain>
              <TransparentButton onClick={() => { setOpen(false) }}>Cerrar</TransparentButton>
              <Link href="/admin/Edit">
                <PurpleButton>Editar</PurpleButton>
              </Link>
            </ButtonContain>
          </>
        }

      </CourseContainer>
    </MainContainer>
  )
}
