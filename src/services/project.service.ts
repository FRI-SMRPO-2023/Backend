import prisma from "../../libs/prisma"
import type { ProjectWithId, ProjectCreate, ProjectUpdate} from "../schemas/project.schema"

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
    let created_proj = prisma.project.create({
        data: {
            name: project.name,
            description: project.description,
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

const updateProject = async (id: number, projectPartia: ProjectUpdate): Promise<ProjectWithId> => {
    let res = prisma.project.update({
        where: {
            id
        },
        data: {
            name: projectPartia.name,
            description: projectPartia.description
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