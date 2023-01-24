import React from 'react'
import { reward_info } from "./IRewardModuleSlider.styled";
import { SlideContainer } from './RewardModuleSlider.styled';

const RewardModuleSlider = (props: reward_info) => {
  const { rewards } = props;
  return (
    <SlideContainer>
      <div className="text-container">
        <p className="title-text">
          <span>Recompensa bloqueada</span><br />
          hasta llegar a 3000 puntos
        </p>
      </div>
      <div className="image-container">

      </div>
      <div className="text-container">
        Polvo Acrilico para<br />
        u;as soft
      </div>
    </SlideContainer>
  )
}
export default RewardModuleSlider;