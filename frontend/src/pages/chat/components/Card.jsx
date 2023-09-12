function Card() {
  return (
    <button className="btn card">
      <div className="user-info">
        <span className="name">Имя пользователя</span>
        <span className="email"><i>example@example.com</i></span>
      </div>
      <div className="delete-button">X</div>
    </button>
  )
}

export default Card