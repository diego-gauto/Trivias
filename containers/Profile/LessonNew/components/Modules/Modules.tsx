import React, { useEffect, useState } from 'react';

import router from 'next/router';
import { MainContainer, TitleContain } from './Modules.styled';
import About from './About/About';
import ModuleTabs from './Tabs/Tabs';
import HomeWork from './Homework/Homework';
import Comments from './Comment/Comments';
import Help from './Help/Help';

interface IModules {
  lesson: any;
  course: any;
  position: number;
  setPosition: (position: number) => void;
}
const Modules = (props: IModules) => {
  const { lesson, course, position, setPosition } = props;
  const { admin }: any = router.query;
  // const [position, setPosition] = useState(1)
  const changePosition = (value: number) => {
    setPosition(value);
  };
  useEffect(() => {
    if (admin) {
      setPosition(4);
    }
  }, []);

  return (
    <MainContainer>
      <TitleContain>
        <ModuleTabs
          value={position}
          changeValue={changePosition}
          course={course}
        />
        <div className='line'></div>
      </TitleContain>
      {position === 1 ? (
        <About lesson={lesson} course={course} />
      ) : position === 3 ? (
        <HomeWork course={course} lesson={lesson} />
      ) : position === 4 ? (
        <Comments course={course} lesson={lesson} />
      ) : position === 5 ? (
        <Help />
      ) : (
        <About lesson={lesson} course={course} />
      )}
    </MainContainer>
  );
};
export default Modules;
