

import { z } from "zod"

export const convertEnum = (prisma_enum: Object): z.ZodEnum<[string, ...string[]]> => {
    let arr = [];
    for (const role in prisma_enum) {
        arr.push(role);
    }
    const variants: [string, ...string[]] = [
        arr[0],
        ...arr.slice(1)
    ];
    return z.enum(variants);
}