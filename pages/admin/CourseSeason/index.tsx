import React from 'react';
import CourseMain from '../../../components/admin/Courses/CourseMain';
import Courses from '../../../components/admin/CoursesNew/Courses';
import Seasons from '../../../components/admin/CoursesNew/Seasons/Seasons';
import { MainContain } from '../../../screens/Styles.styled';
const CoursesView = () => {
  return (
    <MainContain>
      <Seasons />
    </MainContain>
  );
};
export default CoursesView;
