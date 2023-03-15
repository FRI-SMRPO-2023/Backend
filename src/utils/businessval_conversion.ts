import { z } from "zod"
import { BusinessValue } from "@prisma/client";

export const bvalConvert = (prisma_enum: Object): z.ZodEnum<[BusinessValue, ...BusinessValue[]]> => {
    let arr: BusinessValue[] = [];
    for (const businessValue in prisma_enum) {
        arr.push(businessValue as BusinessValue);
    }
    const variants: [BusinessValue, ...BusinessValue[]] = [
        arr[0],
        ...arr.slice(1)
    ];
    return z.enum(variants);
}