import { Table } from "react-bootstrap";

import FormRow from "../formRow/formRow";

interface Form {
  id: number;
  title: string;
  date: Date;
}

interface FormListProps {
  forms: Form[];
}

const FormList = ({ forms }: FormListProps) => {
  return (
    <div className="mt-2">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nº de Formulario</th>
            <th>Título</th>
            <th>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form, index) => (
            <FormRow key={index} form={form} idForm={form.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FormList;