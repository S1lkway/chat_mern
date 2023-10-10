import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FaDeleteLeft } from "react-icons/fa6";
import ReactModal from 'react-modal';
import SocketContext from '../../../../utils/SocketContext';
// - Redux
import { getMessages, resetMessages } from '../../../../features/messages/messagesSlice'
import { deleteChat } from '../../../../features/chats/chatsSlice';


function Card(props) {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { chat } = useSelector((state) => state.messagesList)
  const [currentChat, setCurrentChat] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const chatId = props.chatId
  const contactData = props.contactData

  useEffect(() => {
    setCurrentChat(chat?._id)
  }, [chat])

  //*CONFIRMATION IN MODAL
  const openConfirmationModal = () => {
    setModalIsOpen(true);
  };
  const closeConfirmationModal = () => {
    setModalIsOpen(false);
  };

  const openChat = (id) => {
    dispatch(getMessages(id))
  }

  const removeChat = () => {
    dispatch(deleteChat(chatId))
    const webSocketData = { chatId: chatId, contactData: contactData, userData: user, type: 'removed' }
    socket?.emit("reset chatlist", webSocketData)
    if (currentChat === chatId) {
      dispatch(resetMessages())
    }
    closeConfirmationModal();
  }
  return (
    <div className="card" title="Open chat">
      <div className="user-info" onClick={() => openChat(chatId)}>
        <span className="card_name">{contactData.name}</span>
        <span className="card_email"><i>{contactData.email}</i></span>
      </div>
      <div className="delete-button" title="Delete chat" onClick={openConfirmationModal}>
        <FaDeleteLeft />
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeConfirmationModal}
        className="confirmationModal"
        overlayClassName="confirmationOverlay"
      >
        <h3>Delete chat with {contactData.name}?</h3>
        <div className='modalButtons'>
          <button onClick={removeChat} className='btn'>Yes</button>
          <button onClick={closeConfirmationModal} className='btn'>No</button>
        </div>
      </ReactModal>
    </div>
  )
}

export default Card