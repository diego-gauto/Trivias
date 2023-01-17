export interface IReviewsSectionProps {
  reviewsSectionData: Review[];
}

export interface Review {
  title: string;
  imgURL: string;
  tempImg: string;
  file?: any;
  id: string;
  userFile?: any;
  usrImgURL: string;
  tempUserImg: string;
}
