import React, { useEffect, useState } from 'react'
import { CancelReview } from './Cancel.styled';
import { ICancelReview } from '../../../interfaces/IAdmin';
import { getCancelReviewApi } from '../../api/admin';
import { AdminLoader, Table } from '../SideBar.styled';

const Cancel = () => {
  const [reviews, setReviews] = useState<ICancelReview[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    getCancelReviewApi().then((res) => {
      setReviews(res);
      setLoader(true);
    })
  }, [])
  if (!loader) {
    return (
      <AdminLoader style={{ position: "absolute" }}>
        <div className="loader-image">
          <div className="loader-contain" />
        </div>
      </AdminLoader>
    )
  }
  return (
    <CancelReview>
      <div className='title-contain'>
        <h2>Cancelación de usuarios</h2>
      </div>
      <div className='user-answers'>
        <Table className='table-contain'>
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Por que quieres cancelar tu suscripción
              </th>
              <th>
                Describe con sinceridad el por qué  quieres cancelar tu suscripción
              </th>
              <th>
                ¿Qué te gustaría ve mejorado en la plataforma?
              </th>
              <th>
                ¿Qué tan probable es que regreses en el futuro?
              </th>
              <th>
                Del 1 al 10 como ha sido la experiencia con tu suscripción
              </th>
            </tr>
          </thead>
          <tbody>
            {
              reviews.map((review: ICancelReview, index: number) => {
                return (
                  <tr key={"cancel-review-" + index}>
                    <td className='name-td'>{review.name}
                      <div className='tp'>
                        <p>Email: {review.email}</p>
                        <p>Telefono: {review.phone_number}</p>
                      </div>
                    </td>
                    <td>{review.first_question}</td>
                    <td>{review.second_question}</td>
                    <td>{review.third_question}</td>
                    <td>{review.fourth_question}</td>
                    <td>{review.fifth_question}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    </CancelReview>
  )
}
export default Cancel;