const SocketIO = require("socket.io");

import { Application, NextFunction, request, RequestHandler } from "express";
import { Server } from "net";
import { Socket } from "socket.io";

const socket = (server : Server, app : Application, session: RequestHandler) => {
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*"
    }
  });

  app.set("io", io);

  const chat = io.of("/chat");

  io.use((socket: Socket, next: NextFunction) => {
    const request = socket.request;

    const response = socket.request.response || {};

    session(request, response, next);
  });

  chat.on("connection", async(request, response) => {

    socket.on("join", (roomId) => {
      socket.join(roomId);
    });

    socket.on("disconnect", (data) => {
      console.log("Disconnected to Chat");
    });
  });
};

export default socket;