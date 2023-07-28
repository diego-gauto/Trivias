import React, { useEffect, useState } from "react";

import { createTriviaApi } from "../../../../../components/api/trivias";
import ITrivia, { ITriviaResult } from "../../../../../interfaces/iTrivias";
import styles from "./create.module.css";

const CreateTrivia = () => {

  const { container, inputGroup, inputGroupQuestion, inputGroupAnswers, inputGroupResult } = styles


  const data =
  {
    imgSelector: "",
    color: "",
    trans: "",
    title: "",
    questions: [
      {
        id: 1,
        question: "",
        imgQuestion: "",
        answers: [
          {
            text: "",
            correct: true,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
        ],
      },
      {
        id: 2,
        question: "",
        imgQuestion: "",
        answers: [
          {
            text: "",
            correct: true,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
        ],
      },
      {
        id: 3,
        question: "",
        imgQuestion: "",
        answers: [
          {
            text: "",
            correct: true,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
        ],
      },
      {
        id: 4,
        question: "",
        imgQuestion: "",
        answers: [
          {
            text: "",
            correct: true,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
        ],
      },
      {
        id: 5,
        question: "",
        imgQuestion: "",
        answers: [
          {
            text: "",
            correct: true,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
        ],
      },
    ],
    result: [
      {
        title: "",
        body: ``,
        img: "",
        idTemplateBrevo: 0,
      },
      {
        title: "",
        body: ``,
        img: "",
        idTemplateBrevo: 0,
      },
      {
        title: "",
        body: ``,
        img: "",
        idTemplateBrevo: 0,
      },
    ],
  }


  const [updatedTrivia, setUpdatedTrivia] = useState<ITrivia | null>(null);
  const [imagePaths, setImagePaths] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data) {
      let prevTrivia = data;
      setUpdatedTrivia(prevTrivia);
    }
  }, []);

  const isQuestionInput = (name: string) => name.startsWith("question-");
  const isAnswerInput = (name: string) => name.startsWith("answer-");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Verificar si el input corresponde a una imagen de pregunta
    if (name.startsWith("imgPathQuestion-")) {
      const questionId = parseInt(name.split("-")[1] || "");
      setImagePaths((prevImagePaths) => ({
        ...prevImagePaths,
        [name]: value,
      }));
      setUpdatedTrivia((prevState) => {
        if (!prevState) return null;
        const updatedQuestions = prevState.questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              imgQuestion: value,
            };
          }
          return question;
        });
        return {
          ...prevState,
          questions: updatedQuestions,
        };
      });
    }
    // Verificar si el input corresponde a una imagen de selector
    else if (name.startsWith("imgPathSelector")) {
      setImagePaths((prevImagePaths) => ({
        ...prevImagePaths,
        [name]: value,
      }));
      setUpdatedTrivia({
        ...updatedTrivia!,
        ["imgSelector"]: value,
      });
    }
    // Verificar si el input corresponde a una pregunta
    else if (isQuestionInput(name)) {
      const questionId = parseInt(name.split("-")[1] || "");
      setUpdatedTrivia((prevState) => {
        if (!prevState) return null;

        const updatedQuestions = prevState.questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              question: value,
            };
          }
          return question;
        });

        return {
          ...prevState,
          questions: updatedQuestions,
        };
      });
    }
    // Verificar si el input corresponde a una respuesta
    else if (isAnswerInput(name)) {
      const [questionId, answerIndex] = name.split("-").slice(1).map((part) => parseInt(part));
      setUpdatedTrivia((prevState) => {
        if (!prevState) return null;

        const updatedQuestions = prevState.questions.map((question) => {
          if (question.id === questionId) {
            const updatedAnswers = question.answers.map((answer, index) => {
              if (index === answerIndex) {
                return {
                  ...answer,
                  text: value,
                };
              }
              return answer;
            });

            return {
              ...question,
              answers: updatedAnswers,
            };
          }
          return question;
        });

        return {
          ...prevState,
          questions: updatedQuestions,
        };
      });
    }
    // Actualizar otros campos de input
    else {
      setUpdatedTrivia({
        ...updatedTrivia!,
        [name]: value,
      });
    }
  };

  const handleQuestionChange = (questionId: number, answerIndex: number, isCorrect: boolean) => {
    setUpdatedTrivia((prevState: any) => {
      const updatedQuestions = prevState.questions.map((question: any) => {
        if (question.id === questionId) {
          const updatedAnswers = question.answers.map((answer: any, index: number) => {
            if (index === answerIndex) {
              return {
                ...answer,
                correct: isCorrect,
              };
            }
            return answer;
          });

          return {
            ...question,
            answers: updatedAnswers,
          };
        }
        return question;
      });

      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const handleResultChange = (
    resultIndex: number,
    fieldName: keyof ITriviaResult,
    value: string | number
  ) => {
    setUpdatedTrivia((prevState) => {
      if (!prevState) return null;

      const updatedResult = prevState.result.map((result, index) => {
        if (index === resultIndex) {
          return {
            ...result,
            [fieldName]: value,
          };
        }
        return result;
      });

      return {
        ...prevState,
        result: updatedResult,
      };
    });

    // Solo actualizamos imagePaths si fieldName es "img"
    if (fieldName === "img") {
      setImagePaths((prevImagePaths) => {
        const updatedImagePaths = { ...prevImagePaths };
        updatedImagePaths[`imgPathResult-${resultIndex}`] = value.toString();
        return updatedImagePaths;
      });
    }
  };

  const handleCancel = () => {

  };

  const handleCreate = () => {
    console.log(updatedTrivia)
    createTriviaApi(updatedTrivia)
      .then((result) => {
        console.log(result)
        if (result === true) {
          // Trivia fue creada exitosamente
          alert("Trivia creada exitosamente.");
        } else {
          // Trivia no fue creada
          alert("Fallo al crear la trivia.");
        }
      })
      .catch((error) => {
        // Error en la llamada
        console.log("Error en la llamada a la API:", error);
      });
  };

  return (
    <div className={container}>
      <div className={inputGroup}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedTrivia?.title}
          onChange={handleInputChange}
        />
      </div>

      <div className={inputGroup}>
        <label htmlFor="imgPathSelector">Imagen:</label>
        <input
          type="text"
          id="imgPathSelector"
          name="imgPathSelector"
          value={imagePaths["imgPathSelector"]}
          onChange={handleInputChange}
        />
        {imagePaths["imgPathSelector"] && (
          <img
            src={imagePaths["imgPathSelector"]}
            alt="Imagen 2"
            style={{ width: "100px" }}
          />
        )}
      </div>

      <div className={inputGroup}>
        <label htmlFor="color">Color principal:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={updatedTrivia?.color}
          onChange={handleInputChange}
        />
      </div>

      <div className={inputGroup}>
        <label htmlFor="trans">Color de transparencia:</label>
        <input
          type="text"
          id="trans"
          name="trans"
          value={updatedTrivia?.trans}
          onChange={handleInputChange}
        />
      </div>

      {updatedTrivia?.questions.map((question) => (
        <div key={question.id} className={inputGroupQuestion}>
          <label htmlFor={`question-${question.id}`}>Pregunta {question.id}:</label>
          <input
            type="text"
            id={`question-${question.id}`}
            name={`question-${question.id}`}
            value={question.question}
            onChange={handleInputChange}
          />

          <label htmlFor={`imgPathQuestion-${question.id}`}>Imagen:</label>
          <input
            type="text"
            id={`imgPathQuestion-${question.id}`}
            name={`imgPathQuestion-${question.id}`}
            value={imagePaths[`imgPathQuestion-${question.id}`]}
            onChange={handleInputChange}
          />
          {imagePaths[`imgPathQuestion-${question.id}`] && (
            <img
              src={imagePaths[`imgPathQuestion-${question.id}`]}
              alt={imagePaths[`imgPathQuestion-${question.id}`]}
              style={{ width: "100px" }}
            />
          )}

          {question.answers.map((answer, index) => (
            <div key={index} className={inputGroupAnswers}>
              <label htmlFor={`answer-${question.id}-${index}`}>Respuesta {index + 1}:</label>
              <input
                type="text"
                id={`answer-${question.id}-${index}`}
                name={`answer-${question.id}-${index}`}
                value={answer.text}
                onChange={handleInputChange}
              />

              <input
                type="checkbox"
                checked={answer.correct}
                onChange={(e) =>
                  handleQuestionChange(
                    question.id,
                    index,
                    e.target.checked
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}

      {updatedTrivia?.result.map((result, index) => (
        <div key={index} className={inputGroupResult}>
          <label htmlFor={`result-title-${index}`}>Título del resultado {index + 1}:</label>
          <input
            type="text"
            id={`result-title-${index}`}
            name={`result-title-${index}`}
            value={result.title}
            onChange={(e) => handleResultChange(index, 'title', e.target.value)}
          />

          <label htmlFor={`result-body-${index}`}>Cuerpo del resultado {index + 1}:</label>
          <textarea
            id={`result-body-${index}`}
            name={`result-body-${index}`}
            rows={4}
            value={result.body}
            onChange={(e) => handleResultChange(index, 'body', e.target.value)}
          />

          <label htmlFor={imagePaths[`imgPathResult-${index}`]}>Imagen del resultado {index + 1}:</label>
          <input
            type="text"
            id={imagePaths[`imgPathResult-${index}`]}
            name={imagePaths[`imgPathResult-${index}`]}
            value={imagePaths[`imgPathResult-${index}`]}
            onChange={(e) => handleResultChange(index, 'img', e.target.value)}
          />
          {imagePaths[`imgPathResult-${index}`] && (
            <img
              src={imagePaths[`imgPathResult-${index}`]}
              alt={imagePaths[`imgPathResult-${index}`]}
              style={{ width: "100px" }}
            />
          )}

          <label htmlFor={`result-idTemplateBrevo-${index}`}>ID del template Brevo del resultado {index + 1}:</label>
          <input
            type="number"
            id={`result-idTemplateBrevo-${index}`}
            name={`result-idTemplateBrevo-${index}`}
            value={result.idTemplateBrevo}
            onChange={(e) =>
              handleResultChange(index, 'idTemplateBrevo', parseInt(e.target.value))
            }
          />
        </div>
      ))}

      <button onClick={handleCancel}>Cancelar</button>
      <button onClick={handleCreate}>Crear Trivia</button>
    </div>
  );
};

export default CreateTrivia;