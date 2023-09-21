import { useSelector } from 'react-redux'

function Message(props) {
  /// CONSTS
  const { user } = useSelector((state) => state.auth)
  // const messageUserName = props.messageData.user.name
  const messageText = props.messageData.text
  const messageUserId = props.messageData.user._id
  let messageSide = 'message_box'
  // console.log(messageUserId)
  // console.log(user._id)
  if (messageUserId === user._id) {
    messageSide = 'message_box  flex_end'
  }

  return (
    <div className={messageSide}>
      <div className='message'>
        <span>{messageText}</span>
      </div>
    </div>
  )
}

export default Message