import { useRouter } from 'next/router';
import { type } from 'os';
import React from 'react'
import { INotifications } from './INotifications';
const Notifications = (props: INotifications) => {
  const router = useRouter();
  let { message, status, title, type, courseID, seasonID, lessonID } = props;
  const GonvarImg = "/images/purchase/logo.png";
  const spanColor = () => {
    if (message = "Tarea subida") {
      return '#6717cd'
    }
    return '#3f1168'
  }
  const goTo = () => {
    if (type === "homework") {
      router.push({
        pathname: 'Lesson',
        query: { id: courseID, season: seasonID, lesson: lessonID },
      });
    }
  }
  return (
    <>
      <div className="notification-data" style={{ backgroundColor: (status ? "white" : "#ECE8F0") }} onClick={goTo}>
        <img className='notification-image' src={GonvarImg} />
        <p className='notification-info'>
          <span style={{ color: spanColor() }}> {message}</span> en el curso:   <span>{title}</span>
        </p>
      </div>
      <hr className='hr-line' />
    </>
  )
}
export default Notifications;