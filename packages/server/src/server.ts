import express, { Application } from "express";
import session from "express-session";
import cors from "cors"

import sequelize from "./sequelize";
import routes from "./routes";
import socket from "./socket";

const FileStore = require("session-file-store")(session);

const app: Application = express();

const sessionMiddleware = session({
  secret: "kekeonibs", // 쿠키를 임의로 변조하는 것을 방지하기 위한 값으로써 이 값을 통해 세션을 암호화하여 저장함
  saveUninitialized: true, // 세션이 저장되기 전에 언 이니셜라이즈드 상태로 만들어서 저장하겠다라는 설정
  cookie: { secure: false },
  resave: false, // 세션을 언제나 저장할지 정하는 값
  store: new FileStore()
})

app.use(sessionMiddleware);
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

sequelize.sync({force: true });

app.use("/", routes)

const server = app.listen(8000, () => {
  console.log("start")
});

socket(server, app, sessionMiddleware);