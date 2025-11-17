import type { IUser } from "./IUser.js";

export class User implements IUser {
    id: number;
    nome: string;
    cpf: number;
    email: string;
    senha: string;
    tipoUsuario: string;

    constructor();
    constructor(
        id: number,
        nome: string,
        cpf: number,
        email: string,
        senha: string,
        tipoUsuario: string
    );

    constructor(
        id?: number,
        nome?: string,
        cpf?: number,
        email?: string,
        senha?: string,
        tipoUsuario?: string
    ) {
        this.id = id ?? 0;
        this.nome = nome ?? "";
        this.cpf = cpf ?? 0;
        this.email = email ?? "";
        this.senha = senha ?? "";
        this.tipoUsuario = tipoUsuario ?? "";
    }
}