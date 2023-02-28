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
