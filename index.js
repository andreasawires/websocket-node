const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

let app = express();
const port = 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "welcome to the beginning of greatness",
  });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
	console.log("We are live and connected");
  console.log(socket.id);

	const createdMessage = (msg) => {
		console.log(msg)
    socket.broadcast.emit("newIncomingMessage", msg);
  };

	socket.on("createdMessage", createdMessage);
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});