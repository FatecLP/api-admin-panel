import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const rota = express();
const porta: number = 3000;
rota.use(express.json());
rota.use(express.urlencoded({ extended: true }));
rota.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

rota.use(express.static(path.join(__dirname, "public")));

const rootDirectory = path.join(__dirname, "public");

rota.listen(porta, () => {
    console.log(`http://localhost:${porta}`);
});
