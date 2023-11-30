import Link from "next/link";

import style from "./formRow.module.css";

interface Form {
  id: number;
  title: string;
  date: Date;
}

interface FormRowProps {
  form: Form;
  idForm: Number
}

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const FormRow = ({ form, idForm }: FormRowProps) => {

  const { link } = style


  return (

    <tr className="pointer">

      <td>{form.id}</td>
      <td>
        <Link href={`/admin/forms/${idForm}`}>
          <a className={link}>{form.title}</a>
        </Link>
      </td>
      <td>{formatDate(form.date)}</td>
    </tr>

  );
};

export default FormRow;