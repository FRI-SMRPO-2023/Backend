import prisma from "../../libs/prisma";
import { TaskReturn, TaskUpdate, TaskCreate} from "../schemas/task.schema";


const getTasksOnStory = async (storyId: number): Promise<TaskReturn[]> => {
    return prisma.task.findMany({
        where: {
            storyId: storyId
        },
        select: {
            id: true,
            storyId: true,
            description: true,
            timeEstimation: true,
            asigneeId: true,
            status: true,
        }
    })
}

const updateTaskById = async (taskId: number, task: TaskUpdate): Promise<TaskReturn> => {
    return prisma.task.update({
        where: {
            id: taskId
        },
        data: task,
        select: {
            id: true,
            storyId: true,
            description: true,
            asigneeId: true,
            timeEstimation: true,
            status: true
        }
    })
}

const createTask = async (storyId: number, task: TaskCreate): Promise<TaskReturn> => {
    return prisma.task.create({
        data: {
            ...task,
            storyId: storyId
        }
    })
};

const deleteTask = async (taskId: number): Promise<TaskReturn> => {
    return prisma.task.delete({
        where: {
            id: taskId
        }
    })
}

const TaskService = {
    getTasksOnStory,
    createTask,
    updateTaskById,
    deleteTask
};

export default TaskService;