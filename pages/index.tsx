import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gonvar Nails Academy</title>
      </Head>
      <h1>Gonvar Nails</h1>
      <Link href="/about">Ir a about</Link>
    </div>
  )
}
