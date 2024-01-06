import PopupWithForm from "./PopupWithForm"
import React from "react"

function EditAvatarPopup(props) {
  const inputAvatarLinkRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputAvatarLinkRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      children={
        <>
          <input
            className="popup__item"
            name="avatar"
            type="url"
            placeholder="Введите ссылку"
            required
            autoComplete="off"
            ref={inputAvatarLinkRef}
          />
          <span className="input-error-avatar error" />
        </>
      }
    />
  )
}

export default EditAvatarPopup
