// const Router from 'react'RouterDOM.HashRouter
import { HashRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { store } from './store/store.js'
import { UserDetails } from './pages/UserDetails.jsx'

export function RootCmp() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              <Route path="/todo/:todoId" element={<ToyDetails />} />
              <Route path="/todo/edit/:todoId" element={<ToyEdit />} />
              <Route path="/todo/edit" element={<ToyEdit />} />
              <Route path="/todo" element={<ToyIndex />} />
              <Route path="/user" element={<UserDetails />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
