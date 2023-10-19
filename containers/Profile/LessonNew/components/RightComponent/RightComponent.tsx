import React, { useState } from 'react'
import { useCourse } from '../../../../../hooks/useLesson';
import { HamburgerContainer, RightSide } from '../../LessonNew.styled';
import Top from '../Top/Top';
import Progress from '../Progress/Progress';
import Menu from '../Menu/Menu';
import { useAuth } from '../../../../../hooks/useAuth';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

const RightComponent = () => {
  const { course } = useCourse();
  const [open, setOpen] = useState(false)
  const context = useAuth();
  return (
    <div className='right-side'>
      <div className='nav-course'>
        <img src="/images/Navbar/NavbarLogo2.png" alt="" />
        <HamburgerContainer>
          {!open ? <GiHamburgerMenu onClick={() => {
            setOpen(!open)
          }}></GiHamburgerMenu> :
            <AiOutlineClose onClick={() => {
              setOpen(!open)
            }}></AiOutlineClose>}
          <p>Lecciones</p>
        </HamburgerContainer>
      </div>
      <RightSide open={open}>
        <Top course={course} />
        <Progress course={course} user={context.user} />
        <Menu course={course} user={context.user} />
      </RightSide>
    </div>

  )
}
export default RightComponent;