export class UserRequest {
    nome: string;
    cpf: number;
    email: string;
    senha: string;
    tipoUsuario: string;

    constructor(
        nome: string,
        cpf: number,
        email: string,
        senha: string,
        tipoUsuario: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
    }
}
