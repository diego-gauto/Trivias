import React from 'react'
import CourseMain from '../../../components/admin/Courses/CourseMain';
import Courses from '../../../components/admin/CoursesNew/Courses';
import { MainContain } from '../../../screens/Styles.styled';
const CoursesView = () => {

  return (
    <MainContain>
      <Courses />
      {/* <CourseMain /> */}
    </MainContain>
  )
}
export default CoursesView;