import { Table } from "react-bootstrap";

import UserFormRow from "../userFormRow/userFormRow";
import { UserLevelValue } from "../../../GenericQueries/UserRoles/UserRolesInterfaces";

interface UserForm {
  id: number;
  user_id: number;
  nombre: string;
  apellido: string;
  mail: string;
  numeroWhatsapp: string;
  pais: string;
  isUser: boolean;
  suscription_status: string;
  fecha: string;
  option1: string;
  option2: string;
  option3: string;
}

interface UserFormListProps {
  usersForm: UserForm[];
  canView: boolean;
  userLevel: UserLevelValue
}

const UserTriviaList = ({ usersForm, canView, userLevel }: UserFormListProps) => {

  return (
    <div className="table-responsive">
      {
        ((canView && userLevel === 'admin') || userLevel === 'superAdmin') &&
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
              <th>Opción 1</th>
              <th>Opción 2</th>
              <th>Opción 3</th>
            </tr>
          </thead>
          <tbody>
            {usersForm.map((user) => (
              <UserFormRow key={user.id} userForm={user} />
            ))}
          </tbody>
        </Table>
      }

    </div>
  );
};

export default UserTriviaList;
