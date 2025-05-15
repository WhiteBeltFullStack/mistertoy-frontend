import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

// import { userService } from '../services/user.service.js'
import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
// import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AppHeader() {
  const { t, i18n } = useTranslation()

  function onSetLang(lang) {
    i18n.changeLanguage(lang)
  }

  const navigate = useNavigate()
  //   const [user, setUser] = useState(userService.getLoggedinUser())
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  async function onLogout() {
    try {
      await logout()
      showErrorMsg('Logged Out')
    } catch (error) {
      showErrorMsg('Oops Failed to Logout')
    }
  }

  function getStylePrefs() {
    const prefs = {
      color: '',
      backgroundColor: '',
    }
    if (user && user.pref) {
      ;(prefs.color = user.pref.color), (prefs.backgroundColor = user.pref.bgColor)
    }
    return prefs
  }

  //   function onSetUser(user) {
  //     setUser(user)
  //     navigate('/')
  //   }

  function handleLangChange(ev) {
    onSetLang(ev.target.value)
  }

  return (
    <header style={getStylePrefs()} className="app-header full main-layout">
      <section className="header-container">
        <h1>{t(`Mister-Toy`)}</h1>

        {user ? (
          <section>
            <span>Balance :{user.balance} </span>
            <Link to={`/user`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup />
            {/* <LoginSignup onSetUser={onSetUser} /> */}
          </section>
        )}
        <nav className="app-nav">
          <NavLink to="/">{t('Home')}</NavLink>
          <NavLink to="/about">{t('About')}</NavLink>
          <NavLink to="/toy">{t('Toys')}</NavLink>
          <NavLink to="/dashboard">{t('Dashboard')}</NavLink>
          <select value={i18n.language} onChange={handleLangChange}>
            <option value="en">English</option>
            <option value="he">עברית</option>
          </select>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
