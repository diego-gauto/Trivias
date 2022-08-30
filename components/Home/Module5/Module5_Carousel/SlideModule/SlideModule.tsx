import React, { useEffect, useState } from 'react'
import { CardTitle, MasonryCard, MasonryImage, MasonryItem } from './SlideModule.styled'
import { ISlideModule } from './ISlideModule'

const SlideModule = (props: ISlideModule) => {
  const { title, imgURL } = props
  const [img, setImg] = useState("")

  const awaitImg = async () => {
    const resolvedImg = await imgURL
    setImg(resolvedImg)
  }
  useEffect(() => {
    awaitImg()
  }, [])

  return (
    <MasonryItem>
      <MasonryCard>
        <CardTitle>
          {title}
        </CardTitle>
        <MasonryImage src={img} />
      </MasonryCard>
    </MasonryItem>
  )
}

export default SlideModule