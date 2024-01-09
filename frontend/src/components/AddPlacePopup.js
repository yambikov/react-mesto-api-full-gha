import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState("")
  const [cardLink, setCardLink] = React.useState("")

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCard({
      name: cardName,
      link: cardLink,
    })
  }

  function handleCardNameChange(event) {
    setCardName(event.target.value)
  }

  function handleCardLinkChange(event) {
    setCardLink(event.target.value)
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="card"
      title="Новое место"
      children={
        <>
          <input
            className="popup__item"
            name="name"
            type="text"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            autoComplete="off"
            required
            onChange={handleCardNameChange}
            value={cardName}
          />
          <span className="input-error-name error" />
          <input
            className="popup__item"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required
            autoComplete="off"
            onChange={handleCardLinkChange}
            value={cardLink}
          />
          <span className="input-error-link error" />
        </>
      }
    />
  )
}

export default AddPlacePopup