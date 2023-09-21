// import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// - Components
import AddMessageBar from './components/AddMessageBar'
import Message from './components/Message'
// - Redux
// import { getMessages } from '../../../features/messages/messagesSlice'

function Messages() {
  // const dispatch = useDispatch()
  const { messages } = useSelector((state) => state.messages)
  // console.log(messages)
  // useEffect(() => {
  //   dispatch(getMessages())
  //   console.log('aaa')
  // }, [])


  return (
    <>
      <div className="messages_area">

        {messages?.chatMessages?.length > 0 ? (
          messages.chatMessages?.map((messageData, index) => (
            <Message key={index} messageData={messageData} />
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