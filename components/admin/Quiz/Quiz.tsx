import React, { useEffect, useState } from 'react'
import { Title, TitleContain } from '../Courses/Form/Edit.styled';
import { MdDelete } from 'react-icons/md';
import { CaretD2, Label2, Option, OptionContain, SelectContain, Selected } from '../Courses/Form/Select/SelectStyles.styled';
import { Container, FormContainer, InputContainer, QuestionContainer, QuizContainer } from './Quiz.styled';
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { addQuiz } from '../../../store/actions/AdminActions';
import { useRouter } from 'next/router';
import { LoaderContain } from '../../../containers/Profile/User/User.styled';
const Quiz = () => {
  const router = useRouter();
  const { courseID, seasonID } = router.query;
  const [mandatory, setMandatory] = useState<boolean>(false)
  const [openSelect, setOpenSelect] = useState<boolean>(false)
  const [loader, setLoader] = useState(false);
  const [question, setQuestion] = useState<any>({
    question: "",
    answers: []
  })
  const [quill, setQuill] = useState("");
  const [quiz, setQuiz] = useState<any>({
    questions: [],
    number: '',
    passingGrade: 0,
    points: 0,
    title: '',
  });
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", "normal", "large", "huge"] }, {
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

  useEffect(() => {
  }, [quill])
  const addQuestion = () => {
    let tempQuiz: any = quiz;
    if (question.question !== "") {
      tempQuiz.questions.push(question)
    }
    setQuiz({ ...tempQuiz })
  }
  const removeQuestion = (index: number) => {
    let tempQuiz: any = quiz;
    tempQuiz.questions.splice(index, 1)
    setQuiz({ ...tempQuiz })
  }

  const addAnswer = (index: number) => {
    let tempQuiz: any = quiz;
    let inpAnswer: any = document.getElementById("answer" + index) as HTMLInputElement;
    if (inpAnswer.value) {
      tempQuiz.questions[index].answers.push({ answer: inpAnswer.value, status: false });
    }
    setQuiz({ ...tempQuiz })
  }
  const changeStatus = (index: number, ind: number) => {
    let tempQuiz: any = quiz;
    tempQuiz.questions[index].answers.forEach((element: any, idx: number) => {
      if (ind == idx) {
        tempQuiz.questions[index].answers[ind].status = true;
      }
      else {
        tempQuiz.questions[index].answers[idx].status = false;
      }
    });
    setQuiz({ ...tempQuiz })
  }
  const removeAnswer = (index: number, ind: number) => {
    let tempQuiz: any = quiz;
    tempQuiz.questions[index].answers.splice(ind, 1)
    console.log({ ...tempQuiz })
    setQuiz({ ...tempQuiz })
  }
  const submit = () => {
    setLoader(true);
    quiz.mandatory = mandatory;
    console.log(quiz);
    if (quiz.title == '' ||
      quiz.number == '' ||
      quiz.passingGrade == '' ||
      quiz.points == '') {
      setLoader(false);
      alert("Por favor complete todo los campos!");
    } else {
      addQuiz(quiz, courseID, seasonID).then(() => {
        alert(
          "Quiz Creado"
        )
        setLoader(false);
        router.push({
          pathname: `/admin/Edit`,
          query: { documentID: courseID }
        });
      })
    }

  }
  return (
    <QuizContainer>
      <TitleContain>
        <Title>Nuevo Quiz</Title>
        {
          !loader
            ? <button className='button-save' onClick={submit}>Guardar Cambios</button>
            : <LoaderContain />
        }

      </TitleContain>
      <FormContainer>
        <Container>
          <InputContainer>
            <label>Número de Lección
            </label>
            <input
              placeholder="2"
              onChange={(e: any) => {
                setQuiz({
                  ...quiz, number: parseFloat(e.target.value)
                })
              }}
            />
          </InputContainer>
          <InputContainer>
            <label>Nombre del Quiz</label>
            <input
              placeholder="Nombre del Quiz"
              onChange={(e: any) => {
                setQuiz({
                  ...quiz, title: e.target.value
                })
              }}
            />
          </InputContainer>
          <InputContainer>
            <label>Calificación Aprobatoria</label>
            <input
              placeholder="70"
              onChange={(e: any) => {
                setQuiz({
                  ...quiz, passingGrade: parseInt(e.target.value)
                })
              }}
            />
          </InputContainer>
          <InputContainer>
            <label>Obligatorio</label>
            <SelectContain key={3}>
              <Selected onClick={() => { setOpenSelect(!openSelect) }}>
                {
                  mandatory == false ? "Flexible" : "Obligatorio"
                }
                <CaretD2 />
              </Selected>
              {
                openSelect == true &&
                <OptionContain>
                  <Option onClick={() => { setOpenSelect(false); setMandatory(false) }}>
                    <input
                      type="radio"
                      id="mandatory"
                      value="flexible"
                    />
                    <Label2 > Flexible</Label2>
                  </Option>
                  <Option onClick={() => { setOpenSelect(false); setMandatory(true) }}>
                    <input
                      type="radio"
                      id="mandatory"
                      value="Obligatorio"
                    />
                    <Label2 >Obligatorio</Label2>
                  </Option>
                </OptionContain>
              }
            </SelectContain>
          </InputContainer>
          <InputContainer>
            <label>Puntos</label>
            <input
              placeholder="100"
              onChange={(e: any) => {
                setQuiz({
                  ...quiz, points: parseInt(e.target.value)
                })
              }}
            />
          </InputContainer>
        </Container>
        <QuestionContainer>
          <p className="title">
            Preguntas
          </p>
          <div className="first-container">
            <div className="input-contain">
              <label>Pregunta</label>
              <ReactQuill
                placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc." id="quill" theme="snow"
                formats={formats} modules={modules}
                defaultValue="" onChange={(content, delta, source, editor) => {
                  setQuill(editor.getText()); setQuestion({
                    ...question, question: content, answers: []
                  })
                }} />
              <button
                className="button"
                onClick={addQuestion}
              > Crear Pregunta
              </button>
            </div>
          </div>

          {
            quiz.questions.map((question: any, index: any) => {
              return (
                <div className="question-content" key={"Preguntas " + index}>
                  <div className="questions">
                    <p className="question-title">Pregunta {index + 1}:</p>
                    <div className="button-contain">
                      <input type="text" id={"answer" + index} placeholder="Respuesta" />
                      <button className="button-add" onClick={() => { addAnswer(index) }}>
                        Agregar Respuesta
                      </button>
                      <button className="button-delete" onClick={() => {
                        removeQuestion(index);
                      }}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: question.question }} />
                  {
                    question.answers.length > 0 &&
                    <p className="question-title" style={{ fontWeight: "bold" }}>Respuestas</p>
                  }

                  {question.answers.map((answer: any, ind: any) => {
                    return (
                      <div className='answers' key={"answers" + ind}>
                        <div
                          className='status' style={{ backgroundColor: answer.status ? "#00d14d" : "#D10000" }}
                          onClick={() => { changeStatus(index, ind) }}
                        />
                        <p> {ind + 1 + ": "}</p>
                        {/* <input
                          defaultValue={answer.answer}
                          // onChange={(e) => { setQuiz({ ...quiz, questions: quiz.questions[index].answers[ind] }) }}
                        /> */}
                        <p>{answer.answer}</p>
                        <MdDelete
                          className="trash" style={{ cursor: "pointer", fontSize: 20 }}
                          onClick={() => { removeAnswer(index, ind) }}
                        />
                      </div>

                    )
                  })}
                </div>
              )
            })
          }

        </QuestionContainer>

      </FormContainer>
    </QuizContainer>

  )
}
export default Quiz;