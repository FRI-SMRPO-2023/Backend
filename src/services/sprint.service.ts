import prisma from "../../libs/prisma";
import { SprintCreate, SprintReturn } from "../schemas/sprint.schema";

const getCurrentSprint = async (): Promise<SprintReturn | null> => {
    const now = new Date();
    return prisma.sprint.findFirst({
        where: {
            startDate: {
                lte: now
            },
            endDate: {
                gte: now
            }
        }
    })
}

const getAllSprints = async (): Promise<SprintReturn[]> => {
    return prisma.sprint.findMany();
}

const createNewSprint = async (sprint: SprintCreate): Promise<SprintReturn> => {
    console.log(sprint)
    return prisma.sprint.create({
        data: {
            startDate: new Date(sprint.startDate),
            endDate: new Date(sprint.endDate),
            speed: sprint.speed
        }
    })
}


const SprintService = {
    getCurrentSprint,
    getAllSprints,
    createNewSprint
};

export default SprintService;