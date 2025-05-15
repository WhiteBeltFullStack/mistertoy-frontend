import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { userService } from '../services/user.service.js'
import { useState } from 'react'

export function LoginSignup() {
  const [isSignup, setIsSignUp] = useState(false)
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onLogin(credentials)
  }

  function onLogin(credentials) {
    isSignup ? _signup(credentials) : _login(credentials)
  }

  async function _login(credentials) {
    try {
      await login(credentials)
      showSuccessMsg('Logged in successfully')
    } catch (error) {
      showErrorMsg('Oops try again')
    }
  }

  async function _signup(credentials) {
    try {
      await signup(credentials)
      showSuccessMsg('Signed in successfully')
    } catch (error) {
      showErrorMsg('Oops try again')
    }
  }

  return (
    <div className="login-page">
      <div className="btns">
        <a href="#" onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          placeholder="Username"
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        {isSignup && (
          <input
            type="text"
            name="fullname"
            value={credentials.fullname}
            placeholder="Full name"
            onChange={handleChange}
            required
          />
        )}
        <button>{isSignup ? 'Signup' : 'Login'}</button>
      </form>
    </div>
  )
}
