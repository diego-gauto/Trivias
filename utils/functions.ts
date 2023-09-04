import router, { useRouter } from "next/router";
import {
  BENEFIT_ICON,
  CERTIFICATE_ICON,
  COURSE_CREATED_ICON,
  HWK_APPROVED_ICON,
  HWK_FAILED_ICON,
  PAYMENT_FAILED_ICON,
  PAYMENT_REMINDER_ANUALY,
  PAYMENT_REMINDER_MONTHLY,
  PAYMETN_SUCCESS_ICON,
  PENDING_ICON,
  REWARD_ICON,
} from "./Constants";
import { userById } from "../components/api/users";

const getMonth = (month: number) => {
  if (month === 1) {
    return "enero";
  } else if (month === 2) {
    return "febrero";
  } else if (month === 3) {
    return "marzo";
  } else if (month === 4) {
    return "abril";
  } else if (month === 5) {
    return "mayo";
  } else if (month === 6) {
    return "junio";
  } else if (month === 7) {
    return "julio";
  } else if (month === 8) {
    return "agosto";
  } else if (month === 9) {
    return "septiembre";
  } else if (month === 10) {
    return "octubre";
  } else if (month === 11) {
    return "noviembre";
  } else if (month === 12) {
    return "diciembre";
  } else {
    return "";
  }
};
export function CanonicalURL() {
  const router: any = useRouter();
  const siteUrl: any = "https://www.gonvar.io";
  const cleanPath: any = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${siteUrl}` + (router.asPath === "/" ? "" : cleanPath);
  return canonicalUrl;
}
export function formatBlogDate(created_at: Date) {
  let date = new Date(created_at);
  let tempDay = date.getDate();
  let tempMonth = date.getMonth() + 1;
  let textMonth: string = getMonth(tempMonth);
  let tempYear = date.getFullYear();
  return {
    day: tempDay,
    month: textMonth,
    year: tempYear,
  };
}
export function formatBlogDateCase2(created_at: Date) {
  let date = new Date(created_at);
  let tempDay = date.getDate();
  let tempMonth = date.getMonth() + 1;
  let textMonth: string = getMonth(tempMonth);
  let tempYear = date.getFullYear();
  return `${textMonth} ${tempDay}, ${tempYear}`;
}

export function FormatDateForBack(date: Date) {
  if (date) {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate + " 00:00:00";
  } else {
    return "14-05-2023 00:00:00";
  }
}
export function FormatCourses(course: any) {
  let tempCourse = course.filter((c: any) => c.type === "Producto");
  return tempCourse;
}

export const returnNotificationImage = (notification: any) => {
  if (notification.type === "1") {
    return HWK_APPROVED_ICON;
  } else if (notification.type === "2") {
    return HWK_FAILED_ICON;
  } else if (notification.type === "3") {
    return;
  } else if (notification.type === "4") {
    return "abril";
  } else if (notification.type === "5") {
    return PAYMENT_REMINDER_MONTHLY;
  } else if (notification.type === "6") {
    return PAYMENT_REMINDER_ANUALY;
  } else if (notification.type === "7") {
    return PENDING_ICON;
  } else if (notification.type === "8") {
    return PAYMENT_FAILED_ICON;
  } else if (notification.type === "9") {
    return PAYMETN_SUCCESS_ICON;
  } else if (notification.type === "10") {
    return COURSE_CREATED_ICON;
  } else if (notification.type === "11") {
    return CERTIFICATE_ICON;
  } else if (notification.type === "12") {
    return BENEFIT_ICON;
  } else if (notification.type === "13") {
    return REWARD_ICON;
  } else {
    return "";
  }
};

export const returnNotificationTitles = (notification: any, name: any) => {
  if (notification.type === "1") {
    return `!Hola ${name}!`;
  } else if (notification.type === "2") {
    return `!Hola ${name}!`;
  } else if (notification.type === "3") {
    return `!Hola ${name}!`;
  } else if (notification.type === "4") {
    return `!Hola ${name}!`;
  } else if (notification.type === "5") {
    return "Tu suscripción mensual está por renovarse.";
  } else if (notification.type === "6") {
    return "Tu suscripción anual está por renovarse.";
  } else if (notification.type === "7") {
    return "Tienes un curso pendiente";
  } else if (notification.type === "8") {
    return "Cargo no exitoso";
  } else if (notification.type === "9") {
    return "¡Tu cargo fue exitoso!";
  } else if (notification.type === "10") {
    return "Tenemos un nuevo curso para ti";
  } else if (notification.type === "11") {
    return "¡Felicidades! Conseguiste un nuevo certificado";
  } else if (notification.type === "12") {
    return "¡Felicidades! Has recibido un nuevo beneficio";
  } else if (notification.type === "13") {
    return `¡Nueva recompensa disponible!`;
  } else {
    return "";
  }
};

export const returnNotificationMessage = (notification: any, user: any) => {
  if (notification.type === "1") {
    return `Ya está calificada tu tarea de tu curso de ${notification.title}.`;
  } else if (notification.type === "2") {
    return `Ya está calificada tu tarea de tu curso de ${notification.title}.`;
  } else if (notification.type === "3") {
    return `${user} respondió a tu comentario.`;
  } else if (notification.type === "4") {
    return `${user} le dio like a tu comentario.`;
  } else if (notification.type === "5") {
    return `Tu suscripción a Gonvar+ está próxima a renovarse el ${new Date(
      notification.due_date * 1000
    ).toLocaleDateString()}.`;
  } else if (notification.type === "6") {
    return `Tu suscripción anual se renovará el ${new Date(
      notification.due_date * 1000
    ).toLocaleDateString()} de manera automática.`;
  } else if (notification.type === "7") {
    return `${user} no olvides terminar el curso de ${notification.title}, podrás solicitar tu certificado al terminar.`;
  } else if (notification.type === "8") {
    return `Tu pago por ${notification.amount} de ${notification.product_name} NO se pudo procesar.`;
  } else if (notification.type === "9") {
    return `Tu pago por ${notification.amount} de ${notification.product_name} se pudo procesar correctamente. Disfruta tu aprendizaje.`;
  } else if (notification.type === "10") {
    return `Acabamos de publicar un nuevo curso: ${notification.title}, ¡Comiénzalo ahora!`;
  } else if (notification.type === "11") {
    return `Ahora puedes solicitar tu certificado por haber terminado el curso de ${notification.title}`;
  } else if (notification.type === "12") {
    return "Revisa tu sección de recompensas para conocer más sobre los nuevos beneficios que obtuviste.";
  } else if (notification.type === "13") {
    return `Hasta ahora has acumulado ${notification.score} puntos. Ahora puedes solicitar una nueva recompensa.`;
  } else {
    return "";
  }
};

export function formatDateNotification(created_at: number) {
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const monthsOfYear = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const date = new Date(created_at);
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? "p.m." : "a.m.";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  const formattedDate = `${dayOfWeek} ${dayOfMonth} de ${month}, ${year}. ${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
  return formattedDate;
}
