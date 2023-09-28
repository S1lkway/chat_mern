// import { useDispatch, useSelector } from 'react-redux'
// - Components
import SearchBar from './SearchBar'
import UserCards from './UserCards'
// - Redux

function NewChat() {
  // const dispatch = useDispatch()
  // const { newChats } = useSelector((state) => state.chatList)
  return (
    <>
      <SearchBar />
      <UserCards />
    </>
  )
}

export default NewChat