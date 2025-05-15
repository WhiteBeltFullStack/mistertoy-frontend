import { useRef, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { utilService } from '../services/util.service.js'
import { GoogleMaps } from '../cmps/GoogleMaps.jsx'

export function About() {
  return (
    <section className="about">
      <GoogleMaps />
    </section>
  )
}
