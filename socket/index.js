const io = require("socket.io")( 443, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true
});

let activeUsers = [];

let onlineUsers = [];

const addNewUser = (name, socketId) => {
  !onlineUsers.some((user) => user.name === name) &&
    onlineUsers.push({ name, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (name) => {
  return onlineUsers.find((user) => user.name === name);
};

io.on("connection", (socket) => {
  //add new  User
  socket.on("new-user-add", (newUserId) => {
    //if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    io.emit("get-users", activeUsers);
  });

   // Listen for 'user-blocked' event
  socket.on('user-blocked', ({ userId }) => {
    // Broadcast the event to all clients
    io.emit('user-blocked', { userId });
  });


  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver?.socketId).emit("getNotification", {
      senderName,
      type,
    });
   
  });

  //send Message
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
    removeUser(socket.id);
  });
});
