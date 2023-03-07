import prisma from "../../libs/prisma";
import {User} from "../schemas"

export const getAllUsers = async(): Promise<User[]> => {
    return prisma.user.findMany({
        select: {
            id:true,
            name:true,
            isAdmin:true,
        }
    });
}

const UserService = {
    getAllUsers
};

export default UserService;