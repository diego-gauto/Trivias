

interface UserTrivia {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  numeroWhatsapp: string;
  pais: string;
  isUser: boolean;
}

interface TriviaRowProps {
  user: UserTrivia;
}

const UserTriviaRow = ({ user }: TriviaRowProps) => {


  return (

    <tr>
      <td>{user.nombre}</td>
      <td>{user.apellido}</td>
      <td>{user.mail}</td>
      <td>{user.numeroWhatsapp}</td>
      <td>{user.pais}</td>
      <td>{user.isUser ? "Si" : "No"}</td>

    </tr>

  );
};

export default UserTriviaRow;