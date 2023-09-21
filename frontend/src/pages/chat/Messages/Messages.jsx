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
      {(chat != null) ? (
        <>
          <div className="messages_area">

            {messages?.length > 0 ? (
              messages?.map((message, index) => (
                <Message key={index} messageData={message} />
              ))
            ) : (

              <div className="empty_messages_box heading">
                <p>Write first message to start chat</p>
              </div>
            )}
          </div>
          <AddMessageBar />
        </>
      ) : (
        <div className='area_without_chat'>
          <div className='heading'>
            <p>Pick contact to start chat</p>
          </div>


        </div>
      )}
    </>
  )
}

export default Messages