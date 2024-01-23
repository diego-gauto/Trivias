import React, { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";

import { collection, doc, query, setDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

import { createFormApi } from "../../../../components/api/form";
import { db } from "../../../../firebase/firebaseConfig";
import styles from "./create.module.css";

const ReactQuill = dynamic(import('react-quill'), { ssr: false })
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
  const { container, lineaAtravesada, inputGroup, titleGroup, editor, imgGroup, questionGroup, options, newOptionButton, checkGroup, redirectGroup, buttonContainer, button, textButtonGroup } = styles;

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

  const router = useRouter();

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
    // Check if formId is present in the query parameters
    const { copy } = router.query;

    if (copy) {
      // Load data from localStorage if formId is present
      const storedFormData = localStorage.getItem('formData');
      if (storedFormData) {
        const parsedFormData = JSON.parse(storedFormData);
        setUpdatedForm(parsedFormData);
      }
    } else {
      // If formId is not present, use the default data
      setUpdatedForm(data);
    }
  }, [router.query]);

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

  const handleRedirectChange = (value: string) => {
    setUpdatedForm((prevForm) => ({
      ...(prevForm as Form),
      redirect: {
        ...prevForm!.redirect,
        type: value as "thankYouPage" | "customLink",  // Asegurarse de que el valor sea del tipo correcto
        link: value === "thankYouPage" ? "" : prevForm!.redirect.link,  // Restablecer el valor del enlace si se cambia a otra opción
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
      redirect: {
        ...prevForm!.redirect,
        textButton: newTextButton,
      },
    }));
  };

  const handlePreview = () => {
    // Guardar datos temporalmente (por ejemplo, en localStorage)
    localStorage.setItem('formData', JSON.stringify(updatedForm));

    // Obtener la URL completa para la nueva ruta
    const previewUrl = `${window.location.origin}/forms/preview`;

    // Abrir una nueva pestaña con window.open y redirigir usando router.push solo en la pestaña actual
    const newTab = window.open(previewUrl, '_blank');
    if (newTab) {
      newTab.focus();

      // Verificar si la pestaña actual es la pestaña principal antes de redirigir con router.push
      if (window.opener) {
        router.push('/forms/preview');
      }
    } else {
      // Manejar el caso en el que la apertura de ventana falla (puede deberse a bloqueadores de ventanas emergentes)
      console.error('No se pudo abrir la nueva pestaña');
    }
  };

  const handleCreate = () => {
    console.log(updatedForm);

    const formatDate = (date: Date): string => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    const updatedFormCopy = { ...updatedForm };

    const currentDate = new Date();
    updatedFormCopy.createdAt = formatDate(currentDate);
    updatedFormCopy.editedAt = formatDate(currentDate);

    console.log(updatedFormCopy)
    // Lógica para crear el formulario
    createFormApi(updatedFormCopy)
      .then(async (result) => {
        console.log(result)
        if (result === true) {
          const formId = '5'
          const customId = `form_${formId}`

          try {
            const formDocRef = doc(collection(db, 'forms'), customId);
            await setDoc(formDocRef, updatedFormCopy);
            console.log("Formulario creado exitosamente en Firebase con ID:", customId);
            alert("Formulario creado exitosamente en Firebase.");
          } catch (error) {
            console.error('Error al guardar en Firebase:', error);
          }
          // Formulario creado exitosamente
          alert("Formulario creada exitosamente en MySQL.");
        } else {
          // Trivia no fue creada
          alert("Erro al crear al crear el formulario.");
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
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={updatedForm?.name}
          onChange={handleNameChange}
        />
      </div>

      <div className={lineaAtravesada}></div>

      <div className={titleGroup}>
        <label htmlFor="title">Título:</label>
        <ReactQuill
          className={editor}
          id="title"
          value={updatedForm?.title}
          onChange={handleTitleChange}
          modules={editorOptions.modules}
          formats={editorOptions.formats}
        />
      </div>

      <div className={titleGroup}>
        <label htmlFor="subtitle">Párrafo:</label>
        <ReactQuill
          className={editor}
          id="subtitle"
          value={updatedForm?.subtitle}
          onChange={handleSubtitleChange}
          modules={editorOptions.modules}
          formats={editorOptions.formats}
        />
      </div>

      <div className={lineaAtravesada}></div>

      <div className={inputGroup}>
        <label htmlFor="imgPath">Imagen:</label>
        <input
          type="text"
          id="imgPath"
          name="imgPath"
          value={updatedForm?.img.source}
          onChange={handleImgChange}
        />

        <div className={imgGroup}>
          <input
            type="checkbox"
            checked={updatedForm?.img.isVisible || false}
            onChange={handleImgVisibilityChange}
          />
          <label>Hacer visible la imágen</label>
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
        <div className={questionGroup} key={questionIndex}>

          <div className={lineaAtravesada}></div>

          <label htmlFor={`option${questionIndex + 1}`}>{`Pregunta ${questionIndex + 1}:`}</label>
          <ReactQuill
            className={editor}
            id={`option${questionIndex + 1}`}
            value={updatedForm?.optionsArray[questionIndex]?.label}
            onChange={(content) => handleLabelOptionAChange(content, questionIndex)}
            modules={editorOptions.modules}
            formats={editorOptions.formats}
          />

          {[...Array.from({ length: updatedForm?.optionsArray[questionIndex]?.options.length || 0 }).keys()].map(
            (optionIndex) => (
              <div className={options} key={optionIndex}>
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
                    <button onClick={() => handleRemoveOption(questionIndex, optionIndex)}>Eliminar</button>
                  </>
                )}
              </div>
            )
          )}

          <button className={newOptionButton} onClick={() => handleAddOption(questionIndex)}>Agregar nueva opción</button>
          <div className={checkGroup}>
            <label>
              <input
                type="checkbox"
                checked={updatedForm?.optionsArray[questionIndex]?.isVisible || false}
                onChange={() => handleOptionVisibilityChange(questionIndex)}
              />
              Hacer visible la pregunta {questionIndex + 1}
            </label>
          </div>
        </div>
      ))}

      <div className={lineaAtravesada}></div>

      <div className={redirectGroup}>
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

      <div className={textButtonGroup}>
        <label htmlFor="textButton">Cambiar texto del botón:</label>
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
        <button className={button} onClick={handlePreview}>Vista previa</button>
        <button className={button} onClick={handleCreate}>
          Crear Formulario
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
