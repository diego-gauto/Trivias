

import { useEffect, useState } from "react";
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
  ImageContain,
  Input,
  InputBig,
  InputContain,
  Label,
  PurpleButton,
  Title,
  TitleContain,
  TransparentButton,
} from "./Edit.styled";
import {
  CaretD2,
  Label2,
  Option,
  OptionContain,
  Selected,
  SelectContain,
} from "./Select/SelectStyles.styled";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { LoaderImage } from "../../../../screens/Login.styled";
import { LoaderContain } from "../../../Footer/Footer.styled";

const AddLesson = () => {
  const router = useRouter();
  const routerState = useRouter().query
  const { courseID, seasonID } = router.query;
  const [lesson, setLesson] = useState<any>({
    title: '',
    duration: 0,
    number: '',
    banner: '',
    link: '',
    image: "",
    extra: [],
    points: 0,
    about: '',
    homeWork: '',
    homeWorkAbout: '',
    objective: '',
    description: '',
  });
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState(false);
  const [quill, setQuill] = useState("");
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", false, "large", "huge"] }, {
          color: [
            "red",
            "blue"
          ]
        }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] }
        ],
        ["clean"]
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "align"
  ];

  const newLesson = () => {
    setLoader(true);
    if (!value) {
      if (lesson.title == '' ||
        lesson.number == '' ||
        lesson.link == '' ||
        lesson.image == '' ||
        lesson.objective == '' ||
        lesson.description == '' ||
        lesson.about == ''
      ) {
        setLoader(false);
        alert("Por favor complete todo los campos!");
      } else {
        lesson.homeworkAvailable = false;
        addLesson(lesson, courseID, seasonID).then(() => {
          setLoader(false);
          alert(
            "Lección Creada"
          )
          router.push({
            pathname: `/admin/Edit`,
            query: { documentID: courseID }
          });
        })
      }
    } else {
      if (lesson.title == '' ||
        lesson.number == '' ||
        lesson.link == '' ||
        lesson.image == '' ||
        lesson.about == '' ||
        lesson.homeWork == '' ||
        lesson.objective == '' ||
        lesson.description == '' ||
        quill == '') {
        setLoader(false);
        alert("Por favor complete todo los campos!");
      } else {
        lesson.homeworkAvailable = true;
        addLesson(lesson, courseID, seasonID).then(() => {
          setLoader(false);
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
          <InputContain>
            <Label>Objetivos</Label>
            <InputBig style={{ height: 100 }}
              placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis."
              onChange={(e) => {
                setLesson({
                  ...lesson, objective: e.target.value
                })
              }}
            />
          </InputContain>
        </Contain2>
        <Contain3>
          <InputContain>
            <Label>Frase descriptiva</Label>
            <Input
              placeholder="Frase descriptiva"
              onChange={(e) => {
                setLesson({
                  ...lesson, description: e.target.value
                })
              }}
            />
          </InputContain>
          <InputContain>
            <Label>Agregar Tarea</Label>
            <SelectContain key={3}>
              <Selected onClick={() => { setOpen(!open) }}>
                {!value ? 'No' : 'Si'}
                <CaretD2 />
              </Selected>
              {
                open == true &&
                <OptionContain>
                  <Option onClick={() => { setValue(true); setOpen(false); }}>
                    <input
                      type="radio"
                      id="Temporada1"
                      name="category"
                      value="Temporada 1"
                    />
                    <Label2 > Si</Label2>
                  </Option>
                  <Option onClick={() => { setValue(false); setOpen(false); }}>
                    <input
                      type="radio"
                      id="Temporada1"
                      name="category"
                      value="Temporada 1"
                    />
                    <Label2 > No</Label2>
                  </Option>
                </OptionContain>
              }
            </SelectContain>
          </InputContain>
          {value && (<>
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
              <ReactQuill placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
            adipiscing morbi mattis eget." id="quill" theme="snow"
                formats={formats} modules={modules}
                defaultValue="" onChange={(content, delta, source, editor) => {
                  setQuill(editor.getText()); setLesson({
                    ...lesson, homeWorkAbout: content
                  })
                }} />
            </InputContain>
          </>)}
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
        {
          !loader
            ?
            <PurpleButton
              onClick={newLesson}
            >Guardar</PurpleButton>
            :
            <LoaderContain />
        }

      </ButtonContain>
      {lesson.link && <ReactPlayer hidden
        url={lesson.link}
        onError={e => {
          alert("El formato del video es incorrecto!");
          setLesson({ ...lesson, duration: 0 })
        }
        }
        onDuration={(duration) =>
          setLesson({ ...lesson, duration: duration })
        }
      ></ReactPlayer>}
    </Container>

  )
}
export default AddLesson;