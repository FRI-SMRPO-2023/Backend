import prisma from "../libs/prisma";
import { BusinessValue, Story } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserCreate } from "../src/schemas/users.schema";
import { ProjectCreate } from "../src/schemas/project.schema";

function getUsers(): Array<UserCreate> {
    return [
        {
            name: "admin",
            password: "123456789012",
            email: "admin@prisma.com",
            isAdmin: true,
        },
        {
            name: "developer",
            password: "password1234",
            email: "developer@prisma.com",
            isAdmin: false
        }
    ]
}

function getProjects(): Array<ProjectCreate> {
    return [
        {
            name: "test1",
            description: "mockup project used for development",
            users: [
                {
                    id: 1,
                    role: "ProductOwner"
                },
                {
                    id: 2,
                    role: "Developer"
                }
            ]
        }
    ]
}

function getStories(): Array<Story> {
    return [
        {
            id: 1,
            projectId: 1,
            name: "test1",
            description: "mockup project used for development",
            priority: "MustHave",
            businessValue: "Low"
        },
        {
            id: 2,
            projectId: 1,
            name: "test2",
            description: "mockup project used for development",
            priority: "CouldHave",
            businessValue: "Medium"
        },
        {
            id: 3,
            projectId: 1,
            name: "test3",
            description: "mockup project used for development",
            priority: "ShouldHave",
            businessValue: "High"
        }
    ]
}

async function seed() {
    // seed users
    for (let user of getUsers()) {
        const saltRounds: number = Number(process.env.SALT_ROUNDS) ?? 10;
        const hashed_pass = bcrypt.hashSync(user.password, saltRounds);
        await prisma.user.create({
            data: {
                name: user.name,
                password: hashed_pass,
                email: user.email,
                isAdmin: user.isAdmin
            }
        })
    }
    // seed projects
    for (let project of getProjects()) {
        await prisma.project.create({
            data: {
                name: project.name,
                description: project.description,
                users: {
                    create: [
                        { role: "ProjectManager", user: { connect: { id: 1 } } },
                        { role: "Developer", user: { connect: { id: 2 } } }
                    ]
                }
            }
        })
    }

    for (let story of getStories()) {
        await prisma.story.create({
            data: {
                projectId: story.projectId,
                name: story.name,
                description: story.description,
                priority: story.priority,
                businessValue: story.businessValue
            }
        })
    }

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