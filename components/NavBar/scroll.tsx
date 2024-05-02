import React, { useEffect } from 'react';

const Scroll = ({ color, setColor, pathname }: any) => {
  const ChangeNav = () => {
    if (['/', ''].includes(pathname) && window.scrollY >= 700) {
      setColor((color = 1));
    } else {
      setColor((color = 0));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', ChangeNav);
  }, []);

  return <></>;
};
export default Scroll;
