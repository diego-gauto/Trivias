import React, { useEffect, useState } from 'react'
import { Progress, Space } from 'antd';
const CourseProgress = ({ title, season, lesson, course, userId, refresh }: any) => {
  const [totalViewed, setTotalViewed] = useState(0)

  const checkLecture = () => {
    let tempViewd = 0;
    course?.seasons[season]?.lessons.forEach((element: any) => {
      if (element.users.includes(userId)) {
        tempViewd++;
      }
    });
    setTotalViewed(tempViewd);
  }
  useEffect(() => {
    if (course) {
      checkLecture()
    }
  }, [refresh])

  return (
    <Space wrap>
      <Progress width={60} strokeWidth={10} trailColor="#3F1168" strokeColor="#FF9B00" type="circle" percent={Math.ceil((totalViewed * 100) / course?.seasons[season]?.lessons.length)} />
    </Space>
  )
}
export default CourseProgress;