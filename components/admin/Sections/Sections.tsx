

import { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { getSingleUser } from "../../../hooks/useAuth";
import SideBar from "../SideBar";
import { AdminContain, Table } from "../SideBar.styled";
import {
  AdminRoleChange,
  BackGround,
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
  const [selectedUser, setSelectedUser] = useState<Array<any>>([]);

  const editRole = async (id: string): Promise<any> => {
    setIsVisible(true);

    const newUser: any = await getSingleUser(id);
    if (newUser?.uid) {
      newUser.created_at = new Date(newUser.created_at.seconds * 1000).toLocaleDateString("es-MX");
      setSelectedUser(newUser);
      console.log("selected", selectedUser)
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
        item.role.includes("admin"));
      setUsers(getAdminUsers);
    }
    getUsers();
  }, []);

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

        <BackGround>

          <AdminRoleChange>
            <div>
              user
            </div>
            Cambiar Rol
            <div>superadmin: <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input></div>

          </AdminRoleChange>

        </BackGround>
      }
    </AdminContain>
  )
}
export default Sections;