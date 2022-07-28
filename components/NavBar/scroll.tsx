import React, { useEffect } from 'react'

const Scroll = ({ color, setColor, pathname }: any) => {

  const ChangeNav = () => {
    if (['/', ''].includes(pathname) && window.scrollY >= 800) {
      setColor(true)
    }
    else {
      setColor(false)
    }
  }

  useEffect(
    () => {
      window.addEventListener('scroll', ChangeNav);
    },
    [],
  );

  return (
    <></>
  )
}
export default Scroll;