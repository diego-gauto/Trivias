export interface ISlideModule_1
{ 
  
  isNew: boolean;
  username: string;
  descripcion: string; 
  usrFacebookURL: string;
  datePublication: Date;
   imgURL : Promise<string>
   usrImgURL : Promise<string>
}