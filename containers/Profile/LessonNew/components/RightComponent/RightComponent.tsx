import React, { useContext, useState } from 'react';
import { useCourse } from '../../../../../hooks/useLesson';
import { HamburgerContainer, RightSide } from '../../LessonNew.styled';
import Top from '../Top/Top';
import Progress from '../Progress/Progress';
import Menu from '../Menu/Menu';
import { useAuth } from '../../../../../hooks/useAuth';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { IUserInfoResult } from '../../../../../interfaces/IUser';
import { IUseAuthProps } from '../../../../../interfaces/IUseAuthProps';
import { HomeworksContext } from '../../../../../hooks/useHomeworks';

interface RightComponentProps {
  course: any;
  context: IUseAuthProps;
}

const RightComponent = ({ course, context }: RightComponentProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='right-side'>
      <div className='nav-course'>
        <img src='/images/Navbar/NavbarLogo2.png' alt='' />
        <HamburgerContainer>
          {!open ? (
            <GiHamburgerMenu
              onClick={() => {
                setOpen(!open);
              }}
            ></GiHamburgerMenu>
          ) : (
            <AiOutlineClose
              onClick={() => {
                setOpen(!open);
              }}
            ></AiOutlineClose>
          )}
          <p>Lecciones</p>
        </HamburgerContainer>
      </div>
      <RightSide open={open}>
        <Top course={course} />
        <Progress course={course} user={context.user as IUserInfoResult} />
        <Menu course={course} user={context.user as IUserInfoResult} />
      </RightSide>
    </div>
  );
};
export default RightComponent;
