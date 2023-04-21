import prisma from "../libs/prisma";
import bcrypt from "bcrypt";
import ProjectService from "../src/services/project.service";
import { UserCreate } from "../src/schemas/users.schema";
import { ProjectCreate } from "../src/schemas/project.schema";
import { TaskCreate } from "../src/schemas/task.schema";
import { SprintCreate } from "../src/schemas/sprint.schema";
import { StoryCreate } from "../src/schemas/story.schema";
import { TimeLogCreate } from "../src/schemas/timelog.schema";
import { ProjectWallCreate } from "../src/schemas/projectWall.schema";

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
      isAdmin: false,
    },
    {
      username: "themaster",
      name: "Sonja",
      lastName: "Nadmrl",
      password: "123456789012",
      email: "developerka@prisma.com",
      isAdmin: false,
    },
  ];
}

function getProjects(): Array<ProjectCreate> {
  return [
    {
      name: "test1",
      description: "mockup project used for development",
      users: [
        {
          id: 1,
          role: "Developer",
        },
        {
          id: 2,
          role: "ProductOwner",
        },
        {
          id: 3,
          role: "ScrumMaster",
        },
      ],
    },
    {
      name: "project2",
      description: "Some descriptions",
      users: [
        {
          id: 1,
          role: "ProductOwner",
        },
        {
          id: 3,
          role: "ScrumMaster",
        },
      ],
    },
  ];
}

function getSprints(): Array<SprintCreate & { projectId: number }> {
  return [
    {
      projectId: 1,
      name: "Sprint 5",
      startDate: new Date("2023-08-01").toISOString(),
      endDate: new Date("2023-08-28").toISOString(),
      speed: 20,
    },
    {
      projectId: 1,
      name: "Sprint 4",
      startDate: new Date("2023-06-01").toISOString(),
      endDate: new Date("2023-07-28").toISOString(),
      speed: 20,
    },
    {
      projectId: 1,
      name: "Sprint 3",
      startDate: new Date("2023-04-18").toISOString(),
      endDate: new Date("2023-05-30").toISOString(),
      speed: 20,
    },
    {
      projectId: 1,
      name: "Sprint 2",
      startDate: new Date("2023-02-01").toISOString(),
      endDate: new Date("2023-02-28").toISOString(),
      speed: 20,
    },
    {
      projectId: 1,
      name: "Sprint 1",
      startDate: new Date("2023-01-01").toISOString(),
      endDate: new Date("2023-01-28").toISOString(),
      speed: 20,
    },
  ];
}

function getStories(): Array<StoryCreate & { projectId: number }> {
  return [
    {
      projectId: 1,
      name: "test1",
      description: "mockup project used for development",
      priority: "MustHave",
      businessValue: 2,
      acceptanceCriteria: "create new mockup",
      status: "ProductBacklog",
      sprintId: null,
    },
    {
      projectId: 1,
      name: "test2",
      description: "mockup project used for development",
      priority: "CouldHave",
      businessValue: 5,
      acceptanceCriteria: "create new mockup 2",
      status: "ProductBacklog",
      sprintId: null,
    },
    {
      projectId: 2,
      name: "test3",
      description: "In project 2",
      priority: "ShouldHave",
      businessValue: 9,
      acceptanceCriteria: "create new mockup, add new users",
      status: "ProductBacklog",
      sprintId: null,
    },
  ];
}

function getTasks(): Array<TaskCreate & { storyId: number }> {
  return [
    {
      description: "fix the backend",
      status: "Assigned",
      asigneeId: 2,
      storyId: 1,
      timeEstimation: "PT4H",
    },
    {
      description: "fix the frontend",
      status: "Assigned",
      asigneeId: 3,
      storyId: 1,
      timeEstimation: "PT5H",
    },
  ];
}

function getTimeLogs(): Array<
  TimeLogCreate & { storyId: number; hours_estimate: number }
> {
  return [
    {
      storyId: 1,
      userId: 1,
      taskId: 1,
      day: new Date("2023-03-10"),
      hours: 5.0,
      hours_estimate: 7.0,
    },
    {
      storyId: 1,
      userId: 2,
      taskId: 1,
      day: new Date("2023-03-11"),
      hours: 2.0,
      hours_estimate: 7.0,
    },
    {
      storyId: 1,
      userId: 2,
      taskId: 1,
      day: new Date("2023-03-12"),
      hours: 5.5,
      hours_estimate: 1.0,
    },
  ];
}

function getProjectWallMessages(): Array<
  ProjectWallCreate & { projectId: number }
> {
  return [
    {
      userId: 1,
      projectId: 1,
      title: "Day planning",
      content:
        "Tine: will do 10 pushups\nBine: will do 20 pushups\nVine: will do Wine drinking\nMine: will explode",
    },
    {
      userId: 1,
      projectId: 1,
      title: "Bug Fixing",
      content:
        "Fix issue with pagination not displaying correct number of pages\nImplement error handling for user login\nAdd unit tests for new feature",
    },
    {
      userId: 3,
      projectId: 1,
      title: "Code Refactoring",
      content:
        "Extract common code into a shared utility function\nSimplify complex if-else statements using switch-case\nReplace repetitive for-loops with higher-order array methods",
    },
    {
      userId: 2,
      projectId: 2,
      title: "New Feature Development",
      content:
        "Implement user authentication using OAuth2\nIntegrate with external API to retrieve and display user data\nAdd feature to export data to CSV format",
    },
  ];
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
        isAdmin: user.isAdmin,
      },
    });
  }
  // seed projects
  for (let project of getProjects()) {
    await ProjectService.createProject(project);
  }

  for (let sprint of getSprints()) {
    await prisma.sprint.create({
      data: {
        ...sprint,
      },
    });
  }

  for (let story of getStories()) {
    await prisma.story.create({
      data: {
        ...story,
      },
    });
  }

  for (let task of getTasks()) {
    await prisma.task.create({
      data: {
        description: task.description,
        timeEstimation: task.timeEstimation,
        asigneeId: task.asigneeId,
        status: task.status,
        storyId: task.storyId,
      },
    });
  }
  for (let log of getTimeLogs()) {
    await prisma.timeLog.create({
      data: {
        userId: log.userId,
        taskId: log.taskId,
        day: log.day,
        hours: log.hours,
        hours_estimate: log.hours_estimate,
      },
    });
  }
  for (let post of getProjectWallMessages()) {
    await prisma.projectWall.create({
      data: {
        userId: post.userId,
        projectId: post.projectId,
        title: post.title,
        content: post.content,
      },
    });
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
