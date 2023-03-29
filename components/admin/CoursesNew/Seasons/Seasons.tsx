import { useRouter } from 'next/router';
import React from 'react'

const Seasons = () => {
  const router = useRouter();
  console.log(router.query.slug);
  return (
    <div>Seasons</div>
  )
}
export default Seasons;