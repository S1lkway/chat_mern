import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import ReactModal from 'react-modal';
// - Redux
import { createChat } from "../../../../features/chats/chatsSlice";

function NewChatCard(props) {
  const dispatch = useDispatch()
  const userData = props.userData
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //*DELETE ARTICLE IN MODAL
  const openCreateModal = () => {
    setModalIsOpen(true);
  };
  const closeCreateModal = () => {
    setModalIsOpen(false);
  };

  const createNewChat = () => {
    // console.log('Create chat with user ' + id)
    const chatData = { id: userData._id }
    dispatch(createChat(chatData))
    closeCreateModal();
  }
  return (
    <div className="card" title="Open chat">
      <div className="user-info">
        <span className="card_name">{userData.name}</span>
        <span className="card_email"><i>{userData.email}</i></span>
      </div>
      <div className="delete-button" title="Create chat" onClick={openCreateModal}>
        <FaUserPlus />
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeCreateModal}
        className="confirmationModal"
        overlayClassName="confirmationOverlay"
      >
        <h3>Are you sure?</h3>
        <div className='modalButtons'>
          <button onClick={createNewChat} className='btn'>Yes</button>
          <button onClick={closeCreateModal} className='btn'>No</button>
        </div>
      </ReactModal>
    </div>
  )
}

export default NewChatCard