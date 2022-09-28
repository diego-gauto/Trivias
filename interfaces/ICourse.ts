export interface ICourse {
  // course id
  id: string;
  // same as the id
  documentID: string;
  uid: string;
  // the course about
  courseAbout: string;
  courseCategory: string;
  courseDuration: number;
  coursePath: string;
  coursePrice: number;
  courseProfessor: any;
  coursePublishYear: number;
  courseSubtittle: string;
  courseTittle: string;
  courseType: string;
  createdAt:any; 
  lessons: any;
  reference: string;
  seasons: any;
  totalLessons: number;
}