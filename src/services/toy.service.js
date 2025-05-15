import { httpService } from './http.service'

const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getFilterFromSearchParams,
  getToyLabels,
  getToyLabelCounts,
  getToyStats,
  addMsg,
}

function query(filterBy, pageIdx) {
  return httpService.get(BASE_URL, { filterBy, pageIdx })
  // return httpService.get(BASE_URL, { filterBy,pageIdx })
}

function get(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  const method = toy._id ? 'put' : 'post'

  return httpService[method](BASE_URL, toy)
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

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: _getRandomLabels(),
    inStock: true,
  }
}

function getToyLabels() {
  return httpService.get(BASE_URL + 'labels')
}

function getToyLabelCounts() {
  return httpService.get(BASE_URL + 'labels/count')
}

function getToyStats() {
  return httpService.get(BASE_URL + 'dashboard')
}

function _getRandomLabels() {
  const labelsCopy = [...labels]
  const randomLabels = []
  for (let i = 0; i < 2; i++) {
    const randomIdx = Math.floor(Math.random() * labelsCopy.length)
    randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
  }
  return randomLabels
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

async function addMsg(toyId, msg) {
  return httpService.post(BASE_URL + `${toyId}/msg`, msg)
}
