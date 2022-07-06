import React from 'react'
import { CardTitle, MainContainer, MasonryBox, MasonryCard, MasonryContainer, MasonryContent, MasonryImage, MasonrySpan, MasonryTitle } from './Landings.styled'

const Landings = () => {
  return (
    <MainContainer>

      {/* Masonry- Experiencia con nuestros clientes */}
      <MasonryContainer>
        <MasonryBox>
          <MasonryTitle>
            Experiencias de &nbsp;
            <MasonrySpan>
              nuestros clientes
            </MasonrySpan>
          </MasonryTitle>
        </MasonryBox>

        <MasonryContent>
          {/* Ejemplo Masonry */}
          <MasonryCard>
            <CardTitle>
              Luke Skywalker
            </CardTitle>
            <MasonryImage src="/images/nail1.png" />
          </MasonryCard>
          <MasonryCard>
            <CardTitle>
              Han Solo
            </CardTitle>
            <MasonryImage src="/images/nail2.png" />
          </MasonryCard>
          <MasonryCard>
            <CardTitle>
              Obi-Wan Kenobi
            </CardTitle>
            <MasonryImage src="/images/nail3.png" />
          </MasonryCard>
          <MasonryCard>
            <CardTitle>
              Luke Skywalker
            </CardTitle>
            <MasonryImage src="/images/nail1.png" />
          </MasonryCard>
          <MasonryCard>
            <CardTitle>
              Han Solo
            </CardTitle>
            <MasonryImage src="/images/nail2.png" />
          </MasonryCard>
          <MasonryCard>
            <CardTitle>
              Obi-Wan Kenobi
            </CardTitle>
            <MasonryImage src="/images/nail3.png" />
          </MasonryCard>
          <MasonryCard>
            <CardTitle>
              Luke Skywalker
            </CardTitle>
            <MasonryImage src="/images/nail1.png" />
          </MasonryCard>
          <MasonryCard>
            <CardTitle>
              Han Solo
            </CardTitle>
            <MasonryImage src="/images/nail2.png" />
          </MasonryCard>
          <MasonryCard>
            <CardTitle>
              Obi-Wan Kenobi
            </CardTitle>
            <MasonryImage src="/images/nail3.png" />
          </MasonryCard>
        </MasonryContent>
      </MasonryContainer>
    </MainContainer>
  )
}
export default Landings;