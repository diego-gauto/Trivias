import { IUser } from "../../../interfaces/IUserData";

export interface ICourseModuleContainerProps {
  courses: any;
  num: number;
  loggedIn: boolean;
  user: IUser;
}
