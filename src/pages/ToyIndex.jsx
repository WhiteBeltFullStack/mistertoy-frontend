import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
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

  const PAGE_SIZE = 4 // Same value as toyService uses

  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams(filterBy)
    loadToys(pageIdx)
      .then(({ toys, totalCount }) => {
        setTotalCount(totalCount)
      })
      .catch(() => {
        showErrorMsg('Cannot load Toys')
      })
  }, [filterBy, pageIdx])

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER, filterBy })
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg(`${toyId} Removed Successfully`)
      })
      .catch(() => {
        showErrorMsg('Cannot remove toy')
      })
  }

  return (
    <section className="toy-index">
      <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      <PagingButtons pageIdx={pageIdx} setPageIdx={setPageIdx} totalCount={totalCount} pageSize={PAGE_SIZE} />
    </section>
  )
}
