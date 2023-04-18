import prisma from "../../libs/prisma";
import type {
  TimeLogCreate,
  TimeLogReturn,
  TimeLogUpdate,
} from "../schemas/timelog.schema";
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

const getLatestTimeLogTask = async (
  taskId: number
): Promise<TimeLogReturn | null> => {
  return prisma.timeLog.findFirst({
    where: {
      taskId: taskId,
    },
    orderBy: [
      {
        day: "desc",
      },
    ],
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
  var hours_estimate = 0;
  let lastLog = await getLatestTimeLogTask(timeLog.taskId);
  if (!lastLog) {
    let task = await prisma.task.findUniqueOrThrow({
      where: {
        id: timeLog.taskId,
      },
    });
    hours_estimate = isoDurationToHours(task.timeEstimation);
  } else {
    hours_estimate = lastLog.hours_estimate;
  }
  return prisma.timeLog.create({
    data: {
      userId: timeLog.userId,
      taskId: timeLog.taskId,
      day: new Date(timeLog.day),
      hours: timeLog.hours,
      hours_estimate: hours_estimate,
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

const updateTimeLog = async (
  timeLogId: number,
  timeLogUpdate: TimeLogUpdate
): Promise<TimeLogReturn | null> => {
  return prisma.timeLog.update({
    where: {
      id: timeLogId,
    },
    data: {
      ...timeLogUpdate,
    },
  });
};

const TimeLogService = {
  getTimeLogsStory,
  getTimeLogsTask,
  createTimeLog,
  updateTimeLog,
};

export default TimeLogService;
