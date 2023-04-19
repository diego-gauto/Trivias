export interface IBlog {
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  created_at: string;
  path: string;
  subTopic: [ISubTopic];
  title: string;
  subTitle: string;
  image: string;
  link: string;
  summary: string;
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
