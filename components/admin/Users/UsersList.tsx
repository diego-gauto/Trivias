import React, { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { getSingleUser } from "../../../hooks/useAuth";
import { Container, Profile, ProfileContain, Title, TitleContain } from "../Pay/Pay.styled";
import SideBar from "../SideBar";
import { AdminContain, Table } from "../SideBar.styled";
import UserCardData from "./UserData/UserCardData";
import { TransparentButton2 } from "./UserData/UsersCardData.styled";
import {
  DownloadUserData,
  EditIcon,
  SearchContain,
  SearchIcon,
  SearchInput,
  UserContain,
  UserShow,
} from "./UsersList.styled";

export interface SelectedUser {
  id?: string;
  name: string;
  email: string;
  score: number;
  uid?: string;
};
export interface AllUser {
  id?: string;
  name: string;
  email: string;
  score: number;
  created_at: {
    seconds: number;
  };
  phoneNumber?: number;
  role?: string;
};

const UsersList = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<Array<AllUser | any>>([]);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({ name: "", score: 0, email: "", id: "" });
  const usersCollectionRef = query(collection(db, "users"));
  const [filteredList, setFilteredList] = useState(allUsers);
  const [isSearching, setIseSearching] = useState<boolean>();

  const getUsers = async () => {
    const userData = await getDocs(usersCollectionRef);
    setAllUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };

  const handleClick = async (id: string) => {
    const newUser: SelectedUser | any = await getSingleUser(id);
    if (newUser?.uid) {
      setSelectedUser(newUser);
      setIsVisible(true);
    }
  };
  const filterBySearch = (event: { target: { value: string; }; }) => {
    setIseSearching(true)
    const query = event.target.value.toLocaleLowerCase();
    var updatedList = [...allUsers]
    var updated = updatedList.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.email.includes(query) ||
      item.role.includes(query) ||
      item.score.toString().includes(query) ||
      new Date(item.created_at.seconds * 1000).toLocaleDateString("es-MX").includes(query));
    setFilteredList(updated);
  };
  const downloadUsersData = () => {
    console.log("This data will be downloaded: ", filteredList);
  };
  const columns = [{
    id: 'first',
    displayName: 'First column'
  }, {
    id: 'second',
    displayName: 'Second column'
  }];

  const datas = [{
    first: 'foo',
    second: 'bar'
  }, {
    first: 'foobar',
    second: 'foobar'
  }];

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
            <DownloadUserData>
              <img src="https://img.icons8.com/ios/50/000000/export-excel.png" />
              <TransparentButton2 onClick={downloadUsersData}>Descargar lista de usuarios</TransparentButton2>
            </DownloadUserData>
            <SearchContain>
              <SearchIcon />
              <SearchInput placeholder="Buscar un Usuario" onChange={filterBySearch} />
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
              {isSearching ? (
                filteredList.map((user, index): any => {
                  return (
                    <tr key={index} onClick={() => handleClick(user.id)}>
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
              ) : (
                allUsers.map((user, index): any => {
                  return (
                    <tr key={index} onClick={() => handleClick(user.id)}>
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
              )}


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