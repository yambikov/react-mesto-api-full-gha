import React from "react"

function ImagePopup(props) {

  return (
    <div
      className={`popup popup_type_image ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-container">
        <button
          className="popup__close-icon"
          type="button"
          onClick={props.onClose}
        />
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__caption">{props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup
