import { useState } from "react"
//- Components
import SideBarButtons from "./components/SideBarButtons"
import ChatList from "./ChatList/ChatList"
import NewChat from "./NewChat/NewChat"
//- Redux

function SideBar() {
  const [sideBarContent, setSideBarContent] = useState('chatList')

  return (
    <>
      <SideBarButtons sideBarContent={sideBarContent} setSideBarContent={setSideBarContent} />
      {(sideBarContent === 'chatList') ? (
        <ChatList />
      ) : (
        <NewChat />
      )}
    </>
  )
}

export default SideBar