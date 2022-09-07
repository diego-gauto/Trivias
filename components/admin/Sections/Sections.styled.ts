import styled from "styled-components";

export const GeneralContain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-inline: 40px;
  padding-top: 20px;
  gap: 40px;
  background-color: #f3f3f5;
`;
export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: #41417e;
  margin: 0;
`;
export const CourseButton = styled.button`
  font-size: 18px;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: #41417e;
  background-color: white;
  border: 1px solid #41417e;
  padding-block: 10px;
  padding-inline: 20px;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #41417e;
`;
export const BackGround = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #f3f3f5;
`;
export const AdminRoleChange = styled.div`
display: flex;
font-size: 20px;
align-items: center;
flex-direction: column;
min-width: 342;
width: 300px;
height: 200px;
padding: 15px;
justify-content: center;
gap: 30px;
border-radius: 10px;
margin-top: 85px;
color: #41417e;
box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const TitleContain = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border: 1px solid #41417e;
`;
export const BodyContain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const GonvarTitle = styled.p`
  font-size: 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: #41417e;
  margin: 0;
`;
export const ShareButton = styled.button`
  font-size: 14px;
  border-radius: 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: #41417e;
  background-color: white;
  border: 1px solid #41417e;
  padding-block: 10px;
  padding-inline: 20px;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const BoxContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.33%;
  padding: 15px;
  border: 1px solid #41417e;

`;
export const BoxTitle = styled.p`
  font-size: 30px;
  font-family: 'Nunito', sans-serif;
  color: #41417e;
  margin: 0;  
`;
export const BoxSubTitle = styled.p`
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  color: #41417e;
  margin: 0;  
`;
export const SubText = styled.p`
  font-size: 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: #41417e;
  margin: 0;
`;
export const RecentCourses = styled.div`
  display: flex;
  width: 100%;
`;
export const CourseContain = styled.div`
  display: flex;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
  &:hover{
    cursor: pointer;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const InfoContain = styled.div`
  display: flex;
  min-width: 400px;
  flex-direction: column;
  gap: 5px;
  padding-inline: 10px;
  padding-block: 5px;
`;
export const FirstData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const CourseTitle = styled.p`
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  margin: 0;
`;
export const CourseLink = styled.p`
  font-size: 12px;
  font-family: 'Nunito', sans-serif;
  color: #41417e;
  font-weight: 600;
  cursor: pointer;
  margin: 0;
`;
export const Announcement = styled.div`
  font-size: 12px;
  background-color: #5d945a;
  border-radius: 5px;
  font-family: 'Nunito', sans-serif;
  color: white;
  padding: 2px;
`;
export const Icon = styled.i`
  background-image: url(../images/admin/Demo2.PNG);
  background-repeat:no-repeat;
  width: 53px;
  height: 53px;
  cursor:pointer;
  border-radius:10px 0 0 10px;
`;