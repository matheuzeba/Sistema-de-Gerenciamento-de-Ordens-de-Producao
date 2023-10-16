# Sistema de Gerenciamento de Ordens de Produção
## Documentação API REST
### Desafio
**Você foi designado para criar um sistema de gerenciamento de ordens de produção para uma fábrica. Este sistema deve permitir que os usuários realizem as seguintes operações:**

* Registrar uma nova ordem de produção, especificando o produto a ser fabricado, a quantidade desejada e a data de entrega.
  
* Listar todas as ordens de produção existentes, mostrando os detalhes de cada ordem, como o produto, a quantidade e a data de entrega.

* Verificar se o produto pode ser produzido com base nos materiais disponíveis. Caso contrário, o sistema deve avisar que a produção não é possível devido à falta de materiais.

* Atualizar o status de uma ordem de produção, indicando se foi concluída ou não.

* Visualizar relatórios de produção que mostrem as ordens em andamento e as concluídas.

### Requisitos
*NodeJs v18 (a LTS atual até o momento)*

### Tecnologias utilizadas
![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![nodejs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![expressjs](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![postgresql](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)
![postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white)


### Funcionalidades
* Cadastrar ordem
* Listar ordens
* Listar ordem por nome do cliente e id
* Listar por ordens concluidas ou não concluidas
* Atualizar Status da ordem (se foi ou nao concluida)
* Listar materiais
* cadastrar material
* atualizar quantidade de materiais
* excluir material


### Rodar Localmente

* Clone o repositório usando a chave *ssh*

```bash
    git@github.com:matheuzeba/Sistema-de-Gerenciamento-de-Ordens-de-Producao.git
```
ou
* Clone o repositório usando a chave *https*
    
```bash
    https://github.com/matheuzeba/Sistema-de-Gerenciamento-de-Ordens-de-Producao.git
```

* Entre na pasta
    
```bash
    cd Sistema-de-Gerenciamento-de-Ordens-de-Producao/
```

* instale as dependências

```bash
    npm install
```

* Inicie a API

```bash
    npm run dev
```

* Faça o dump no postgresql usando o dump.sql
<br>
* Altere o arquivo **.env** de acordo com sua necessidade (NÃO MUDE O NOME DO DATABASE):
  
```bash
    DATABASE_URL=postgres://{usuario}:{senha}@{host}:{port}/ordem_de_producao
```

* Mude o usuario, senha, host e port. Logo após tire as chaves. 
* Aqui está um exemplo de como deve ficar

```bash
    DATABASE_URL=postgres://postgres:postgres@localhost:5432/ordem_de_producao
```


* Vá para a rota *3000*

```bash
    http://localhost:3000/
```

## **Endpoints**

### **Criar ordem de fabricação**

#### `POST` `/ordem`

Essa é a rota que será utilizada para cadastrar uma nova ordem de fabricação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - cliente
  - produto
  - quantidade
  - material
  - data_de_entrega

#### **Exemplo de requisição**

```javascript
// POST /ordem
{
	"cliente": "matheus",
	"produto": "brigadeiro",
	"quantidade": "25",
	"material": [
		"leite condensado",
		"chocolate"
    ],
	"data_de_entrega": "05-09-2023"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"id": 1,
	"cliente": "matheus",
	"produto": "brigadeiro",
	"quantidade": 5,
	"material": [
		"leite condensado",
		"chocolate"
	],
	"data_de_entrega": "2023-09-05T03:00:00.000Z",
	"concluida": false
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "esta faltando algo, os seguintes sao necessarios: ",
	"obrigatorios": {
		"cliente": "cliente",
		"produto": "produto",
		"quantidade": "quantidade",
		"material": "material",
		"data_de_entrega": "data_de_entrega"
	}
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "esses materiais não estão disponíveis no estoque",
	"produtosIndisponiveis": [
		"leite condensado",
		"chocolate"
	]
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Quantidade de materiais insuficientes"
}
```

### **Listar todas as ordens**

#### `GET` `/ordem`

Essa é a rota que permite a listagem de todas as ordens de fabricação.

- **Requisição**  
  - Sem parâmetros de rota ou de query.
  - Não deverá possuir conteúdo no corpo da requisição.

#### **Exemplo de requisição**

```javascript
// GET /ordem
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"cliente": "matheus",
		"produto": "brigadeiro",
		"quantidade": 5,
		"material": [
			"leite condensado",
			"chocolate"
		],
		"data_de_entrega": "2023-09-05T03:00:00.000Z",
		"concluida": false
	},
	{
		"id": 2,
		"cliente": "matheus",
		"produto": "bolo de chocolate",
		"quantidade": 5,
		"material": [
			"leite condensado",
			"chocolate"
		],
		"data_de_entrega": "2023-09-05T03:00:00.000Z",
		"concluida": false
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existem ordens de fabricação"
}
```

---

### **listar ordens por cliente**

#### `GET` `/ordem/:id`

Essa é a rota que será chamada quando quisermos buscar ordens pelo nome de usuario e id.

- **Requisição**  
  Deverá ser enviado o ID da ordem no parâmetro de rota do endpoint.
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - cliente

#### **Exemplo de requisição**

```javascript
// GET /ordem/1
{
	"cliente": "matheus"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"cliente": "matheus",
		"produto": "brigadeiro",
		"quantidade": 5,
		"material": [
			"leite condensado",
			"chocolate"
		],
		"data_de_entrega": "2023-09-05T03:00:00.000Z",
		"concluida": false
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existem ordens de fabricação desse cliente"
}
```

### **listar ordem por conclusao**

#### `GET` `/ordem/finalizado`

Essa é a rota que será chamada para listar as ordens de fabricação concluidas ou em andamento.

- **Requisição**  
  Sem parâmetros de rota ou body.  
  O query deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - verificar : true ou false


#### **Exemplo de requisição**

```javascript
// GET /ordem/finalizado?verificar=false
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"cliente": "matheus",
		"produto": "brigadeiro",
		"quantidade": 5,
		"material": [
			"leite condensado",
			"chocolate"
		],
		"data_de_entrega": "2023-09-05T03:00:00.000Z",
		"concluida": false
	},
	{
		"id": 2,
		"cliente": "matheus",
		"produto": "bolo de chocolate",
		"quantidade": 5,
		"material": [
			"leite condensado",
			"chocolate"
		],
		"data_de_entrega": "2023-09-05T03:00:00.000Z",
		"concluida": false
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existem ordens de fabricação true"
}
```

### **Atualizar status de ordem de fabricação**

#### `PATCH` `/ordem`

Essa é a rota que será chamada quando o usuario quiser atualizar o status da ordem de fabricação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - cliente
  - id
  - concluido

#### **Exemplo de requisição**

```javascript
// PATCH /ordem
{
	"cliente": "matheus",
	"id": "1",
	"concluido": "true"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"cliente": "matheus",
		"produto": "brigadeiro",
		"quantidade": 5,
		"material": [
			"leite condensado",
			"chocolate"
		],
		"data_de_entrega": "2023-09-05T03:00:00.000Z",
		"concluida": true
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "o nome do cliente, id e concluido são obrigatorios"
}
```

### **criar materiais**

#### `POST` `/material`

Essa é a rota que será chamada quando o usuario quiser criar um material.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - quantidade

#### **Exemplo de requisição**

```javascript
// POST /material
{
	"nome": "chocolate",
	"quantidade": "24"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 4,
		"nome": "baunilha",
		"quantidade": 100
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Esse material já está presente no banco de dados."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "esta faltando algo, os seguintes sao necessarios: ",
	"obrigatorios": {
		"nome": "nome",
		"quantidade": "quantidade"
	}
}
```

### **listar material**

#### `GET` `/material`

Essa é a rota que será chamada quando o usuario quiser listar todos os materiais cadastrados no banco de dados.  

- **Requisição**  
  - Sem parâmetros de rota ou de query.
  - Não deverá possuir conteúdo no corpo da requisição.

#### **Exemplo de requisição**

```javascript
// GET /material
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"nome": "leite condensado",
		"quantidade": 14
	},
	{
		"id": 2,
		"nome": "brigadeiro",
		"quantidade": 24
	},
	{
		"id": 3,
		"nome": "chocolate",
		"quantidade": 14
	},
	{
		"id": 4,
		"nome": "baunilha",
		"quantidade": 100
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não existem materiais no banco de dados"
}
```

### **Atualizar quantidade de material**

#### `PATCH` `/material`

Essa é a rota que será utilizada para atualizar a quantidade de um determinado material  

- **Requisição**  
  Sem parâmetros de rota ou de query.
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - quantidade

#### **Exemplo de requisição**

```javascript
// PATCH /material
{
	"nome": "chocolate",
	"quantidade": "100" 
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 3,
		"nome": "chocolate",
		"quantidade": 100
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "esta faltando algo, os seguintes sao necessarios: ",
	"obrigatorios": {
		"nome": "nome",
		"quantidade": "quantidade"
	}
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existe material com este nome"
}
```

### **Deletar material**

#### `DELETE` `/material`

Essa é a rota que será chamada quando o usuario quiser deletar algum material determinado.  


- **Requisição**  
  Sem parâmetros de rota ou de query.
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome

#### **Exemplo de requisição**

```javascript
// DELETE /material
{
	"nome": "chocolate"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 3,
		"nome": "chocolate",
		"quantidade": 100
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existe material com este nome"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não é possível deletar o material sem o nome dele."
}
```

<br>

### Agradecimentos

Primeiramente gostaria de agradecer a oportunidade de particiar deste processo seletivo.
<br> 

### Melhorias a serem feitas após o processo

- usar o Knex.js para deixar o código mais limpo
- criar uma table de produtos
- crud de produtos
- usar o JSON WEB TOKEN para aumentar a segurança da api
- criar um sistema do login e registro para usuarios
- criar uma conta admin que pode fazer tudo na api
<br> 

## Para me encontrar:

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-tavares-viana/)
<a href="mailto:tavaresviana82@gmail.com">
  <img src="https://media.tenor.com/0gV2Cl5u1bQAAAAi/cute-mail.gif" width="50px" />
</a>
