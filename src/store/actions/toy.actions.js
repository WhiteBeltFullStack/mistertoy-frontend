import { toyService } from '../../services/toy.service.js'

import {
  ADD_TOY,
  REMOVE_TOY,
  SET_IS_LOADING,
  SET_STATS,
  // SET_MAX_PAGE,
  SET_TOYS,
  // UNDO_TOYS,
  UPDATE_TOY,
} from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export async function loadToys(pageIdx) {
  const filterBy = store.getState().toyModule.filterBy
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })


  try {
    const { toys, totalCount, PAGE_SIZE } = await toyService.query(filterBy, pageIdx)
    store.dispatch({ type: SET_TOYS, toys })
    return { totalCount, PAGE_SIZE }
  } catch (error) {
    console.log('toy action -> Cannot load toys', error)
    throw error
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}
// export function loadToys(pageIdx) {
//   const filterBy = store.getState().toyModule.filterBy
//   store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//   return toyService
//     .query(filterBy, pageIdx)
//     .then(({ toys, totalCount, PAGE_SIZE }) => {
//       store.dispatch({ type: SET_TOYS, toys })
//       // _settoysData(maxPage, donetoysPercent)

//       return { toys, totalCount, PAGE_SIZE }
//     })
//     .catch(err => {
//       console.log('toy action -> Cannot load toys', err)
//       throw err
//     })
//     .finally(() => {
//       store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//     })
// }

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  try {
    const savedToy = await toyService.save(toy)
    store.dispatch({ type, toy: savedToy })
    return savedToy
  } catch (error) {
    console.log('toy action -> Cannot save toy', error)
    throw error
  }
}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (error) {
    console.log('toy action -> Cannot remove toy', error)
    throw error
  }
 
  // return toyService
  //   .remove(toyId)
  //   .then(() => {

  //     // _settoysData(maxPage, donetoysPercent)
  //   })

  //   .catch(err => {
  //     console.log('toy action -> Cannot remove toy', err)
  //     throw err
  //   })
}

export async function getStats() {
  try {
    const stats = await toyService.getToyStats()
    store.dispatch({ type: SET_STATS, toyStats: stats })
  } catch (error) {
    console.log('Cannot load stats', error)
    throw error
  }
}
//OPTIMISTIC
// export function removeTodoOpt(todoId) {
//   store.dispatch({ type: REMOVE_TOY, todoId })
//   return toyService
//     .remove(todoId)
//     .then(({ maxPage, doneTodosPercent }) => {
//       _setTodosData(maxPage, doneTodosPercent)
//     })
//     .then(() => {
//       return addActivity(`Removed` + ' A Todo' + todoId)
//     })
//     .catch(err => {
//       console.log('todo action -> Cannot remove todo', err)
//       store.dispatch({type:UNDO_TOYS}) ---------->>
//       throw err
//     })
// }

// function _setTodosData(maxPage, doneTodosPercent) {
//   store.dispatch({
//     type: SET_DONE_TOYS_PERCENT,
//     doneTodosPercent,
//   })
//   store.dispatch({
//     type: SET_MAX_PAGE,
//     maxPage,
//   })
// }
