import { userService } from '../../services/user.service.js'
import { SET_USER, SET_USER_BALANCE } from '../reducers/user.reducer.js'
import { store } from '../store.js'

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({ type: SET_USER, user })
  } catch (error) {
    console.log('user actions -> Cannot login', error)
    throw error
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({ type: SET_USER, user })
  } catch (error) {
    console.log('user actions -> Cannot signup', error)
    throw error
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: SET_USER, user: null })
  } catch (error) {
    console.log('user actions -> Cannot logout', error)
    throw error
  }
}

// export function addActivity(txt) {
//   return userService
//     .addActivity(txt)
//     .then(updatedUser => {
//       store.dispatch({
//         type: SET_USER,
//         user: updatedUser,
//       })
//     })
//     .catch(err => {
//       console.error('Cannot add activity:', err)
//       throw err
//     })
// }

// export function updatedUser(userToUpdate) {
//   return userService
//     .updateUserPrefs(userToUpdate)
//     .then(currUser => {
//       store.dispatch({ type: SET_USER, user: currUser })
//     })
//     .catch(err => {
//       console.error('Cannot update user:', err)
//       throw err
//     })
// }

// export function changeBalance(amount) {

//   return userService
//     .updateBalance(amount)
//     .then(newBalance => {
//       store.dispatch({ type: SET_USER_BALANCE, balance: newBalance })
//       return newBalance
//     })
//     .catch(err => {
//       console.error('Cannot change balance:', err)
//       throw err
//     })
// }
