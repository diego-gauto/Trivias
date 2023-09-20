import { IUser } from "../../../interfaces/IUserData";

export interface ICourse {
  openModal: boolean;
  setOpenModal: any;
  course: [];
  user: IUser;
  loggedIn: boolean;
}
interface IProfessor {
  name: string;
}
