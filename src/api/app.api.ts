import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { App } from "./dao/app.dao.js";
import cors from "cors";
import { UserRequest } from "../dtos/requests/UserRequest.js";
import { UserResponseFactory } from "./factories/UserResponseFactory.js";
import { LoginRequest } from "../dtos/requests/LoginRequest.js";

const rota = express();
rota.use(express.json());
const porta = 3333;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDirectory = path.join(__dirname, "public");

rota.use(
    cors()
);

const crud = new App();

rota.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await crud.executeSearchQuey();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        return res
            .status(500)
            .json({ message: "Erro interno do servidor ao listar usuários." });
    }
});

rota.get("/usuarios/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID de usuário inválido." });
    }
    try {
        const usuario = await crud.SearchQueyById(id);

        if (!usuario) {
            return res.status(404).json({ message: `Usuário ${id} não encontrado.` });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error(`Erro ao buscar usuário ${id}:`, error);
        return res
            .status(500)
            .json({ message: "Erro interno do servidor ao buscar usuário." });
    }
});

rota.post("/usuarios", async (req, res) => {
    const request: UserRequest = req.body;

    if (
        !request.nome ||
        !request.email ||
        !request.senha ||
        !request.tipoUsuario
    ) {
        return res
            .status(400)
            .json({ message: "Os campos de usuario são obrigatórios." });
    }

    try {
        const responseFactory = new UserResponseFactory();
        const novoUsuario = responseFactory.create(await crud.InsertQuery(request));
        return res.status(201).json({
            message: "Usuário inserido com sucesso!",
            usuario: novoUsuario,
        });
    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        return res
            .status(500)
            .json({ message: "Erro interno do servidor ao inserir usuário." });
    }
});

rota.put("/usuarios/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const request: UserRequest = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID de usuário inválido." });
    }

    const usuario = await crud.SearchQueyById(id);

    if (!usuario) {
        return res
            .status(404)
            .json({ message: `Usuário ${id} não encontrado.` });
    }

    if (
        !id &&
        !request.nome &&
        !request.email &&
        !request.senha &&
        !request.tipoUsuario
    ) {
        return res.status(400).json({
            message:
                "Pelo menos um campo deve ser fornecido para atualização.",
        });
    }

    try {
        const resultado = await crud.UpdatetQuey(id, request);

        return res
            .status(200)
            .json({ message: `Usuário ${id} atualizado com sucesso!` });
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${id}:`, error);
        return res.status(500).json({
            message: "Erro interno do servidor ao atualizar usuário.",
        });
    }
});

rota.delete("/usuarios/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID de usuário inválido." });
    }

    try {
        const affectedRows = await crud.DeletetQuey(id);

        if (affectedRows === 0) {
            return res
                .status(404)
                .json({ message: `Usuário ${id} não encontrado.` });
        }

        return res.status(204).send();
    } catch (error) {
        console.error(`Erro ao deletar usuário ${id}:`, error);
        return res
            .status(500)
            .json({ message: "Erro interno do servidor ao deletar usuário." });
    }
});

rota.post("/usuarios/login", async (req, res) => {
    const { email, senha } = req.body as LoginRequest;

    if (!email || !senha) {
        return res
            .status(400)
            .json({ message: "Email e senha são obrigatórios." });
    }

    try {
        const usuario = await crud.LoginQuery(email, senha);

        if (!usuario) {
            return res
                .status(401)
                .json({ message: "Email ou senha incorretos." });
        }

        
        const response = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipoUsuario: usuario.tipoUsuario,
        };

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            usuario: response,
        });
    } catch (error) {
        console.error("Erro ao efetuar login:", error);
        return res
            .status(500)
            .json({ message: "Erro interno ao autenticar usuário." });
    }
});

rota.listen(porta, () => {
    console.log(`API RESTful rodando em: http://localhost:${porta}`);
});