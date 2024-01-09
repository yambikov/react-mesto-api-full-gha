import React from "react"
import headerLogo from "../images/logo_white.svg"
import { Link, Route, Routes } from "react-router-dom"


function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">{props.email}</p>
              <button className="header__button" onClick={props.signOut}>
                Выйти
              </button>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  )
}

export default Header
