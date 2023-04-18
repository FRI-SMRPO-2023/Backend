import prisma from "../../libs/prisma";
import {
  SprintCreate,
  SprintReturn,
  SprintUpdate,
} from "../schemas/sprint.schema";

const getCurrentSprint = async (
  projectId: number
): Promise<SprintReturn | null> => {
  const now = new Date();
  return prisma.sprint.findFirst({
    where: {
      projectId: projectId,
      startDate: {
        lte: now,
      },
      endDate: {
        gte: now,
      },
    },
  });
};

const getAllSprints = async (projectId: number): Promise<SprintReturn[]> => {
  return prisma.sprint.findMany({
    where: {
      projectId: projectId,
    },
  });
};

const getSprintById = async (sprintId: number): Promise<SprintReturn | null> => {
  return prisma.sprint.findUnique({
    where: {
      id: sprintId,
    },
  });
};

const createNewSprint = async (
  projectId: number,
  sprint: SprintCreate
): Promise<SprintReturn> => {
  console.log("this is sprint", sprint);
  return prisma.sprint.create({
    data: {
      projectId: projectId,
      name: sprint.name,
      startDate: new Date(sprint.startDate),
      endDate: new Date(sprint.endDate),
      speed: sprint.speed,
    },
  });
};

const updateSprint = async (
  sprintId: number,
  sprint: SprintUpdate
): Promise<SprintReturn> => {
  return prisma.sprint.update({
    where: {
      id: sprintId,
    },
    data: {
      name: sprint.name,
      startDate: sprint.startDate ? new Date(sprint.startDate) : undefined,
      endDate: sprint.endDate ? new Date(sprint.endDate) : undefined,
      speed: sprint.speed,
    },
  });
};

const deleteSprint = async (sprintId: number): Promise<SprintReturn | undefined> => {
  return prisma.sprint.delete({
    where: {
      id: sprintId
    }
  })

}

const collidingDates = async (
  sprint1: SprintReturn,
  sprintnew: { startDate: Date; endDate: Date }
): Promise<boolean> => {
  return (
    (sprint1.startDate >= sprintnew.startDate ||
      sprint1.endDate >= sprintnew.startDate) &&
    (sprint1.startDate <= sprintnew.endDate ||
      sprint1.endDate <= sprintnew.endDate)
  );
};

const dateInOrder = (newDates: { startDate: Date; endDate: Date }): boolean => {
  return newDates.startDate < newDates.endDate;
};

const SprintService = {
  getCurrentSprint,
  getAllSprints,
  createNewSprint,
  updateSprint,
  getSprintById,
  deleteSprint,
  collidingDates,
  dateInOrder,
};

export default SprintService;
