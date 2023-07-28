export interface IBlog {
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  created_at: Date;
  path: string;
  subTopic: [ISubTopic];
  title: string;
  subTitle: string;
  image: string;
  link: string;
  summary: string;
  route: string;
  date: {
    day: number;
    month: string;
    year: number;
  };
}
export interface ISubTopic {
  reference: string;
  topicTitle: string;
  topicPath: string;
  topicText: string;
}
