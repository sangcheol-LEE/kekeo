import { Router } from "express";
import Chat from "../schemas/chat";
import User from "../schemas/user";
import Room from "../schemas/room";

const router = Router();

/* 채팅 목록 */
router.get("/:roomId", async (request, response) => {
  try {
    const chat = await Chat.findAll({
      where: {
        roomId: request.params.roomId,
      },
      include: [User, Room],
    });

    response.json(chat);
  } catch (e) {}
});

/* 채팅 전송 */
router.post("/:roomId", async (request, response) => {
  try {
    const chat = await Chat.create({
      // @ts-ignore
      senderId: request.session.userId,
      content: request.body.content,
      roomId: request.params.roomId,
    });

    const io = request.app.get("io");

    io.of("/chat").to(request.params.roomId).emit("chat", chat);

    response.json({ message: "OK!" });
  } catch (e) {}
});

export default router;
