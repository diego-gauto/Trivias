import { Table } from "react-bootstrap";

import UserFormRow from "../userFormRow/userFormRow";

interface UserForm {
  user_id: number;
  nombre: string;
  apellido: string;
  mail: string;
  numeroWhatsapp: string;
  pais: string;
  isUser: boolean;
  membresia: string;
  fecha: string;
  option1: string;
  option2: string;
  option3: string;
}

interface UserFormListProps {
  usersForm: UserForm[];
}

const UserTriviaList = ({ usersForm }: UserFormListProps) => {
  return (
    <div className="mt-2">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo Electŕonico</th>
            <th>WhatsApp</th>
            <th>Pais</th>
            <th>Usuaria</th>
            <th>Membresía</th>
            <th>fecha</th>
            <th>Respuesta 1</th>
            <th>Respuesta 2</th>
            <th>Respuesta 3</th>
          </tr>
        </thead>
        <tbody>
          {usersForm.map((user) => (
            <UserFormRow key={user.user_id} userForm={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTriviaList;
