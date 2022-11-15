import { request, response, Router } from "express";
import Room from "../schemas/room";
import User from "../schemas/user";

const router = Router();

/* 채팅방 목록 */
router.get("/", async (request, response) => {
  try {
    const rooms = await Room.findAll({
      include: User,
    });
    response.json(rooms);
  } catch (e) {}
});

/* 채팅방 상세 */
router.get("/:roomId", async (request, response) => {
  try {
    const room = await Room.findOne({
      where: {
        id: Number(request.params.roomId),
      },
      include: User,
    });

    response.json(room);
  } catch (e) {}
});

/* 채팅방 생성 */
router.post("/", async (request, response) => {
  try {
    const room = await Room.create({
      opponentId: request.body.opponentId,
    });

    response.json(room);
  } catch (e) {}
});

export default router;
