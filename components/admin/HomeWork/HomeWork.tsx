import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getcourse, getCourses, getTeacher, getUsers } from '../../../store/actions/courseActions';
import { getAllHomeWorks, getHomeworks } from '../../../store/actions/UserActions';
import { addCourseMembershipApi } from '../../api/admin';
import { addPastUsers } from '../../api/auth';
import { getHomeworksApi } from '../../api/homeworks';
import { getCourseApi } from '../../api/lessons';
import { addPastUserProgress, getPastUsers, getUserApi, updateScorePastUser } from '../../api/users';
import { CaretD2, Label2 } from '../Courses/Form/Select/SelectStyles.styled';
import { Option, OptionContain, SelectContain, Selected } from '../Pay/Select/Select.styled';
import { AdminContain } from '../SideBar.styled';
import { Button, Container, Download, HWContainer, Table, TitleContain } from './HomeWork.styled'
import HomeWorkModal from './HomeWorkModal/HomeWorkModal';

export class CsvData {
  public id: any;
  public properties: any[] = [];
}

const HomeWork = () => {
  const [show, setShow] = useState(false);
  const [homeWorks, setHomeWorks] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [id, setId] = useState("");
  const [professor, setProfessor] = useState<any>([]);
  const [course, setCourse] = useState<any>([]);
  const [openSelect, setOpenSelect] = useState(false)
  const [courseSelect, setCourseSelect] = useState(false)
  const [professorFilter, setProfessorFilter] = useState<any>("");
  const [courseFilter, setCourseFilter] = useState<any>("");

  const [pastUsers, setPastUsers] = useState<any>([]);

  const openCourseSelect = () => {
    setOpenSelect(false);
    setCourseSelect(!courseSelect)
  }
  const openTeacherSelect = () => {
    setOpenSelect(!openSelect);
    setCourseSelect(false)
  }

  const getHomeworks = () => {
    let tempFilter: any = [];
    // if (professorFilter !== "" || courseFilter !== "") {
    //   setHomeWorks([]);
    //   getAllHomeWorks().then((res) => {
    //     res.forEach((element: any) => {
    //       let tempDate = new Date(element.createdAt.seconds * 1000);
    //       let tempDay = tempDate.getDate()
    //       let tempMonth = tempDate.getMonth() + 1;
    //       let tempYear = tempDate.getFullYear()
    //       element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
    //     });
    //     res.filter((element: any, index: any) => {
    //       if (professorFilter !== "" && courseFilter === "") {
    //         element.teacherCreds.map((val: any) => {
    //           if (val.id === professorFilter.id) {
    //             tempFilter.push(element);
    //           }
    //         })
    //       }
    //       if (professorFilter === "" && courseFilter !== "") {
    //         if (element.courseId == courseFilter.id) {
    //           tempFilter.push(element);
    //         }
    //       }
    //       if (professorFilter !== "" && courseFilter !== "") {
    //         if (element.courseId == courseFilter.id) {
    //           element.teacherCreds.map((val: any) => {
    //             if (val.id === professorFilter.id) {
    //               tempFilter.push(element);
    //             }
    //           })
    //         }
    //       }
    //     })
    //     setHomeWorks(tempFilter);
    //   })
    // }
    // else {
    getHomeworksApi().then((res: any) => {
      res.data.data.forEach((element: any) => {
        console.log(element)
        let tempDate: any = new Date();
        let tempDay = tempDate.getDate()
        let tempMonth = tempDate.getMonth() + 1;
        let tempYear = tempDate.getFullYear()
        element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
      });
      setHomeWorks(res.data.data);
    })
    // }
  }

  const getAllteachers = () => {
    getTeacher().then((res) => {
      setProfessor(res);
      return res;
    })
  }
  const handleClick = () => {
    let index;
    index = homeWorks.findIndex((x: any) => x.id == id);
    homeWorks[index].status = true;
    setHomeWorks([...homeWorks])
  }
  useEffect(() => {
    getAllteachers();
  }, [])
  useEffect(() => {
    getHomeworks();
  }, [professorFilter, courseFilter])

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
      for (let i = 0; i < currentRecord.length; i++) {
        csvRecord.properties.push(currentRecord[i].trim())
      }
      if (csvRecord.properties[0] != '') { csvArr.push(csvRecord); }
    }
    return csvArr;
  }

  const getJsonData = async (records: any, headersRow: any) => {
    const jsonData = records
    const headerJson = headersRow
    // await Promise.all(jsonData.map(async (x: any, index: number) => {
    //   let rec = {
    //     records: x
    //   }
    //   await addPastUsers(rec);
    // }))
    let arr = new Array(800);
    console.log(countdown);
    let rec = {
      records: jsonData.slice((countdown - 1) * 1, (countdown * 1))
    }
    await addPastUsers(rec).then((res) => {
    })

  }

  const [countdown, setCountdown] = useState(1);
  const [headersRow, setHeadersRow] = useState<any>();
  const [records, setRecords] = useState<any>(null);

  useEffect(() => {
    let timeout: any;
    if (records) {
      if (countdown <= 29) {
        timeout = setTimeout(() => {
          setCountdown(countdown + 1);
          // addDays(records, headersRow);
          // addProgress()
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
    return
  }, [records, countdown]);

  useEffect(() => {
    let range = {
      start: 40007,
      end: 41543
    }
    getPastUsers(range).then((res) => {
      console.log(res);

      setPastUsers(res.data.past);
    })
  }, [])

  const addProgress = async () => {
    await Promise.all(
      pastUsers.slice((countdown - 1) * 1, (countdown * 1)).map(async (user: any, index: number) => {
        console.log(index);
        let tempArray = records.filter((x: any) => x.properties[0] === user.email)
        if (tempArray.length > 0) {
          await Promise.all(tempArray.map(async (element: any) => {
            if (user.email === element.properties[0]) {
              let tempUser = {
                email: user.email,
                score: +element.properties[2],
                userId: user.id
              }
              await updateScorePastUser(tempUser);
              await getCourseApi(+element.properties[1]).then((course) => {
                if (course.lessons && course.lessons.length > 0) {
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
          <TitleContain>
            <p>
              Tareas
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <SelectContain key={2}>
                <Selected onClick={openCourseSelect} style={professor.length === 0 ? { height: 43 } : { height: "fit-content" }}>
                  {
                    courseFilter ? courseFilter.courseTittle : "Seleccione un curso"
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
                              setCourseFilter(val);
                              setCourseSelect(false);
                            }}>
                            <input
                              type="radio"
                              id="professor"
                              name="professor"
                              value="professor"
                            />
                            <Label2>{val.courseTittle}</Label2>
                          </Option>
                        )
                      })
                    }

                  </OptionContain>
                }
              </SelectContain>
              <SelectContain key={1}>
                <Selected onClick={openTeacherSelect} style={professor.length === 0 ? { height: 43 } : { height: "fit-content" }}>
                  {
                    professorFilter ? professorFilter.name : "Seleccione un professor"
                  }
                  <CaretD2 style={{ top: "18%" }} />
                </Selected>

                {
                  openSelect == true &&

                  <OptionContain>
                    <Option
                      onClick={() => {
                        setProfessorFilter("");
                        setOpenSelect(false)
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
                      professor.map((val: any, index: any) => {
                        return (
                          <Option
                            key={"Professor " + index}
                            onClick={() => {
                              setProfessorFilter(val);
                              setOpenSelect(false)
                            }}>
                            <input
                              type="radio"
                              id="professor"
                              name="professor"
                              value="professor"
                            />
                            <Label2>{val.name}</Label2>
                          </Option>
                        )
                      })
                    }

                  </OptionContain>
                }
              </SelectContain>
            </div>
          </TitleContain>
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
                homeWorks.map((task: any, index: any) => {
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

                      >{task.formatDate}</td>
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
                          task.status == false
                            ? <Button status={task.status}>No revisada</Button>
                            : <Button status={task.status}>Revisada</Button>
                        }</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <HomeWorkModal setShow={setShow} show={show} data={data} user={homeWorks.userId} handleClick={handleClick} />
        </Container>

      </HWContainer>
    </AdminContain>
  )
}
export default HomeWork;