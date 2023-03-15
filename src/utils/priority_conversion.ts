import { z } from "zod"
import { StoryPriority } from "@prisma/client";

export const priorityConvert = (prisma_enum: Object): z.ZodEnum<[StoryPriority, ...StoryPriority[]]> => {
    let arr: StoryPriority[] = [];
    for (const priority in prisma_enum) {
        arr.push(priority as StoryPriority);
    }
    const variants: [StoryPriority, ...StoryPriority[]] = [
        arr[0],
        ...arr.slice(1)
    ];
    return z.enum(variants);
}