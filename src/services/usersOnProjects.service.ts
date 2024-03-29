import prisma from "../../libs/prisma";
import { UsersOnProjects } from "@prisma/client";
import {RoleInProject} from "@prisma/client"
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
            project: true,
            secondaryRole: true
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
            secondaryRole: true,
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

const changeUserRole = async (userId: number, projectId: number, role: string, srole: string | null): Promise<UsersOnProjects|null> =>  {
    if (role != "Developer" && role != "ProductOwner" && role != "ScrumMaster" && role != undefined) {
        return null;
    }
    if (srole != "Developer" && srole != null) {
        return null;
    }
    return prisma.usersOnProjects.update({
        where: {
            userId_projectId: {
                userId: userId,
                projectId: projectId
            }
        },
        data: {
            role: role,
            secondaryRole: srole
        },
        select: {
            role: true,
            userId: true,
            projectId: true,
            secondaryRole: true
        }
    });
}

const UsersOnProjectsService = {
    addUserToProject,
    changeUserRole,
    getAllProjectsOfUser,
    getAllUsersOfProject,
    getUserRoleInProject,
    removeUserFromProject
}

export default UsersOnProjectsService;