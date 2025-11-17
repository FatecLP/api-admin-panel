create database menthfy;
use menthfy;

create table usuarios(
    idUsuarioss int auto_increment not null,
    nome varchar(20) not null,
    email varchar(30) not null,
    cpf varchar(11) not null,
    senha varchar(10) not null,
    tipoUsuario enum('Aluno', 'Professor') not null,
    CONSTRAINT PK_IdUser PRIMARY KEY(idUsuarioss),
    CONSTRAINT CHK_UserType CHECK (tipoUsuario in ('Aluno', 'Professor'))
);

desc usuarios;