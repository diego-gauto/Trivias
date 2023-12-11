import { useEffect, useState } from "react";
import { AdminContain, Table } from "../SideBar.styled";
import AdminDataUpdate from "./AdminData/AdminDataUpdate";
import {
  Container,
  GeneralContain,
  GonvarTitle,
  NewUser,
  Title,
  TitleBox,
  TitleContain,
} from "./Sections.styled";
import { getAdmins, getUserByEmailApi, updateUserRoleApi } from "../../api/admin";
import { Button } from "../Courses/CourseMain.styled";
import { IoClose } from "react-icons/io5";
import { getCoursesApi } from "../../api/lessons";

export type INewUser = {
  name?: string,
  email?: string,
  phoneNumber?: number,
  created_at?: {
    seconds: number,
    nanoseconds: number
  },
  score?: string,
  role?: string,
  id?: string,
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
  }
};

const Sections = () => {
  const [users, setUsers] = useState<Array<any>>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [role, setRole] = useState<string>();
  const [adminID, setAdminID] = useState<string>();
  const [selectedAdmin, setSelectedAdmin] = useState<any>({});
  const [newMember, setNewMember] = useState<boolean>(false);
  const [member, setMember] = useState<any>("");
  const [find, setFind] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [courses, setCourses] = useState<any>([]);

  const getAllCourses = () => {
    getCoursesApi().then((res) => {
      setCourses(res);
    });
  }

  const editRole = async (user: any): Promise<void> => {
    setIsVisible(true);
    setSelectedAdmin(user);
  };

  useEffect(() => {
    retrieveAdmin();
    getAllCourses();
  }, [])

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime();
    return new Date(tempDate).toLocaleDateString("es-MX")
  }

  const retrieveAdmin = () => {
    getAdmins().then((res) => {
      setUsers(res.data.admins);
    })
  }

  const handleClick = () => {
    retrieveAdmin();
  }

  const search = () => {
    if (member !== "") {
      let temp = {
        email: member
      }
      getUserByEmailApi(temp).then((res) => {
        setMember("");
        setUser(res.data.user);
        setFind(true);
      })
    }
  }

  const updateRole = () => {
    let temp = {
      userId: user[0].id
    }
    updateUserRoleApi(temp).then(() => {
      setMember("");
      setFind(false);
      setNewMember(false);
      retrieveAdmin();
    })
  }

  return (
    <AdminContain>
      <GeneralContain>
        <TitleBox>
          <Title>Secciones</Title>
        </TitleBox>
        <Container>
          <TitleContain>
            <GonvarTitle>Lista de administradores</GonvarTitle>
            <Button onClick={() => { setNewMember(true); }}>Nuevo miembro</Button>
          </TitleContain>
          <Table id="Users">
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
                      <td >
                        {user.name}
                      </td>
                      <td >{user.email}</td>
                      <td>{formatDate(user.created_at)}</td>
                      {user.role === 'superAdmin' ? (<td>superAdmin</td>) : (<td>admin</td>)}
                      {user.role === 'superAdmin' ? (<td >Visualizar</td>) : (<td >Editar</td>)}
                    </tr>
                  )
                })
              ) : (
                <td>Sin administradores</td>
              )}

            </tbody>
          </Table>
        </Container>

      </GeneralContain>
      {
        isVisible &&
        <AdminDataUpdate admin={selectedAdmin} adminID={adminID} setIsVisible={setIsVisible} role={role} handleClick={handleClick} courses={courses} />
      }
      {newMember && <NewUser>
        <IoClose onClick={() => { setNewMember(false); setMember(""); setFind(false); setUser({}) }} />
        <div className="filter">
          <input defaultValue={member} type="text" placeholder="Buscar por email" onChange={(e) => setMember(e.target.value)} />
          <Button onClick={search}>Buscar</Button>
        </div>
        {(find && user.length > 0) && <div className="column">
          <p>{user[0].name}</p>
          <p>{user[0].email}</p>
          <Button onClick={updateRole}>Hacer miembro</Button>
        </div>}
        {(find && user.length === 0) && <div className="column">
          <p>No se encontró un usuario</p>
        </div>}
      </NewUser>}
    </AdminContain>
  )
}
export default Sections;