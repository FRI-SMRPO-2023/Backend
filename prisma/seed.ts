import prisma from "../libs/prisma";
import { BusinessValue } from "@prisma/client";
import bcrypt from "bcrypt";
import ProjectService from "../src/services/project.service";
import { UserCreate } from "../src/schemas/users.schema";
import { ProjectCreate } from "../src/schemas/project.schema";
import { TaskCreate } from "../src/schemas/task.schema";
import { SprintCreate } from "../src/schemas/sprint.schema";
import { StoryCreate } from "../src/schemas/story.schema";

function getUsers(): Array<UserCreate> {
    return [
        {
            username: "admin",
            name: "Stanko",
            lastName: "Premrl",
            password: "123456789012",
            email: "admin@prisma.com",
            isAdmin: true,
        },
        {
            username: "developer",
            name: "Slavko",
            lastName: "Podmrl",
            password: "123456789012",
            email: "developer@prisma.com",
            isAdmin: false
        },
        {
            username: "themaster",
            name: "Sonja",
            lastName: "Nadmrl",
            password: "123456789012",
            email: "developerka@prisma.com",
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
                },
                {
                    id: 3,
                    role: "ScrumMaster"
                }
            ]
        },
        {
            name: "project2",
            description: "Some descriptions",
            users: [
                {
                    id: 1,
                    role: "ProductOwner"
                },
                {
                    id: 3,
                    role: "ScrumMaster"
                }
            ]
        }
    ]
}

function getSprints(): Array<SprintCreate & {projectId: number}> {
    return [
        {   
            projectId: 1,
            name: "first sprint",
            startDate: new Date("2023-03-03"),
            endDate: new Date("2023-04-01"),
            speed: 20,
        },
        {   
            projectId: 1,
            name: "second sprint",
            startDate: new Date("2023-02-01"),
            endDate: new Date("2023-02-28"),
            speed: 20,
        },
    ]
}

function getStories(): Array<StoryCreate & {projectId: number}> {
    return [
        {
            projectId: 1,
            name: "test1",
            description: "mockup project used for development",
            priority: "MustHave",
            businessValue: "Low",
            acceptanceCriteria: "create new mockup",
            status: "SprintBacklog",
            sprintId: 1
        },
        {
            projectId: 1,
            name: "test2",
            description: "mockup project used for development",
            priority: "CouldHave",
            businessValue: "Medium",
            acceptanceCriteria: "create new mockup 2",
            status: "SprintBacklog",
            sprintId: 1
        },
        {
            projectId: 2,
            name: "test3",
            description: "In project 2",
            priority: "ShouldHave",
            businessValue: "High",
            acceptanceCriteria: "create new mockup, add new users",
            status: "ProductBacklog",
            sprintId: null
        }
    ]
}



function getTasks(): Array<TaskCreate & {storyId: number}> {
    return [
        {
            description: "fix the backend",
            status: "Assigned",
            asigneeId: 2,
            storyId: 1,
            timeEstimation: "PT4H"
        },
        {
            description: "fix the frontend",
            status: "Assigned",
            asigneeId: 3,
            storyId: 1,
            timeEstimation: "PT5H"
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
                username: user.username,
                name: user.name,
                lastName: user.lastName,
                password: hashed_pass,
                email: user.email,
                isAdmin: user.isAdmin
            }
        })
    }
    // seed projects
    for (let project of getProjects()) {
        await ProjectService.createProject(project);
    }

    for (let sprint of getSprints()) {
        await prisma.sprint.create({
            data: {
                ...sprint
            }
        })
    }

    for (let story of getStories()) {
        await prisma.story.create({
            data: {
                ...story
            }
        })
    }

    for (let task of getTasks()) {
        await prisma.task.create({
            data: {
                description: task.description,
                timeEstimation: task.timeEstimation,
                asigneeId: task.asigneeId,
                status: task.status,
                storyId: task.storyId
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