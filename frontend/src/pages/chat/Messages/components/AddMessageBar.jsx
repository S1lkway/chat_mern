import { BsFillSendFill } from "react-icons/bs";

function AddMessageBar() {

  const onSubmit = (e) => {
    e.preventDefault()

    console.log('Send new message')
  }
  return (
    <div className="add_message_bar">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="text"
            name='text'
            // value={email}
            placeholder='Send new message'
          // onChange={onChange}
          />
        </div>
        <button type='submit' className='btn'>
          <BsFillSendFill />
        </button>
      </form>
    </div>
  )
}

export default AddMessageBar