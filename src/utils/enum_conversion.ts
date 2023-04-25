import { z } from "zod";

export function convertEnum<T extends string>(
    prisma_enum: Object
): z.ZodEnum<[T, ...T[]]> {
    let arr: T[] = [];
    for (const role in prisma_enum) {
        arr.push(role as T);
    }
    const variants: [T, ...T[]] = [arr[0], ...arr.slice(1)];
    return z.enum(variants);
}
