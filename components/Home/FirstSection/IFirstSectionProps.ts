import { HeroData } from "../../admin/Landing/HeroSection/IHeroSection";

export interface IFirstSectionProps {
  // Dynamic data from Firebase
  data: HeroData;
  // Image to display in second column
  img: string;
}