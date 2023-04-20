import React, { useEffect, useState } from 'react'

const countCourse = (props: any) => {
  const [loader, setLoader] = useState<boolean>(false)
  const { userId } = props;
  console.log(userId)
  useEffect(() => {
    console.log(userId)
    setLoader(true)
  }, [])
  return "Activo"
}
export default countCourse;