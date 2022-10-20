import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getHomeworks } from '../../../store/actions/UserActions'
import { Button, Download, HWContainer, Table, TitleContain } from './HomeWork.styled'
import ModalHW from './HomeWorkModal/ModalHW';

const HomeWork = ({ userId, user }: any) => {
  const [show, setShow] = useState(false);
  const [homeWorks, setHomeWorks] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [id, setId] = useState("");

  const getAllHomeworks = () => {
    getHomeworks(userId, user.role).then((res) => {
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

  const handleClick = (value: any) => {
    let index;
    index = homeWorks.findIndex((x: any) => x.id == id);
    homeWorks[index].status = true;
    setHomeWorks([...homeWorks])
  }

  useEffect(() => {
    getAllHomeworks();
  }, [])

  return (
    <HWContainer>
      <TitleContain>
        <p>
          {user.role == "admin" ? "Tareas de Profesores" : "Tareas"}
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
                >
                  <td
                    onClick={() => { setShow(true); setData(task) }}
                  >{task.userName}</td>
                  <td
                    onClick={() => { setShow(true); setData(task) }}
                  >{task.userEmail}</td>
                  <td
                    onClick={() => { setShow(true); setData(task) }}
                  >{task.title}  ({task.season + 1}, {task.lesson + 1}) </td>
                  <td
                    onClick={() => { setShow(true); setData(task) }}
                  >{task.formatDate}</td>
                  <td style={{ padding: "0" }}>
                    <Link href={task.path}>
                      <a target="_blank" style={{ textDecoration: "none" }}>
                        <Download>
                          Descargar Tarea
                        </Download>
                      </a>
                    </Link>
                  </td>
                  <td style={{ padding: "0" }}
                    onClick={() => { setShow(true); setData(task); setId(task.id) }}
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
      <ModalHW setShow={setShow} show={show} data={data} user={user} handleClick={handleClick} />
    </HWContainer>
  )
}
export default HomeWork