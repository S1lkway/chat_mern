import { useState } from "react";
import { toast } from 'react-toastify'
import { MdPersonSearch } from "react-icons/md";

function SearchBar(props) {
  const [formData, setFormData] = useState({
    email: '',
  })
  const { email } = formData


  /// Changing state before searching
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  /// Add new message in Redux and DataBase
  const onSubmit = (e) => {
    e.preventDefault()

    if (email === '') {
      toast.error('Email is empty')
    } else {
      console.log(email)


      setFormData({ email: '' })
    }
  }
  return (
    <div className="search_bar">
      <form onSubmit={onSubmit} className="formInputWithButton">
        <div className="form-group">
          <input
            type="text" className='form-control'
            id="email"
            name='email'
            value={email}
            placeholder='Search by email'
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn' title="Search contact for chat by email">
          <MdPersonSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchBar