import prisma from "../../libs/prisma";
import type { UserCreate, UserBase, UserWithId, UserUpdate } from "../schemas/users.schema";
import bcrypt from "bcrypt";

const getAllUsers = async(): Promise<UserWithId[]> => {
    return prisma.user.findMany({
        select: {
            id:true,
            name:true,
            isAdmin:true,
        }
    });
}


const checkUsernamePassword = async(username: string, password: string): Promise<UserWithId | null> => {
    const user = await prisma.user.findUnique({
        where: {
            name: username,
        },
        select: {
            id: true,
            name: true,
            isAdmin: true,
            password: true,
        }
    });
    if (!user) {return user;}
    const passed = await bcrypt.compare(password, user.password);
    if (passed) {
        const returned: UserWithId = {
            id: user.id,
            name: user.name,
            isAdmin: user.isAdmin
        }
        return returned;
    } else {
        return null;
    }


}

const getUserById = async (id: number): Promise<UserWithId | null> => {
    return prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });
}


const createUser = async (user: UserCreate): Promise<UserWithId> => {
    const hashedPass = await bcrypt.hash(user.password, 10);
    return prisma.user.create({
        data: {
            name: user.name,
            password: hashedPass,
            isAdmin: user.isAdmin,
        },
        select: {
            id: true,
            name: true,
            isAdmin: true,
        }
    })
}

const updateUser = async (userId: number, user: UserUpdate): Promise<UserWithId> => {
    const hashedPass = user.password ? await bcrypt.hash(user.password, 10): undefined;
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name: user.name,
            password: hashedPass,
            isAdmin: user.isAdmin,
        },
        select: {
            id: true,
            name: true,
            isAdmin: true,
        }
    })
}

const deleteUser = async (userId: number): Promise<UserWithId> => {
    return prisma.user.delete({
        where: {
            id: userId
        }
    });

}

const UserService = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    checkUsernamePassword
};

export default UserService;