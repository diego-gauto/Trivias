import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getTeacher } from '../../../store/actions/courseActions';
import { addCourseMembershipApi } from '../../api/admin';
import { addPastUsers, testApi } from '../../api/auth';
import { getCoursesApi } from '../../api/courses';
import { getHomeworksApi } from '../../api/homeworks';
import { addUserCertificateApi, getCourseApi } from '../../api/lessons';
import { addPastUserProgress, getPastUsers, getUserApi, updateScorePastUser } from '../../api/users';
import { CaretD2, Label2 } from '../Courses/Form/Select/SelectStyles.styled';
import { Option, OptionContain, SelectContain, Selected } from '../Pay/Select/Select.styled';
import { AdminContain } from '../SideBar.styled';
import { Button, Container, Download, HWContainer, Table, TitleContain } from './HomeWork.styled'
import HomeWorkModal from './HomeWorkModal/HomeWorkModal';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

export class CsvData {
  public id: any;
  public properties: any[] = [];
}

const HomeWork = () => {
  const [show, setShow] = useState(false);
  const [homeWorks, setHomeWorks] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [id, setId] = useState("");
  const [course, setCourse] = useState<any>([]);
  const [courseSelect, setCourseSelect] = useState(false)
  const [courseFilter, setCourseFilter] = useState<any>("");
  const [coursesId, setCoursesId] = useState<any>([])
  const [pastUsers, setPastUsers] = useState<any>([]);
  const [filterForCourse, setFilterForCourse] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [courseIdForFilter, setCourseIdForFilter] = useState(0);
  const [filterForStatus, setFilterForStatus] = useState<boolean>(false);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [currentStatus, setCurrentStatus] = useState({
    status: 0,
    approved: 0,
  })
  const [userData, setUserData] = useState<any>(null);

  const openCourseSelect = () => {
    setCourseSelect(!courseSelect)
  }

  const getHomeworks = async () => {
    let user: any;
    if (localStorage.getItem("email")) user = await getUserApi(localStorage.getItem("email"))
    setUserData(user);
    getHomeworksApi().then(async (res: any) => {
      let tempHomeworks = res.data.data
      if (user.role === "admin") {
        let array = user.roles[7].courses.split(",");
        let temp: any = [];
        await Promise.all(array.map((x: any) => {
          temp.push(+x)
        }))
        getCoursesForAdmin(temp);
        setCoursesId(temp);
        tempHomeworks = res.data.data.filter((x: any) => temp.includes(x.courseId));
      }
      if (user.role === "superAdmin") {
        let temp: any = [];
        await Promise.all(tempHomeworks.map((x: any) => {
          temp.push(+x.courseId)
        }))
        getCoursesForAdmin(temp);
        setCoursesId(temp);
      }
      pagePerHomeworks(tempHomeworks);
    })
  }
  const getCoursesForAdmin = (courses_id: any) => {
    setPageIndex(0)
    getCoursesApi().then((res) => {
      let availableCourses: any = [];
      res.map((course: any) => {
        if (courses_id.includes(course.id)) {
          availableCourses.push(course);
        }
      })
      setCourse(availableCourses);
    })
  }
  const FilterHomeWorks = (course_id: number) => {
    setPageIndex(0)
    setCourseIdForFilter(course_id)
    getHomeworksApi().then(async (res: any) => {
      let tempHomeworks = res.data.data
      if (filterForStatus) {
        tempHomeworks = res.data.data.filter((x: any) => x.status === currentStatus.status && x.approved === currentStatus.approved);
        tempHomeworks = tempHomeworks.filter((x: any) => x.courseId === course_id);
      }
      else {
        tempHomeworks = res.data.data.filter((x: any) => x.courseId === course_id);
      }
      pagePerHomeworks(tempHomeworks);
      setFilterForCourse(true);
    })
  }
  const AllHomeWorks = () => {
    getHomeworksApi().then(async (res: any) => {
      let tempHomeworks = res.data.data
      if (filterForStatus) {
        tempHomeworks = res.data.data.filter((x: any) => x.status === currentStatus.status && x.approved === currentStatus.approved);
        tempHomeworks = tempHomeworks.filter((x: any) => coursesId.includes(x.courseId));
      }
      else {
        tempHomeworks = res.data.data.filter((x: any) => coursesId.includes(x.courseId));
      }
      pagePerHomeworks(tempHomeworks);
      setFilterForCourse(false);
    })
  }
  const formatDate = (date: any) => {
    return date.substring(0, 10)
  }
  const filterByStatus = (type: string) => {
    getHomeworksApi().then(async (res: any) => {
      let tempHomeworks = res.data.data
      if (filterForCourse) {
        tempHomeworks = res.data.data.filter((x: any) => x.courseId === courseIdForFilter);
        if (type === "all") {
          tempHomeworks = tempHomeworks;
          setFilterForStatus(false);
        }
        else {
          setPageIndex(0)
          setFilterForStatus(true);
        }
        if (type === "pending") {
          tempHomeworks = tempHomeworks.filter((x: any) => x.status === 0);
          setCurrentStatus({
            status: 0,
            approved: 0
          })
        }
        if (type === "approved") {
          tempHomeworks = tempHomeworks.filter((x: any) => x.status === 1 && x.approved === 1);
          setCurrentStatus({
            status: 1,
            approved: 1
          })
        }
        if (type === "rejected") {
          tempHomeworks = tempHomeworks.filter((x: any) => x.status === 1 && x.approved === 0);
          setCurrentStatus({
            status: 1,
            approved: 0
          })
        }
      }
      else {
        if (type === "all") {
          tempHomeworks = res.data.data;
          setFilterForStatus(false);
        }
        else {
          setPageIndex(0)
          setFilterForStatus(true);
        }
        if (type === "pending") {
          tempHomeworks = res.data.data.filter((x: any) => x.status === 0);
          setCurrentStatus({
            status: 0,
            approved: 0
          })
        }
        if (type === "approved") {
          tempHomeworks = res.data.data.filter((x: any) => x.status === 1 && x.approved === 1);
          setCurrentStatus({
            status: 1,
            approved: 1
          })
        }
        if (type === "rejected") {
          tempHomeworks = res.data.data.filter((x: any) => x.status === 1 && x.approved === 0);
          setCurrentStatus({
            status: 1,
            approved: 0
          })
        }
      }
      pagePerHomeworks(tempHomeworks)
    })
  }
  const pagePerHomeworks = (homework: any) => {
    let usersPerPage: number = 100;
    let pages: number = Math.ceil(homework.length / usersPerPage);
    let tempHomeWork: any = [];
    for (let i = 0; i < pages; i++) {
      tempHomeWork.push([])
      for (let j = 0; j < usersPerPage; j++) {
        if (homework[j + (usersPerPage * i)]) {
          tempHomeWork[i].push(homework[j + (usersPerPage * i)])
        }
      }
    }
    setMaxPages(pages);
    setHomeWorks(tempHomeWork);
  }
  const getNextHomeWorks = (direction: string) => {
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
  const handleClick = () => {
    getHomeworks();
    alert("Tarea revisada con éxito!");
    setShow(false);
    setPageIndex(0);
    setFilterForStatus(false);
    setFilterForCourse(false);
  }
  useEffect(() => {
    getHomeworks();
  }, [])

  const isValidCSVFile = (file: any) => {
    return file.name.endsWith(".csv");
  }

  const uploadCsv = (event: any) => {
    const reader = new FileReader()
    const fileContent = event.target
    reader.readAsText(fileContent.files[0])

    if (!isValidCSVFile(fileContent.files[0])) { return alert("Por favor ingresa un archivo .csv."); }

    reader.onload = () => {
      let csvData: any = reader.result
      let csvRecordsArray = csvData.split(/\r\n|\n/);


      const headersRow = getHeaderArray(csvRecordsArray);
      const records = getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

      setHeadersRow(headersRow)
      setRecords(records)
      // getJsonData(records, headersRow)
    }
    reader.onerror = function () {
    };
  }


  const getHeaderArray = (csvRecordsArr: any) => {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 1; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  const getDataRecordsArrayFromCSVFile = (csvRecordsArray: any, headerLength: any) => {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (csvRecordsArray[i]).split(',');
      let csvRecord: any = new CsvData();
      for (let i = 1; i < currentRecord.length; i++) {
        csvRecord.properties.push(currentRecord[i].trim())
      }
      if (csvRecord.properties[0] != '') { csvArr.push(csvRecord); }
    }
    return csvArr;
  }

  const getJsonData = async (records: any, headersRow: any) => {
    const jsonData = records
    const headerJson = headersRow
    let rec = {
      records: jsonData.slice((countdown - 1) * 1, (countdown * 1))
    }
    await addPastUsers(rec).then((res) => {
    })

  }

  const [countdown, setCountdown] = useState(1);
  const [headersRow, setHeadersRow] = useState<any>();
  const [records, setRecords] = useState<any>(null);
  const [start, setstart] = useState("stop");

  // useEffect(() => {
  //   let timeout: any;
  //   if (records) {
  //     if (countdown <= 40) {
  //       timeout = setTimeout(() => {
  //         setCountdown(countdown + 1);
  //         getJsonData(records, headersRow);
  //         // addDays(records, headersRow);
  //         console.log(countdown);
  //         // addProgress()
  //         // testStripe();
  //       }, 100);
  //       return () => clearTimeout(timeout);
  //     }
  //   }
  //   return
  // }, [records, countdown]);
  // useEffect(() => {
  //   let range = {
  //     start: 40000,
  //     end: 50001
  //   }
  //   getPastUsers(range).then((res) => {
  //     console.log(res.data.past);

  //     setPastUsers(res.data.past);
  //   })
  // }, [])
  const testStripe = async () => {
    await Promise.all(
      pastUsers.slice((countdown - 1) * 1, (countdown * 1)).map(async (user: any, index: number) => {
        console.log(index);
        let tempUser = {
          email: user.email,
          id: user.id,
          name: user.name,
        }
        testApi(tempUser).then(() => {

        })
      })
    )
  }
  const addProgress = async () => {
    await Promise.all(
      pastUsers.slice((countdown - 1) * 1, (countdown * 1)).map(async (user: any, index: number) => {
        let tempArray = records.filter((x: any) => x.properties[0] === user.email)
        if (tempArray.length > 0) {
          await Promise.all(tempArray.map(async (element: any) => {
            if (user.email === element.properties[0]) {
              let tempUser = {
                email: user.email,
                score: +element.properties[2],
                userId: user.id
              }
              console.log(tempUser);
              await updateScorePastUser(tempUser);
              await getCourseApi(+element.properties[1]).then(async (course) => {
                if (course.lessons && course.lessons.length > 0) {
                  let ids = {
                    userId: user.id,
                    courseId: course.id,
                  }
                  let tempCertificate = {
                    ...ids,
                    folio: `${ids.courseId}-${ids.userId}`
                  }
                  await addUserCertificateApi(tempCertificate)
                  course.lessons.forEach(async (lesson: any) => {
                    let tempLesson = {
                      lessonId: lesson.id,
                      userId: user.id
                    }
                    return await addPastUserProgress(tempLesson)
                  });
                }
              })
            }
          }))
        }
      })
    )
  }
  const addDays = (records: any, headersRow: any) => {
    // console.log(records);
    let rec = {
      records: records.slice((countdown - 1) * 1, (countdown * 1))
    }
    let date = new Date(rec.records[0].properties[1])
    let seconds = date.getTime() / 1000;
    console.log(countdown)
    //NAILS MASTER ES course_id = 30
    //Alineacion cert es course_id = 45
    getUserApi(rec.records[0].properties[0]).then((res) => {
      let addCourse = {
        user_id: res.id,
        course_id: 30,
        final_date: seconds,
      }
      console.log(addCourse)
      // addCourseMembershipApi(addCourse).then(() => {
      //   console.log('exito')
      // })
    })
  }
  return (
    <AdminContain>
      <HWContainer>
        <Container>
          {/* <input type="file" onChange={(e) => { uploadCsv(e) }} /> */}
          {/* <button onClick={addProgress}>add</button> */}
          {/* <button onClick={() => { setstart("start") }}> stripe</button> */}
          {/* <button > SendinBlue</button> */}
          <TitleContain>
            <p>
              Tareas
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <SelectContain key={2}>
                <Selected onClick={openCourseSelect}>
                  {
                    courseFilter ? courseFilter.title : "Seleccione un curso"
                  }
                  <CaretD2 style={{ top: "18%" }} />
                </Selected>
                {
                  courseSelect == true &&
                  <OptionContain>
                    <Option
                      onClick={() => {
                        setCourseFilter("");
                        setCourseSelect(false);
                        AllHomeWorks();
                      }}>
                      <input
                        type="radio"
                        id="professor"
                        name="professor"
                        value=""
                      />
                      <Label2>Ver Todas</Label2>
                    </Option>
                    {
                      course.map((val: any, index: any) => {
                        return (
                          <Option
                            key={"Professor " + index}
                            onClick={() => {
                              FilterHomeWorks(val.id);
                              setCourseFilter(val);
                              setCourseSelect(false);
                            }}>
                            <input
                              type="radio"
                              id="professor"
                              name="professor"
                              value="professor"
                            />
                            <Label2>{val.title}</Label2>
                          </Option>
                        )
                      })
                    }
                  </OptionContain>
                }
              </SelectContain>
              <select onChange={(e: any) => { filterByStatus(e.target.value) }}>
                <option value="all">Ver todas</option>
                <option value="pending">Pendientes</option>
                <option value="approved">Aprobadas</option>
                <option value="rejected">Rechazadas</option>
              </select>
            </div>
          </TitleContain>
          <div className="pages">
            <div className="index">
              <AiFillCaretLeft className="arrows" onClick={() => { getNextHomeWorks("backward") }} />
              <p className="current-number">{pageIndex + 1}</p>
              <AiFillCaretRight className="arrows" onClick={() => { getNextHomeWorks("forward") }} />
            </div>
            <div className="max-pages">
              <p className="max-number">Paginas: {maxPages}</p>
            </div>
          </div>
          <Table id="Pay">
            <tbody>
              <tr>
                <th>Usuario</th>
                <th>Correo Electrónico</th>
                <th>Curso (temporada, lección)</th>
                <th>Fecha</th>
                <th>Descargar Tarea</th>
                <th >Estatus</th>
              </tr>
              {/* TABLAS */}
              {
                homeWorks.length > 0 && (
                  homeWorks[pageIndex].map((task: any, index: any) => {
                    return (
                      <tr
                        key={"HomeWorks " + index}
                        style={{ cursor: "pointer" }}
                        onClick={() => { setShow(true); setData(task); setId(task.id) }}
                      >
                        <td
                        >{task.userName}</td>
                        <td

                        >{task.userEmail}</td>
                        <td

                        >{task.courseTitle}  ({task.seasonNumber}, {task.lessonNumber}) </td>
                        <td
                          style={{ whiteSpace: "nowrap" }}
                        >{formatDate(task.homeworkCreatedAt)}</td>
                        <td style={{ padding: "0" }} onClick={(e: any) => { e.stopPropagation(); setShow(false) }}>
                          <Link href={task.homeworkImage}>
                            <a target="_blank" style={{ textDecoration: "none" }}>
                              <Download>
                                Descargar Tarea
                              </Download>
                            </a>
                          </Link>
                        </td>
                        <td style={{ padding: "0" }}
                        >{
                            task.status === 0
                              ? <Button status={task.status} approved={task.approved}>Pendiente</Button>
                              :
                              <>
                                {
                                  task.approved === 1
                                    ? <Button status={task.status} approved={task.approved}> Aprobada</Button>
                                    : <Button status={task.status} approved={task.approved}> Rechazada</Button>
                                }
                              </>
                          }
                        </td>
                      </tr>
                    )
                  })
                )}
            </tbody>
          </Table>
          <HomeWorkModal setShow={setShow} show={show} data={data} user={homeWorks.userId} handleClick={handleClick} />
        </Container>
      </HWContainer>
    </AdminContain>
  )
}
export default HomeWork;