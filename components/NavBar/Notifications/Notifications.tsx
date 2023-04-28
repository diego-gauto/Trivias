import { useRouter } from 'next/router';
import { type } from 'os';
import React from 'react'
import { INotifications } from './INotifications';
const Notifications = (props: INotifications) => {
  const router = useRouter();
  let today = new Date().getTime() / 1000;
  const { message, status, title, type, courseID, seasonID, lessonID, created_at, openNotifications } = props;
  const GonvarImg = "/images/purchase/logo.png";
  const spanColor = () => {
    if (message === "Tarea subida") {
      return '#6717cd'
    }
    if (type === "certificate") {
      return '#524af5'
    }
    if (message === "Tarea revisada") {
      return '#1bb87f'
    }
    if (message === "Nueva recompensa") {
      return '#dd5900'
    }
    if (message === "Recompensa reclamada") {
      return '#d22978'
    }
    if (message === "Recompensa aprobada") {
      return '#006ca8'
    }
    return '#3f1168'
  }
  const ClickNotification = () => {
    if (type === "homework") {
      router.push({
        pathname: 'Lesson',
        query: { id: courseID, season: seasonID, lesson: lessonID },
      });
    }
    if (type === "reward") {
      router.push("/Rewards")
    }
    openNotifications();
  }
  const TransformDate = () => {
    let notification_date = new Date(created_at);
    let transformToSeconds = notification_date.getTime() / 1000;
    let secondsAfterCreate = today - transformToSeconds;
    let timeData = '1 min'
    if (secondsAfterCreate < 3600) {
      timeData = Math.round(secondsAfterCreate / 60) + ' min'
    }
    if (secondsAfterCreate > 3600 && secondsAfterCreate < 86400) {
      timeData = Math.round(secondsAfterCreate / 3600) + ' h'
    }
    if (secondsAfterCreate > 86400) {
      timeData = new Date(transformToSeconds * 1000).toLocaleDateString("es-MX")
    }
    return timeData
  }
  return (
    <>
      <div className="notification-data" style={{ backgroundColor: (status ? "white" : "#ECE8F0") }} onClick={ClickNotification}>
        <img className='notification-image' src={GonvarImg} />
        <div className="notification-texts">
          <p className='notification-info'>
            <span style={{ color: spanColor() }}> {message}</span>
            {
              (type === 'certificate' || type === "homework") ?
                " en el curso: "
                : " - "
            }
            <span>{title}</span>
          </p>
          <p className='date-text'>
            {TransformDate()}
          </p>
        </div>

      </div>
      <hr className='hr-line' />
    </>
  )
}
export default Notifications;