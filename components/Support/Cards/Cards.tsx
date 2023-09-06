import React from 'react'
import { SupportCard } from './Cards.styled';
import { ImArrowRight2 } from 'react-icons/im';

interface ICards {
  card_data: {
    image: string;
    title: string;
    text_1: any;
    text_2?: any;
    button_text: string;
  }
  handleAction: () => void;
  disable?: boolean;
}
const Cards = (props: ICards) => {
  const { card_data, handleAction, disable } = props;
  const { image, title, text_1, text_2, button_text } = card_data
  return (
    <SupportCard>
      <img src={image} alt='image' />
      <p className='title'>{title}</p>
      <p dangerouslySetInnerHTML={{ __html: text_1 }} />
      {
        text_2 &&
        <p dangerouslySetInnerHTML={{ __html: text_2 }} />
      }
      {
        !disable &&
        <button onClick={handleAction}><p>{button_text}</p><ImArrowRight2 className='icon' /></button>
      }

    </SupportCard>
  )
}
export default Cards;