import prisma from "../../libs/prisma";
import { SprintCreate, SprintReturn } from "../schemas/sprint.schema";

const getCurrentSprint = async (projectId: number): Promise<SprintReturn | null> => {
    const now = new Date();
    return prisma.sprint.findFirst({
        where: {
            projectId: projectId,
            startDate: {
                lte: now
            },
            endDate: {
                gte: now
            }
        }
    })
}

const getAllSprints = async (projectId: number): Promise<SprintReturn[]> => {
    return prisma.sprint.findMany({
        where: {
            projectId: projectId
        }
    });
}

const createNewSprint = async (projectId: number, sprint: SprintCreate): Promise<SprintReturn> => {
    console.log("this is sprint", sprint)
    return prisma.sprint.create({
        data: {
            projectId: projectId,
            name: sprint.name,
            startDate: new Date(sprint.startDate),
            endDate: new Date(sprint.endDate),
            speed: sprint.speed
        }
    })
}

const collidingDates = async (sprint1: SprintReturn, sprintnew: {startDate: Date, endDate: Date}): Promise<boolean> => {
    return (sprint1.startDate >= sprintnew.startDate || sprint1.endDate >= sprintnew.startDate) &&
        (sprint1.startDate <= sprintnew.endDate || sprint1.endDate <= sprintnew.endDate)

}


const SprintService = {
    getCurrentSprint,
    getAllSprints,
    createNewSprint,
    collidingDates
};

export default SprintService;