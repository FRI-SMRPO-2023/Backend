import prisma from "../../libs/prisma";
import SprintService from "./sprint.service";
import { TaskReturn, TaskUpdate, TaskCreate } from "../schemas/task.schema";

const getTasksOnStory = async (storyId: number): Promise<TaskReturn[]> => {
    return prisma.task.findMany({
        where: {
            storyId: storyId,
        },
        select: {
            id: true,
            storyId: true,
            description: true,
            timeEstimation: true,
            asigneeId: true,
            asignee: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    lastName: true,
                    email: true,
                    isAdmin: true,
                    lastLogin: true,
                },
            },
            status: true,
        },
    });
};

const getTasksOnCurrentSprint = async (
    projectId: number
): Promise<TaskReturn[]> => {
    let currentSprint = await SprintService.getCurrentSprint(projectId);
    if (currentSprint) {
        let sprintId = currentSprint.id;
        return prisma.task.findMany({
            where: {
                story: {
                    sprintId: sprintId,
                },
            },
            select: {
                id: true,
                storyId: true,
                description: true,
                timeEstimation: true,
                asignee: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        lastName: true,
                        email: true,
                        isAdmin: true,
                        lastLogin: true,
                    },
                },
                status: true,
            },
        });
    }
    return Promise.resolve([]);
};

const getSingle = async (taskId: number): Promise<TaskReturn> => {
    return prisma.task.findUniqueOrThrow({
        where: {
            id: taskId,
        },
        select: {
            id: true,
            storyId: true,
            description: true,
            timeEstimation: true,
            asigneeId: true,
            asignee: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    lastName: true,
                    email: true,
                    isAdmin: true,
                    lastLogin: true,
                },
            },
            status: true,
        },
    });
};

const updateTaskById = async (
    taskId: number,
    task: TaskUpdate
): Promise<TaskReturn> => {
    return prisma.task.update({
        where: {
            id: taskId,
        },
        data: task,
        select: {
            id: true,
            storyId: true,
            description: true,
            asigneeId: true,
            timeEstimation: true,
            asignee: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    lastName: true,
                    email: true,
                    isAdmin: true,
                    lastLogin: true,
                },
            },
            status: true,
        },
    });
};

const createTask = async (
    storyId: number,
    task: TaskCreate
): Promise<TaskReturn> => {
    return prisma.task.create({
        data: {
            ...task,
            storyId: storyId,
        },
        select: {
            id: true,
            storyId: true,
            description: true,
            asigneeId: true,
            timeEstimation: true,
            asignee: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    lastName: true,
                    email: true,
                    isAdmin: true,
                    lastLogin: true,
                },
            },
            status: true,
        },
    });
};

const deleteTask = async (taskId: number): Promise<TaskReturn> => {
    return prisma.task.delete({
        where: {
            id: taskId,
        },
    });
};

const TaskService = {
    getTasksOnStory,
    getTasksOnCurrentSprint,
    getSingle,
    createTask,
    updateTaskById,
    deleteTask,
};

export default TaskService;
