const path = require("path");
const models = require("./models");

const express = require("express");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const chatRoutes = require("./routes/chat.routes");

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/chat", chatRoutes);

let users = [];

io.on("connection", (socket) => {
  let uuid = "";
  console.log("\nConnection\n");

  socket.on("login", async (payload) => {
    console.log("\nConnecté, ", payload, "\n");
    uuid = payload.uuid;
    users[uuid] = socket.id;
    try {
      const user = await models.User.findOne({ where: { uuid: payload.uuid } });
      user.isConnected = true;
      await user.save();
      io.emit("login", payload);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("global message", async function (data) {
    try {
      const user = await models.User.findOne({
        where: { uuid: data.uuid },
      });

      const newMessage = await models.Chat.create({
        message: data.message,
        userId: user.id,
      });

      const message = await models.Chat.findOne({
        where: { id: newMessage.id },
        include: "user",
      });

      io.emit("global message", message);
    } catch (error) {
      console.log(error)
    }
  });

  socket.on("private message", function (data) {
    var socketId = users[data.receiver.uuid];
    console.log("\n" + socketId);
    console.log("\n" + data.msg);
    io.to(socketId).emit("private message", data);
  });

  socket.on("disconnect", async () => {
    console.log("\n\nUser disconnected " + uuid + "\n");
    delete users[uuid];
    try {
      const user = await models.User.findOne({ where: { uuid } });
      user.isConnected = false;
      await user.save();
      io.emit("logout", { uuid });
    } catch (e) {
      console.log(e);
    }
  });
});

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");

server.listen(port, () => {
  console.log("Listening on " + port);
});
