function SideBarButtons(props) {

  return (
    <div className="sidebar_buttons">
      <button
        className={`btn ${props.sideBarContent === 'newChat' && 'btn-clicked'}`} onClick={() => props.setSideBarContent('newChat')}>
        <i>New chat</i>
      </button>
      <button
        className={`btn ${props.sideBarContent === 'chatList' && 'btn-clicked'}`} onClick={() => props.setSideBarContent('chatList')}>
        <i>Chat list</i>
      </button>
    </div>
  )
}

export default SideBarButtons