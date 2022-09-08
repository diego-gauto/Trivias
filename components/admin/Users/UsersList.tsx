import React, { useEffect, useState } from "react";

import CsvDownloader from "react-csv-downloader";

import { collection, DocumentData, getDocs, query } from "firebase/firestore";

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
import { getWholeCourses } from "../../../store/actions/courseActions";

export interface SelectedUser {
  id?: string;
  name: string;
  email: string;
  score: number;
  uid?: string;
  created_at: string;
};
export interface UserData {
  id?: any;
  role: string;
  name: any;
  email: string;
  phoneNumber: number;
  created_at: string;
  score: string;
};
export interface Users {
  id: string;
  name: string;
  email: string;
  score: number;
  created_at: { seconds: number }
  phoneNumber?: number;
  role: string;
};

const UsersList = () => {
  const usersCollectionRef = query(collection(db, "users"));

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<Array<UserData>>([]);
  const [users, setUsers] = useState<Array<any>>([]);
  const [courses, setCourses] = useState<Array<any>>([]);
  const [selectedUser, setSelectedUser] = useState<any>({});

  const openUserCardData = async (user: DocumentData) => {
    setSelectedUser(user);
    setIsVisible(true);
  };

  const filterUsersByValue = (value: string): void => {
    if (value === "") return setUsers(allUsers);
    const query = value.toLocaleLowerCase();
    const filteredUsers = users.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.email.includes(query) ||
      item.role.includes(query) ||
      item.score.toString().includes(query) ||
      item.created_at.includes(query));
    setUsers(filteredUsers);
  };

  const getCoures = () => {
    let tempCourses: Array<any> = [];
    getWholeCourses().then((res) => {
      res.forEach((element: DocumentData) => {
        if (element.courseType == 'Producto') {
          tempCourses.push(element)
        }
      });
      setCourses(tempCourses)
    })
  }

  useEffect(() => {

    const getUsers = async (): Promise<void> => {
      const mainResponse = await getDocs(usersCollectionRef);
      const usersResponse = mainResponse.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const usersData = usersResponse.map((user: any) => ({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber ?? "",
        created_at: new Date(user.created_at.seconds * 1000).toLocaleDateString("es-MX"),
        score: user.score.toString(),
        role: user.role ?? "",
        id: user.id,
      }));
      console.log("mainr", mainResponse)
      setUsers(usersData);
      setAllUsers(usersData);
    }
    getUsers();
    getCoures();
  }, []);

  return (
    <AdminContain>
      <SideBar />
      <UserContain>
        <Container>
          <TitleContain>
            <Title>Usuarios</Title>
            <CsvDownloader
              filename="usersData"
              extension=".csv"
              separator=","
              wrapColumnChar=""
              datas={users.map(({ id, ...users }) => users)}
            >
              <DownloadUserData>
                <img src="https://img.icons8.com/ios/50/000000/export-excel.png" />
                <TransparentButton2>Descargar lista de usuarios</TransparentButton2>
              </DownloadUserData>
            </CsvDownloader>
            <SearchContain>
              <SearchIcon />
              <SearchInput
                placeholder="Buscar un Usuario"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterUsersByValue(e.target.value)}
              />
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
              {users.length > 0 && (
                users.map((user, index): any => {
                  return (
                    <tr key={index} onClick={() => openUserCardData(user)}>
                      <td style={{ fontWeight: 600 }}>
                        <ProfileContain>
                          <Profile />
                          {user.name}
                        </ProfileContain>
                      </td>
                      <td >{user.email}</td>
                      <td>{user.created_at}</td>
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
          isVisible === true &&
          <UserCardData user={selectedUser} setIsVisible={setIsVisible} courses={courses} />
        }
      </UserContain>
    </AdminContain >
  )
}
export default UsersList;