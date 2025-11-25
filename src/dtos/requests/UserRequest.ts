export class UserRequest {
    nome: string;
    email: string;
    senha: string;
    tipoUsuario: string;

    constructor(
        nome: string,
        email: string,
        senha: string,
        tipoUsuario: string
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
    }
}
