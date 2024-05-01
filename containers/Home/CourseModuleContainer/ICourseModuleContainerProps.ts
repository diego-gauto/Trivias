import { ICourse } from '../../../interfaces/ICourse';
import { IUser } from '../../../interfaces/IUserData';

export interface ICourseModuleContainerProps {
  courses: ICourse;
  num: number;
  loggedIn: boolean;
  user: IUser;
}
