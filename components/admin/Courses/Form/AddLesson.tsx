

import { useForm, SubmitHandler } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { db } from "../../../../firebase/firebaseConfig";
import { Input2 } from "../../Rewards/Prizes/Modal/Modal.styled";
import { IconContain } from "./CourseForm.styled";
import {
  ButtonContain,
  Contain1,
  Contain2,
  Contain3,
  Container,
  EditContain,
  Folder,
  HwTitle,
  Input,
  InputBig,
  InputContain,
  Label,
  PurpleButton,
  SlideContain,
  Title,
  TitleContain,
  TitleSlide,
  TransparentButton,
} from "./Edit.styled";

const formSchema = yup.object().shape({
  lessonDescription: yup
    .string()
    .required("Campo requerido"),
  lessonTitle: yup
    .string()
    .required("Campo requerido"),
});

type NewLessonAdded = {
  lessonDescription: string,
  lessonTitle: string,
}
type Props = {
  episode: string;
};

const AddLesson = (props: Props) => {
  console.log("CONTEXT QUERY", props)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewLessonAdded>({
    resolver: yupResolver(formSchema)
  });

  var courseID: any = ""
  try {
    var str: any = ""
    var arr: any = []
    str = window.location.search;
    arr = str.split("?documentID=")
    str = arr[1]
    courseID = str

  } catch (error) {
    courseID = "none"
  }
  const onSubmit: SubmitHandler<NewLessonAdded> = formData => {
    let signUpData = {
      data: {
        lessonDescription: formData.lessonDescription,
        lessonTitle: formData.lessonTitle,
      },
    };

    createNewLesson(signUpData).then(() => {

      window.location.href = "/admin/Courses";
      console.log("done!")

    });
  }


  const createNewLesson = async (signUpData: { data: any; }) => {
    const {
      data,
    } = signUpData;
    return await db.collection("courses").doc().collection("seasons").doc("17Kk33mvZrxPiaT6fiRL").collection("lessons").add(data);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleContain>
          <Title>Nueva Lección</Title>
        </TitleContain>
        <EditContain>
          <Contain1>

            <InputContain>
              <Label>Título de la Lección</Label>
              <Input placeholder="Epidosio 1: Lorem Ipsum"
                className={`form-control ${errors.lessonTitle ? 'is-invalid' : ''}`}
                {...register("lessonTitle")} />
            </InputContain>
            <InputContain>
              <Label>Portada de la Lección</Label>
              <IconContain>
                <Folder />
                <Input2
                  type="file"
                  placeholder="Seleccionar archivo"
                />
              </IconContain>
            </InputContain>
            <Image src="/images/admin/Courses/Demo/Edit.png" width={480} height={274} />
            <InputContain>
              <Label>Hipervínculo del video</Label>
              <Input placeholder="https://www.youtube.com/watch?v=RfR2Eh3fGxA&t=218s" />
            </InputContain>
          </Contain1>

          <Contain2>
            <InputContain>
              <Label>Material Adicional</Label>
              <IconContain>
                <Folder />
                <Input2
                  type="file"
                  placeholder="Seleccionar archivo"
                />
              </IconContain>
            </InputContain>
            <InputContain>
              <Label>Puntos Acreditados</Label>
              <Input placeholder="200" />
            </InputContain>
            <InputContain>
              <Label>Material Adicional</Label>
              <InputBig
                placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
            adipiscing morbi mattis eget. Sed accumsan quisque mi sodales 
            malesuada fusce scelerisque urna. Enim sit pulvinar dui ipsum 
            feugiat. Ac enim ultrices venenatis imperdiet suspendisse mattis 
            enim. Mauris odio sit id curabitur enim mi. Orci id pharetra morbi 
            quisque."
                className={`form-control ${errors.lessonDescription ? 'is-invalid' : ''}`}
                {...register("lessonDescription")} />
            </InputContain>
          </Contain2>
          <Contain3>
            <HwTitle>Tareas</HwTitle>
            <SlideContain>
              <TitleSlide>Tarea</TitleSlide>
            </SlideContain>
            <InputContain>
              <Label>Título de la Tarea</Label>
              <Input placeholder="Tarea 23: Intro a uñas francesas" />
            </InputContain>
            <InputContain>
              <Label>Descripción de la Tarea</Label>
              <InputBig
                placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
            adipiscing morbi mattis eget. Sed accumsan quisque mi sodales 
            malesuada fusce scelerisque urna. Enim sit pulvinar dui ipsum 
            feugiat. Ac enim ultrices venenatis imperdiet suspendisse mattis 
            enim. Mauris odio sit id curabitur enim mi. Orci id pharetra morbi 
            quisque." />
            </InputContain>
          </Contain3>
        </EditContain>
        <ButtonContain>
          <Link href="/admin/Courses"><TransparentButton>Regresar</TransparentButton></Link>
          <PurpleButton type='submit'>Guardar</PurpleButton>
        </ButtonContain>
      </form>
    </Container>
  )
}
export default AddLesson;