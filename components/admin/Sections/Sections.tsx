

import { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { getSingleUser } from "../../../hooks/useAuth";
import SideBar from "../SideBar";
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
  const [selectedAdmin, setSelectedAdmin] = useState<Array<any>>([]);
  const router = useRouter();
  const editRole = async (id: string): Promise<void> => {
    setIsVisible(true);

    const newUser: any = await getSingleUser(id);
    if (newUser?.uid) {
      //newUser.created_at = new Date(newUser.created_at.seconds * 1000).toLocaleDateString("es-MX");
      setSelectedAdmin(newUser);
      setAdminID(id);
      setIsVisible(true);
      setRole(newUser.adminType);
    }
  };
  useEffect(() => {
    if (!users) return;

    const getUsers = async (): Promise<void> => {
      const createAdminType = {
        general: true,
        pay: false,
        courses: false,
        rewards: false,
        landing: false,
        coupons: false,
        users: false,
        superAdmin: false
      };
      const mainResponse = await getDocs(usersCollectionRef);
      const usersResponse = mainResponse.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const usersData = usersResponse.map((user: any) => ({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber ?? "",
        created_at: new Date(user.created_at.seconds * 1000).toLocaleDateString("es-MX"),
        score: user.score.toString(),
        role: user.role ?? "",
        id: user.id,
        adminType: user.adminType ?? createAdminType,
      }));
      const getAdminUsers = usersData.filter((item) => item.role.includes("admin"));
      setUsers(getAdminUsers);
    }
    getUsers();
  }, [isVisible, role]);

  return (
    <AdminContain>
      <SideBar />
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
                  {
                    if (user.adminType)

                      return (
                        <tr key={index} onClick={() => editRole(user.id)}>
                          <td >
                            {user.name}
                          </td>
                          <td >{user.email}</td>
                          <td>{user.created_at}</td>
                          {user.adminType.superAdmin ? (<td>superAdmin</td>) : (<td>admin</td>)}
                          {user.adminType.superAdmin ? (<td >Visualizar</td>) : (<td >Editar</td>)}
                        </tr>
                      )
                  }
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