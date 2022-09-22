

import { useState } from "react";

import file from "react-player/file";

import Link from "next/link";
import { useRouter } from "next/router";

import { addLesson } from "../../../../store/actions/AdminActions";
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
  ImageContain,
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

const AddLesson = () => {
  const router = useRouter();
  const routerState = useRouter().query
  const { courseID, seasonID } = router.query;
  const [lesson, setLesson] = useState<any>({
    title: '',
    number: '',
    banner: '',
    link: '',
    image: "",
    extra: [],
    points: 0,
    about: '',
    homeWork: '',
    homeWorkAbout: '',
  })
  const newLesson = () => {
    if (lesson.title == '' ||
      lesson.number == '' ||
      lesson.link == '' ||
      lesson.image == '' ||
      lesson.about == '' ||
      lesson.homeWork == '' ||
      lesson.homeWorkAbout == '') {
      alert("Por favor complete todo los campos!");
    } else {
      addLesson(lesson, courseID, seasonID).then(() => {
        alert(
          "Lección Creada"
        )
        router.push({
          pathname: `/admin/Edit`,
          query: { documentID: courseID }
        });
      })
    }
  }
  const getDocuments = (file: any) => {
    let tempExtra: any = [];

    file = Object.values(file);
    file.forEach((element: any) => {
      var reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = (_event) => {
        tempExtra.push({ path: reader.result, title: element.name })
      }
    });
    setLesson({ ...lesson, extra: tempExtra })
  }
  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setLesson({ ...lesson, image: reader.result })
    };
  }
  return (
    <Container>
      <TitleContain>
        <Title>Nueva Lección</Title>
      </TitleContain>
      <EditContain>
        <Contain1>
          <InputContain>
            <Label>Título de la Lección</Label>
            <Input
              placeholder="Lorem Ipsum"
              onChange={(e) => {
                setLesson({
                  ...lesson, title: e.target.value
                })
              }}
            />
          </InputContain>
          <InputContain>
            <Label>Número de Lección</Label>
            <Input
              placeholder="1"
              onChange={(e) => {
                setLesson({
                  ...lesson, number: parseInt(e.target.value)
                })
              }}
            />
          </InputContain>
          <InputContain>
            <Label>Portada de la Lección</Label>
            <IconContain>
              <Folder />
              <Input2>
                <input
                  type="file"
                  placeholder="Seleccionar archivo"
                  onChange={(e) => { getImage(e.target.files) }}>
                </input>
              </Input2>
            </IconContain>
          </InputContain>
          <ImageContain>
            <img src={lesson.image} />
          </ImageContain>
          <InputContain>
            <Label>Hipervínculo del video</Label>
            <Input
              placeholder="https://www.youtube.com/watch?v=RfR2Eh3fGxA&t=218s"
              onChange={(e) => {
                setLesson({
                  ...lesson, link: e.target.value
                })
              }}
            />
          </InputContain>
        </Contain1>

        <Contain2>
          <InputContain>
            <Label>Material Adicional</Label>
            <IconContain>
              <Folder />
              <Input2>
                <input
                  type="file"
                  placeholder="Seleccionar archivo"
                  onChange={(e) => { getDocuments(e.target.files) }}>
                </input>
              </Input2>
            </IconContain>
          </InputContain>
          <InputContain>
            <Label>Puntos Acreditados</Label>
            <Input
              type="number"
              placeholder="200"
              defaultValue={0}
              onChange={(e) => {
                setLesson({
                  ...lesson, points: parseInt(e.target.value)
                })
              }}
            />
          </InputContain>
          <InputContain>
            <Label>Descripción de Lección</Label>
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
              onChange={(e) => {
                setLesson({
                  ...lesson, about: e.target.value
                })
              }}
            />
          </InputContain>
        </Contain2>
        <Contain3>
          <HwTitle>Tareas</HwTitle>
          <SlideContain>
            <TitleSlide>Tarea</TitleSlide>
          </SlideContain>
          <InputContain>
            <Label>Título de la Tarea</Label>
            <Input
              placeholder="Tarea 23: Intro a uñas francesas"
              onChange={(e) => {
                setLesson({
                  ...lesson, homeWork: e.target.value
                })
              }}
            />
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
            quisque."
              onChange={(e) => {
                setLesson({
                  ...lesson, homeWorkAbout: e.target.value
                })
              }}
            />
          </InputContain>
        </Contain3>
      </EditContain>
      <ButtonContain>
        <Link href={{
          pathname: "/admin/Edit",
          query: {
            documentID: routerState.courseID
          }
        }}
        ><TransparentButton>Regresar</TransparentButton></Link>
        <PurpleButton
          onClick={newLesson}
        >Guardar</PurpleButton>
      </ButtonContain>
    </Container>
  )
}
export default AddLesson;