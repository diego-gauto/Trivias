import React, { useEffect, useState } from "react";

import { collection, doc, getDocs, query } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { getSingleUser } from "../../../hooks/useAuth";
import { Container, Profile, ProfileContain, Title, TitleContain } from "../Pay/Pay.styled";
import SideBar from "../SideBar";
import { AdminContain, Table } from "../SideBar.styled";
import UserCardData from "./UserData/UserCardData";
import {
  EditIcon,
  SearchContain,
  SearchIcon,
  SearchInput,
  UserContain,
  UserShow,
} from "./UsersList.styled";

export interface SelectedUser {
  id: string;
  name: string;
  email: string;
  score: number;
  uid?: string;
};
export interface AllUser {
  id: string;
  name: string;
  email: string;
  score: number;
  created_at: {
    seconds: number;
  };
};

const UsersList = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<Array<AllUser | any>>([]);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({ name: "", score: 0, email: "", id: "" });
  const usersCollectionRef = query(collection(db, "users"));

  const getUsers = async () => {
    const userData = await getDocs(usersCollectionRef);
    setAllUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const handleClick = async (id: string) => {
    const newUser: SelectedUser | any = await getSingleUser(id);
    if (newUser?.uid) {
      setSelectedUser(newUser);
      setIsVisible(true);
    }
  }

  useEffect(() => {
    getUsers();
  }, [selectedUser]);


  return (
    <AdminContain>
      <SideBar />
      <UserContain>
        <Container>
          <TitleContain>
            <Title>Usuarios</Title>
            <SearchContain>
              <SearchIcon />
              <SearchInput placeholder="Buscar un Usuario" />
            </SearchContain>
          </TitleContain>
          <Table id="Users">
            <tbody>
              <tr>
                <th>Usuario</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Creación</th>
                <th>Cursos Suscritos</th>
                <th>Recompensas</th>
                <th>Visualizar</th>
              </tr>
              {/* TABLAS */}
              {
                allUsers.map((user: any) => {
                  return (
                    <tr onClick={() => handleClick(user.id)}>
                      <td style={{ fontWeight: 600 }}>
                        <ProfileContain>
                          <Profile />
                          {user.name}
                        </ProfileContain>
                      </td>
                      <td >{user.email}</td>
                      <td>{new Date(user.created_at.seconds * 1000).toLocaleDateString("es-MX")}</td>
                      <td >3 Activos</td>
                      <td>{user.score} puntos</td>
                      <td><UserShow><EditIcon />Visualizar Usuario</UserShow></td>
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>
        </Container>
        {
          isVisible == true &&
          <UserCardData user={selectedUser} setIsVisible={setIsVisible} />
        }
      </UserContain>
    </AdminContain >
  )
}
export default UsersList;