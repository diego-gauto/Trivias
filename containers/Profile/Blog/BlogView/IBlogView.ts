export interface IBlog {
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  path: string;
  subTopic: [ISubTopic];
  title: string;
  subTitle: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
}
export interface ISubTopic {
  reference: string;
  topicTitle: string;
  topicPath: string;
  topicText: string;
}
