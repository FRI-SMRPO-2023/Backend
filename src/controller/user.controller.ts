import UserService from "../services/user.service";
import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";



const getAll: RequestHandler  = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const getSingle: RequestHandler  = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const users = await UserService.getUserById(id);
        res.status(200).json(users);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const create: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const updateSingle: RequestHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); 
        const userUpdated = await UserService.updateUser(id, req.body);
        res.status(200).json(userUpdated);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const deleteSingle: RequestHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await UserService.deleteUser(id);
        res.sendStatus(204);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const UserController = {
    getAll,
    getSingle,
    create,
    updateSingle,
    deleteSingle
}

export default UserController;