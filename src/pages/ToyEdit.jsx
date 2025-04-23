import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service'
import { saveToy } from '../store/actions/toy.actions'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const [labels, setLabels] = useState([])
  const navigate = useNavigate()

  const { toyId } = useParams()

  useEffect(() => {
    loadToyLabels()
    loadToy()
  }, [toyId])

  function loadToy() {
    if (!toyId) return
    toyService
      .get(toyId)
      .then(toy => {
        setToyToEdit(toy)
      })
      .catch(err => {
        console.log('Had issues in toy edit:', err)
        navigate('/toy')
        showErrorMsg('Toy not found!')
      })
  }

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
    const { name, value, type, checked } = target
    let fieldValue = value
    if (type === 'checkbox') {
      fieldValue = checked
    } else if (type === 'number') {
      fieldValue = +value
    } else if (type === 'select-multiple') {
      fieldValue = [...target.selectedOptions].map(option => option.value)
    }

    setToyToEdit(prevToy => ({
      ...prevToy,
      [name]: fieldValue,
    }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    saveToy(toyToEdit)
      .then(savedToy => {
        showSuccessMsg(`Toy ${savedToy._id} saved successfully`)
        navigate('/toy')
      })
      .catch(err => {
        showErrorMsg('Cannot save toy')
      })
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={toyToEdit.name} onChange={handleChange} required />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          id="price"
          value={toyToEdit.price || ''}
          onChange={handleChange}
          required
          min="1"
        />

        {toyToEdit._id && (
          <label>
            <input type="checkbox" name="inStock" checked={toyToEdit.inStock} onChange={handleChange} />
            In Stock
          </label>
        )}

        <label htmlFor="labels">Labels:</label>
        <select name="labels" id="labels" multiple value={toyToEdit.labels} onChange={handleChange}>
          {labels.map(label => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>

        <button type="submit">{toyToEdit._id ? 'Update Toy' : 'Add'}</button>
      </form>
    </section>
  )
}
