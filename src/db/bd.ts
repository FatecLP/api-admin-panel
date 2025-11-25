import mysql from "mysql2/promise";

export async function connection() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "crud",
        });

        return connection;
    } catch (error) {
        console.error("Não conectado");
        throw error;
    }
}