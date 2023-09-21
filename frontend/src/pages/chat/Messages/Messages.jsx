import { useEffect } from 'react'
import { useSelector } from 'react-redux'
// - Components
import AddMessageBar from './components/AddMessageBar'
import Message from './components/Message'
// - Redux
// import { getMessages } from '../../../features/messages/messagesSlice'

function Messages() {
  // const dispatch = useDispatch()
  const { messages, chat } = useSelector((state) => state.messagesList)
  // console.log(chat)
  useEffect(() => {
    if (chat != null) {
      console.log(chat._id)
    }
  }, [chat])


  return (
    <>
      <div className="messages_area">

        {messages?.length > 0 ? (
          messages?.map((message, index) => (
            <Message key={index} messageData={message} />
          ))
        ) : (

          <div className="empty_messages_box heading">
            <p>You don't have any messages</p>
          </div>
        )}
      </div>
      <AddMessageBar />
    </>

  )
}

export default Messages