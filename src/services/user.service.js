import { storageService } from './async-storage.service.js'

import { httpService } from './http.service'

export const userService = {
  login,
  signup,
  logout,
  getLoggedinUser,
  getEmptyCredentials,
  getById,
  query,
  // updateBalance,
  // addActivity,
  // updateUserPrefs,
}
const BASE_URL = 'auth/'
const STORAGE_KEY = 'loggedinUser'

async function login({ username, password }) {
  try {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    _setLoggedinUser(user)
    return user
  } catch (error) {
    console.log('Could not login')
    throw error
  }
}

async function signup(credentials) {
  try {
    const user = await httpService.post(BASE_URL + 'signup', credentials)
    _setLoggedinUser(user)
    return user
  } catch (error) {
    console.log('Could not signup')
    throw error
  }
}

async function logout() {
  try {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.log('Could not logout')
    throw error
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function query() {
  return storageService.query(STORAGE_KEY)
}

function _setLoggedinUser(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user
}

function getEmptyCredentials() {
  return {
    fullname: '',
    username: '',
    password: '',
  }
}
//NO NEED AT THE MOMENT
// function updateBalance(diff) {
//   const loggedInUser = getLoggedinUser()
//   if (!loggedInUser) return
//   return getById(loggedInUser._id).then(user => {
//     user.balance += diff
//     return storageService.put(STORAGE_KEY, user).then(user => {
//       _setLoggedinUser(user)
//       return user.balance
//     })
//   })
// }

// function addActivity(txt) {
//   const activity = {
//     txt,
//     at: Date.now(),
//   }

//   const loggedInUser = getLoggedinUser()
//   if (!loggedInUser) return Promise.reject('No Logged in user')
//   return getById(loggedInUser._id)
//     .then(user => {
//       if (!user.activities) user.activities = []
//       user.activities.unshift(activity)
//       return user
//     })
//     .then(updatedUser => {
//       return storageService.put(STORAGE_KEY, updatedUser).then(savedUser => {
//         _setLoggedinUser(savedUser)
//         return savedUser
//       })
//     })
// }

// function updateUserPrefs(userToUpdate) {
//   const loggedInUserId = getLoggedinUser()._id
//   return getById(loggedInUserId).then(user => {
//     user = { ...user, ...userToUpdate }
//     return storageService.put(STORAGE_KEY, user).then(savedUser => {
//       _setLoggedinUser(savedUser)
//       return savedUser
//     })
//   })
// }

// function getDefaultPrefs() {
//   return { color: '#eeeeee', bgColor: '#191919', fullname: '' }
// }

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }
