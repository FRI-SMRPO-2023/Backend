import { z } from "zod"
import { RoleInProject } from "@prisma/client";
import { match } from "assert";

export const convertEnum = (prisma_enum: Object): z.ZodEnum<[RoleInProject, ...RoleInProject[]]> => {
    let arr: RoleInProject[] = [];
    for (const role in prisma_enum) {
        arr.push(role as RoleInProject);
    }
    const variants: [RoleInProject, ...RoleInProject[]] = [
        arr[0],
        ...arr.slice(1)
    ];
    return z.enum(variants);
}

export const roleInProjectMap = (role: string) => {
    ""
}