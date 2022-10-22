import { useEffect, useState } from "react";
import { CourseModule } from "../../../components/Home/CourseModule/CourseModule";
import { ICourse } from "../../../interfaces/ICourse";
import { getWholeCourse } from "../../../store/actions/courseActions";
import { ICourseModuleContainerProps } from "./ICourseModuleContainerProps";

export const CourseModuleContainer = (props: ICourseModuleContainerProps) => {
  const { courseId, num } = props;
  const [courseData, setCourseData] = useState<ICourse>();

  useEffect(() => {
    const getCourseData = async () => {
      const courseData = await getWholeCourse(courseId);
      setCourseData(courseData);
    }
    getCourseData();
  }, []);

  return courseData ? (
    <CourseModule data={courseData} num={num} />
  ) : <></>;
}
