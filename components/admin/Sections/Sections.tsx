

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

const Sections = () => {
  const usersCollectionRef = query(collection(db, "users"));
  const [users, setUsers] = useState<Array<any>>([]);
  const [isVisible, setIsVisible] = useState<boolean>();
  const [role, setRole] = useState<string>();
  const [adminID, setAdminID] = useState<string>();
  const [selectedAdmin, setSelectedAdmin] = useState<Array<any>>([]);

  const editRole = async (id: string): Promise<any> => {
    setIsVisible(true);

    const newUser: any = await getSingleUser(id);
    if (newUser?.uid) {
      //newUser.created_at = new Date(newUser.created_at.seconds * 1000).toLocaleDateString("es-MX");
      setSelectedAdmin(newUser);
      setAdminID(id);
      setIsVisible(true);
    }
  };

  useEffect(() => {

    const getUsers = async (): Promise<void> => {
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
      }));
      const getAdminUsers = usersData.filter((item) =>
        item.role.includes("admin") ||
        item.role.includes("superAdmin")
      );
      setUsers(getAdminUsers);
    }
    getUsers();
  }, [isVisible]);

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
                  return (
                    <tr key={index} onClick={() => editRole(user.id)}>
                      <td >
                        {user.name}
                      </td>
                      <td >{user.email}</td>
                      <td>{user.created_at}</td>
                      <td>{user.role}</td>
                      <td >Editar</td>
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
        isVisible === true &&
        <AdminDataUpdate admin={selectedAdmin} adminID={adminID} role={role} setIsVisible={setIsVisible} />
      }
    </AdminContain>
  )
}
export default Sections;