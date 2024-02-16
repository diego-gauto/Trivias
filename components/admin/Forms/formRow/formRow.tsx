import { useEffect, useState } from "react";

import { FiCopy } from "react-icons/fi";

import Link from "next/link";

import style from "./formRow.module.css";

interface Form {
  id: number;
  name: string;
  createdAt: string;
  editedAt: string;
}

interface FormRowProps {
  form: Form;
  idForm: Number
}

// const formatDate = (date: Date): string => {
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   const seconds = date.getSeconds().toString().padStart(2, "0");

//   return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
// };

const FormRow = ({ form, idForm }: FormRowProps) => {
  const [copied, setCopied] = useState(false);

  const { link, handCursor } = style

  const handleCopyLink = () => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/forms?formId=${idForm}`;
    navigator.clipboard.writeText(url); // Copia la URL al portapapeles
    setCopied(true); // Actualiza el estado para indicar que se ha copiado la ruta
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
      }, 5000); // Cambia el tiempo (en milisegundos) según lo que consideres apropiado
    }

    return () => clearTimeout(timeoutId);
  }, [copied]);

  return (

    <tr className="pointer">

      <td>{form.id}</td>
      <td onClick={handleCopyLink} title="Copiar ruta">
        {copied ? 'Copiado' : <FiCopy className={handCursor} />}
      </td>
      <td>
        <Link href={`/admin/forms/updateForm?formId=${idForm}`}>
          <a className={link} title="Editar">{form.name}</a>
        </Link>
      </td>
      <td>{form.createdAt}</td>
      <td>{form.editedAt}</td>
      <td>
        <Link href={`/admin/forms/${idForm}`}>
          <a className={link}> ver inscritos</a>
        </Link>
      </td>
      <td>
        <Link href={`/forms/preview?formId=${idForm}`} passHref>
          <a className={link} target="_blank" rel="noopener noreferrer"> Previsualizar</a>
        </Link>
      </td>
    </tr>

  );
};

export default FormRow;