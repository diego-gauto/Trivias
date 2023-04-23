export interface IReviewsSectionProps {
  reviewsSectionData: Review[];
}

export interface Review {
  title: string;
  imgURL: string;
  tempImg: string;
  file?: any;
  id: any;
  userFile?: any;
  usrImgURL: string;
  tempUserImg: string;
  user_image: any;
  image: any;
  about: string;
  descripcion: string;
  user_name: string;
  facebook_url: string;
  new: string;
  date: string;
  user_image_new: any;
  image_new: any;
}
