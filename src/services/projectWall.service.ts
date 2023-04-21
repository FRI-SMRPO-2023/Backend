import prisma from "../../libs/prisma";
import type {
  ProjectWallCreate,
  ProjectWallReturn,
  ProjectWallUpdate,
} from "../schemas/projectWall.schema";

const getAllMessages = async (
  projectId: number
): Promise<ProjectWallReturn[]> => {
  return prisma.projectWall.findMany({
    where: {
      projectId: projectId,
    },
    select: {
      id: true,
      userId: true,
      user: {
        select: {
          username: true,
          id: true,
          name: true,
          lastName: true,
          email: true,
          isAdmin: true,
          lastLogin: true,
        },
      },
      projectId: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      content: true,
      edited: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

const getMessageById = async (id: number): Promise<ProjectWallReturn> => {
  return prisma.projectWall.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      userId: true,
      user: {
        select: {
          username: true,
          id: true,
          name: true,
          lastName: true,
          email: true,
          isAdmin: true,
          lastLogin: true,
        },
      },
      projectId: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      content: true,
      edited: true,
    },
  });
};

const createMessage = async (
  projectId: number,
  data: ProjectWallCreate
): Promise<ProjectWallReturn> => {
  return prisma.projectWall.create({
    data: {
      projectId: projectId,
      userId: data.userId,
      title: data.title,
      content: data.content,
    },
    select: {
      id: true,
      userId: true,
      user: {
        select: {
          username: true,
          id: true,
          name: true,
          lastName: true,
          email: true,
          isAdmin: true,
          lastLogin: true,
        },
      },
      projectId: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      content: true,
      edited: true,
    },
  });
};

const deleteMessageById = async (id: number): Promise<ProjectWallReturn> => {
  return prisma.projectWall.delete({
    where: {
      id: id,
    },
    select: {
      id: true,
      userId: true,
      user: {
        select: {
          username: true,
          id: true,
          name: true,
          lastName: true,
          email: true,
          isAdmin: true,
          lastLogin: true,
        },
      },
      projectId: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      content: true,
      edited: true,
    },
  });
};

const updateMessageById = async (
  id: number,
  data: ProjectWallUpdate
): Promise<ProjectWallReturn> => {
  return prisma.projectWall.update({
    where: {
      id: id,
    },
    data: {
      title: data.title,
      content: data.content,
      edited: true,
    },
    select: {
      id: true,
      userId: true,
      user: {
        select: {
          username: true,
          id: true,
          name: true,
          lastName: true,
          email: true,
          isAdmin: true,
          lastLogin: true,
        },
      },
      projectId: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      content: true,
      edited: true,
    },
  });
};

const ProjectWallService = {
  getAllMessages,
  getMessageById,
  createMessage,
  deleteMessageById,
  updateMessageById,
};

export default ProjectWallService;
