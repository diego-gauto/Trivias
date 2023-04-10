import React from 'react'
import CourseMain from '../../../components/admin/Courses/CourseMain';
import Courses from '../../../components/admin/CoursesNew/Courses';
import Lessons from '../../../components/admin/CoursesNew/Seasons/Lessons/Lessons';
import { MainContain } from '../../../screens/Styles.styled';
const CoursesView = () => {

  return (
    <MainContain>
      <Lessons />
    </MainContain>
  )
}
export default CoursesView;