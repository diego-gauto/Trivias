export interface IBlog {
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  path: string;
  subTopic: [ISubTopic];
  title: string;
  subtitle: string;
  image: string;
  link: string;
  summary: string;
  created_at: string;
  route: string;
  date: {
    day: number;
    month: string;
    year: number;
  };
}
export interface ISubTopic {
  text: string;
  title: string;
  image: string;
}
