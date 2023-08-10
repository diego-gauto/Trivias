import React, { useState } from "react";

import { message } from "antd";
import router, { useRouter } from "next/router";
import { type } from "os";

import { LESSON_PATH, REWARDS_PATH } from "../../../constants/paths";
import { updateNotificationStatusApi } from "../../api/notifications";
import { INotifications } from "./INotifications";
import { NotificationData } from "./Notifications.styled";

const tareaBien = 'images/Navbar/Notifications/tarea aprobada.png'
const tareaMal = 'images/Navbar/Notifications/tarea rechazada.png'
const comment = 'images/Navbar/Notifications/comentario_response.png'
const like = 'images/Navbar/Notifications/like_response.png'
const susMRenovar = 'images/Navbar/Notifications/recordatorio de pago.png'
const susARenovar = 'images/Navbar/Notifications/renovación anual.png'
const cursoPendiente = 'images/Navbar/Notifications/curso no terminado.png'
const cargoNo = 'images/Navbar/Notifications/cargo no exitoso.png'
const cargoExitoso = 'images/Navbar/Notifications/cargo exitoso.png'
const nuevoCurso = 'images/Navbar/Notifications/Curso nuevo.png'
const nuevoCertificado = 'images/Navbar/Notifications/Certificado.png'
const nuevoBeneficio = 'images/Navbar/Notifications/Tiempo.png'
const nuevaRecompensa = 'images/Navbar/Notifications/Puntaje.png'
const tareaPendiente = 'images/Navbar/Notifications/tarea pendiente'

const Notifications = (props: INotifications) => {
  const router = useRouter();
  let today = new Date().getTime() / 1000;
  const { message, status, title, type, courseID, seasonID, lessonID, created_at, openNotifications, notification_id, unReadNotification, setUnReadNotification } = props;
  const [newStatus, setNewStatus] = useState<boolean>(!status ? false : true);
  const GonvarImg = "/images/purchase/logo.png";

  const setData = (msg: any, course: any) => {
    switch (msg) {
      case 'Tarea revisada':
        return (
          <>
            <span>¡Hola (Nombre)!</span><br />
            Ya esta calificada tu tarea de (nombre de la clase), de tu curso de {course}
            {/* aprobada / rechazada */}
          </>
        )
      case 'Alguien le dio like a tu comentario':
        return (
          <>
            <span>¡Hola (nombre)!</span><br />
            <b>Usuario123</b> le dio like a tu comentario
          </>
        )
      case 'Alguien te ha comentado':
        return (
          <>
            <span>¡Hola (nombre)!</span><br />
            <b>Usuario123</b> respondió a tu comentario
          </>
        )
      case 'Suscripcion mensual por renovarse':
        return (
          <>
            <span>Tu suscripción mensual está por renovarse.</span><br />
            Tu suscripción a Gonvar+ está próxima a renovarse el [FECHA].
          </>
        )
      case 'Suscripcion anual por renovarse':
        return (
          <>
            <span>Tu suscripción anual está por renovarse.</span><br />
            Tu suscripción anual se renovará el [FECHA] de manera automática.
          </>
        )
      case 'Curso pendiente':
        return (
          <>
            <span>Tienes un curso pendiente</span><br />
            (Nombre del usuario) no olvides terminar el curso de (nombre del curso),
            podrás solicitar tu certificado al terminar.
          </>
        )
      case 'Cargo no exitoso':
        return (
          <>
            <span>Cargo no exitoso</span><br />
            Tu pago por [monto] de [nombre del producto] NO se pudo procesar.
          </>
        )
      case 'Cargo exitoso':
        return (
          <>
            <span>¡Tu cargo fue exitoso!</span><br />
            Tu pago por [monto] de [nombre del producto] se pudo procesar correctamente. Disfruta
            tu aprendizaje.
          </>
        )
      case 'Nuevo curso':
        return (
          <>
            <span>Tenemos un nuevo curso para ti</span><br />
            Acabamos de publicar un nuevo curso: {course}, ¡Comiénzalo ahora!
          </>
        )
      case 'Nuevo certificado':
        return (
          <>
            <span>¡Felicidades! Conseguiste un nuevo certificado</span><br />
            Ahora puedes solicitar tu certificado por haber terminado el curso de {course}
          </>
        )
      case 'Nuevo beneficio':
        return (
          <>
            <span>¡Felicidades! Has recibido un nuevo beneficio</span><br />
            Revisa tu sección de recompensas para conocer más sobre los nuevos beneficios que obtuviste.
          </>
        )
      case 'Nueva recompensa':
        return (
          <>
            <span>¡Nueva recompensa disponible!</span><br />
            Hasta ahora has acumulado(X) puntos.Ahora puedes solicitar una nueva recompensa.
          </>
        )
      case 'Tarea pendiente':
        return (
          <>
            <span>Tienes una tarea pendiente</span><br />
            Tienes [NÚMERO DE TAREAS] pendientes de tu {course}.
          </>
        )
      case 'Tarea subida':
        return (
          <>
            <span>¡Hola (Nombre)!</span><br />
            Tu tarea de (nombre de la clase), de tu curso de {course} fue subida
          </>
        )
      default:
        return (
          <>
            <span>Tienes una nueva notificación</span>
          </>
        )
    }
  }

  const setImg = (msg: any) => {
    switch (msg) {
      case 'Tarea revisada':
        return tareaBien
      case 'Alguien le dio like a tu comentario':
        return like
      case 'Alguien te ha comentado':
        return like
      case 'Suscripcion mensual por renovarse':
        return susMRenovar
      case 'Suscripcion anual por renovarse':
        return susARenovar
      case 'Curso pendiente':
        return cursoPendiente
      case 'Cargo no exitoso':
        return cargoNo
      case 'Cargo exitoso':
        return cargoExitoso
      case 'Nuevo curso':
        return nuevoCurso
      case 'Nuevo certificado':
        return nuevoCertificado
      case 'Nuevo beneficio':
        return nuevoBeneficio
      case 'Nueva recompensa':
        return nuevaRecompensa
      case 'Tarea pendiente':
        return tareaPendiente
      case 'Tarea subida':
        return tareaMal
      default:
        return GonvarImg
    }
  }
  const spanColor = () => {
    if (message === "Tarea subida") {
      return '#6717cd'
    }
    if (message === "Recompensa reclamada") {
      return '#d22978'
    }
    if (message === "Recompensa aprobada") {
      return '#006ca8'
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
        pathname: LESSON_PATH,
        query: { id: courseID, season: seasonID, lesson: lessonID },
      });
    }
    if (type === "reward") {
      router.push(REWARDS_PATH)
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
        {(type === 'comment' || type === 'like') ?
          <div className="like-and-comment">
            <img className='notification-image' src={GonvarImg} />
            <img className='corner' src={setImg(message)} />
          </div>
          : <img className='notification-image' src={setImg(message)} />}
        <div className="notification-texts">
          <p className='notification-info'>
            {setData(message, title)}
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