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

const PurchaseComplete = ({ data, card, id, coupon, plan }: any) => {
  console.log(data);

  return (
    <MainContainer>
      <CompleteContain>
        <PurchaseTitle>
          ¡Compra Exitosa!
          {!coupon ?
            <CourseCostResp>
              ${data.price}.00
            </CourseCostResp> :
            <>
              {coupon.type == 'amount' ?
                <CourseCostResp>
                  ${data.price - coupon.discount}.00
                </CourseCostResp>
                : <CourseCostResp>
                  ${data.price - (coupon.discount / 100) * data.price}.00
                </CourseCostResp>}
            </>
          }
        </PurchaseTitle>
        <CourseName>
          {data.type == 'course' ? `Curso: ${data.title}` : `${data.type} ${data.title}`}
        </CourseName>
        <CardContain style={{ display: "flex" }}>
          <Card>
            <ImageContain>
              <CourseImage src={data.type == "course" ? data.img : "/images/Preview/HeroImage"} width={600} height={250} />
              {data.type == "course" && <NumberLesson>
                {data.lessons == 0 ? `${data.lessons} Lección` : `${data.lessons} Lecciones`}
              </NumberLesson>}
            </ImageContain>
            <CourseText>
              <TitleCourse>
                {data.title}
              </TitleCourse>
              {/* <Subtitle>
                {data.category}
              </Subtitle> */}
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
            {plan.method == 'stripe' ? <PurchaseData>
              Tarjeta de Crédito/Débito
              <br />
              {card.brand} terminada en {card.last4}
            </PurchaseData> :
              <PurchaseData>
                Paypal
              </PurchaseData>}
          </Text4>
          {!coupon ? <Text4>
            Total:
            <PurchaseData>
              ${data.price}.00
            </PurchaseData>
          </Text4> :
            <Text4>
              Total:
              {coupon.type == 'amount' ? <PurchaseData>
                ${data.price - coupon.discount}.00
              </PurchaseData> : <PurchaseData>
                ${data.price - (coupon.discount / 100) * data.price}.00
              </PurchaseData>}
            </Text4>}
        </BottomContain>
        {data.type == 'course' && <ButtonContain>
          <Link href={{ pathname: 'Lesson', query: { id: id, season: 0, lesson: 0 } }}>
            <PurpleButton>
              Empezar Curso
            </PurpleButton>
          </Link>
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