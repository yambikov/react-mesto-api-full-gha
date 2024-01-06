import PopupWithForm from "./PopupWithForm"
import React from "react"
import {CurrentUserContext} from "../contexts/CurrentUserContext"

function EditProfilePopup(props) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (currentUser.name) {
      setName(currentUser.name)
    }
    if (currentUser.about) {
      setDescription(currentUser.about)
    }
  }, [currentUser, props.isOpen])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
      children={
        <>
          <input
            className="popup__item"
            name="name"
            type="text"
            placeholder="Имя"
            minLength={2}
            maxLength={40}
            required
            value={name}
            onChange={handleNameChange}
          />
          <span className="input-error-name error" />

          <input
            className="popup__item"
            name="about"
            type="text"
            placeholder="Род деятельности"
            minLength={2}
            maxLength={200}
            required
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="input-error-about error" />
        </>
      }
    />
  )
}

export default EditProfilePopup
