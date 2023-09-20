import { ICourse } from "../../interfaces/ICourse";
import { IUser } from "../../interfaces/IUserData";
import { IMaterialData } from "./Materials/IModalMaterials";

export interface ICourseModal {
  show: boolean;
  setShow: any;
  course: ICourse;
  user: IUser;
}
export interface ISeasons {
  lessons: [ILessons];
}
export interface ILessons {}

export interface IProfessors {
  image: string;
  name: string;
  about: string;
}
