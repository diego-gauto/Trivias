import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { Button } from 'react-bootstrap'
import { NavBar } from '../components/NavBar/NavBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gonvar Nails Academy</title>
      </Head>
      <NavBar />
    </div>
  )
}
