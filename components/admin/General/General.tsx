

import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import {
  Announcement,
  BodyContain,
  BoxContain,
  BoxSubTitle,
  BoxTitle,
  Container,
  CourseButton,
  CourseContain,
  CourseLink,
  CourseTitle,
  FirstData,
  GeneralContain,
  GonvarTitle,
  Icon,
  InfoContain,
  RecentCourses,
  ShareButton,
  SubText,
  Title,
  TitleBox,
  TitleContain,
} from "./General.styled";

const General = () => {
  return (
    <AdminContain>
      <SideBar />
      <GeneralContain>
        <TitleBox>
          <Title>Welcome back, Mofupiyo!</Title>
          <CourseButton>New Course</CourseButton>
        </TitleBox>
        <Container>
          <TitleContain>
            <GonvarTitle>Gonvar Nails Academy</GonvarTitle>
            <ShareButton>SHARE YOUR SITE</ShareButton>
          </TitleContain>
          <BodyContain>
            <BoxContain>
              <BoxTitle>$1,000,532</BoxTitle>
              <BoxSubTitle>Revenue</BoxSubTitle>
            </BoxContain>
            <BoxContain>
              <BoxTitle>14,123</BoxTitle>
              <BoxSubTitle>New Accounts</BoxSubTitle>
            </BoxContain>
            <BoxContain>
              <BoxTitle>60,520</BoxTitle>
              <BoxSubTitle>Enrollments</BoxSubTitle>
            </BoxContain>
          </BodyContain>
        </Container>
        <SubText>Recently Edited Products</SubText>
        <RecentCourses>
          <CourseContain>
            <Icon />
            <InfoContain>
              <FirstData>
                <CourseTitle>Diseño y Decoración: 3D</CourseTitle>
                <Announcement>Published</Announcement>
              </FirstData>
              <CourseLink>Course</CourseLink>
            </InfoContain>
          </CourseContain>
        </RecentCourses>
      </GeneralContain>
    </AdminContain>
  )
}
export default General;