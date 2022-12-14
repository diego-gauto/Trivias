import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getTeacher, getUsers } from '../../../store/actions/courseActions';
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
  const [openSelect, setOpenSelect] = useState(false)
  const [professorFilter, setProfessorFilter] = useState<any>("");
  console.log(professorFilter)
  const getHomeworks = () => {
    if (professorFilter != "") {

      getAllHomeWorks().then((res) => {
        res.forEach((element: any) => {
          let tempDate = new Date(element.createdAt.seconds * 1000);
          let tempDay = tempDate.getDate()
          let tempMonth = tempDate.getMonth() + 1;
          let tempYear = tempDate.getFullYear()
          element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
        });
        console.log(res)
        res = res.filter((element: any, index: any) => {
          return element.teacherCreds[0].id === professorFilter.id
        })
        console.log(res)
        setHomeWorks(res);
      })
    }
    else {
      getAllHomeWorks().then((res) => {
        res.forEach((element: any) => {
          let tempDate = new Date(element.createdAt.seconds * 1000);
          let tempDay = tempDate.getDate()
          let tempMonth = tempDate.getMonth() + 1;
          let tempYear = tempDate.getFullYear()
          element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
        });
        setHomeWorks(res);
      })
    }
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
  }, [professorFilter])

  return (
    <AdminContain>
      <SideBar />
      <HWContainer>
        <Container>
          <TitleContain>
            <p>
              Tareas
            </p>
            <SelectContain key={1}>
              <Selected onClick={(e) => { setOpenSelect(!openSelect) }} style={professor.length === 0 ? { height: 43 } : { height: "fit-content" }}>
                {
                  professorFilter ? professorFilter.name : "Seleccione un professor"
                }
                <CaretD2 style={{ top: "18%" }} />
              </Selected>
              {
                openSelect == true &&
                <OptionContain>
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