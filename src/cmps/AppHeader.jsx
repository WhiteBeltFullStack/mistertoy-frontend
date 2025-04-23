import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

// import { userService } from '../services/user.service.js'
import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
// import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service.js'

export function AppHeader() {
  const navigate = useNavigate()
  //   const [user, setUser] = useState(userService.getLoggedinUser())
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  function onLogout() {
    logout()
      .then(() => {
        // showErrorMsg('Logged Out')
      })
      .catch(err => {
        // showErrorMsg('Oops Failed to Logout')
      })
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

  return (
    <header style={getStylePrefs()} className="app-header full main-layout">
      <section className="header-container">
        <h1>Mister-Toy</h1>
 
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
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/toy">Toys</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
