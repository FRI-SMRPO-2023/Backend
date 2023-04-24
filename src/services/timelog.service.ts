import prisma from "../../libs/prisma";
import type {
  TimeLogCreate,
  TimeLogReturn,
  TimeLogUpdate,
} from "../schemas/timelog.schema";
import { isoDurationToHours } from "../utils/datetime_conversion";

// const fillTimeLogsTask = async (taskId: number) => {
//   console.log("LOGGING1");
//   const today = new Date();
//   const task = await prisma.task.findUnique({
//     where: {
//       id: taskId,
//     },
//     select: {
//       id: true,
//       asigneeId: true,
//       timeEstimation: true,
//       story: {
//         select: {
//           sprint: {
//             select: {
//               startDate: true,
//               endDate: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   if (task != null && task.story.sprint?.startDate && task.story.sprint.startDate > today) {
//     return;
//   }
//   console.log("LOGGING2");
//   if (task != null && task.asigneeId && task.story.sprint) {
//     const newLog: TimeLogCreate = {
//       userId: task.asigneeId,
//       taskId: task.id,
//       day: task.story.sprint?.startDate,
//       hours: 0,
//     };
//     await createTimeLog(newLog);
//   }
//   console.log("LOGGING3");
//   const lastLog = await prisma.timeLog.findFirst({
//     where: {
//       taskId: taskId,
//     },
//     select: {
//       day: true,
//       userId: true,
//       taskId: true,
//       task: {
//         select: {
//           story: {
//             select: {
//               sprint: {
//                 select: {
//                   startDate: true,
//                   endDate: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     orderBy: [
//       {
//         day: "desc",
//       },
//     ],
//   });
//   console.log("LOGGING4");
//   if (lastLog != null) {
//     console.log("ITERATING");
//     let endDate = lastLog.task.story.sprint?.endDate;
//     let lastdate = new Date(lastLog.day);
//     if (endDate) {
//       console.log("ENDDATE");
//       if (today < endDate) {
//         endDate = today;
//       }
//       console.log(endDate);
//       console.log(lastdate);
//       while (lastdate < endDate) {
//         const newLog: TimeLogCreate = {
//           userId: lastLog.userId,
//           taskId: lastLog.taskId,
//           day: lastdate,
//           hours: 0,
//         };
//         await createTimeLog(newLog);
//         lastdate.setDate(lastdate.getDate() + 1);
//       }
//     }
//   }
//   console.log("LOGGING5");
// };
//
// const fillTimeLogsStory = async (storyId: number) => {
//   const alltasks = await prisma.story.findMany({
//     where: {
//       id: storyId,
//     },
//     select: {
//       tasks: {
//         select: {
//           id: true,
//           asigneeId: true,
//         },
//       },
//       sprint: {
//         select: {
//           startDate: true,
//           endDate: true,
//         },
//       },
//     },
//   });
//   if (alltasks[0].sprint && alltasks[0].sprint.startDate > new Date()) {
//     return;
//   }
//   const taskIds = alltasks[0].tasks;
//   for (let task of taskIds) {
//     if (task.asigneeId && alltasks[0].sprint) {
//       const newLog: TimeLogCreate = {
//         userId: task.asigneeId,
//         taskId: task.id,
//         day: alltasks[0].sprint.startDate,
//         hours: 0,
//       };
//       await createTimeLog(newLog);
//     }
//     const lastLog = await getLatestTimeLogTask(task.id);
//     if (lastLog != null) {
//       const today = new Date();
//       let endDate = alltasks[0].sprint?.endDate;
//       let lastdate = new Date(lastLog.day);
//       if (endDate) {
//         if (today < endDate) {
//           endDate = today;
//         }
//         while (lastdate < endDate) {
//           const newLog: TimeLogCreate = {
//             userId: lastLog.userId,
//             taskId: lastLog.taskId,
//             day: lastdate,
//             hours: 0,
//           };
//           await createTimeLog(newLog);
//           lastdate.setDate(lastdate.getDate() + 1);
//         }
//       }
//     }
//   }
// };

const getTimeLogsStory = async (
  storyId: number,
): Promise<TimeLogReturn[]> => {
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
    orderBy: [
      {
        taskId: "asc",
      },
      {
        day: "asc",
      },
    ],
  });
};

const getTimeLogsTask = async (
  taskId: number,
): Promise<TimeLogReturn[]> => {
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
    orderBy: {
      day: "asc"
    }
  });
};

const getLatestTimeLogTask = async (
  taskId: number,
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
  timeLog: TimeLogCreate,
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
