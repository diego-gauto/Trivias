import { useEffect, useState } from 'react';
import { AdminContain, Table } from '../SideBar.styled';
import {
  Container,
  GeneralContain,
  GonvarTitle,
  NewUser,
  Title,
  TitleBox,
  TitleContain,
  ModalContain,
} from '../Sections/Sections.styled';
import {
  Admin,
  getAdmins,
  getGenericQueryResponse,
  getUserByEmailApi,
  updateUserRoleApi,
  getAAdminDistributor,
  createCodes
} from '../../api/admin';
import { Button } from '../Courses/CourseMain.styled';
import { IoClose } from 'react-icons/io5';
import { getCoursesApi } from '../../api/lessons';
import { defaultValues /*getRolesWithDefaults*/ } from '../Sections/DefaultValues';
import { DistributorModal } from './DistributorModal';
import { GenericModal } from '../HomeWork/HomeWorkModal/GenericModal';
import { GenerateCodesModal } from './GenerateCodesModal/GenerateCodesModalContent';


export type INewUser = {
  name?: string;
  email?: string;
  phoneNumber?: number;
  created_at?: {
    seconds: number;
    nanoseconds: number;
  };
  score?: string;
  role?: string;
  id?: string;
  adminType?: {
    general: boolean;
    pay: boolean;
    courses: boolean;
    rewards: boolean;
    landing: boolean;
    coupons: boolean;
    users: boolean;
    superAdmin: boolean;
    blogs: boolean;
    assignments: boolean;
  };
};

interface IAdmin {
  admin_id: number
  user_id: number
  name: string
  email: string
  phone_number: string
}

interface IDistributor {
  distributor_id: number
  name: string
  phone_number: string
  photo: string
  user_created_at: number
  distributor_created_at: number
  admin_user_id: number
  country: string | null,
  email: string
}

const Distributors = () => {

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
  const [newMember, setNewMember] = useState<boolean>(false);
  const [member, setMember] = useState<any>('');
  const [find, setFind] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [displayValue, setDisplayValue] = useState<string>('none');
  const [topValue, setTopValue] = useState<string>('-100%');
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [distributors, setDistributors] = useState<IDistributor[]>([]);
  const [showGenerateCodesModal, setShowGenerateCodesModal] = useState(false);

  const showViewUserModal = async (index: number): Promise<void> => {
    // setIsVisible(true);
    setModalVisible(true);
    setSelectedUserIndex(index);
  };

  const getAllAdmins = async () => {
    try {
      const query = `select au.id as admin_id,
        u.id as user_id,
        concat(u.name, ' ', u.last_name) as name,
        u.email, u.phone_number
        from admin_users as au 
        inner join users as u on u.id = au.user_id 
        order by au.id;`;
      const response = await getGenericQueryResponse(query);
      const data = response.data.data as IAdmin[];
      setAdmins(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getAllDistributorUsers = async () => {
    try {
      const query = `select d.distributor_id, concat(u.name, ' ', u.last_name) as name, 
        u.phone_number, u.photo, unix_timestamp(u.created_at) as user_created_at, 
        unix_timestamp(d.created_at) as distributor_created_at, d.admin_user_id, 
        u.country, u.email
        from distributors as d
        inner join users as u on u.id = d.user_id;`;
      const response = await getGenericQueryResponse(query);
      const data = response.data.data as IDistributor[];
      setDistributors(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllDistributorUsers();
    getAllAdmins();
  }, []);

  const formatDate = (value: number) => {
    return new Date(value * 1000).toLocaleDateString('es-MX');
  };

  const search = () => {
    if (member !== '') {
      let temp = {
        email: member,
      };
      getUserByEmailApi(temp).then((res) => {
        setMember('');
        setUser(res.data.user);
        setFind(true);
      });
    }
  };

  const updateRole = () => {
    let temp = {
      userId: user[0].id,
    };
    updateUserRoleApi(temp).then(() => {
      setMember('');
      setFind(false);
      setNewMember(false);
    });
  };

  const setModalVisible = (show: boolean) => {
    if (show) {
      setDisplayValue('block');
      setTopValue('0');
      setIsVisible(true);
    } else {
      setDisplayValue('none');
      setTopValue('-100%');
      setIsVisible(false);
    }
  };

  const changeDate = (date: string) => {
    // "2024-01-26T01:06:30.000Z"
    const year = parseInt(date.split('-')[0] || '');
    const month = parseInt(date.split('-')[1] || '');
    const day = parseInt((date.split('-')[2] || '').slice(0, 2));

    const now = new Date(year, month, day);

    return Math.floor(now.getTime() / 1000);
  }

  return (
    <AdminContain>
      <GeneralContain>
        <TitleBox>
          <Title>Distribuidores</Title>
        </TitleBox>
        <Container>
          <TitleContain>
            <GonvarTitle>Lista de distribuidores</GonvarTitle>
            <Button
              onClick={() => {
                setNewMember(true);
              }}
            >
              Nuevo miembro
            </Button>
          </TitleContain>
          <Table id='Users' style={{ display: 'inline-table', width: '100%' }}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Creación</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* TABLAS */}
              {distributors.length > 0 && (
                distributors.map((distributor, index): any => {
                  return (
                    <tr key={index} onClick={() => showViewUserModal(index)}>
                      <td>{distributor.name}</td>
                      <td>{distributor.email}</td>
                      <td>{formatDate(distributor.user_created_at)}</td>
                      <td>Editar</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Container>
        <ModalContain
          className='modal'
          style={{ display: `${displayValue}`, top: `${topValue}` }}
        >
          {isVisible && (
            /*
              <AdminDataUpdate
                admin={selectedAdmin}
                setIsVisible={setModalVisible}
                handleClick={handleClick}
                courses={courses}
                forms={forms}
              />
            */
            // 8/5/2023
            <DistributorModal
              setIsVisible={(isVisible => {
                setModalVisible(isVisible);
              })}
              distributor={distributors[selectedUserIndex]!}
              adminsList={admins}
              onClickGenerateCodes={() => {
                console.log('Generar codigos de acceso');
                setModalVisible(false);
                setShowGenerateCodesModal(true);
              }}
              onClickRemoveDistributorRole={() => {
                console.log('Remover rol de distribuidor');
              }}
            />

          )}
        </ModalContain>
        <GenericModal
          content={
            <GenerateCodesModal
              admin={admins.find(admin => admin.email === localStorage.getItem('email'))}
              distributor={distributors[selectedUserIndex]!}
            />}
          title='Generar códigos de acceso'
          onClose={() => {
            setShowGenerateCodesModal(false);
          }}
          context='information'
          isOpen={showGenerateCodesModal}
        />
      </GeneralContain>
      {newMember && (
        <NewUser>
          <IoClose
            onClick={() => {
              setNewMember(false);
              setMember('');
              setFind(false);
              setUser({});
            }}
          />
          <div className='filter'>
            <input
              defaultValue={member}
              type='text'
              placeholder='Buscar por email'
              onChange={(e) => setMember(e.target.value)}
            />
            <Button onClick={search}>Buscar</Button>
          </div>
          {find && user.length > 0 && (
            <div className='column'>
              <p>{user[0].name}</p>
              <p>{user[0].email}</p>
              <Button onClick={updateRole}>Hacer distribuidor(a)</Button>
            </div>
          )}
          {find && user.length === 0 && (
            <div className='column'>
              <p>No se encontró un usuario</p>
            </div>
          )}
        </NewUser>
      )}
    </AdminContain>
  );
};
export default Distributors;


