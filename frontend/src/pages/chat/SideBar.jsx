import { useState, useEffect } from "react"
// import axios from "axios";
import UserCards from "./components/UserCards"
import SearchBar from "./components/SearchBar"
import SideBarButtons from "./components/SideBarButtons"

function SideBar() {
  // const { user } = useSelector((state) => state.auth)
  // console.log(user)
  const [sideBarContent, setSideBarContent] = useState('chatList')
  // console.log(sideBarContent)
  const [searchEmail, setsearchEmail] = useState('')
  console.log(searchEmail)
  const [newChatList, setNewChatList] = useState({})
  console.log(newChatList)

  useEffect(() => {
    if (sideBarContent === 'chatList') {
      console.log('Get list of chats')
    } else {
      console.log('Get contact for new chat')
      // axios.get(`URL_ВАШЕГО_СЕРВЕРА/${sideBarContent}`)
      //   .then((response) => {
      //     // Обработка данных, полученных от сервера
      //     console.log(`Данные для ${sideBarContent}:`, response.data);
      //   })
      //   .catch((error) => {
      //     // Обработка ошибок при запросе к серверу
      //     console.error(`Ошибка при запросе для ${sideBarContent}:`, error);
      //   });
      setNewChatList({ user: 'user' })
    }
  }, [sideBarContent])
  return (
    <>
      <SideBarButtons sideBarContent={sideBarContent} setSideBarContent={setSideBarContent} />
      <SearchBar setsearchEmail={setsearchEmail} />
      <UserCards />
    </>
  )
}

export default SideBar