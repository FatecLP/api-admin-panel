import type { RowDataPacket } from "mysql2/promise";
import { connection } from "../../db/bd.js";
import { UserRequest } from "../../dtos/requests/UserRequest.js";
import { User } from "../models/User.js";
import { UserFactory } from "../factories/UserFactory.js";
import type { IUserFactory } from "../factories/IUserFactory.js";
import type { IUser } from "../models/IUser.js";

export class App {
    _factory: IUserFactory;

    constructor() {
        this._factory = new UserFactory();
    }

    async executeSearchQuey() {
        /** @type {import("mysql2/promise").Connection} */
        let conn;
        try {
            conn = await connection();
            let sql = "select * from usuarios";

            //const [rows] = await conn.execute(sql)
            const [rows] = await conn.query(sql);

            console.log("Registro: total de tuplas", rows);

            return rows;
        } catch (error) {
            console.error("Não encontrado");
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async SearchQueyById(id: number): Promise<RowDataPacket | null> {
        /** @type {import("mysql2/promise").Connection} */
        let conn;
        try {
            conn = await connection();
            let sql = "select * from usuarios where idUsuarios = ?";

            const [rows] = await conn.query<RowDataPacket[]>(sql, [id]);
            console.log("Registro: total de tuplas", rows);

            if (!rows || rows.length === 0) {
                return null;
            }
            const usuario = rows[0];
            return usuario ?? null;
        } catch (error) {
            console.error("Não encontrado");
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async InsertQuery(request: UserRequest) {
        /** @type {import("mysql2/promise").Connection} */
        let conn;

        try {
            conn = await connection();
            let sql = "INSERT INTO usuarios SET ? ";

            let dd = {
                nome: request.nome,
                email: request.email,
                senha: request.senha,
                tipoUsuario: request.tipoUsuario,
            };

            const [rows]: any = await conn.query(sql, dd);

            console.log("Inserção bem-sucedida!");
            console.log(`Linhas afetadas: ${rows.affectedRows}`);
            return dd;
        } catch (error) {
            console.error("Não encontrado");
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async UpdatetQuey(id: number, request: UserRequest) {
        /** @type {import("mysql2/promise").Connection} */
        let conn;
        try {
            conn = await connection();

            let dadosParaAtualizar: Partial<UserRequest> = {};
            if (request.nome) dadosParaAtualizar.nome = request.nome;
            if (request.email) dadosParaAtualizar.email = request.email;
            if (request.senha) dadosParaAtualizar.senha = request.senha;
            if (request.tipoUsuario)
                dadosParaAtualizar.tipoUsuario = request.tipoUsuario;

            if (Object.keys(dadosParaAtualizar).length === 0) {
                console.log("Nenhum dado fornecido para atualização.");
                return { affectedRows: 0 };
            }

            let sql = "UPDATE usuarios SET ? WHERE idUsuarios = ?";

            const [result]: any = await conn.query(sql, [
                dadosParaAtualizar,
                id,
            ]);

            console.log("Alteração bem-sucedida!");
            console.log(`Linhas afetadas: ${result.affectedRows}`);

            return result;
        } catch (error) {
            console.error("Erro ao atualizar registro:", error);
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async DeletetQuey(id: number) {
        /** @type {import("mysql2/promise").Connection} */
        let conn;
        try {
            conn = await connection();
            let sql = "delete from usuarios where idUsuarios = ?";
            let ids = id;

            const [rows]: any = await conn.query(sql, ids);

            console.log("Remoção bem-sucedida!");
            console.log(`Linhas afetadas: ${rows.affectedRows}`);

            return rows.affectedRows;
        } catch (error) {
            console.error("Não encontrado");
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async LoginQuery(email: string, senha: string) {
        let conn;
        try {
            conn = await connection();
            const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
            const [rows]: any = await conn.query(sql, [email, senha]);

            if (!rows || rows.length === 0) {
                return null;
            }

            return rows[0];
        } catch (error) {
            console.error("Erro ao autenticar usuário: ", error);
            throw error;
        } finally {
            if (conn) conn.end();
        }
    }
}

//const myapp = new App()

//myapp.executeSearchQuey()

//myapp.SearchQueyById(3)

//myapp.InsertQuey()

//myapp.UpdatetQuey()

//myapp.DeletetQuey(5)
