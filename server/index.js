const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js')
const messagesRoute = require('./routes/messagesRoute.js')
const app = express();
const socket = require('socket.io');
require('dotenv').config();
// const path = require('path');


app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use("/api/messages", messagesRoute);



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`connected to mongodb Database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Erroer in Mongodb ${error}`);
    }
}
connectDB(); 


const server = app.listen(process.env.PORT, () => {
    console.log(`Server Successfully Running on PORT: ${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
});