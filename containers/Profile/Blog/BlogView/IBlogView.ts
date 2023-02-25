export interface IBlog {
  createdAt: string;
  path: string;
  subTopic: ISubTopic;
  title: string;
  subTitle: string;
}
export interface ISubTopic {
  reference: string;
  topicTitle: string;
  topicPath: string;
  topicText: string;
}
