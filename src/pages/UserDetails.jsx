// import { updatedUser } from '../store/actions/user.actions.js'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function UserDetails() {
  const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
  const [userDetails, setUserDetails] = useState(null)
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (loggedInUser) loadUserData()
  // }, [])

  // function loadUserData() {
  //   setUserDetails({
  //     fullname: loggedInUser.fullname || '',
  //     color: loggedInUser.pref.color || '#eeeeee',
  //     bgColor: loggedInUser.pref.bgColor || '#191919',
  //     activities: loggedInUser.activities || [],
  //   })
  // }

  // async function onEditUser(ev) {
  //   ev.preventDefault()
  //   const updateUser = {
  //     fullname: userDetails.fullname,
  //     pref: { color: userDetails.color, bgColor: userDetails.bgColor },
  //   }

  //   try {
  //     await updatedUser(updateUser)
  //     setCssVarVal('--clr1', userDetails.bgColor)
  //   } catch (error) {
  //     console.error('Cannot update user:', err)
  //   }
  // }

  // function handleChange({ target }) {
  //   let field = target.name
  //   let value = target.value

  //   switch (target.type) {
  //     case 'number':
  //     case 'range':
  //       value = +value || ''
  //       break

  //     case 'checkbox':
  //       value = target.checked
  //       break
  //   }
  //   setUserDetails(prevDetails => ({ ...prevDetails, [field]: value }))
  // }

  if (!loggedInUser || !userDetails) return <div>No user</div>
  // const { activities, fullname, color, bgColor } = userDetails
  return (
    <div className="container">
      <h1>Profile</h1>
    </div>
  )
  // return (
  //   <div className="container">
  //     <h1>Profile</h1>
  //     <form className="activities-form" onSubmit={onEditUser}>
  //       <label htmlFor="fullname">Name:</label>
  //       <input type="text" id="fullname" name="fullname" value={fullname} onChange={handleChange} />
  //       <label htmlFor="name">Color:</label>
  //       <input type="color" name="color" value={color} onChange={handleChange} />
  //       <label htmlFor="name">BG Color:</label>
  //       <input type="color" name="bgColor" value={bgColor} onChange={handleChange} />
  //       <button type="submit">save</button>
  //     </form>
  //   </div>
  // )
}
