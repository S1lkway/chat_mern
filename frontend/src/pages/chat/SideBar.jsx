import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
// import axios from "axios";
//- Components
import UserCards from "./components/UserCards"
import SearchBar from "./components/SearchBar"
import SideBarButtons from "./components/SideBarButtons"
//- Redux
import { getChats, resetChats } from "../../features/chats/chatsSlice"

function SideBar() {
  const dispatch = useDispatch()
  // const { user } = useSelector((state) => state.auth)
  const { chats, isLoading } = useSelector((state) => state.chats)
  // console.log(chats)
  const [sideBarContent, setSideBarContent] = useState('chatList')
  // console.log(sideBarContent)
  const [searchEmail, setSearchEmail] = useState('')
  // console.log(searchEmail)
  const [sideBarList, setSideBarList] = useState(null)
  console.log(sideBarList)

  useEffect(() => {
    if (sideBarContent === 'chatList') {
      dispatch(getChats())
      if (!isLoading) {
        setSideBarList(chats)
        console.log('Get list of chats')
      }

    } else {
      console.log('Get contact for new chat')
    }
  }, [sideBarContent])
  return (
    <>
      <SideBarButtons sideBarContent={sideBarContent} setSideBarContent={setSideBarContent} />
      <SearchBar setsearchEmail={setSearchEmail} />
      <UserCards sideBarList={sideBarList} />
    </>
  )
}

export default SideBar