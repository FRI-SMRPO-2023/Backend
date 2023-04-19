import prisma from "../../libs/prisma";
import { Prisma } from "@prisma/client";
import type { ProjectWithId, ProjectCreate, ProjectUpdate } from "../schemas/project.schema";

const getAllProjects = async (): Promise<ProjectWithId[]> => {
    return prisma.project.findMany({
        select: {
            id: true,
            name: true,
            description: true,
        }
    });
};

const getProjectById = async (id: number): Promise<ProjectWithId | null> => {
    return prisma.project.findUniqueOrThrow({
        where: {
            id
        },
    });
};

const createProject = async (project: ProjectCreate): Promise<ProjectWithId> => {
    let arr: Prisma.UsersOnProjectsCreateWithoutProjectInput[]  = [];
    project.users.forEach(element => {
        arr.push({role: element.role, secondaryRole: element.secondaryRole,
            user: {connect: {id: element.id}}})
    });
    let created_proj = prisma.project.create({
        data: {
            name: project.name,
            description: project.description,
            users: {
                create: arr
            }
        }
    });
    return created_proj;
};

const deleteProject = async (id: number): Promise<ProjectWithId> => {
    let res = prisma.project.delete({
        where: {
            id: id
        }
    });
    return res;
};

const updateProject = async (id: number, projectUpdate: ProjectUpdate): Promise<ProjectWithId> => {
    let res = prisma.project.update({
        where: {
            id
        },
        data: {
            name: projectUpdate.name,
            description: projectUpdate.description
        },
    });
    return res;
}



const ProjectService = {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProject
};

export default ProjectService;
