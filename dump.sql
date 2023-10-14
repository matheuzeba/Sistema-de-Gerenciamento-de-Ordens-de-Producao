drop database if exists ordem_de_producao;

create database ordem_de_producao;

create table if not exists materiais (
	id serial primary key,
    material text not null unique,
    quantidade integer not null
);

create table if not exists produtos (
	id serial primary key,
    nome text not null,
    material text references materiais(material)
);

create table if not exists ordens (
	id serial primary key,
    cliente text not null,
    id_produto integer references produtos(id),
    quantidade integer not null,
    data_de_entrega date not null,
    concluida boolean not null,
);
