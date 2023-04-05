import { useEffect, useState } from "react";
import { CourseModule } from "../../../components/Home/CourseModule/CourseModule";
import { ICourse } from "../../../interfaces/ICourse";
import { getWholeCourse } from "../../../store/actions/courseActions";
import { ICourseModuleContainerProps } from "./ICourseModuleContainerProps";

export const CourseModuleContainer = (props: ICourseModuleContainerProps) => {
  const { courses, num, loggedIn, user } = props;
  // useEffect(() => {
  //   const getCourseData = async () => {
  //     const courseData = await getWholeCourse(courseId);
  //     courseData.totalDuration = hms(courseData.totalDuration)
  //     setCourseData(courseData);
  //   }
  //   getCourseData();
  // }, []);

  // const hms = (totalSeconds: any) => {
  //   if (typeof totalSeconds == 'string') return totalSeconds
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   let result = `${minutes
  //     .toString()
  //     .padStart(1, '0')} min`;
  //   if (!!hours) {
  //     result = `${hours.toString()} hr ${minutes} min`;
  //   }
  //   return result;
  // }

  return courses ? (
    <CourseModule data={courses} num={num} user={user} loggedIn={loggedIn} />
  ) : <></>;
}
