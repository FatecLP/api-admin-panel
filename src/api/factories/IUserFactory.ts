import { UserRequest } from "../../dtos/requests/UserRequest.js";
import { User } from "../models/User.js";

export interface IUserFactory{
    create(request: UserRequest): User;
}