import { Request, Response, NextFunction } from "express";
import { general_error_handler } from "../utils/error_handling";
import UserService from "../services/user.service";
import UsersOnProjectsService from "../services/usersOnProjects.service";

const USE_AUTH =
  process.env.USE_AUTH === "true" || process.env.ENV_TYPE === "production";
console.log("USE_AUTH set to", USE_AUTH);

export const authorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!USE_AUTH) {
    next();
    return;
  }
  if (req.session.authenticated) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export const adminAuthorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!USE_AUTH) {
    next();
    return;
  }
  if (req.session.user.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

export const adminOrCorrectUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!USE_AUTH) {
    next();
    return;
  }
  if (
    req.session.user.isAdmin ||
    req.session.user.id === parseInt(req.params.userId, 10)
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
};

const correctProjectRole =
  (roles: String[], getProjectIdFunction?: Function) =>
    async (req: Request, res: Response, next: NextFunction) => {
      if (!USE_AUTH) {
        next();
        return;
      }
      var projectId = parseInt(req.params.projectId);
      const id = parseInt(req.params.id);
      if (getProjectIdFunction && id != undefined) {
        console.log("inside");
        projectId = await getProjectIdFunction(id);
        console.log("projectId: ", projectId);
      }
      if (!projectId) {
        projectId = parseInt(req.body.projectId);
      }
      if (!projectId) {
        console.log("[ERROR] projectId is not in the PARAMS!!!");
        console.log("id: ", id);
        console.log("projectId: ", projectId);
        console.log(getProjectIdFunction);
        next();
        return;
      }
      // if the user is admin, let it trough anyway
      if (req.session.user.isAdmin) {
        return next();
      }
      const userId = req.session.user.id;
      const roleUser = await UsersOnProjectsService.getUserRoleInProject(
        userId,
        projectId
      );
      if (roleUser && roles.includes(roleUser.role)) {
        console.log("User is the Correct role ", roleUser);
        next();
      } else {
        res.sendStatus(403);
      }
    };

export const isPOorSM = correctProjectRole(["ProductOwner", "ScrumMaster"]);
export const isSM = correctProjectRole(["ScrumMaster"]);
export const isSMFunc = (func: Function) =>
  correctProjectRole(["ScrumMaster", "ProductOwner"], func);
