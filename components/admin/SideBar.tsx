import Link from 'next/link';
import React from 'react'
import { Container, Text } from './SideBar.styled';

const SideBar = () => {
  return (
    <Container>
      <Link href="/admin/General">
        <Text>General</Text>
      </Link>
      <Link href="/admin/Pago">
        <Text>Pagos</Text>
      </Link>
      <Link href="/admin/Courses">
        <Text>Cursos</Text>
      </Link>
      <Link href="/admin/Rewards">
        <Text>Recompensas</Text>
      </Link>
      <Link href="/admin/Landing">
        <Text>Landing</Text>
      </Link>
      <Link href="/admin/Coupons">
        <Text>Cupones</Text>
      </Link>
      <Link href="/admin/Users">
        <Text>Usuarios</Text>
      </Link>
    </Container>
  )
}
export default SideBar;