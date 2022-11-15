import { Router } from "express";
import { v4 as uuid } from "uuid";

import User from "../schemas/user";
import { Op } from "sequelize";

const router = Router();

/* 유저 목록 */
router.get("/", async (request, response) => {
  try {
    const result = await User.findAndCountAll({
      where: {
        id: {
          [Op.ne]: request.session.userId,
        },
      },
    });

    response.json(result);
  } catch (e) {}
});
/* 세션 조회 */
router.get("/me", async (request, response) => {
  try {
    response.json({
      username: request.session.username,
      userId: request.session.userId,
      isLogged: request.session.isLogged,
    });
  } catch (e) {}
});
/* 로그인 */
router.post("/login", async (request, response) => {
  try {
    const userId = uuid();
    const username = request.body.username;

    const user = await User.create({
      is: userId,
      username,
    });

    request.session.username = username;
    request.session.userId = userId;
    request.session.isLogged = true;

    request.session.save(() => {
      response.json({
        statusText: "Ok",
        data: user,
      });
    });
  } catch (e) {}
});
/* 로그아웃 */

router.post("/logout", async (request, response) => {
  try {
    delete request.session.user;

    request.session.save(() => {
      response.redirect("/");
    });
  } catch (e) {}
});

export default router;
