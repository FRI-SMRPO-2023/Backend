import prisma from "../libs/prisma";
import bcrypt from "bcrypt";
import {ProjectCreate} from "../src/schemas/project.schema";

type User = {
    name: string;
    password: string,
    isAdmin: boolean
}
type Project = {
    name: string;
    description: string;
}

function getUsers(): Array<User> {
    return [
        {
            name: "admin",
            password: "qwer",
            isAdmin: true,
        },
        {
            name: "developer",
            password: "kudos",
            isAdmin: false
        }
    ]
}

function getProjects(): Array<Project> {
    return [
        {
            name: "test1",
            description: "mockup project used for development",
        }
    ]
}

async function seed() {
    // seed users
    await Promise.all(
        getUsers().map((user) => {
            // TODO use dotenv for number of salt rounds
            const hashed_pass = bcrypt.hashSync(user.password, 10);
            return prisma.user.create({
                data: {
                    name: user.name,
                    password: hashed_pass,
                    isAdmin: user.isAdmin
                }
            })
        })
    );
    // seed projects
    await Promise.all(
        getProjects().map((project) => {
            return prisma.project.create({
                data: {
                    name: project.name,
                    description: project.description,
                }
            })
        })
    )
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })


// async function main() {
//     const admin = await prisma.user.upsert({
//         where: { name: "admin" },
//         update: {},
//         create: {
//             name: "admin",
//             isAdmin: true,
//         }
//     });
//     const developer = await prisma.user.upsert({
//         where: { name: "developer" },
//         update: {},
//         create: {
//             name: "developer",
//             isAdmin: false,
//         }
//     });
//     console.log(admin, developer);
// }



// main()
//     .then(async () => {
//         await prisma.$disconnect()

//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)

//     })
