import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { loadToys, removeToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { SET_FILTER } from '../store/reducers/toy.reducer.js'
import { PagingButtons } from '../cmps/PagingButtons.jsx'
export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

  const [pageIdx, setPageIdx] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize, setPageSize] = useState(0)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams(filterBy)
    fetchToys()
  }, [filterBy, pageIdx])

  async function fetchToys() {
    try {
      const { totalCount, PAGE_SIZE } = await loadToys(pageIdx)
      setTotalCount(totalCount)
      setPageSize(PAGE_SIZE)
    } catch (error) {
      showErrorMsg('Cannot load Toys')
    }
  }

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER, filterBy })
  }

  async function onRemoveToy(toyId) {
    try {
      await removeToy(toyId)
      showSuccessMsg(`${toyId} Removed Successfully`)
      loadToys(pageIdx)
    } catch (error) {
      showErrorMsg('Cannot remove toy')
    }
  }

  return (
    <section className="toy-index">
      <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      <PagingButtons pageIdx={pageIdx} setPageIdx={setPageIdx} totalCount={totalCount} pageSize={pageSize} />
    </section>
  )
}
