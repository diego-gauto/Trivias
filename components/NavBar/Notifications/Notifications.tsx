import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { MdOutlineComment } from 'react-icons/md';
import { updateNotificationStatusApi } from '../../api/notifications';
import { INotifications } from './INotifications';
import { NotificationData } from './Notifications.styled';
import { LESSON_PATH, REWARDS_PATH } from '../../../constants/paths';
import { formatDateNotification, returnNotificationImage, returnNotificationMessage, returnNotificationTitles } from '../../../utils/functions';
import { user } from 'firebase-functions/v1/auth';
const Notifications = (props: any) => {
  const router = useRouter();
  let today = new Date().getTime() / 1000;
  const { notification, openNotifications, unReadNotification, setUnReadNotification, user } = props;
  const [newStatus, setNewStatus] = useState<boolean>(notification.status === 0 ? false : true);

  const ClickNotification = () => {
    if (notification.type === "1" || notification.type === "2" || notification.type === "comment") {
      router.push({
        pathname: LESSON_PATH,
        query: { id: notification.course_id, season: notification.season, lesson: notification.lesson },
      });
    }
    if (notification.status === 0) {
      let notificationUpdate = {
        status: 1,
        id: notification.notification_id,
      }
      setNewStatus(true);
      updateNotificationStatusApi(notificationUpdate).then((res) => {
        setUnReadNotification(unReadNotification - 1);
        // openNotifications();
      })
    } else {
      // openNotifications();
    }
  }

  return (
    <NotificationData newStatus={newStatus} status={notification} >
      <div className="notification-data" onClick={ClickNotification}>
        <img className='notification-image' src={returnNotificationImage(notification)} />
        <div className="notification-texts">
          <p className='notification-info'>
            {/* {
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
            } */}
            <p className='title'>{returnNotificationTitles(notification, user.name)}</p>
            <p className='message'>{returnNotificationMessage(notification, "")}</p>
            {(notification.type === "1" || "2") && <p className='score'>{notification.type === "1" ? `Aprobada` : `Rechazada`}
              {notification.type === "1" ? <span className='approved'> +{notification.score} puntos.</span> :
                <span className='failed'> +0 puntos.</span>}
            </p>}
          </p>
          <p className='date-text'>
            {formatDateNotification(notification.created_at)}
          </p>
        </div>

      </div>
      {/* <hr className='hr-line' /> */}
    </NotificationData>
  )
}
export default Notifications;