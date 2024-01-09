function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : "" }`}>
      <div className="popup__container">
        <button
          className="popup__close-icon"
          type="button"
          onClick={props.onClose}
        />
        <form
          className="popup__content"
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
