import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Link from "next/link";

import styles from "./create.module.css";

interface Option {
  isVisible: boolean | null;
  label: string;
  options: string[];
}

interface Form {
  name: string;
  title: string;
  subtitle: string;
  createdAt: string;
  editedAt: string;
  img: {
    source: string;
    isVisible: boolean | null;
  };
  optionsArray: Option[];
  redirect: {
    type: "thankYouPage" | "customLink";
    link: string;
    textButton: string;
  };
}

const CreateForm = () => {
  const { container, inputGroup, button, buttonContainer } = styles;

  const data: Form = {
    name: "",
    title: "",
    subtitle: "",
    createdAt: "",
    editedAt: "",
    img: { source: "", isVisible: false },
    optionsArray: [
      { isVisible: false, label: "", options: ["", ""] },
      { isVisible: false, label: "", options: ["", ""] },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  };

  const [updatedForm, setUpdatedForm] = useState<Form | null>(null);

  const editorOptions = {
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["clean"],
      ],
    },
    formats: ["bold", "italic", "underline", "strike", "color", "background", "size"],
  };

  useEffect(() => {
    if (data) {
      let prevForm = data;
      setUpdatedForm(prevForm);
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setUpdatedForm((prevForm) => ({ ...(prevForm as Form), name: newName }));
  };

  const handleTitleChange = (content: string) => {
    setUpdatedForm((prevForm) => ({ ...(prevForm as Form), title: content }));
  };

  const handleSubtitleChange = (content: string) => {
    setUpdatedForm((prevForm) => ({ ...(prevForm as Form), subtitle: content }));
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImgSource = e.target.value;
    setUpdatedForm((prevForm) => ({
      ...(prevForm as Form),
      img: { ...prevForm!.img, source: newImgSource },
    }));
  };

  const handleImgVisibilityChange = () => {
    setUpdatedForm((prevForm) => ({
      ...(prevForm as Form),
      img: { ...prevForm!.img, isVisible: !prevForm!.img.isVisible },
    }));
  };

  const handleLabelOptionAChange = (content: string, questionIndex: number) => {
    setUpdatedForm((prevForm) => {
      if (!prevForm) return null;

      const updatedOptionsArray = (prevForm.optionsArray || []).map((option, index) =>
        index === questionIndex ? { ...option, label: content } : option
      );

      return {
        ...prevForm,
        optionsArray: updatedOptionsArray,
      };
    });
  };

  const handleAddOption = (questionIndex: number) => {
    setUpdatedForm((prevForm) => {
      if (!prevForm) return null;

      const updatedOptionsArray = (prevForm.optionsArray || []).map((question, index) =>
        index === questionIndex
          ? { ...question, options: question.options ? [...question.options, ""] : [""] }
          : question
      );

      return {
        ...prevForm,
        optionsArray: updatedOptionsArray,
      };
    });
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    setUpdatedForm((prevForm) => {
      if (!prevForm) return null;

      const updatedOptionsArray = (prevForm.optionsArray || []).map((question, index) =>
        index === questionIndex
          ? {
            ...question,
            options: question.options
              ? [...question.options.slice(0, optionIndex), ...question.options.slice(optionIndex + 1)]
              : [],
          }
          : question
      );

      return {
        ...prevForm,
        optionsArray: updatedOptionsArray,
      };
    });
  };

  const handleLabelOptionChange = (questionIndex: number, optionIndex: number, content: string) => {
    setUpdatedForm((prevForm) => {
      if (!prevForm) return null;

      const updatedOptionsArray = (prevForm.optionsArray || []).map((question, index) =>
        index === questionIndex
          ? {
            ...question,
            options: question.options
              ? [...question.options.slice(0, optionIndex), content, ...question.options.slice(optionIndex + 1)]
              : [],
          }
          : question
      );

      return {
        ...prevForm,
        optionsArray: updatedOptionsArray,
      };
    });
  };

  const handleOptionVisibilityChange = (questionIndex: number) => {
    setUpdatedForm((prevForm) => {
      if (!prevForm) return null;

      const updatedOptionsArray = (prevForm.optionsArray || []).map((option, index) =>
        index === questionIndex ? { ...option, isVisible: !option.isVisible } : option
      );

      return {
        ...prevForm,
        optionsArray: updatedOptionsArray,
      };
    });
  };

  const handleLinkTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const redirectType = e.target.value as "thankYouPage" | "customLink";

    setUpdatedForm((prevForm) => ({
      ...(prevForm as Form),
      redirect: {
        ...prevForm!.redirect,
        type: redirectType,
        link: redirectType === "customLink" ? "" : prevForm!.redirect.link,
      },
    }));
  };

  const handleRedirectChange = (value: string) => {
    setUpdatedForm((prevForm) => ({
      ...(prevForm as Form),
      redirect: {
        ...prevForm!.redirect,
        type: value as "thankYouPage" | "customLink",  // Asegurarse de que el valor sea del tipo correcto
        link: value === "customLink" ? "" : prevForm!.redirect.link,  // Restablecer el valor del enlace si se cambia a otra opción
      },
    }));
  };

  const handleRedirectLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value;
    setUpdatedForm((prevForm) => ({
      ...(prevForm as Form),
      redirect: {
        ...prevForm!.redirect,
        link: newLink,
      },
    }));
  };

  const handleTextButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTextButton = e.target.value;
    setUpdatedForm((prevForm) => ({
      ...(prevForm as Form),
      textButton: newTextButton,
    }));
  };

  const handleCreate = () => {
    console.log(updatedForm);
    // Lógica para crear el formulario
  };

  return (
    <div className={container}>
      <div className={inputGroup}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={updatedForm?.name}
          onChange={handleNameChange}
        />
      </div>

      <div>
        <label htmlFor="title">Título:</label>
        <ReactQuill
          id="title"
          value={updatedForm?.title}
          onChange={handleTitleChange}
          modules={editorOptions.modules}
          formats={editorOptions.formats}
        />
      </div>

      <div>
        <label htmlFor="subtitle">Párrafo:</label>
        <ReactQuill
          id="subtitle"
          value={updatedForm?.subtitle}
          onChange={handleSubtitleChange}
          modules={editorOptions.modules}
          formats={editorOptions.formats}
        />
      </div>

      <div className={inputGroup}>
        <label htmlFor="imgPath">Imagen:</label>
        <input
          type="text"
          id="imgPath"
          name="imgPath"
          value={updatedForm?.img.source}
          onChange={handleImgChange}
        />

        <div>
          <label>
            <input
              type="checkbox"
              checked={updatedForm?.img.isVisible || false}
              onChange={handleImgVisibilityChange}
            />
            Mostrar Imagen
          </label>
        </div>
        {updatedForm?.img.source && (
          <img
            src={updatedForm?.img.source}
            alt="Imagen 2"
            style={{ width: "100px" }}
          />
        )}
      </div>

      {[0, 1, 2].map((questionIndex) => (
        <div key={questionIndex}>
          <label htmlFor={`option${questionIndex + 1}`}>{`Pregunta ${questionIndex + 1}:`}</label>
          <ReactQuill
            id={`option${questionIndex + 1}`}
            value={updatedForm?.optionsArray[questionIndex]?.label}
            onChange={(content) => handleLabelOptionAChange(content, questionIndex)}
            modules={editorOptions.modules}
            formats={editorOptions.formats}
          />

          {[...Array.from({ length: updatedForm?.optionsArray[questionIndex]?.options.length || 0 }).keys()].map(
            (optionIndex) => (
              <div key={optionIndex}>
                <label htmlFor={`option${questionIndex + 1}_${optionIndex + 1}`}>
                  {`Opción ${optionIndex + 1}:`}
                </label>
                {optionIndex < 2 ? (
                  <input
                    type="text"
                    id={`option${questionIndex + 1}_${optionIndex + 1}`}
                    value={updatedForm?.optionsArray[questionIndex]?.options[optionIndex]}
                    onChange={(e) => handleLabelOptionChange(questionIndex, optionIndex, e.target.value)}
                  />
                ) : (
                  <>
                    <input
                      type="text"
                      id={`option${questionIndex + 1}_${optionIndex + 1}`}
                      value={updatedForm?.optionsArray[questionIndex]?.options[optionIndex]}
                      onChange={(e) => handleLabelOptionChange(questionIndex, optionIndex, e.target.value)}
                    />
                    <button onClick={() => handleRemoveOption(questionIndex, optionIndex)}>-</button>
                  </>
                )}
              </div>
            )
          )}

          <button onClick={() => handleAddOption(questionIndex)}>+</button>
          <div>
            <label>
              <input
                type="checkbox"
                checked={updatedForm?.optionsArray[questionIndex]?.isVisible || false}
                onChange={() => handleOptionVisibilityChange(questionIndex)}
              />
              Es visible
            </label>
          </div>
        </div>
      ))}

      <div>
        <label>Redirección del botón "Enviar solicitud":</label>
        <div>
          <input
            type="radio"
            value="thankYouPage"
            checked={updatedForm?.redirect.type === "thankYouPage"}
            onChange={() => handleRedirectChange("thankYouPage")}
          />
          <label>Redirigir a Thank You Page</label>
        </div>
        <div>
          <input
            type="radio"
            value="customLink"
            checked={updatedForm?.redirect.type === "customLink"}
            onChange={() => handleRedirectChange("customLink")}
          />
          <label>Ingresar link de redirección:</label>
          {updatedForm?.redirect.type === "customLink" && (
            <input
              type="text"
              value={updatedForm?.redirect.link}
              onChange={handleRedirectLinkChange}
            />
          )}
        </div>
      </div>

      <div>
        <label htmlFor="textButton">Texto del botón:</label>
        <input
          type="text"
          id="textButton"
          value={updatedForm?.redirect.textButton || ""}
          onChange={handleTextButtonChange}
          placeholder="Ingrese el texto del botón"
        />
      </div>

      <div className={buttonContainer}>
        <Link href={"/admin/Forms/"}>
          <a>
            <button className={button}>Cancelar</button>
          </a>
        </Link>
        <button className={button} onClick={handleCreate}>
          Crear Formulario
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
