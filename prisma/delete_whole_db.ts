import prisma from "../libs/prisma";
import dotenv from "dotenv";

dotenv.config();


async function resetDatabase() {

    if (process.env.ENV_TYPE === "dev") {
        await prisma.$queryRaw`DROP SCHEMA public CASCADE`;
        // for (let i = 0; i < tables.length; i++) {
        //     prisma.$queryRaw`DROP`
        // }
    } else {
        console.log(".env variable ENV_TYPE is not dev, so the db was not reset");
    }
}

resetDatabase()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

