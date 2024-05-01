export interface ISlideModule {
  isNew: boolean;
  title: string;
  subtitle: string;
  imgURL: Promise<string>;
}
