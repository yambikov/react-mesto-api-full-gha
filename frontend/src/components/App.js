import React, {useState, useEffect} from "react"
import {Routes, Route} from "react-router-dom"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import ImagePopup from "./ImagePopup"
import apiConfig from "../utils/Api"
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import Login from "./Login"
import Register from "./Register"
import ProtectedRouteElement from "./ProtectedRoute"
import InfoTooltip from "./InfoTooltip"
import successedImage from "../images/info-tooltip-success.svg"
import failImage from "../images/info-tooltip-error.svg"
import * as auth from "../utils/auth"
import {useNavigate} from "react-router-dom"

function App() {
  // State для хранения состояния авторизации
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  // State для хранения массива карточек
  const [cards, setCards] = useState([])

  // State для хранения данных о текущем пользователе
  const [currentUser, setCurrentUser] = useState({})

  // State для управления видимостью попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [isInfoTooltipSuccessed, setIsInfoTooltipSuccessed] = useState(false)

  // State для отображения попапа с изображением
  const [selectedCard, setSelectedCard] = useState({}) // {name, link}

  const navigate = useNavigate()

  // Проверка залогинен ли пользователь при загрузке страницы
  useEffect(() => {
    handleTokenCheck()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Загрузка карточек с сервера при монтировании компонента
  useEffect(() => {
    apiConfig
      .getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Загрузка данных о текущем пользователе с сервера
  useEffect(() => {
    apiConfig
      .getUserInfoApi()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Обработчик лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    ;(isLiked ? apiConfig.deleteLike(card._id) : apiConfig.putLike(card._id))
      .then((res) => {
        setCards((state) => state.map((c) => (c._id === card._id ? res : c)))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Обработчик удаления карточки
  function handleCardDelete(card) {
    apiConfig
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id === card._id ? false : true))
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Обработчики кликов по кнопкам попапов и карточкам
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
  }

  // Закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
    setIsInfoTooltipOpen(false)
  }

  // Обновление данных пользователя
  function handleUpdateUser(data) {
    apiConfig
      .patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err)
      })
  }

  // Обновление аватара пользователя
  function handleUpdateAvatar(data) {
    apiConfig
      .patchAvatar(data)
      .then((res) => {
        setCurrentUser(res)
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err)
      })
  }

  // Добавление новой карточки
  function handleAddPlaceSubmit(data) {
    apiConfig
      .postCard(data)
      .then((res) => {
        setCards([res, ...cards])
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err)
      })
  }

  // Что происходит при логауте
  function onSignOut() {
    setLoggedIn(false)
    localStorage.removeItem("jwt")
    setEmail("")
  }

  // Что происходит при логИне
  function onLogin(password, email) {
    auth
      .login(password, email)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token)
          setLoggedIn(true)
          setEmail(email)
          navigate("/", {replace: true})
        }
      })
      .catch((err) => console.log(err))
  }

  function onRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        navigate("/sign-up", {replace: true})
        setIsInfoTooltipOpen(true)
        setIsInfoTooltipSuccessed(true)
      })
      .catch((err) => {
        console.log(err)
        setIsInfoTooltipOpen(true)
        setIsInfoTooltipSuccessed(false)
      })
  }

  // Проверка токена
  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt")
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setEmail(res.data.email)
            navigate("/", {replace: true})
          }
        })
        .catch((err) => console.log(err))
    }
  }

  // Рендеринг компонента
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root brd!">
        <div className="page">
          <Header signOut={onSignOut} email={email} />
          <Routes>
            <Route path="/sign-up" element={<Login onLogin={onLogin} />} />
            <Route
              path="/sign-in"
              element={<Register onRegister={onRegister} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main} // Рендерим Main, если пользователь авторизован
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            image={isInfoTooltipSuccessed ? successedImage : failImage}
            alt={
              isInfoTooltipSuccessed
                ? "Успешная регистрация"
                : "Ошибка регистрации"
            }
            message={
              isInfoTooltipSuccessed
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
