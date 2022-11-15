import { Router } from "express";

import chat from "./chat";
import room from "./room";
import user from "./user";

const router = Router();

/* 네임 스페이스 만들기 */
router.use("/chat", chat);
router.use("/user", user);
router.use("/room", room);

export default router;
