

import { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { getSingleUser } from "../../../hooks/useAuth";
import { AdminContain, Table } from "../SideBar.styled";
import AdminDataUpdate from "./AdminData/AdminDataUpdate";
import {
  Container,
  GeneralContain,
  GonvarTitle,
  Title,
  TitleBox,
  TitleContain,
} from "./Sections.styled";
import { useRouter } from "next/router";
import { getAdmins } from "../../api/admin";

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
  }
};

const Sections = () => {
  const usersCollectionRef = query(collection(db, "users"));
  const [users, setUsers] = useState<Array<any>>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [role, setRole] = useState<string>();
  const [adminID, setAdminID] = useState<string>();
  const [selectedAdmin, setSelectedAdmin] = useState<any>({});
  const router = useRouter();
  const editRole = async (user: any): Promise<void> => {
    setIsVisible(true);
    setSelectedAdmin(user);
  };

  useEffect(() => {
    getAdmins().then((res) => {
      setUsers(res.data.admins);
    })
  }, [])

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime();
    return new Date(tempDate).toLocaleDateString("es-MX")
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
          </TitleContain>
          <Table id="Users">
            <tbody>
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
        <AdminDataUpdate admin={selectedAdmin} adminID={adminID} setIsVisible={setIsVisible} role={role} />
      }
    </AdminContain>
  )
}
export default Sections;