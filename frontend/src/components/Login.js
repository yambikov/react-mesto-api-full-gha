import React, {useState} from "react"

const Login = ({onLogin}) => {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  })

  // const navigate = useNavigate()

  const [isFormValid, setIsFormValid] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(formValue.password, formValue.email)
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setFormValue({
      ...formValue,
      [name]: value,
    })

    validateForm()
  }

  // Функция валидации для проверки, является ли форма валидной
  const validateForm = () => {
    const {email, password} = formValue

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isPasswordValid = password.length >= 6

    setIsFormValid(isEmailValid && isPasswordValid)
  }

  return (
    <main>
      <section className="auth">
        <form
          className="auth__form"
          name="registration"
          onSubmit={handleSubmit}
        >
          <h2 className="auth__title">Вход</h2>
          <input
            className="auth__item"
            name="email"
            type="email"
            placeholder="Email"
            minLength={2}
            maxLength={30}
            autoComplete="off"
            required
            value={formValue.email}
            onChange={handleChange}
          />
          <span className="input-error-name error" />
          <input
            className="auth__item"
            name="password"
            type="password"
            placeholder="Пароль"
            required
            autoComplete="off"
            value={formValue.password}
            onChange={handleChange}
          />
          <span className="input-error-link error" />

          <button
            className={`auth__button ${
              isFormValid ? "auth__button_type_active" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
