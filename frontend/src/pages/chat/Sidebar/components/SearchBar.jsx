

function SearchBar(props) {

  const onChange = (e) => {
    props.setsearchEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="search_bar">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text" className='form-control'
            id="text"
            name='text'
            // value={email}
            placeholder='Search by email'
            onChange={onChange}
          />
        </div>

      </form>
    </div>
  )
}

export default SearchBar