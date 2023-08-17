import React, { useEffect, useRef, useState } from "react";
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
import { getAllUsers, getCountriesApi, getLessonFromUserApi, getPartialUsers, getProgressForUsers, getUsersApi, userForExcel } from "../../api/admin";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import UserFilters from "./UserFilters/UserFilters";
import { useAuth } from "../../../hooks/useAuth";
import { FormatDateForBack } from "../../../utils/functions";

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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<any>>([]);
  const [courses, setCourses] = useState<Array<any>>([]);
  const [allCourses, setAllCourses] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [show, setShow] = useState<boolean>(false);
  const [user, setUser] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const [countries, setCountries] = useState<any>([]);
  const [selectFilters, setSelectFilters] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [filters, setFilters] = useState<any>([
    'todos', 'todos', 'todos', -1, 'todos', 'todos', 'todos', -1, 0
  ]);
  const [dates, setDates] = useState<any>([[], []]);
  const [userDownload, setUserDownload] = useState<any>([]);
  const [loadCard, setLoadCard] = useState(false);
  const [loginDate, setLoginDate] = useState<any>([null, null]);
  const [createDate, setCreateDate] = useState<any>([null, null]);
  const menuRef = useRef<any>(null);
  let usersPerPage: number = 100;
  let today = new Date().getTime() / 1000;
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setUserData(userDataAuth.user);
      }
    }, [userDataAuth])

  } catch (error) {
    console.log(error)
  }
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
  const updateDate = (date: any) => {
    setCreateDate(date)
  }
  const updateLoginDate = (date: any) => {
    setLoginDate(date)
  }
  const filteredData = async (filters: any, date: any, text_value: string, page: number) => {
    console.log(filters);
    let tempUsers: any = [];
    setLoader(false);
    if (text_value === "") {
      getAllUsers(usersPerPage, page * 100, 'all_users', filters[3], -1, filters[5], filters[1], filters[6], filters[2], FormatDateForBack(date[0][0]), FormatDateForBack(date[0][1]), filters[4], FormatDateForBack(date[1][0]), FormatDateForBack(date[1][1]), filters[7], filters[8], filters[0]).then((res) => {
        setUsers(res);
        tempUsers = res;
        setLoader(true);
      })
    }
    else {
      getAllUsers(usersPerPage, page * 100, text_value, filters[3], -1, filters[5], filters[1], filters[6], filters[2], FormatDateForBack(date[0][0]), FormatDateForBack(date[0][1]), filters[4], FormatDateForBack(date[1][0]), FormatDateForBack(date[1][1]), filters[7], filters[8], filters[0]).then((res) => {
        setUsers(res);
        tempUsers = res;
        setLoader(true);
      })
    }
    setDates(date);
    setFilters(filters);
    getMaxUsers(filters, date, text_value);
    return tempUsers
  }

  const filterUsersByValue = (value: string): any => {
    filteredData(filters, dates, value, pageIndex);
    setFilterValue(value);
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
  }
  const getCoures = () => {
    let tempCourses: Array<any> = [];
    getCoursesApi().then((res) => {
      setAllCourses(res);
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
  const getNextUsers = (direction: string) => {
    let tempPage = 0;
    if (direction === "backward") {
      if (pageIndex !== 0) {
        tempPage = pageIndex - 1;
        setPageIndex(tempPage)
      }
    }
    if (direction === "forward") {
      if (pageIndex !== maxPages - 1) {
        tempPage = pageIndex + 1;
        setPageIndex(tempPage)
      }
    }
    if (direction === "first") {
      tempPage = 0;
      setPageIndex(tempPage)
    }
    if (direction === "last") {
      tempPage = maxPages - 1;
      setPageIndex(tempPage);
    }
    filteredData(filters, dates, filterValue, tempPage);
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
  const getMaxUsers = (filters: any, date: any, text_value: any) => {
    console.log(filters);
    userForExcel(text_value === "" ? "all_users" : text_value, filters[3], -1, filters[5], filters[1], filters[6], filters[2], FormatDateForBack(date[0][0]), FormatDateForBack(date[0][1]), filters[4], FormatDateForBack(date[1][0]), FormatDateForBack(date[1][1]), filters[7], filters[8], filters[0]).then(async (res) => {
      setTotalUsers(res.length);
      setMaxPages(Math.ceil(res.length / usersPerPage));
    })
  }
  const getUsers = async () => {
    let demoDate = '14-01-2022 00:00:00'
    let demoDate2 = '14-07-2023 00:00:00'
    getAllUsers(usersPerPage, pageIndex, 'all_users', 0, -1, 'todos', 'todos', 'todos', 'todos', demoDate, demoDate2, 'todos', demoDate, demoDate2, -1, 0, 'todos').then((res) => {
      setUsers(res);
      setLoader(true);
    })
  }
  useEffect(() => {
    getUsers();
    getMaxUsers(filters, dates, filterValue);
    getCountriesApi().then((res) => {
      setCountries(res);
    })
    getCoures();
  }, []);

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime() + 50400000;
    return new Date(tempDate).toLocaleDateString("es-MX")
  }

  const handleClick = () => {
    filteredData(filters, dates, filterValue, pageIndex);
  }
  const Gonvar: any = async () => {
    let sendUsers: any = [];
    // await users.map(async (user) => {
    //   if (user.final_date < today) {
    //     sendUsers.push({
    //       nombre: user.name,
    //       apellido: user.last_name,
    //       correo: user.email,
    //       whatsapp: user.phone_number,
    //     })
    //   }
    // })
    await userForExcel(filterValue === "" ? "all_users" : filterValue, filters[3], -1, filters[5], filters[1], filters[6], filters[2], FormatDateForBack(dates[0][0]), FormatDateForBack(dates[0][1]), filters[4], FormatDateForBack(dates[1][0]), FormatDateForBack(dates[1][1]), filters[7], filters[8], filters[0]).then(async (res) => {
      await res.map(async (user: any) => {
        sendUsers.push({
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          pais: user.pais,
          whatsapp: user.whatsapp,
          stripe_id: user.stripe_id,
          final_date: user.final_date,
          level: user.level,
          id: user.user_id
        })
      })
    })
    return sendUsers
  }

  return (
    <AdminContain>
      <UserContain>
        <Container>
          <TitleContain>
            <Title>Usuarios - {totalUsers}</Title>
            <FilterContain>
              <div className="filter-contain">
                <button onClick={() => setShowFilters(!showFilters)}>
                  Filtros
                </button>
                <Select>
                  <select defaultValue={"Todos"} onChange={(e: any) => { filter(e.target.value) }}>
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
              </div>
              {((userData?.role === 'admin' && userData?.roles[4].report === 0) || userData?.role === "superAdmin")
                && <CsvDownloader
                  filename="usersData"
                  extension=".csv"
                  separator=","
                  wrapColumnChar=""
                  datas={Gonvar}
                >
                  <DownloadUserData>
                    <p>Descargar lista de usuarios</p>
                  </DownloadUserData>
                </CsvDownloader>}
            </FilterContain>
          </TitleContain>
          <div className="pages">
            <div className="index">
              <AiFillCaretLeft className="arrows" onClick={() => { getNextUsers("backward") }} />
              <p className="default-number" onClick={() => { getNextUsers("first") }}>1</p>
              <p className="current-number">{pageIndex + 1}</p>
              <p className="default-number" onClick={() => { getNextUsers("last") }}>{maxPages}</p>
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
              {
                <>
                  {
                    loader &&
                    <>
                      {
                        users.length > 0 && (
                          users.map((user: any, index: number) => {
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
                          }))
                      }
                    </>
                  }
                </>
              }
            </tbody>
          </Table>
          {
            !loader &&
            <Background style={{ "alignItems": "center", "justifyContent": "center" }}>
              <LoaderImage>
                <LoaderContain />
              </LoaderImage>
            </Background>
          }
        </Container>
        {
          isVisible &&
          <UserCardData user={selectedUser} isVisible={isVisible} setIsVisible={setIsVisible} courses={courses} loader={loadCard} openUserCardData={openUserCardData} />
        }
      </UserContain>
      <UserFilters
        countries={countries}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        allUsers={allUsers}
        allCourses={allCourses}
        filterValue={filterValue}
        pageIndex={pageIndex}
        filteredData={filteredData}
        loginDate={loginDate}
        setLoginDate={updateLoginDate}
        createDate={createDate}
        setCreateDate={updateDate}
        setSelectFilters={setSelectFilters}
      />
      <EditUserModal show={show} setShow={setShow} user={user} handleClick={handleClick} />
    </AdminContain >
  )
}
export default UsersList;