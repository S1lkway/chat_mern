import Card from "./Card"

function UserCard(props) {
  return (
    <div className="user_cards">
      {props.sideBarList?.map((chat, index) => (
        <Card id={index} chat={chat} />
      ))}
    </div>
  )
}

export default UserCard