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

  const { link } = style


  return (

    <tr className="pointer">

      <td>{form.id}</td>
      <td>
        <Link href={`/admin/forms/updateForm?formId=${idForm}`}>
          <a className={link}>{form.name}</a>
        </Link>
      </td>
      <td>{form.createdAt}</td>
      <td>{form.editedAt}</td>
      <td>
        <Link href={`/admin/forms/${idForm}`}>
          <a className={link}> ver inscritos</a>
        </Link>
      </td>
    </tr>

  );
};

export default FormRow;