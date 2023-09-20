import { useSelector } from 'react-redux'

import AddMessageBar from './components/AddMessageBar'
import Message from './components/Message'

function Messages() {
  const { messages } = useSelector((state) => state.messages)
  // console.log(messages)

  // flex_end - class for messages on right side
  return (
    <>
      <div className="messages_area">


        {messages?.chatMessages?.length > 0 ? (
          messages.chatMessages?.map((messageData, index) => (
            <Message key={index} messageData={messageData} />
          ))
        ) : (
          <div className="empty_chat_list heading">
            <p>You don't have any messages</p>
          </div>
        )}



      </div>
      <AddMessageBar />
    </>

  )
}

export default Messages