import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// const connectToChat = (chatData) => {
//   socket.emit("join chat room", chatData);
// };

export default socket;
