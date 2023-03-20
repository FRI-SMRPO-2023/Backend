import prisma from "../../libs/prisma";
import { UsersOnProjects } from "@prisma/client";
import { ProjectWithId } from "../schemas/project.schema";
import { UOPProjectReturn, UOPUserReturn } from "../schemas/usersOnProjects.schema";

const addUserToProject = async (groupMembership: UsersOnProjects): Promise<UsersOnProjects> => {
    return prisma.usersOnProjects.create({
        data: groupMembership
    })
}

const removeUserFromProject = async (groupMembership: UsersOnProjects) => {
    return prisma.usersOnProjects.deleteMany({
        where: {
            userId: groupMembership.userId,
            projectId: groupMembership.projectId
        }
    })
}

// TODO: Update user role in project

const getUserRoleInProject = async (userId: number, projectId: number): Promise<UsersOnProjects|null> => {
    return prisma.usersOnProjects.findFirst({
            where: {
                userId: userId,
                projectId: projectId
            }
        }
    );
}


const getAllProjectsOfUser = async (userId: number): Promise<UOPProjectReturn[]> => {
    return prisma.usersOnProjects.findMany({
        where: {
            userId: userId
        },
        select: {
            role: true,
            project: true
        }
    })
}

const getAllUsersOfProject = async (projectId: number): Promise<UOPUserReturn[]> => {
    return prisma.usersOnProjects.findMany({
        where: {
            projectId: projectId
        },
        select: {
            role: true,
            user: {
                select: {
                    username: true,
                    id: true,
                    name: true,
                    lastName: true,
                    email: true,
                    isAdmin: true,
                    lastLogin: true
                }
            }
        }
    })
}

const UsersOnProjectsService = {
    addUserToProject,
    getAllProjectsOfUser,
    getAllUsersOfProject,
    getUserRoleInProject,
    removeUserFromProject
}

export default UsersOnProjectsService;