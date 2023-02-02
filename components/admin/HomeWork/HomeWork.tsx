import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getcourse, getCourses, getTeacher, getUsers } from '../../../store/actions/courseActions';
import { getAllHomeWorks } from '../../../store/actions/UserActions';
import { CaretD2, Label2 } from '../Courses/Form/Select/SelectStyles.styled';
import { Option, OptionContain, SelectContain, Selected } from '../Pay/Select/Select.styled';
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';
import { Button, Container, Download, HWContainer, Table, TitleContain } from './HomeWork.styled'
import HomeWorkModal from './HomeWorkModal/HomeWorkModal';


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
    if (professorFilter !== "" || courseFilter !== "") {
      setHomeWorks([]);
      getAllHomeWorks().then((res) => {
        res.forEach((element: any) => {
          let tempDate = new Date(element.createdAt.seconds * 1000);
          let tempDay = tempDate.getDate()
          let tempMonth = tempDate.getMonth() + 1;
          let tempYear = tempDate.getFullYear()
          element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
        });
        res.filter((element: any, index: any) => {
          if (professorFilter !== "" && courseFilter === "") {
            element.teacherCreds.map((val: any) => {
              if (val.id === professorFilter.id) {
                tempFilter.push(element);
              }
            })
          }
          if (professorFilter === "" && courseFilter !== "") {
            course.map((val: any) => {
              if (val.id === courseFilter.id) {
                console.log('hola')
              }
              // if (val.id === professorFilter.id) {
              //   tempFilter.push(element);
              // }
            })
          }
        })
        setHomeWorks(tempFilter);
      })
    }
    else {
      getAllHomeWorks().then((res: any) => {
        res.forEach((element: any) => {
          let tempDate = new Date(element.createdAt.seconds * 1000);
          let tempDay = tempDate.getDate()
          let tempMonth = tempDate.getMonth() + 1;
          let tempYear = tempDate.getFullYear()
          element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
        });
        getAllCourses(res);
        setHomeWorks(res);
      })
    }
  }
  const getAllCourses = (homeWork: any) => {
    let courses: any = []
    getCourses().then((res) => {
      res.map((val: any) =>
        homeWork.map((hw: any) => {
          if (val.id == hw.courseId) {
            courses.push(val)
          }
        })
      )
      setCourse(courses)
    })
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

  return (
    <AdminContain>
      <SideBar />
      <HWContainer>
        <Container>
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

                      >{task.title}  ({task.season + 1}, {task.lesson + 1}) </td>
                      <td

                      >{task.formatDate}</td>
                      <td style={{ padding: "0" }} onClick={(e: any) => { e.stopPropagation(); setShow(false) }}>
                        <Link href={task.path}>
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