import React, { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { Container, Profile, ProfileContain, Title, TitleContain } from "../Pay/Pay.styled";
import SideBar from "../SideBar";
import { AdminContain, Table } from "../SideBar.styled";
import AllUsers from "./UserData/AllUsers";
import {
  EditIcon,
  SearchContain,
  SearchIcon,
  SearchInput,
  UserContain,
  UserShow,
} from "./Users.styled";

const Users = () => {

  const [showUser, setShowUser] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const usersCollectionRef = query(collection(db, "users"));

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data() })))
  }
  useEffect(() => {
    getUsers();
  }, [])

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
                users.map((user: any) => {
                  return (
                    <tr onClick={() => { setShowUser(!showUser) }}>
                      <td style={{ fontWeight: 600 }}>
                        <ProfileContain>
                          <Profile />{user.name}
                        </ProfileContain>
                      </td>
                      <td >{user.email}</td>
                      <td>{new Date(user.created_at).toString()}</td>
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
          showUser == true &&
          <AllUsers showUser={showUser} setShowUser={setShowUser} />
        }
      </UserContain>
    </AdminContain >
  )
}
export default Users;