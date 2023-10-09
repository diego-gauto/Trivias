import { useEffect, useState } from "react";
import { CourseModule } from "../../../components/Home/CourseModule/CourseModule";
import { ICourse } from "../../../interfaces/ICourse";
import { getWholeCourse } from "../../../store/actions/courseActions";
import { ICourseModuleContainerProps } from "./ICourseModuleContainerProps";

export const CourseModuleContainer = (props: ICourseModuleContainerProps) => {
  const { courses, num, loggedIn, user } = props;
  return courses ? (
    <CourseModule data={courses} num={num} user={user} loggedIn={loggedIn} />
  ) : <></>;
}
