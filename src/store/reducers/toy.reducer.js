import { toyService } from '../../services/toy.service.js'

import { createStore, compose } from 'redux'
//TODOS
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

//LOADER
export const SET_IS_LOADING = 'SET_IS_LOADING'

//MAXPAGE
export const SET_MAX_PAGE = 'SET_MAX_PAGE'

//FILTER
export const SET_FILTER = 'SET_FILTER'

//UNDO TODOS
export const UNDO_TOY = 'UNDO_TOY'

const initialState = {
  toys: [],
  isLoading: false,

  maxPage: 0,
  filterBy: toyService.getDefaultFilter(),
  // lastTodos:[] ----OPTIMISTIC WAY TO SAVE LAST TODOS AND RENDER THEM IF FAIL
}

export function toyReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    //TODOS
    case SET_TOYS:
      return {
        ...state,
        toys: cmd.toys,
      }

    case REMOVE_TOY:
      return {
        ...state,
        toys: state.toys.filter(toy => toy._id !== cmd.toyId),
        // todos:[...state.todos] OPTIMISTIC
      }

    case ADD_TOY:
      return {
        ...state,
        toys: [...state.toys, cmd.toy],
      }

    case UPDATE_TOY:
      return {
        ...state,
        toys: state.toys.map(toy => (toy._id === cmd.toy._id ? cmd.toy : toy)),
      }

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: cmd.isLoading,
      }

    case SET_MAX_PAGE:
      return { ...state, maxPage: cmd.maxPage }

    case SET_FILTER:
      return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } }

    // case UNDO_TODOS:
    //   return {...state,
    //     todos:[...state.lastTodos] OPTIMISTIC
    //   }

    default:
      return state
  }
}
