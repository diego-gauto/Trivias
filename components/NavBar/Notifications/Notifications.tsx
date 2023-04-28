import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { MdOutlineComment } from 'react-icons/md';
import { updateNotificationStatusApi } from '../../api/notifications';
import { INotifications } from './INotifications';
import { NotificationData } from './Notifications.styled';
const Notifications = (props: INotifications) => {
  const router = useRouter();
  let today = new Date().getTime() / 1000;
  const { message, status, title, type, courseID, seasonID, lessonID, created_at, openNotifications, notification_id, unReadNotification, setUnReadNotification } = props;
  const [newStatus, setNewStatus] = useState<boolean>(!status ? false : true);
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
    if (message === "Alguien le dio like a tu comentario") {
      return 'red'
    }
    if (message === "Alguien te ha comentado") {
      return '#e68a0d'
    }
    if (message === "Su suscripción ha fallado" || message === "Su suscripción ha sido cancelada por falta de pago") {
      return '#ff0000'
    }
    if (message === "Pago de suscripción") {
      return '#4BB543'
    }
    return '#3f1168'
  }
  const ClickNotification = () => {
    if (type === "homework" || type === "like" || type === "comment") {
      router.push({
        pathname: 'Lesson',
        query: { id: courseID, season: seasonID, lesson: lessonID },
      });
    }
    if (type === "reward") {
      router.push("/Rewards")
    }
    if (!status) {
      let notificationUpdate = {
        status: 1,
        id: notification_id,
      }
      setNewStatus(true);
      updateNotificationStatusApi(notificationUpdate).then((res) => {
        console.log(res)
        setUnReadNotification(unReadNotification - 1);
        // openNotifications();
      })
    } else {
      // openNotifications();
    }
  }
  const TransformDate = () => {
    let notification_date = new Date(created_at);
    let transformToSeconds = notification_date.getTime() / 1000;
    let secondsAfterCreate = today - transformToSeconds;
    let timeData = 'hace 1 min'
    if (secondsAfterCreate <= 3600) {
      timeData = 'hace ' + Math.round(secondsAfterCreate / 60) + ' min'
    }
    if (secondsAfterCreate > 3600 && secondsAfterCreate <= 86400) {
      timeData = 'hace ' + Math.round(secondsAfterCreate / 3600) + ' h'
    }
    if (secondsAfterCreate > 86400 && secondsAfterCreate <= 2592000) {
      timeData = 'hace ' + (Math.round(secondsAfterCreate / 86400) === 1
        ? Math.round(secondsAfterCreate / 86400) + ' dia'
        : Math.round(secondsAfterCreate / 86400) + ' dias')
    }
    if (secondsAfterCreate > 2592000) {
      timeData = new Date(transformToSeconds * 1000).toLocaleDateString("es-MX")
    }
    return timeData
  }
  return (
    <NotificationData newStatus={newStatus} status={status} >
      <div className="notification-data" onClick={ClickNotification}>
        <img className='notification-image' src={GonvarImg} />
        <div className="notification-texts">
          <p className='notification-info'>
            {
              type === 'like' &&
              <FaHeart className='like-icon' />
            }
            {
              type === 'comment' &&
              <MdOutlineComment className='comment-icon' />
            }
            <span style={{ color: spanColor() }}> {message} </span>
            {
              (type === 'certificate' || type === "homework" || type === 'comment' || type === 'like') ?
                " en el curso: "
                : " - "
            }
            <span>{title && title}</span>
          </p>
          <p className='date-text'>
            {TransformDate()}
          </p>
        </div>

      </div>
      <hr className='hr-line' />
    </NotificationData>
  )
}
export default Notifications;