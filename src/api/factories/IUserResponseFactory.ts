import { UserRequest } from "../../dtos/requests/UserRequest.js";
import { UserResponse } from "../../dtos/responses/UserResponse.js";

export interface IUserResponseFactory{
    create(request: UserRequest): UserResponse;
}