import React, { useEffect, useState } from 'react'
import { Progress, Space } from 'antd';
import { LOCK_ICON } from '../../../../../utils/Constants';
const CourseProgress = ({ title, season, lesson, course, userId, refresh, data, selected }: any) => {
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
    if (data || course) {
      checkLecture()
    }
  }, [data, course])

  return (
    <Space wrap>
      {
        selected ? <Progress width={60} strokeWidth={10} trailColor="#3F1168" strokeColor="#FF9B00" type="circle" percent={Math.ceil((totalViewed * 100) / course?.seasons[season]?.lessons.length)} />
          :
          (totalViewed === 0 && <img src={LOCK_ICON} style={{ width: 24 }} />)

      }

    </Space>
  )
}
export default CourseProgress;