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
