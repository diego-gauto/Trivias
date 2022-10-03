import React from 'react'
import { PurchaseContainer, ContainTitle, Card, CourseId, CourseName, CourseCost, CardContain, ImageContain, CourseImage, NumberLesson, CourseText, TitleCourse, Subtitle, CourseInfo, CourseCostResp } from './Purchase.styled';

const PurchaseDetails = ({ data, type }: any) => {
  const subscription = {
    price: 149.00,
    title: 'Gonvar Plus',
  }
  console.log(data);

  return (
    <PurchaseContainer>
      {type == 'course' &&
        <>
          <ContainTitle>
            Detalles de la compra
            <CourseCostResp>
              $ {data.price}.00
            </CourseCostResp>
          </ContainTitle>
          <CourseName>
            Curso de {data.title}
            <CourseCost>
              $ {data.price}.00
            </CourseCost>
          </CourseName>
          <CardContain>
            <Card>
              <ImageContain>
                <CourseImage src={data.img} width={600} height={250} />
                <NumberLesson>
                  {data.lessons > 0 ? `${data.lessons} Lecciones` : `${data.lessons} Lección`}
                </NumberLesson>
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
          <CourseInfo>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis tellus fames velit at eget ut lacinia. Bibendum cras enim mus fermentum malesuada tincidunt vivamus. Ipsum est urna elit pharetra sed amet, rhoncus sapien. Quisque sit ac nulla dui rhoncus nisi, a ac. Posuere vulputate nunc nulla ut in. Magna pretium vulputate id quam.
            <br />
            <br />
            Sapien purus interdum nisi, egestas scelerisque. Nascetur mattis viverra vitae, tempor. In diam, risus cras feugiat est suspendisse nisl eu, fringilla.
          </CourseInfo>
        </>
      }
      {type == 'subscription' &&
        <>
          <ContainTitle>
            Detalles de la compra
          </ContainTitle>
          <CourseName>
            Subscripción {subscription.title}
            <CourseCost>
              $ {subscription.price}.00
            </CourseCost>
          </CourseName>
          <ImageContain>
            <CourseImage src="/images/Preview/HeroImage" width={600} height={250} />
          </ImageContain>
          <CourseInfo>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis tellus fames velit at eget ut lacinia. Bibendum cras enim mus fermentum malesuada tincidunt vivamus. Ipsum est urna elit pharetra sed amet, rhoncus sapien. Quisque sit ac nulla dui rhoncus nisi, a ac. Posuere vulputate nunc nulla ut in. Magna pretium vulputate id quam.
            <br />
            <br />
            Sapien purus interdum nisi, egestas scelerisque. Nascetur mattis viverra vitae, tempor. In diam, risus cras feugiat est suspendisse nisl eu, fringilla.
          </CourseInfo>
        </>
      }
    </PurchaseContainer>
  )
}
export default PurchaseDetails;
