import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { BsFillSendFill } from "react-icons/bs";
// - Redux
import { addMessage } from '../../../../features/messages/messagesSlice'

function AddMessageBar(props) {
  /// CONSTANTS
  const dispatch = useDispatch()
  const socket = props.socket
  const { chat, messages, isLoading } = useSelector((state) => state.messagesList)
  const [formData, setFormData] = useState({
    text: '',
  })
  const [sendMessage, setSendMessage] = useState(false)
  const { text } = formData
  // console.log(text)

  /// Send a message to websocket connection
  useEffect(() => {
    if (sendMessage && !isLoading) {
      const lastMessage = messages[messages.length - 1]
      console.log(lastMessage)
      socket.emit("new message", lastMessage)
      setSendMessage(false)
    }
    // eslint-disable-next-line
  }, [sendMessage, isLoading])

  /// Changing state before sending message
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  /// Add new message in Redux and DataBase
  const onSubmit = (e) => {
    e.preventDefault()

    const newMessageData = {
      id: chat._id,
      text: text
    }

    dispatch(addMessage(newMessageData))
    setSendMessage(true)

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