import React from 'react'
import { INotifications } from './INotifications';
import { NotificationContainer } from './Notifications.styled';
const Notifications = (props: INotifications) => {
  const { message } = props;
  return (
    <div className="notifications">

    </div>
  )
}
export default Notifications;