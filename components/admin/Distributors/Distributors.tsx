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
  getGenericQueryResponse,
  updateUserRoleApi,
  postGenericQueryResponse
} from '../../api/admin';
import { Button } from '../Courses/CourseMain.styled';
import { IoClose } from 'react-icons/io5';
import { DistributorModal } from './DistributorModal';
import { GenericModal } from '../HomeWork/HomeWorkModal/GenericModal';
import { GenerateCodesModal } from './GenerateCodesModal/GenerateCodesModalContent';
import DStyles from './Distributors.module.css';

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

interface IUser {
  id: number,
  name: string,
  email: string
}

interface IDistributorFilters {
  name: string,
  email: string,
  adminEmail: string,
  sellsCount: number
}

const generateInitialFilters = (): IDistributorFilters => {
  return {
    email: '',
    adminEmail: '',
    name: '',
    sellsCount: -1
  }
}

const Distributors = () => {

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [newMember, setNewMember] = useState<boolean>(false);
  const [emailToFind, setEmailToFind] = useState<string>('');
  const [find, setFind] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [displayValue, setDisplayValue] = useState<string>('none');
  const [topValue, setTopValue] = useState<string>('-100%');
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [distributors, setDistributors] = useState<IDistributor[]>([]);
  const [showGenerateCodesModal, setShowGenerateCodesModal] = useState(false);
  const [filters, setFilters] = useState<IDistributorFilters>(generateInitialFilters());

  const showViewUserModal = async (id: number): Promise<void> => {
    // setModalVisible(true);
    setSelectedUserId(id);
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

  const search = async () => {
    try {
      const query = `SELECT id, concat(name, ' ', last_name) as name, email FROM users WHERE email = '${emailToFind}';`;
      const response = await getGenericQueryResponse(query);
      const data = response.data.data as IUser[];
      if (data.length > 0) {
        const user = data[0]!;
        setUser(user);
        setFind(true);
      } else {
        setFind(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateRole = async () => {
    if (user !== null) {
      try {
        const adminEmail = localStorage.getItem('email');
        if (adminEmail === null) {
          return;
        }
        const getUserAdminIdQuery = `select au.id as admin_id from users as u inner join admin_users as au on au.user_id = u.id where u.email like '${adminEmail}'`;
        const responseUserAdminId = await getGenericQueryResponse(getUserAdminIdQuery);
        const adminIds = responseUserAdminId.data.data as { admin_id: number }[];
        if (!(adminIds.length > 0)) {
          return;
        }
        const adminId = adminIds.map(a => a.admin_id);
        const query = `insert into distributors (user_id, admin_user_id) values (${user.id}, ${adminId[0]});`;
        const response = await postGenericQueryResponse(query);
        getAllDistributorUsers();
        setEmailToFind('');
        setFind(false);
        setNewMember(false);
      } catch (error) {
        console.error(error);
      }
    }
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
          <div className={DStyles['filters-section']}>
            <div className={DStyles['filter-property']}>
              <label className={DStyles['filter-property-header']} htmlFor="filter-name">Nombre</label>
              <input className={DStyles['filter-property-value']} type="text" id="filter-name" />
            </div>
            <div className={DStyles['filter-property']}>
              <label className={DStyles['filter-property-header']} htmlFor="filter-email">Correo</label>
              <input className={DStyles['filter-property-value']} type="email" id="filter-email" />
            </div>
            <div className={DStyles['filter-property']}>
              <label className={DStyles['filter-property-header']} htmlFor="filter-sells-count">Numero de compras</label>
              <input className={DStyles['filter-property-value']} type="number" id="filter-sells-count" min={0} max={99999} />
            </div>
          </div>
          <div className={`${DStyles['sections-container']}`}>
            <div className={`${DStyles['distributors-scroll']}`}>
              <h3 style={{ margin: '0' }}>Distribuidores</h3>
              {
                distributors.length > 0 &&
                distributors.map((d, index) => {
                  return <div
                    className={DStyles['distributor-card-item']}
                    key={`distributor_${d.distributor_id}_${index}`}
                    onClick={(e) => {
                      showViewUserModal(d.distributor_id);
                    }}
                  >
                    <div className={DStyles['distributor-property-container']}>
                      <h4 className={DStyles['distributor-header-property']}>Nombre</h4>
                      <p className={DStyles['distributor-property-value']}>{d.name}</p>
                    </div>
                    <div className={DStyles['distributor-property-container']}>
                      <h4 className={DStyles['distributor-header-property']}>Email</h4>
                      <p className={DStyles['distributor-property-value']}>{d.email}</p>
                    </div>
                    <div className={DStyles['distributor-property-container']}>
                      <h4 className={DStyles['distributor-header-property']}>Creado</h4>
                      <p className={DStyles['distributor-property-value']}>{new Date(d.distributor_created_at * 1000).toJSON().slice(0, 10)}</p>
                    </div>
                    <div className={DStyles['distributor-property-container']}>
                      <h4 className={DStyles['distributor-header-property']}>Numero de celular</h4>
                      <p className={DStyles['distributor-property-value']}>{d.phone_number}</p>
                    </div>
                    <div className={DStyles['distributor-property-container']}>
                      <h4 className={DStyles['distributor-header-property']}>Hecho distribuidor por</h4>
                      {
                        <>
                          <p className={DStyles['distributor-property-value']}>{admins.find(ad => ad.admin_id === d.admin_user_id)?.name || '(Desconocido)'}</p>
                          <p className={DStyles['distributor-property-value']}>{admins.find(ad => ad.admin_id === d.admin_user_id)?.email || '(Desconocido)'}</p>
                        </>
                      }
                    </div>
                  </div>
                })
              }
            </div>
            <div className={`${DStyles['distributors-scroll']}`}>
              <h3 style={{ margin: '0' }}>Detalles</h3>
              {
                selectedUserId === -1 &&
                <div>
                  <p style={{
                    fontWeight: '500',
                    border: '1px solid black',
                    padding: '16px',
                    borderRadius: '32px',
                    textAlign: 'center'
                  }}>Seleccione un distribuidor para ver sus detalles</p>
                </div>
              }
              {
                selectedUserId !== -1 &&
                <div>
                  <div>
                    <button>Crear codigos</button>
                    <button>Crear codigos</button>
                  </div>
                </div>
              }
            </div>
          </div>

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
              distributor={distributors.find(d => d.distributor_id === selectedUserId)!}
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
              distributor={distributors.find(d => d.distributor_id === selectedUserId)}
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
              setEmailToFind('');
              setFind(false);
              setUser(null);
            }}
          />
          <div className='filter'>
            <input
              value={emailToFind}
              type='text'
              placeholder='Buscar por email'
              onChange={(e) => setEmailToFind(e.target.value)}
            />
            <Button onClick={(e) => {
              search();
            }}>Buscar</Button>
          </div>
          {find && user !== null && (
            <div className='column'>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <Button onClick={updateRole}>Hacer distribuidor(a)</Button>
            </div>
          )}
          {find && user === null && (
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


