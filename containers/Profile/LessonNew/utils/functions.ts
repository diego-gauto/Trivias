import { IUser } from "../../../../interfaces/IUserData";
import router from "next/router";

export const lessonGuard = (user: IUser) => {
  if (user !== null) {
    user.level = 1;
    if (user.level === 1 || 4 || 5 || 6) {
      return true;
    }
  } else {
    router.push({ pathname: "/preview" });
  }
  return;
};

export const returnLevel = (level: string) => {
  if (level === "Muy Fácil") {
    return "../images/iconoAzul.png";
  }
  if (level === "Fácil") {
    return "../images/iconoLila.png";
  }
  if (level === "Intermedio") {
    return "../images/iconoNaranja.png";
  }
  if (level === "Avanzado") {
    return "../images/iconoVerde.png";
  }
  if (level === "Máster") {
    return "../images/iconoRosa.png";
  }
  return;
};
