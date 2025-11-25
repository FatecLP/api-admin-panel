create database crud;
use crud;

create table usuarios(
    idUsuarios int auto_increment not null,
    nome varchar(20) not null,
    email varchar(30) not null,
    senha varchar(10) not null,
    tipoUsuario enum('Comum', 'Admin') not null,
    CONSTRAINT PK_IdUser PRIMARY KEY(idUsuarios),
    CONSTRAINT CHK_UserType CHECK (tipoUsuario in ('Comum', 'Admin'))
);

desc usuarios;