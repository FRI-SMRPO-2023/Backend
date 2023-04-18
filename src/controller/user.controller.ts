import UserService from "../services/user.service";
import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";

const getAll: RequestHandler = async (_req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const getSingle: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId, 10);
    const users = await UserService.getUserById(id);
    res.status(200).json(users);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const create: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    console.log(err.meta.target[0]);
    const message: string = `User with this ${err.meta.target[0]} already exists`;
    general_error_handler(err, res, next, message);
  }
};

const updateSingle: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId, 10);
    const userUpdated = await UserService.updateUser(id, req.body);
    res.status(200).json(userUpdated);
  } catch (err: any) {
    const message: string = `User with this ${err.meta.target[0]} already exists`;
    general_error_handler(err, res, next, message);
  }
};

const changePassword: RequestHandler = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const updated = await UserService.changePassword(
      userId,
      req.body.oldPassword,
      req.body.newPassword
    );
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(409).json({
        status: "failed",
        error: {
          message: "Invalid old password",
        },
      });
    }
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const deleteSingle: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId, 10);
    await UserService.deleteUser(id);
    res.sendStatus(204);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const UserController = {
  getAll,
  getSingle,
  create,
  updateSingle,
  deleteSingle,
  changePassword,
};

export default UserController;
