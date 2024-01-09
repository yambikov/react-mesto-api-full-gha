import React from "react"
import Card from "./Card"
// import { useContext } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          style={{
            backgroundImage: `url(${currentUser.avatar})`,
          }}
        />
        <button
          className="profile__avatar-update-button"
          type="button"
          onClick={props.onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {/* место для карточек */}

        {props.cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />
        ))}
      </section>
      
      
    </main>
  )
}

export default Main


