import { db } from "../src/utils/db.server";
import {CreateProjectDTO} from "../src/schemas/project.schema"

type User = {
    name: string;
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
            isAdmin: true,
        },
        {
            name: "developer",
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
            return db.user.create({
                data: {
                    name: user.name,
                    isAdmin: user.isAdmin
                }
            })
        })
    );
    // seed projects
    await Promise.all(
        getProjects().map((project) => {
            return db.project.create({
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
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
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
