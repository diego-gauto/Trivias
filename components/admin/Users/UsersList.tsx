import React, { useEffect, useState } from "react";

import CsvDownloader from "react-csv-downloader";

import { collection, getDocs, query, DocumentData } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { getWholeCourses } from "../../../store/actions/courseActions";
import { getPaidCourses } from "../../../store/actions/UserActions";
import { Container, Profile, ProfileContain, Title, TitleContain } from "../Pay/Pay.styled";
import SideBar from "../SideBar";
import { AdminContain, Table } from "../SideBar.styled";
import UserCardData from "./UserData/UserCardData";
import { TransparentButton2 } from "./UserData/UsersCardData.styled";
import {
  DownloadUserData,
  EditIcon,
  FilterContain,
  SearchContain,
  SearchIcon,
  SearchInput,
  Select,
  UserContain,
  UserShow,
} from "./UsersList.styled";
import EditUserModal from "./EditUserModal";
import { getInvoice } from "../../../store/actions/PaymentActions";

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
  courses: number;
  membership: {
    finalDate: number;
    level: number;
    method: string;
    paymentMethod: string;
    planId: string;
    planName: string;
    startDate: number;
  };
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
  const [filterValue, setFilterValue] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<Array<UserData>>([]);
  const [users, setUsers] = useState<Array<any>>([]);
  const [usersFilter, setUsersFilter] = useState<Array<any>>([]);
  const [courses, setCourses] = useState<Array<any>>([]);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [show, setShow] = useState<boolean>(false);
  const [user, setUser] = useState<any>([]);

  const openUserCardData = async (user: DocumentData) => {
    setSelectedUser(user);
    setIsVisible(true);
  };

  const filterUsersByValue = (value: string): void => {
    if (value === "") return setUsers(usersFilter);
    const query = value.toLocaleLowerCase();
    const filteredUsers = usersFilter.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.email.includes(query) ||
      item.role.includes(query) ||
      item.score.toString().includes(query) ||
      item.created_at.includes(query));
    setUsers(filteredUsers);
  };

  const filter = (value: number) => {
    let tempUsers = users;
    if (value == 0) { setUsersFilter(allUsers); return setUsers(allUsers) };
    if (value == 1) {
      [...tempUsers] = allUsers.sort((a: any, b: any) => {
        return b.score - a.score;
      })
    };
    if (value == 2) {
      let today = new Date().getTime() / 1000;
      [...tempUsers] = allUsers.filter((item) => (
        item.membership.finalDate > today
      ))
    };
    if (value == 3) {
      [...tempUsers] = allUsers.sort((a: any, b: any) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      })
    };
    if (value == 4) {
      [...tempUsers] = allUsers.filter((item) =>
        item.courses)
    };
    setUsers(tempUsers);
    setUsersFilter(tempUsers);
  }

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
    let tempInvoice: any = [];
    getInvoice().then((res) => {
      res.forEach((element: DocumentData) => {
        element.amount = element.amount / 100;
        tempInvoice.push(element);
      });
    })
    const getUsers = async (): Promise<void> => {
      const mainResponse = await getDocs(usersCollectionRef);
      const usersResponse = mainResponse.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      const usersData = [...usersResponse].map((user: any) => ({
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber ?? "",
        created_at: new Date(user.created_at.seconds * 1000).toLocaleDateString("es-MX"),
        score: user.score.toString(),
        role: user.role ?? "",
        id: user.id,
        courses: 0,
        membership: user.membership
      }));
      let today: any = new Date().getTime() / 1000;
      usersData.forEach((user: any) => {
        user.total = 0;
        tempInvoice.forEach((element: any) => {
          if (element.userEmail == user.email) {
            user.total = user.total + element.amount;
          }
        });
        getPaidCourses(user.id).then((res) => {
          res.forEach((element: DocumentData) => {
            if (element.finalDate > today) {
              user.courses++;
            }
          });
        })
      })
      setUsers(usersData);
      setUsersFilter(usersData);
      setAllUsers(usersData);
    }
    getUsers();
    getCoures();
  }, [show]);

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
              datas={users.map(({ id, membership, ...users }) => users)}
            >
              <DownloadUserData>
                {/* <img src="https://img.icons8.com/ios/50/000000/export-excel.png" /> */}
                <p>Descargar lista de usuarios</p>
              </DownloadUserData>
            </CsvDownloader>
            <FilterContain>
              <Select>
                <select defaultValue={filterValue} onChange={(e: any) => { setUsers(allUsers); filter(e.target.value) }}>
                  <option value={0}>Todos</option>
                  <option value={1}>Puntos</option>
                  <option value={2}>Suscripción</option>
                  <option value={3}>Nombre</option>
                  <option value={4}>Cursos</option>
                </select>
              </Select>
              <SearchContain>
                <div className="hidden">

                </div>
                <SearchIcon />
                <SearchInput
                  placeholder="Buscar un Usuario"
                  type={"text"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterUsersByValue(e.target.value)}
                />
              </SearchContain>
            </FilterContain>
          </TitleContain>
          <Table id="Users">
            <tbody>
              <tr>
                <th>Usuario</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Creación</th>
                <th>Cursos Suscritos</th>
                <th>Amount spent</th>
                {/* <th>Recompensas</th> */}
                <th>Visualizar</th>
                <th>Editar</th>
              </tr>
              {/* TABLAS */}
              {users.length > 0 && (
                users.map((user, index): any => {
                  return (
                    <tr key={index}>
                      <td style={{ fontWeight: 600 }}>
                        <ProfileContain>
                          <Profile />
                          {user.name}
                        </ProfileContain>
                      </td>
                      <td >{user.email}</td>
                      <td>{user.created_at}</td>
                      {user.courses > 1 ? <td >{user.courses} Activos</td> :
                        <td >{user.courses} Activo</td>}
                      <td>MXN${user.total}</td>
                      {/* <td>{user.score} puntos</td> */}
                      <td onClick={() => openUserCardData(user)}><UserShow><EditIcon />Visualizar Usuario</UserShow></td>
                      <td onClick={() => { setShow(true); setUser(user) }}>Editar Usuario</td>
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
      <EditUserModal show={show} setShow={setShow} user={user} />
    </AdminContain >
  )
}
export default UsersList;