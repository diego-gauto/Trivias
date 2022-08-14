import Link from 'next/link';
import React from 'react'
import {
  Card, CourseId, CourseName, CardContain,
  ImageContain, CourseImage, NumberLesson, CourseText,
  TitleCourse, Subtitle, PurchaseData, PurpleButton,
  TransparentButton,
  CourseCostResp
} from './Purchase.styled';
import { BottomContain, CompleteContain, PurchaseTitle, Text4, ButtonContain, MainContainer } from './PurchaseComplete.styled';

const PurchaseComplete = ({ data, card }: any) => {
  return (
    <MainContainer>
      <CompleteContain>
        <PurchaseTitle>
          ¡Compra Exitosa!
          <CourseCostResp>
            $ 2,149.00
          </CourseCostResp>
        </PurchaseTitle>
        <CourseId>
          {data.type}
        </CourseId>
        <CourseName>
          {data.type}: {data.title}
        </CourseName>
        <CardContain style={{ display: "flex" }}>
          <Card>
            <ImageContain>
              <CourseImage src="/images/Lukedemo.png" width={600} height={250} />
              <NumberLesson>
                24 Lecciones
              </NumberLesson>
            </ImageContain>
            <CourseText>
              <TitleCourse>
                Curso 3: Lorem Ipsum
              </TitleCourse>
              <Subtitle>
                Subtítulo de categoría
              </Subtitle>
            </CourseText>
          </Card>
        </CardContain>
        <BottomContain>
          {/* <Text4>
            Descuento:
            <PurchaseData>
              90GUU4BT4398DNW20GND
            </PurchaseData>
          </Text4> */}
          <Text4>
            Método de Pago:
            <PurchaseData>
              Tarjeta de Crédito/Débito
              <br />
              {card.brand} terminada en {card.last4}
            </PurchaseData>
          </Text4>
          <Text4>
            Total:
            <PurchaseData>
              ${data.price}.00
            </PurchaseData>
          </Text4>
        </BottomContain>
        {card.type == 'curso' && <ButtonContain>
          <PurpleButton>
            Empezar Curso
          </PurpleButton>
        </ButtonContain>}
      </CompleteContain>
      <ButtonContain>
        <Link href="/Preview">
          <TransparentButton>
            Regresar al Catálogo
          </TransparentButton>
        </Link>
      </ButtonContain>
    </MainContainer>

  )
}
export default PurchaseComplete;