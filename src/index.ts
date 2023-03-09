import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { userRouter } from "./routes/user.router";
import projectRouter from "./routes/project.router";
import usersOnProjectsRouter from "./routes/userOnProject.router";
import swaggerDocs from "./utils/swagger";


dotenv.config();

if (!process.env.PORT) {
    console.error("PORT not specified in .env file");
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

//add routers
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
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
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    swaggerDocs(app);
});

// log unhandled rejections
process.on('unhandledRejection', (err) => {
    console.log(err);
});
