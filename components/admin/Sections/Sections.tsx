import { useEffect, useState } from 'react';
import { AdminContain, Table } from '../SideBar.styled';
import AdminDataUpdate from './AdminData/AdminDataUpdate';
import {
  Container,
  GeneralContain,
  GonvarTitle,
  NewUser,
  Title,
  TitleBox,
  TitleContain,
  ModalContain,
} from './Sections.styled';
import {
  Admin,
  getAdmins,
  getGenericQueryResponse,
  getUserByEmailApi,
  updateUserRoleApi,
} from '../../api/admin';
import { Button } from '../Courses/CourseMain.styled';
import { IoClose } from 'react-icons/io5';
import { getCoursesApi } from '../../api/lessons';
import { defaultValues /*getRolesWithDefaults*/ } from './DefaultValues';
import { IRole } from '../Comments/Comments';

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

const Sections = () => {
  const [users, setUsers] = useState<Admin[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin>({} as Admin);
  const [newMember, setNewMember] = useState<boolean>(false);
  const [member, setMember] = useState<any>('');
  const [find, setFind] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [courses, setCourses] = useState<
    { id: number; title: string; published: boolean }[]
  >([]);
  const [forms, setForms] = useState<
    { id: number; name: string; }[]
  >([]);
  const [displayValue, setDisplayValue] = useState<string>('none');
  const [topValue, setTopValue] = useState<string>('-100%');

  const getAllCourses = async () => {
    try {
      const query = `select id, title, published from courses order by title;`;
      const response = await getGenericQueryResponse(query);
      const coursesData = response.data.data.map((c) => {
        return { ...c, published: c.published === 1 };
      });
      setCourses(coursesData);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllForms = async () => {
    try {
      const query = `select id, name from forms;`;
      const response = await getGenericQueryResponse(query);
      const formsData = response.data.data.map((form) => {
        return { ...form };
      });
      setForms(formsData);
    } catch (error) {
      console.error(error);
    }
  }

  const editRole = async (user: Admin): Promise<void> => {
    // setIsVisible(true);
    setModalVisible(true);
    setSelectedAdmin(user);
  };

  useEffect(() => {
    retrieveAdmin();
    getAllCourses();
    getAllForms();
  }, []);

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime();
    return new Date(tempDate).toLocaleDateString('es-MX');
  };

  const retrieveAdmin = async () => {
    try {
      const res = await getAdmins();
      const admins = res.data.admins;
      const getRolesWithDefaults = (
        currentValues: any[],
        userId: number,
      ): any[] => {
        const dvRoles = defaultValues.map((dv) => dv.role);
        const cvRoles = currentValues.map((cv) => cv.role);
        const result = dvRoles.map((dvRole, dvIndex) => {
          const indexOfRole = cvRoles.indexOf(dvRole);
          if (indexOfRole !== -1) {
            return currentValues[indexOfRole];
          }
          return defaultValues[dvIndex];
        });

        return result
          .filter((v) => v !== undefined)
          .map((v) => {
            return { ...v, user_id: userId };
          });
      };

      const newAdmins = admins.map((admin) => {
        return {
          ...admin,
          adminTypes: getRolesWithDefaults(admin.adminTypes, admin.user_id),
        };
      });
      console.log(newAdmins.filter(a => a.user_id === 49913));
      setUsers(newAdmins);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    retrieveAdmin();
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
      retrieveAdmin();
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

  return (
    <AdminContain>
      <GeneralContain>
        <TitleBox>
          <Title>Secciones</Title>
        </TitleBox>
        <Container>
          <TitleContain>
            <GonvarTitle>Lista de administradores</GonvarTitle>
            <Button
              onClick={() => {
                setNewMember(true);
              }}
            >
              Nuevo miembro
            </Button>
          </TitleContain>
          <Table id='Users'>
            <tbody style={{ display: 'inline-table', width: '100%' }}>
              <tr>
                <th>Administrador</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Creación</th>
                <th>Rol</th>
                <th></th>
              </tr>
              {/* TABLAS */}
              {users.length > 0 ? (
                users.map((user, index): any => {
                  return (
                    <tr key={index} onClick={() => editRole(user)}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{formatDate(user.created_at)}</td>
                      {user.role === 'superAdmin' ? (
                        <td>superAdmin</td>
                      ) : (
                        <td>admin</td>
                      )}
                      {user.role === 'superAdmin' ? (
                        <td>Visualizar</td>
                      ) : (
                        <td>Editar</td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <td>Sin administradores</td>
              )}
            </tbody>
          </Table>
        </Container>
        <ModalContain
          className='modal'
          style={{ display: `${displayValue}`, top: `${topValue}` }}
        >
          {isVisible && (
            <AdminDataUpdate
              admin={selectedAdmin}
              setIsVisible={setModalVisible}
              handleClick={handleClick}
              courses={courses}
              forms={forms}
            />
          )}
        </ModalContain>
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
              <Button onClick={updateRole}>Hacer miembro</Button>
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
export default Sections;
