import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getAllHomeWorks } from '../../../store/actions/UserActions';
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';
import { Button, Container, Download, HWContainer, Table, TitleContain } from './HomeWork.styled'
import HomeWorkModal from './HomeWorkModal/HomeWorkModal';


const HomeWork = () => {
  const [show, setShow] = useState(false);
  const [homeWorks, setHomeWorks] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [id, setId] = useState("");

  const getHomeworks = () => {
    getAllHomeWorks().then((res) => {
      res.forEach((element: any) => {
        let tempDate = new Date(element.createdAt.seconds * 1000);
        let tempDay = tempDate.getDate()
        let tempMonth = tempDate.getMonth() + 1;
        let tempYear = tempDate.getFullYear()
        element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
      });
      setHomeWorks(res);
      console.log(homeWorks)
    })
  }

  const handleClick = () => {
    let index;
    index = homeWorks.findIndex((x: any) => x.id == id);
    homeWorks[index].status = true;
    setHomeWorks([...homeWorks])
  }

  useEffect(() => {
    getHomeworks();
  }, [])
  return (
    <AdminContain>
      <SideBar />
      <HWContainer>
        <Container>
          <TitleContain>
            <p>
              Tareas de Profesores
            </p>
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