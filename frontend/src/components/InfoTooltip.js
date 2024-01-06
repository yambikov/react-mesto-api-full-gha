function InfoTooltip(props) {
  return (
    // <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : "" }`}>

    <div className={`popup popup_type_info ${props.isOpen ? "popup_opened" : ""}`}>

      <div className="popup__container">
        <button
          className="popup__close-icon"
          type="button"
          onClick={props.onClose}
        />
        <div className="popup__content popup__content_type_info">
          <img className="popup__image-info-tooltip" src={props.image} alt={props.alt} />
          <h2 className="popup__title popup__title_type_info">{props.message}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip
