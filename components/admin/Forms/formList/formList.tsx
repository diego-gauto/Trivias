import { Table } from 'react-bootstrap';

import FormRow from '../formRow/formRow';
import {
  Role,
  UserLevelValue,
} from '../../../GenericQueries/UserRoles/UserRolesInterfaces';

interface Form {
  id: number;
  name: string;
  createdAt: string;
  editedAt: string;
}

interface FormListProps {
  forms: Form[];
  canView: boolean;
  canEdit: boolean;
  userLevel: UserLevelValue;
}

const FormList = ({ forms, canView, userLevel, canEdit }: FormListProps) => {
  return (
    <div className='table-responsive'>
      {((userLevel === 'admin' && canView) || userLevel === 'superAdmin') && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nº de Formulario</th>
              <th>Copy Link</th>
              <th>Título</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Edición</th>
              <th>Inscritos</th>
              <th>Previsualizar</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, index) => (
              <FormRow
                key={index}
                form={form}
                idForm={form.id}
                canEdit={canEdit}
                canView={canView}
                userLevel={userLevel}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FormList;
