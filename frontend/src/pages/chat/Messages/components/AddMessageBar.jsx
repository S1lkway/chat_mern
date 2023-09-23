// import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
// - Redux
// import { addMessage } from '../../../../features/messages/messagesSlice'

function AddMessageBar() {

  // const [formData, setFormData] = useState({
  //   text: '',
  // })

  // const { text } = formData

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }))
  // }

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
            // value={text}
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