import React from 'react'
import Preview from '../../components/Catalogue/Preview';
import Courses from '../../components/Courses/Courses';
import { MainContain } from '../../screens/Styles.styled';

const PreviewScreen = () => {
  return (
    <MainContain>
      {/* <Preview></Preview> */}
      <Courses />
    </MainContain>
  )
}
export default PreviewScreen;