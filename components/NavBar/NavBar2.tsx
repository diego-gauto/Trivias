import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Logo, NavContainer, NavTags, NavText, PurpleButton } from './NavBar2.styled';
import Scroll from './scroll';

const NavBar2 = () => {
  const [color, setColor] = useState<any>(0)


  const router = useRouter();
  let { pathname }: any = router;
  console.log(pathname)
  console.log(color)
  return (
    <NavContainer pathname={pathname} color={color}>
      {
        pathname == "/" ?
          <>
            {
              color == 1 &&
              <Link href="/">
                <Logo src="/images/logo3.png" width={130} height={70} />
              </Link>
            }
            {
              color == 0 &&
              <Link href="/">
                <Logo src="/images/logo.png" width={130} height={70} />
              </Link>
            }
          </>
          :
          <Link href="/">
            <Logo src="/images/logo3.png" width={130} height={70} />
          </Link>
      }
      <Scroll color={color} setColor={setColor} pathname={pathname} />
      <NavTags>
        <NavText pathname={pathname} color={color}>
          Inicio
        </NavText>

        <NavText pathname={pathname} color={color}>
          Tienda
        </NavText>

        <Link href="/auth/Login">
          <NavText pathname={pathname} color={color}>
            Iniciar Sesión
          </NavText>
        </Link>
        <Link href="/auth/Register">
          <PurpleButton>
            Suscribirse Ya
          </PurpleButton>
        </Link>
      </NavTags>
    </NavContainer>
  )
}
export default NavBar2;