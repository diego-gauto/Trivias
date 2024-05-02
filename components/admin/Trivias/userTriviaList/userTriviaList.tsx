import { Table } from 'react-bootstrap';

import UserTriviaRow from '../userTriviaRow/userTriviaRow';

interface userTrivia {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  numeroWhatsapp: string;
  pais: string;
  isUser: boolean;
}

interface UserTriviaListProps {
  usersTrivia: userTrivia[];
}

const UserTriviaList = ({ usersTrivia }: UserTriviaListProps) => {
  return (
    <div className='mt-2'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo Electŕonico</th>
            <th>WhatsApp</th>
            <th>Pais</th>
            <th>Usuaria</th>
          </tr>
        </thead>
        <tbody>
          {usersTrivia.map((user) => (
            <UserTriviaRow key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTriviaList;
