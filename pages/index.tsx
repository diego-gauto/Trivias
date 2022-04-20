import Head from 'next/head'
import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Gonvar Nails Academy</title>
      </Head>
      <NavBar title={"Gonvar Academy"} />
    </div>
  )
}
