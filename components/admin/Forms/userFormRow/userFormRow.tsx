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
  option4: string;
  option5: string;
}

interface UserRowProps {
  userForm: UserForm;
}

const UserFormRow = ({ userForm }: UserRowProps) => {
  return (
    <tr>
      <td>{userForm.id}</td>
      <td>{userForm.nombre}</td>
      <td>{userForm.apellido}</td>
      <td>{userForm.mail}</td>
      <td>{userForm.numeroWhatsapp}</td>
      <td>{userForm.pais}</td>
      <td>{userForm.isUser}</td>
      <td>{userForm.suscription_status}</td>
      <td>{userForm.fecha}</td>
      <td>{userForm.option1}</td>
      <td>{userForm.option2}</td>
      <td>{userForm.option3}</td>
      <td>{userForm.option4}</td>
      <td>{userForm.option5}</td>
    </tr>
  );
};

export default UserFormRow;
