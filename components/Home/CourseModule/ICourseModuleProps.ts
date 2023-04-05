import { ICourse } from "../../../interfaces/ICourse";
export interface ICourseModuleProps {
  data: ICourse;
  num: number;
  loggedIn: boolean;
  user: {
    final_date: number;
  };
}
