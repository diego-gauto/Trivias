import React, { useEffect, useState } from 'react'
import { Title, TitleContain } from '../Courses/Form/Edit.styled';
import { CaretD2, Label2, Option, OptionContain, SelectContain, Selected } from '../Courses/Form/Select/SelectStyles.styled';
import { Container, FormContainer, InputContainer, QuestionContainer, QuizContainer } from './Quiz.styled';
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const Quiz = () => {
  const [mandatory, setMandatory] = useState<boolean>(false)
  const [openSelect, setOpenSelect] = useState<boolean>(false)
  const [question, setQuestion] = useState<any>({
    question: "",
    answers: []
  })
  const [quill, setQuill] = useState("");
  const [quiz, setQuiz] = useState<any>({
    questions: []
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

  return (
    <QuizContainer>
      <TitleContain>
        <Title>Nuevo Quiz</Title>
      </TitleContain>
      <FormContainer>
        <Container>
          <InputContainer>
            <label>Nombre del Quiz</label>
            <input
              placeholder="Nombre del Quiz"
            />
          </InputContainer>
          <InputContainer>
            <label>Calificación Aprobatoria</label>
            <input
              placeholder="70"
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
                      <button className="button-add">
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