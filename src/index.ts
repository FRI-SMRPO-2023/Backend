import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { UserWithId } from "./schemas/users.schema";
import { validateProjectId } from "./services/validator.service";
declare module "express-session" {
  interface Session {
    user: UserWithId;
    authenticated: boolean;
    views: number;
  }
}

const store = new session.MemoryStore();
import cors from "cors";

import userRouter from "./routes/user.router";
import projectRouter from "./routes/project.router";
import storyRouter from "./routes/story.router";
import usersOnProjectsRouter from "./routes/userOnProject.router";
import authRouter from "./routes/auth.router";
import { authorizer, adminAuthorizer } from "./middleware/authorizeUser";
import swaggerDocs from "./utils/swagger";

dotenv.config();

if (!process.env.PORT) {
  console.error("PORT not specified in .env file");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "change this to use ENV variable",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      sameSite: "strict",
    },
    proxy: true,
    name: "session",
  })
);

//docs
swaggerDocs(app);

//authentication routes
app.use("/api/auth", authRouter);

//use authorization middleware after authentication api
app.use(authorizer);

//add routers
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
// app.use("/api/projects/:projectId/stories", validateProjectId, storyRouter);
app.use("/api/", usersOnProjectsRouter);

/**
 * @openapi
 * /healthcheck:
 *  get:
 *    tags:
 *    - Healthcheck
 *    description: Respond if the app is running normally
 *    responses:
 *      200:
 *        description: Healthy
 */
app.get("/healthcheck", async (req: express.Request, res: express.Response) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// log unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log(err);
});
