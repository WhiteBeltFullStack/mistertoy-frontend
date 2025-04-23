import { useState, useEffect, useRef } from 'react'

import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter)).current
  const [labels, setLabels] = useState([])

  useEffect(() => {
    // Notify parent
    loadToyLabels()
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function loadToyLabels() {
    toyService
      .getToyLabels()
      .then(setLabels)
      .catch(err => {
        console.log('Had issues in toy edit:', err)
        navigate('/toy')
        showErrorMsg('Toy not found!')
      })
  }

  function handleChange({ target }) {
    let field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked ? 1 : -1
        break
      case 'select-multiple':
        value = [...target.selectedOptions].map(option => option.value)
        break

      default:
        break
    }

    console.log('value:',value)
    console.log('field:',field)
    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  // Optional support for LAZY Filtering with a button
  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  const { name, maxPrice, minPrice, sortBy, sortDir } = filterByToEdit
  return (
    <section className="toy-filter">
      <h2>Filter Toys</h2>
      <form onSubmit={onSubmitFilter}>
        <input value={name} onChange={handleChange} type="search" placeholder="By Name" id="name" name="name" />
        <label htmlFor="name"></label>

        <label htmlFor="maxPrice"></label>
        <input
          value={maxPrice}
          onChange={handleChange}
          type="number"
          placeholder="By Max Price"
          id="maxPrice"
          name="maxPrice"
        />

        <label htmlFor="minPrice"></label>
        <input
          value={minPrice}
          onChange={handleChange}
          type="number"
          placeholder="By Min Price"
          id="minPrice"
          name="minPrice"
        />

        <label htmlFor="labels">Labels:</label>
        <select  name="labels" id="labels" multiple value={filterByToEdit.labels || []} onChange={handleChange}>
          {labels.map(label => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>

        <select name="sortBy" id="sortBy" value={sortBy} onChange={handleChange}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created At</option>
        </select>

        <label htmlFor="sortDir"></label>
        <input type="checkbox" id="sortDir" name="sortDir" checked={sortDir === 1} onChange={handleChange}></input>
        <span>&#8645;</span>

        <button hidden>Set Filter</button>
      </form>
    </section>
  )
}
