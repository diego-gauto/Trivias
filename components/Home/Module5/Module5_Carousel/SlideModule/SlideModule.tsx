import React from 'react'
import { CardTitle, MasonryCard, MasonryImage, MasonryItem } from './SlideModule.styled'
import { ISlideModule } from './ISlideModule'

const SlideModule = (props: ISlideModule) => {
  const { title, imgURL } = props

  return (
    <MasonryItem>
      <MasonryCard>
        <CardTitle>
          {title}
        </CardTitle>
        <MasonryImage src={imgURL} />
      </MasonryCard>
    </MasonryItem>
  )
}

export default SlideModule