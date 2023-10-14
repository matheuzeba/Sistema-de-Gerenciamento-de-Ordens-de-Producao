drop database if exists ordem_de_producao;

create database ordem_de_producao;

create table if not exists materiais (
	id serial primary key,
    nome text not null unique
);

create table if not exists ordens (
	id serial primary key,
    cliente text not null,
    produto text not null,
    quantidade integer not null,
    material TEXT[] not null,
    data_de_entrega date not null,
    concluida boolean not null
);
