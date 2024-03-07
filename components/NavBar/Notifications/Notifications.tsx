import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { MdOutlineComment } from 'react-icons/md';
import { updateNotificationStatusApi } from '../../api/notifications';
import { INotifications } from './INotifications';
import { NotificationData } from './Notifications.styled';
import { LESSON_PATH, REWARDS_PATH } from '../../../constants/paths';
import { formatDateNotification, returnNotificationImage, returnNotificationMessage, returnNotificationTitles } from '../../../utils/functions';
import { user } from 'firebase-functions/v1/auth';
import { userById } from '../../api/users';

interface NotificationByUser {
  notification_id: number
  user_id: number
  type: string
  status: number
  created_at: string
  source_table: string
  course_id?: number
  season?: number
  lesson?: number
  title?: string
  score?: number
  user_comment_id?: number
  user_like_id?: number
  amount?: number
  product_name?: string
  reward_id?: number
  due_date?: number
}

interface NotificationsProps {
  notification: NotificationByUser,
  user: any,
  openNotifications: () => void,
  unReadNotification: number,
  setUnReadNotification: React.Dispatch<React.SetStateAction<number>>,
}

const Notifications = (props: NotificationsProps) => {
  const router = useRouter();
  let today = new Date().getTime() / 1000;
  const { notification, openNotifications, unReadNotification, setUnReadNotification, user } = props;
  const [newStatus, setNewStatus] = useState<boolean>(notification?.status === 0 ? false : true);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const ClickNotification = () => {
    if (notification.type === "1" ||
      notification.type === "2" ||
      notification.type === "3" ||
      notification.type === "4" ||
      notification.type === "10" ||
      notification.type === "14") {
      router.push({
        pathname: LESSON_PATH,
        query: { id: notification.course_id, season: notification.season, lesson: notification.lesson },
      });
    }
    if (notification.type === "7") {
      router.push({
        pathname: LESSON_PATH,
        query: { id: notification.course_id, season: 0, lesson: 0 },
      });
    }
    if (notification.type === "13" || notification.type === "12") {
      router.push({
        pathname: REWARDS_PATH,
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
      })
    }
  }

  useEffect(() => {
    if (notification.type === "3" || notification.type === "4") {
      const { type, user_like_id, user_comment_id } = notification;
      if (user_like_id !== undefined && user_comment_id !== undefined) {
        userById(type === "4" ? user_like_id + '' : user_comment_id + '').then((res) => {
          setImage(res.data[0].photo);
          setName(res.data[0].name)
        })
      }

    }
  }, [])

  return (
    <NotificationData newStatus={newStatus} status={notification.status} >
      <div className="notification-data" onClick={ClickNotification}>
        {(notification.type !== "3" && notification.type !== "4") && <img className='notification-image' src={returnNotificationImage(notification)} />}
        {(notification.type === "3" || notification.type === "4") && <div style={{ position: "relative" }}>
          <img className='notification-image' src={image} />
          <div className='circle'>
            <img src={notification.type === "3" ? "/images/notifications/comment.png" : "/images/notifications/like.png"} alt="" />
          </div>
        </div>}
        <div className="notification-texts">
          <div className='notification-info'>
            <p className='title'>{returnNotificationTitles(notification, user.name)}</p>
            <p className='message'>{returnNotificationMessage(notification, !name ? user.name : name)}</p>
            {(notification.type === "1" || notification.type === "2") && <p className='score'>{notification.type === "1" ? `Aprobada` : `Rechazada`}
              {notification.type === "1" ? <span className='approved'> +{notification.score} puntos.</span> :
                <span className='failed'> +0 puntos.</span>}
            </p>}
          </div>
          <p className='date-text'>
            {formatDateNotification((new Date(notification.created_at)))}
          </p>
        </div>

      </div>
      {/* <hr className='hr-line' /> */}
    </NotificationData>
  )
}
export default Notifications;