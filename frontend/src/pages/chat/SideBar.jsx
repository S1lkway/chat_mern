import UserCards from "./components/UserCards"
import SearchBar from "./components/SearchBar"
import SideBarButtons from "./components/SideBarButtons"

function SideBar() {
  return (
    <>
      <SideBarButtons />
      <SearchBar />
      <UserCards />
    </>
  )
}

export default SideBar