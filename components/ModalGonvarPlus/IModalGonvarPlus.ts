export interface ICourse {
  openModal: boolean;
  setOpenModal: any;
  course: [];
  user: {
    final_date: number;
    level: number;
    method: string;
  };
  loggedIn: boolean;
}
interface IProfessor {
  name: string;
}
