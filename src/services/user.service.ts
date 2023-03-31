import prisma from "../../libs/prisma";
import type { UserCreate, UserWithId, UserUpdate } from "../schemas/users.schema";
import bcrypt from "bcrypt";
// import { isDataView } from "util/types";

const getAllUsers = async (): Promise<UserWithId[]> => {
    return prisma.user.findMany({
        select: {
            id: true,
            username: true,
            name: true,
            lastName: true,
            email: true,
            isAdmin: true,
            lastLogin: true
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
            username: true,
            name: true,
            lastName: true,
            email: true,
            isAdmin: true,
            password: true,
            lastLogin: true
        }
    });
    console.log(user);
    if (!user) { return user; }
    const passed = await bcrypt.compare(password, user.password);
    console.log("user logged in: ", passed);
    if (passed) {
        const returned: UserWithId = {
            id: user.id,
            username: user.username,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            lastLogin: user.lastLogin
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
            username: true,
            name: true,
            lastName: true,
            email: true,
            isAdmin: true,
            lastLogin: true
        }
    });
}

const createUser = async (user: UserCreate): Promise<UserWithId> => {
    const hashedPass = await bcrypt.hash(user.password, 10);
    return prisma.user.create({
        data: {
            username: user.username,
            name: user.name,
            lastName: user.lastName,
            password: hashedPass,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        select: {
            id: true,
            username: true,
            name: true,
            lastName: true,
            email: true,
            isAdmin: true,
            lastLogin: true
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
            username: user.username,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: hashedPass,
            isAdmin: user.isAdmin,
            lastLogin: user.lastLogin
        },
        select: {
            username: true,
            id: true,
            name: true,
            lastName: true,
            email: true,
            isAdmin: true,
            lastLogin: true
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
