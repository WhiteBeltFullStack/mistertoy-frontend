import { toyService } from '../../services/toy.service.js'

import {
  ADD_TOY,
  REMOVE_TOY,
  SET_IS_LOADING,
  // SET_MAX_PAGE,
  SET_TOYS,
  // UNDO_TOYS,
  UPDATE_TOY,
} from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export function loadToys(pageIdx) {
  const filterBy = store.getState().toyModule.filterBy
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .query(filterBy, pageIdx)
    .then(({toys,totalCount} )=> {
      store.dispatch({ type: SET_TOYS, toys })
      // _setTodosData(maxPage, doneTodosPercent)
      return {toys,totalCount}
    })
    .catch(err => {
      console.log('todo action -> Cannot load todos', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  return toyService
    .save(toy)
    .then(savedToy => {
      store.dispatch({ type, toy: savedToy })
      // _setTodosData(maxPage, doneTodosPercent)
      return savedToy
    })

    .catch(err => {
      console.log('todo action -> Cannot save todo', err)
      throw err
    })
}

export function removeToy(toyId) {
  return toyService
    .remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
      // _setTodosData(maxPage, doneTodosPercent)
    })

    .catch(err => {
      console.log('todo action -> Cannot remove todo', err)
      throw err
    })
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
