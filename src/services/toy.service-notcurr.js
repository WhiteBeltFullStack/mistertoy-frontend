import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import Axios from 'axios'

const axios = Axios.create({ withCredentials: true })

const TOYS_KEY = 'toyDB'
const PAGE_SIZE = 4
// const BASE_URL = '/api/toy/'  OLD WAY
const BASE_URL = '/toy'

const mainLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getFilterFromSearchParams,
  // getImportanceStats,
  getToyLabels,
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}, pageIdx = 0) {
  return storageService.query(TOYS_KEY).then(toys => {
    if (filterBy.name) {
      const regExp = new RegExp(filterBy.name, 'i')
      toys = toys.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.maxPrice) {
      toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
    }

    if (filterBy.minPrice) {
      toys = toys.filter(toy => toy.price >= filterBy.minPrice)
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
      toys = toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)))
    }

    const { sortBy, sortDir = 1 } = filterBy

    if (sortBy === 'name') {
      toys = toys.sort((a, b) => a.name.localeCompare(b.name) * sortDir)
    } else if (sortBy === 'price') {
      toys = toys.sort((a, b) => (a.price - b.price) * sortDir)
    } else if (sortBy === 'createdAt') {
      toys = toys.sort((a, b) => (a.createdAt - b.createdAt) * sortDir)
    }

    const totalCount = toys.length

    const startIdx = pageIdx * PAGE_SIZE
    const pagedToys = toys.slice(startIdx, startIdx + PAGE_SIZE)

    return {
      toys: pagedToys,
      totalCount,
    }
  })
}

function get(toyId) {
  return storageService.get(TOYS_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(TOYS_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(TOYS_KEY, toy)
  } else {
    toy.createdAt = Date.now()
    return storageService.post(TOYS_KEY, toy)
  }
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

// function getFilterFromSearchParams(searchParams) {
//   const defaultFilter = getDefaultFilter()
//   const filterBy = {}

//   for (const field in defaultFilter) {
//     const val = searchParams.get(field)
//     if (val !== null) {
//       filterBy[field] = isNaN(val) ? val : +val
//     } else {
//       filterBy[field] = defaultFilter[field]
//     }
//   }
//   return filterBy
// }

function getEmptyToy(name = '', price = 100, inStock = true) {
  return {
    name,
    price,
    inStock,
    imgUrl:
      'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/63efcec3168dff001df2360f.jpg',
    labels: _getRandomLabels(),
  }
}

function _createToys() {
  let toys = utilService.loadFromStorage(TOYS_KEY)
  if (!toys || !toys.length) {
    const labelsSet = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    const toyNames = [
      'Dancing Robot',
      'Laughing Bear',
      'Singing Puppy',
      'Jumping Bunny',
      'Glowing Dragon',
      'Flying Fairy',
      'Spinning Topper',
      'Crawling Baby',
      'Magic Unicorn',
      'Buzzing Bee',
    ]
    toys = []

    for (let i = 0; i < 20; i++) {
      const name = toyNames[i % toyNames.length]
      const price = utilService.getRandomIntInclusive(50, 250)

      const labelsSetCopy = [...labelsSet]

      const labels = []
      for (let j = 0; j < 3; j++) {
        const randIdx = utilService.getRandomIntInclusive(0, labelsSetCopy.length - 1)
        labels.push(labelsSetCopy[randIdx])
        labelsSetCopy.splice(randIdx, 1)
      }
      toys.push(_createToy(labels, price, name))
    }
    utilService.saveToStorage(TOYS_KEY, toys)
  }
}

function _createToy(labels, price, name) {
  const toy = {
    _id: utilService.makeId(),
    name,
    imgUrl:
      'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/63efcec3168dff001df2360f.jpg',
    price,
    labels,
    createdAt: Date.now(),
    inStock: Math.random() < 0.5,
  }
  return toy
}

function getDefaultFilter() {
  return {
    name: '',
    minPrice: 0,
    maxPrice: 1000,
    pageIdx: 0,
    sortBy: 'name',
    sortDir: 1,
    labels: [],
  }
}

function _getRandomLabels() {
  const labelsCopy = [...mainLabels]
  const randomLabels = []
  for (let i = 0; i < 2; i++) {
    const idx = Math.floor(Math.random() * labelsCopy.length)
    randomLabels.push(labelsCopy.splice(idx, 1)[0])
  }
  return randomLabels
}

function getToyLabels() {
  return Promise.resolve(mainLabels)
}
