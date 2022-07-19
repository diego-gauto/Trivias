import React from 'react'

const Scroll = ({ color, setColor, pathname }: any) => {

  const ChangeNav = () => {
    if (pathname == '/Screens/Landings' && window.scrollY >= 800) {
      setColor(true)
    }
    else {
      setColor(false)
    }
  }
  window.addEventListener('scroll', ChangeNav);
  return (
    <></>
  )
}
export default Scroll;