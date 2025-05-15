export function PagingButtons({ pageIdx, setPageIdx, totalCount, pageSize }) {
  const maxPage = Math.ceil(totalCount / pageSize)

  function onSetPageIdx(diff) {
    const nextPage = pageIdx + diff
    if (nextPage < 0 || nextPage >= maxPage) return
    setPageIdx(nextPage)
  }

  return (
    <div className="pagination">
      <button onClick={() => onSetPageIdx(-1)} disabled={pageIdx === 0}>
        Previous
      </button>
      <span>
        Page {pageIdx + 1} of {maxPage}
      </span>
      <button onClick={() => onSetPageIdx(1)} disabled={pageIdx + 1 >= maxPage}>
        Next
      </button>
    </div>
  )
}
