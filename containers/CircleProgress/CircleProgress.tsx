import React from 'react'
import { CircleOfProgress } from './CircleProgress.styled';
interface ICircleProgress {
  progress: number;
  total: number;
  color: string;
}
const CircleProgress = (props: ICircleProgress) => {
  const { progress, total, color } = props;
  const crownImage = "/images/profile/crown.png"
  return (
    <CircleOfProgress progress={progress} color={color} className='progress'>
      <div className="circle-level">
        <img src={crownImage} className="crown" />
        <p className="points"> {(total > 9 || total == 0) ? total : "0" + total}</p>
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#902be7" />
              <stop offset="100%" stopColor="#451371" />
            </linearGradient>
          </defs>
          <circle className="progress-background"
          />
          <circle className="progress-circle" />
        </svg>
      </div>
    </CircleOfProgress>
  )
}
export default CircleProgress;