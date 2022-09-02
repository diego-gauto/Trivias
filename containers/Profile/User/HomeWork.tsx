import React, { useEffect, useState } from 'react'
import { getHomeworks } from '../../../store/actions/UserActions'
import { HWContainer, Table, TitleContain } from './HomeWork.styled'

const HomeWork = ({ userId }: any) => {
  const [homeWorks, setHomeWorks] = useState<any>([]);

  const getAllHomeworks = () => {
    getHomeworks(userId).then((res) => {
      res.forEach((element: any) => {
        let tempDate = new Date(element.createdAt.seconds * 1000);
        let tempDay = tempDate.getDate()
        let tempMonth = tempDate.getMonth()
        let tempYear = tempDate.getFullYear()
        element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
      });
      setHomeWorks(res);
    })
  }
  useEffect(() => {
    getAllHomeworks();
    console.log(homeWorks)
  }, [])

  return (
    <HWContainer>
      <TitleContain>
        <p>
          Tareas
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
          </tr>
          {/* TABLAS */}
          {
            homeWorks.map((task: any, index: any) => {
              return (
                <tr key={"HomeWorks " + index}>
                  <td>{task.userName}</td>
                  <td>{task.userEmail}</td>
                  <td>{task.title}  ({task.season}, {task.lesson}) </td>
                  <td>{task.formatDate}</td>
                  <td></td>
                </tr>
              )

            })
          }

        </tbody>
      </Table>
    </HWContainer>
  )
}
export default HomeWork