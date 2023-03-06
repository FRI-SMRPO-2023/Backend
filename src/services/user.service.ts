import {db} from "../utils/db.server";
import {User} from "../schemas"

export const getAllUsers = async(): Promise<User[]> => {
    return db.user.findMany({
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