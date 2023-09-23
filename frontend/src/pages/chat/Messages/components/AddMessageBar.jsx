import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { BsFillSendFill } from "react-icons/bs";
// - Redux
import { addMessage } from '../../../../features/messages/messagesSlice'

function AddMessageBar() {
  const dispatch = useDispatch()
  const { chat } = useSelector((state) => state.messagesList)
  const [formData, setFormData] = useState({
    text: '',
  })

  const { text } = formData
  // console.log(text)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const newMessageData = {
      id: chat._id,
      text: text
    }

    dispatch(addMessage(newMessageData))

    console.log('Send new message')
    setFormData({ text: '' })
  }
  return (
    <div className="add_message_bar">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="text"
            name='text'
            value={text}
            placeholder='Send new message'
            onChange={onChange}
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