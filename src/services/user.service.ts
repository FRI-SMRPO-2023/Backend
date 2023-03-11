import prisma from "../../libs/prisma";
import type { UserCreate, UserBase, UserWithId, UserUpdate } from "../schemas/users.schema";
import bcrypt from "bcrypt";
import { isDataView } from "util/types";

const getAllUsers = async (): Promise<UserWithId[]> => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
        }
    });
}

const checkEmailPassword = async (email: string, password: string): Promise<UserWithId | null> => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
            password: true,
        }
    });
    console.log(user);
    if (!user) { return user; }
    console.log("pass not null");
    const passed = await bcrypt.compare(password, user.password);
    console.log("pased bcrypt")
    console.log(passed);
    if (passed) {
        const returned: UserWithId = {
            id: user.id,
            name: user.name,
            email: user.email,
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
        },
        select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true
        }
    });
}

const createUser = async (user: UserCreate): Promise<UserWithId> => {
    const hashedPass = await bcrypt.hash(user.password, 10);
    return prisma.user.create({
        data: {
            name: user.name,
            password: hashedPass,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
        }
    })
}

const updateUser = async (userId: number, user: UserUpdate): Promise<UserWithId> => {
    const hashedPass = user.password ? await bcrypt.hash(user.password, 10) : undefined;
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name: user.name,
            email: user.email,
            password: hashedPass,
            isAdmin: user.isAdmin,
        },
        select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
        }
    })
}

const changePassword = async (userId: number, oldPassword: string, newPassword: string): Promise<UserWithId | null> => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        }
    });
    const pass = await bcrypt.compare(oldPassword, user.password);
    if (pass) {
        return updateUser(userId, {password: newPassword});
    }
    return null;

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
    checkEmailPassword,
    changePassword
};

export default UserService;