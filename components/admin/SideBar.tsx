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
        <Text>Pagos</Text>
      </Link>
      <Link href="/admin/Rewards">
        <Text>Pagos</Text>
      </Link>
      <Link href="/admin/Landing">
        <Text>Pagos</Text>
      </Link>
      <Link href="/admin/Coupons">
        <Text>Pagos</Text>
      </Link>
      <Link href="/admin/Users">
        <Text>Pagos</Text>
      </Link>
    </Container>
  )
}
export default SideBar;