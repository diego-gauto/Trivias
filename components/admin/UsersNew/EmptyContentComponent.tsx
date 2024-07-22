import { CSSProperties } from "react";


interface IEmptyContentComponentProps {
  message: string;
  styles?: CSSProperties
}

export const EmptyContentComponent = ({ message, styles }: IEmptyContentComponentProps) => {
  return (
    <div className='empty-container'
      style={styles}
    >
      <div className='empty-content'>
        <p className='empty-content-text'>
          {message}
        </p>
      </div>
    </div>
  )
}