import React, { useEffect, useState } from 'react'
import { CancelReview } from './Cancel.styled';
import { ICancelReview } from '../../../interfaces/IAdmin';
import { getCancelReviewApi } from '../../api/admin';
import { AdminLoader } from '../SideBar.styled';

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
        <div className='headers'>
          <p>Nombre</p>
          <p>Por que quieres cancelar tu suscripción</p>
          <p>Describe con sinceridad el por qué  quieres cancelar tu suscripción</p>
          <p>¿Qué te gustaría ve mejorado en la plataforma?</p>
          <p>¿Qué tan probable es que regreses en el futuro?</p>
          <p>Del 1 al 10 como ha sido la experiencia con tu suscripción</p>
        </div>
        {
          reviews.map((review: ICancelReview, index: number) => {
            return (
              <div className='review-container' key={"cancel-review-" + index}>
                <p>{review.name}</p>
                <p>{review.first_question}</p>
                <p>{review.second_question}</p>
                <p>{review.third_question}</p>
                <p>{review.fourth_question}</p>
                <p>{review.fifth_question}</p>
              </div>
            )
          })
        }
      </div>
    </CancelReview>
  )
}
export default Cancel;