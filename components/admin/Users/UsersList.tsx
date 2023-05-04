import React, { useEffect, useState } from "react";
import CsvDownloader from "react-csv-downloader";
import { Container, Profile, ProfileContain, Title, TitleContain } from "../Pay/Pay.styled";
import { AdminContain, AdminLoader, Table } from "../SideBar.styled";
import UserCardData from "./UserData/UserCardData";
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
import { getCoursesApi } from "../../api/lessons";
import { getLessonFromUserApi, getUsersApi } from "../../api/admin";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

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
  const [filterValue, setFilterValue] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<any>>([]);
  const [usersFilter, setUsersFilter] = useState<Array<any>>([]);
  const [courses, setCourses] = useState<Array<any>>([]);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [show, setShow] = useState<boolean>(false);
  const [user, setUser] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loadCard, setLoadCard] = useState(false);
  let today = new Date().getTime() / 1000;
  const openUserCardData = async (user: any) => {
    setLoadCard(false);
    getLessonFromUserApi(user.id).then((res) => {
      res.data.data.forEach((userCourse: any) => {
        courses.forEach((course: any) => {
          if (userCourse.course_id === course.id) {
            userCourse.courseTitle = course.title;
            userCourse.image = course.image;
          }
        });
      });
      user.user_courses = res.data.data;
      setSelectedUser(user);
      setLoadCard(true);
    })
    setIsVisible(true);
  };
  const filterUsersByValue = (value: string): void => {
    let tempAllUsers = allUsers;
    let query = value.toLocaleLowerCase();
    const filteredUsers = tempAllUsers.filter((item) => {
      return item.name.toLowerCase().includes(query) || item.email.includes(query)
    })
    // if (value === "") return setUsers(usersFilter);
    // const filteredUsers = usersFilter.filter((item) =>
    //   item.name.toLowerCase().includes(query) ||
    //   item.email.includes(query) ||
    //   item.score.toString().includes(query) ||
    //   item.created_at.includes(query));
    // setUsers(filteredUsers);
    pagePerUsers(filteredUsers);
  };

  const filter = (value: string) => {
    let tempAllUsers = allUsers;
    let userFilter: any = [];
    if (value === "all") {
      userFilter = tempAllUsers.sort((a: any, b: any) => {
        return b.id - a.id;
      });
    }
    if (value === "suscription") {
      userFilter = tempAllUsers.sort((a: any, b: any) => {
        return b.level - a.level;
      });
    }
    if (value === "name") {
      userFilter = tempAllUsers.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (value === "spend") {
      userFilter = tempAllUsers.sort((a: any, b: any) => {
        return b.spent - a.spent;
      });
    }
    pagePerUsers(userFilter);
  }

  const getCoures = () => {
    let tempCourses: Array<any> = [];
    getCoursesApi().then((res) => {
      res.forEach((element: any) => {
        if (element.type == 'Producto') {
          let counter: number = 0;
          element.seasons.forEach((season: any) => {
            season.lessons.forEach((lesson: any) => {
              counter++;
            })
          });
          element.totalLessons = counter;
          tempCourses.push(element)
        }
      });
      setCourses(tempCourses)
    })
  }
  const pagePerUsers = (users: any) => {
    let usersPerPage: number = 100;
    let pages: number = Math.ceil(users.length / usersPerPage);
    let tempUsers: any = [];
    for (let i = 0; i < pages; i++) {
      tempUsers.push([])
      for (let j = 0; j < usersPerPage; j++) {
        if (users[j + (usersPerPage * i)]) {
          tempUsers[i].push(users[j + (usersPerPage * i)])
        }
      }
    }
    setMaxPages(pages);
    setTotalUsers(usersPerPage);
    setUsersFilter(tempUsers);
    setUsers(tempUsers);
    setLoader(true);
  }
  const getNextUsers = (direction: string) => {
    if (direction === "backward") {
      if (pageIndex !== 0) {
        setPageIndex(pageIndex - 1)
      }
    }
    if (direction === "forward") {
      if (pageIndex !== maxPages - 1) {
        setPageIndex(pageIndex + 1)
      }
    }

  }
  const activeCourses = (user_courses: any) => {
    let countCourses: number = 0
    user_courses.map((x: any) => {
      if (x.final_date > today) {
        countCourses++;
      }
    })
    return "Activo " + countCourses
  }
  const getUsers = async (): Promise<void> => {
    getUsersApi().then((res) => {
      pagePerUsers(res.data.users)
      setAllUsers(res.data.users);
    })
  }

  useEffect(() => {
    getUsers();
    getCoures();
  }, [show]);

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime() + 50400000;
    return new Date(tempDate).toLocaleDateString("es-MX")
  }

  const handleClick = () => {
    getUsers();
  }

  if (!loader) {
    return (
      <AdminLoader>
        <div className="loader-image">
          <div className="loader-contain" />
        </div>
      </AdminLoader>
    )
  }
  return (
    <AdminContain>
      <UserContain>
        <Container>
          <TitleContain>
            <Title>Usuarios</Title>
            {(user.role === 'admin' && user.roles[4].report === 0) && <CsvDownloader
              filename="usersData"
              extension=".csv"
              separator=","
              wrapColumnChar=""
              datas={allUsers.map(({ ...user }) => user
              )}
            >
              <DownloadUserData>
                <p>Descargar lista de usuarios</p>
              </DownloadUserData>
            </CsvDownloader>}
            <FilterContain>
              <Select>
                <select defaultValue={filterValue} onChange={(e: any) => { filter(e.target.value) }}>
                  <option value={"all"}>Todos</option>
                  <option value={"suscription"}>Suscripción</option>
                  <option value={"name"}>Nombre</option>
                  <option value={"spend"}>Amount spend</option>
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
          <div className="pages">
            <div className="index">
              <AiFillCaretLeft className="arrows" onClick={() => { getNextUsers("backward") }} />
              <p className="current-number">{pageIndex + 1}</p>
              <AiFillCaretRight className="arrows" onClick={() => { getNextUsers("forward") }} />
            </div>
            <div className="max-pages">
              <p className="max-number">Paginas: {maxPages}</p>
            </div>
          </div>
          <Table id="Users">
            <tbody>
              <tr>
                <th>Usuario</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Creación</th>
                <th>Cursos Suscritos</th>
                <th>Amount spent</th>
                <th>Visualizar</th>
                <th>Editar</th>
              </tr>
              {/* TABLAS */}
              {users.length > 0 && (
                users[pageIndex].map((user: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td style={{ fontWeight: 600 }}>
                        <ProfileContain>
                          <Profile />
                          {user.name}
                        </ProfileContain>
                      </td>
                      <td >{user.email}</td>
                      <td>{formatDate(user.created_at)}</td>
                      <td>{activeCourses(user.user_courses)}</td>
                      <td>MXN${user.spent}</td>
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
          <UserCardData user={selectedUser} setIsVisible={setIsVisible} courses={courses} loader={loadCard} openUserCardData={openUserCardData} />
        }
      </UserContain>
      <EditUserModal show={show} setShow={setShow} user={user} handleClick={handleClick} />
    </AdminContain >
  )
}
export default UsersList;