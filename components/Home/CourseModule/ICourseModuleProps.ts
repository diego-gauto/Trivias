import { ICourse } from '../../../interfaces/ICourse';
import { IUser } from '../../../interfaces/IUserData';
export interface ICourseModuleProps {
  data: ICourse;
  num: number;
  loggedIn: boolean;
  user: IUser;
}
