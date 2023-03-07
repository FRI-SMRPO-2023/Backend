import { expect, test, vi } from 'vitest';
import ProjectService from '../src/services/project.service';
import prisma from '../libs/__mocks__/prisma';

vi.mock('../libs/prisma')

test("getAllProjects should return a list of projects", async () => {
    const newProject = {name: "new project name", description: "new project description"};
    prisma.project.findMany.mockResolvedValue([
        {...newProject, id: 1},
        {...newProject, id: 2}
    ]);
    const allProjects = await ProjectService.getAllProjects();
    expect(allProjects).toStrictEqual([
        {...newProject, id: 1},
        {...newProject, id: 2}
    ]);
})

test("getProjectById should return a single Project when id is in database", async () => {
    const newProject = {name: "new project name", description: "new project description", id: 1};
    prisma.project.findFirst.mockResolvedValue(newProject);
    const allProjects = await ProjectService.getProjectById(1);
    expect(allProjects).toStrictEqual(newProject);
})