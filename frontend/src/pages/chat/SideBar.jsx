import UserCard from "./components/UserCard"
import SearchBar from "./components/SearchBar"
import SideBarButtons from "./components/SideBarButtons"

function SideBar() {
  return (
    <>
      <div className="sidebar_buttons">
        <SideBarButtons />
      </div>
      <div className="search_bar">
        <SearchBar />
      </div>
      <div className="user_cards">
        <UserCard />
      </div>
    </>
  )
}

export default SideBar