import React from 'react';
import './cssCard.scss';

function Card(props) {
  return (
    <div className='Cardrecipe'>
      <p>{props.recipe.title}</p>
      <img src={props.recipe.image} alt={props.recipe.title} />
      <div className='Gradient' />
    </div>
  );
}

export default Card;
