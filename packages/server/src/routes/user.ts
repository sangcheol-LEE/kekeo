import { Router } from "express";
import { v4 as uuid } from "uuid";

import mock from "../mock";
import User from "../schemas/user";
import { Op } from "sequelize";

const router = Router();

/* 유저 목록 */
router.get("/", async (request, response) => {
  try {
    const result = await User.findAndCountAll({
      where: {
        id: {
          // @ts-ignore
          [Op.ne]: request.session.userId,
        },
      },
    });

    response.json(result);
  } catch (e) {}
});

router.post("/mock", async (req, res) => {
  try {
    await User.create({
      id: uuid(),
      username: mock[0].username,
      thumbnailImageUrl: mock[0].thumbnailImageUrl,
    });
    await User.create({
      id: uuid(),
      username: mock[1].username,
      thumbnailImageUrl: mock[1].thumbnailImageUrl,
    });
    await User.create({
      id: uuid(),
      username: mock[2].username,
      thumbnailImageUrl: mock[2].thumbnailImageUrl,
    });

    res.json({
      statusText: "OK",
    });
  } catch (e) {}
});

/* 유저 생성 */
router.post("/", async (req, res) => {
  try {
    const user = await User.create({
      id: uuid(),
      username: req.body.username,
      thumbnailImageUrl: req.body.thumbnailImageUrl,
    });

    res.json(user);
  } catch (e) {}
});
/* 세션 조회 */
router.get("/me", async (request, response) => {
  try {
    response.json({
      // @ts-ignore
      username: request.session.username,
      // @ts-ignore
      userId: request.session.userId,
      // @ts-ignore
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
      id: userId,
      username,
    });
    // @ts-ignore
    request.session.username = username;
    // @ts-ignore
    request.session.userId = userId;
    // @ts-ignore
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
    // @ts-ignore
    delete request.session.user;

    request.session.save(() => {
      response.redirect("/");
    });
  } catch (e) {}
});

export default router;
