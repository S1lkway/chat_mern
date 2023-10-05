import { useState } from "react"
//- Components
import SideBarButtons from "./components/SideBarButtons"
import ChatList from "./ChatList/ChatList"
import NewChat from "./NewChat/NewChat"
//- Redux

function SideBar(props) {
  const [sideBarContent, setSideBarContent] = useState('chatList')

  return (
    <>
      <SideBarButtons sideBarContent={sideBarContent} setSideBarContent={setSideBarContent} />
      {(sideBarContent === 'chatList') ? (
        <ChatList socket={props.socket} />
      ) : (
        <NewChat />
      )}
    </>
  )
}

export default SideBar