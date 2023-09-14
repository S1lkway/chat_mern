import AddMessageBar from "./components/AddMessageBar"

function Messages() {
  return (
    <>
      <div className="messages_area">
        <div className="message_box">
          <div className="message">
            <span className="message_text">Modi, repudiandae soluta maiores facere ad molestias corrupti error</span>
          </div>
        </div>
        <div className="message_box flex_end">
          <div className="message">
            <span className="message_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum aspernatur voluptate voluptatum enim, sapiente magnam eaque ratione. Modi, repudiandae soluta maiores facere ad molestias corrupti error est officiis dolore ratione.</span>
          </div>
        </div>
        <div className="message_box">
          <div className="message">
            <span className="message_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
          </div>
        </div>
        <div className="message_box">
          <div className="message">
            <span className="message_text">Modi, repudiandae soluta maiores facere ad molestias corrupti error est officiis dolore ratione.</span>
          </div>
        </div>
        <div className="message_box flex_end">
          <div className="message">
            <span className="message_text">Lorem</span>
          </div>
        </div>
      </div>
      <AddMessageBar />
    </>

  )
}

export default Messages