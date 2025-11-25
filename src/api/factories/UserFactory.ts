import { UserRequest } from "../../dtos/requests/UserRequest.js";
import { User } from "../models/User.js";
import type { IUserFactory } from "./IUserFactory.js";

export class UserFactory implements IUserFactory{
    create(request: UserRequest): User {
        return new User(
            0,
            request.nome,
            request.email,
            request.senha,
            request.tipoUsuario
        );
    }
}