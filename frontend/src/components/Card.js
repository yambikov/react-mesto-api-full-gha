import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {

  // привязываем контекст
  const currentUser = React.useContext(CurrentUserContext);
  console.log(`Card.js: currentUser._id: ${currentUser._id}`);

  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = props.card.owner._id === currentUser._id;
  const isOwn = props.card.owner === currentUser._id;
  // console.log(`props.card.owner._id: ${props.card.owner}`);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = props.card.likes.some(item => item._id === currentUser._id);
  const isLiked = props.card.likes.some(item => item === currentUser._id);
  console.log(`props.card.likes: ${props.card.likes}`);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick(){
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="element">
      <div
        onClick={handleClick}
        className="element__image"
        style={{
          backgroundImage: `url(${props.card.link})`
        }}
      ></div>
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__like-group">
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
        <span className="element__like-counter">{props.card.likes.length}</span>
      </div>
      {/* <button className="element__remove" type="button"></button> */}
      {isOwn && <button className='element__remove' onClick={handleDeleteClick} />}
    </div>
  );
}

export default Card;
