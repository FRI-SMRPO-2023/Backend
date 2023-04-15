import prisma from "../../libs/prisma";
import type { TimeLogCreate, TimeLogReturn } from "../schemas/timelog.schema";
import { isoDurationToHours } from "../utils/datetime_conversion";

const getTimeLogsStory = async (storyId: number): Promise<TimeLogReturn[]> => {
  return prisma.timeLog.findMany({
    where: {
      task: {
        storyId: storyId,
      },
    },
    select: {
      id: true,
      userId: true,
      taskId: true,
      day: true,
      hours: true,
      hours_estimate: true,
    },
  });
};

const getTimeLogsTask = async (taskId: number): Promise<TimeLogReturn[]> => {
  return prisma.timeLog.findMany({
    where: {
      taskId: taskId,
    },
    select: {
      id: true,
      userId: true,
      taskId: true,
      day: true,
      hours: true,
      hours_estimate: true,
    },
  });
};

const createTimeLog = async (
  timeLog: TimeLogCreate
): Promise<TimeLogReturn> => {
  let log = await prisma.timeLog.findUnique({
    where: {
      userId_taskId_day: {
        userId: timeLog.userId,
        taskId: timeLog.taskId,
        day: new Date(timeLog.day),
      },
    },
  });
  if (log) {
    return prisma.timeLog.update({
      where: {
        userId_taskId_day: {
          userId: log.userId,
          taskId: log.taskId,
          day: log.day,
        },
      },
      data: {
        hours: log.hours + timeLog.hours,
      },
      select: {
        id: true,
        userId: true,
        taskId: true,
        day: true,
        hours: true,
        hours_estimate: true,
      },
    });
  }
  let task = await prisma.task.findUniqueOrThrow({
    where: {
      id: timeLog.taskId,
    },
  });
  console.log("the task: ", task);
  return prisma.timeLog.create({
    data: {
      userId: timeLog.userId,
      taskId: timeLog.taskId,
      day: new Date(timeLog.day),
      hours: timeLog.hours,
      hours_estimate: isoDurationToHours(task.timeEstimation),
    },
    select: {
      id: true,
      userId: true,
      taskId: true,
      day: true,
      hours: true,
      hours_estimate: true,
    },
  });
};
const TimeLogService = {
  getTimeLogsStory,
  getTimeLogsTask,
  createTimeLog,
};
export default TimeLogService;
