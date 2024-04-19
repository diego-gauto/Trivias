import { useEffect, useState } from "react";

import { FiCopy } from "react-icons/fi";

import Link from "next/link";

import style from "./formRow.module.css";
import { UserLevelValue } from "../../../GenericQueries/UserRoles/UserRolesInterfaces";

interface Form {
  id: number;
  name: string;
  createdAt: string;
  editedAt: string;
}

interface FormRowProps {
  form: Form;
  idForm: Number;
  canView: boolean;
  canEdit: boolean;
  userLevel: UserLevelValue;
}


const FormRow = ({ form, idForm, canEdit, userLevel, canView }: FormRowProps) => {
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
        {
          ((canEdit && userLevel === 'admin') || userLevel === 'superAdmin') ?
            <Link href={`/admin/forms/updateForm?formId=${idForm}`}>
              <a className={link} title="Editar">{form.name}</a>
            </Link>
            :
            <p className={link} title="Editar">{form.name}</p>
        }
      </td>
      <td>{form.createdAt}</td>
      <td>{form.editedAt}</td>
      <td>
        {
          ((canView && userLevel === 'admin') || userLevel === 'superAdmin') ?
            <Link href={`/admin/forms/${idForm}`}>
              <a className={link}> ver inscritos</a>
            </Link>
            :
            <p className={link}> ver inscritos</p>
        }

      </td>
      <td>
        {
          ((canView && userLevel === 'admin') || userLevel === 'superAdmin') ?
            <Link href={`/forms/preview?formId=${idForm}`} passHref>
              <a className={link} target="_blank" rel="noopener noreferrer"> Previsualizar</a>
            </Link>
            : <p className={link}> Previsualizar</p>
        }
      </td>
    </tr>

  );
};

export default FormRow;