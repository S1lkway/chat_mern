import { useState, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { FaUserPlus } from "react-icons/fa";
import ReactModal from 'react-modal';
import SocketContext from '../../../../utils/SocketContext'
// - Redux
import { createChat } from "../../../../features/chats/chatsSlice";

function NewChatCard(props) {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch()
  const userData = props.userData
  const { user } = useSelector((state) => state.auth)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //*CONFIRMATION IN MODAL
  const openConfirmationModal = () => {
    setModalIsOpen(true);
  };
  const closeConfirmationModal = () => {
    setModalIsOpen(false);
  };

  const createNewChat = () => {
    const chatData = { id: userData._id }
    dispatch(createChat(chatData))
    const webSocketData = { chatId: null, contactData: userData, userData: user, type: 'created' }
    socket?.emit("reset chatlist", webSocketData)
    closeConfirmationModal();
  }
  return (
    <div className="card" title="Open chat">
      <div className="user-info">
        <span className="card_name">{userData.name}</span>
        <span className="card_email"><i>{userData.email}</i></span>
      </div>
      <div className="delete-button" title="Create chat" onClick={openConfirmationModal}>
        <FaUserPlus />
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeConfirmationModal}
        className="confirmationModal"
        overlayClassName="confirmationOverlay"
      >
        <h3>Create chat with {userData.name}?</h3>
        <div className='modalButtons'>
          <button onClick={createNewChat} className='btn'>Yes</button>
          <button onClick={closeConfirmationModal} className='btn'>No</button>
        </div>
      </ReactModal>
    </div>
  )
}

export default NewChatCard