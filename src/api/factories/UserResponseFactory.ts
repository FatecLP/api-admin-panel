import { UserRequest } from "../../dtos/requests/UserRequest.js";
import { UserResponse } from "../../dtos/responses/UserResponse.js";
import type { IUser } from "../models/IUser.js";
import type { IUserResponseFactory } from "./IUserResponseFactory.js";

export class UserResponseFactory implements IUserResponseFactory {
    create(user: IUser): UserResponse {
        return new UserResponse(
            user.nome,
            user.email,
            user.senha,
            user.tipoUsuario
        );
    }
}