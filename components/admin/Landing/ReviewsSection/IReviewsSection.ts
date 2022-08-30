export interface IReviewsSectionProps {
  reviewsSectionData: Review[];
}

export interface Review {
  title: string;
  imgURL: string;
  id: string;
  file?: File;
}
