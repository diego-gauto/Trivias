import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { getTriviaApi, updateTriviaApi } from "../../../../../components/api/trivias";
import ITrivia, { ITriviaResult } from "../../../../../interfaces/iTrivias";
import { Background, LoaderContain, LoaderImage } from "../../../../../screens/Login.styled";
import styles from "./update.module.css";
import { Role, UserLevelValue } from "../../../../../components/GenericQueries/UserRoles/UserRolesInterfaces";
import { generateUserIdQuery, generateUserRoleAccessQuery, generateUserRolesLevelQuery } from "../../../../../components/GenericQueries/UserRoles/UserRolesQueries";
import { getGenericQueryResponse } from "../../../../../components/api/admin";

interface UserAccesssTrivias {
  canViewTrivias: boolean;
  canEditTrivias: boolean;
  canCreateTrivias: boolean;
}

const EditableTrivia = () => {
  const [userAccessTrivias, setUserAccessTrivias] = useState<UserAccesssTrivias>({ canCreateTrivias: false, canEditTrivias: false, canViewTrivias: false });
  const [userLevel, setUserLevel] = useState<UserLevelValue>('user');
  const { container, inputGroup, inputGroupQuestion, inputGroupAnswers, inputGroupResult, button, buttonContainer } = styles;
  const [loading, setLoading] = useState(true);
  const { query: { triviaId } } = useRouter();

  const [updatedTrivia, setUpdatedTrivia] = useState<ITrivia | null>(null);
  const [imagePaths, setImagePaths] = useState<{ [key: string]: string }>({});

  const { canCreateTrivias, canEditTrivias, canViewTrivias } = userAccessTrivias;

  const getUserData = async () => {
    try {
      const email = localStorage.getItem("email");
      if (email === null) {
        throw new Error('No existe un email establecido para el usuario');
      }
      const userIdQuery = generateUserIdQuery(email);
      const userIdResponse = await getGenericQueryResponse(userIdQuery);
      const userId = userIdResponse.data.data[0]['id'];
      // Roles request
      const userRolesQuery = generateUserRoleAccessQuery(userId);
      const userRolesResponse = await getGenericQueryResponse(userRolesQuery);
      const userRoles = userRolesResponse.data.data as Role[];
      const roleTrivias = userRoles.find(role => role.role === 'trivias');
      setUserAccessTrivias({
        canViewTrivias: roleTrivias?.view === 1,
        canEditTrivias: roleTrivias?.edit === 1,
        canCreateTrivias: roleTrivias?.create === 1,
      });
      // Role level
      const userLevelQuery = generateUserRolesLevelQuery(userId);
      const userLevelResponse = await getGenericQueryResponse(userLevelQuery);
      const userRoleLevel = userLevelResponse.data.data[0]['role'];
      setUserLevel(userRoleLevel);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  useEffect(() => {
    getUserData();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getTriviaApi(Number(triviaId));
      const triviaTemp = res[0]
      // Parsear la cadena JSON en la propiedad "questions"
      triviaTemp.questions = JSON.parse(triviaTemp.questions);
      // Parsear la cadena JSON en la propiedad "result"
      triviaTemp.result = JSON.parse(triviaTemp.result);
      if (triviaTemp) {
        setUpdatedTrivia(triviaTemp);
        const initialImagePaths: { [key: string]: string } = {};
        initialImagePaths["imgPathSelector"] = triviaTemp.imgSelector;
        triviaTemp.questions.forEach((question: any) => {
          initialImagePaths[`imgPathQuestion-${question.id}`] = question.imgQuestion;
        });

        triviaTemp.result.forEach((result: any, index: any) => {
          initialImagePaths[`imgPathResult-${index}`] = result.img;
        });

        setImagePaths(initialImagePaths);
      }

      setLoading(false);

    } catch (error) {
      console.error('Error al obtener la trivia:', error);
    }

  };

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

  const handleUpdate = () => {
    updateTriviaApi(Number(triviaId), updatedTrivia);
    console.log(updatedTrivia)
  };

  if (loading) {
    return (
      <Background style={{ "alignItems": "center", "justifyContent": "center" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }

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
      {
        (canEditTrivias || userLevel === 'superAdmin') && <div className={buttonContainer}>
          <Link href={"/admin/trivias/trivias"}>
            <a>
              <button className={button}>Cancelar</button>
            </a>
          </Link>
          <button className={button} onClick={handleUpdate}>Actualizar trivia</button>
        </div>
      }
    </div>
  );
};

export default EditableTrivia;
