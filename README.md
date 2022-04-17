<div align="center">

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/paulo-carvalho93/desafio-dev-bycoders">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/paulo-carvalho93/desafio-dev-bycoders">
</p>

Desafio ByCoders.


<p align="center">
  <img alt="screenshot" width="650px" src="./.github/assets/bycoders_challenge.png" />
<p>

</div>

### Features

- Possibility to include different types of transactions and check out the incomes, outcomes, and balance.
- Allow the import of a TXT file to generate new records in the database.

### Summary

- [Technology](#rocket-technology)
  - [Application](#computer-web)
- [How to run](#boom-how-to-run)
  - [Backend](#hammer-backend)
  - [Web](#computer-web-1)


### :rocket: Technology

<div align="center">

![react](https://img.shields.io/badge/react-61dafb?&logoColor=000&style=for-the-badge&logo=react)
![nodejs](https://img.shields.io/badge/node.js-339933?&logoColor=FFF&style=for-the-badge&logo=node.js)
![typescript](https://img.shields.io/badge/typescript-007acc?&logoColor=FFF&style=for-the-badge&logo=typescript)
![styledcomponents](https://img.shields.io/badge/styled_components-DB7093?&logoColor=FFF&style=for-the-badge&logo=styled-components)
</div>


### :computer: Application

The application was developed with [Typescript](https://www.typescriptlang.org/) using the framework [ReactJS](https://reactjs.org/) and [Styled-Components](https://styled-components.com/) for visual proposes.

The backend is using NodeJS with Express and Multer to upload the TXT file and insert new records into the database.

---

# :boom: How to run

- ### **Prerequisites**

  - It's **necessary** to have **[Node.js](https://nodejs.org/en/)** installed on the computer
  - It's **necessary** to have **[Git](https://git-scm.com/)** installed and configured on the computer
  - Also, it's **necessary** to have a package manager either **[NPM](https://www.npmjs.com/)** or **[Yarn](https://yarnpkg.com/)**.
  - Finally, it is essential to have Docker installed to run database Postgres.


Clone the repository:

```sh
  $ git clone https://github.com/paulo-carvalho93/desafio-dev-bycoders.git
```


### :hammer: Backend

## Configuring Docker
The application use just [Postgres](https://www.postgresql.org/).  For the fastest setup is recommended to use [docker-compose](https://docs.docker.com/compose/), you just need to up all services:

```
$ cd backend
$ docker-compose up -d
```

> Then create one database called: `tests` (in case you would like to run the tests).

#### Migrations
Remember to run the database migrations:
```
$ yarn typeorm migration:run
```
> See more information on [TypeORM Migrations](https://typeorm.io/#/migrations).


### .env
Rename the `.env.example` in the root directory to `.env` then just update with your settings.

|key|description|default
|---|---|---
|APP_PORT|Port number where the app will run.|`3333`
|NODE_ENV|App environment. The typeORM's database choice rely on this key value, so if the environment is `test` the database used will be `tests` otherwise the `POSTGRES_DATABASE` will set the database name.|`development`
|POSTGRES_HOST|Postgres host.|`pg`
|POSTGRES_PORT|Postgres port.|`5432`
|POSTGRES_USER|Postgres user.| `postgres`
|POSTGRES_PASSWORD|Postgres password.| `docker`
|POSTGRES_DATABASE|Application's database name.| `bycoders`

```sh
  # API
  $ cd backend
  # Installing project dependencies.
  $ yarn # or npm install

  # Start Web Project
  $ yarn dev:server # or npm dev:server
```

**FYI: You don't** need to run ```yarn dev:server``` if you are using docker-compose.**

### :computer: Web

```sh
  # API
  $ cd frontend
  # Installing project dependencies.
  $ yarn # or npm install

  # Start Web Project
  $ yarn start # or npm start
```


## Routes
**Swagger: http://localhost:3333/docs/#/**

|route|HTTP Method|params|description
|:---|:---:|:---:|:---:
|`/transactions`|GET| - |Return transactions.
|`/transactions`|POST|More details about the body below .|Create a new transaction.
|`/transactions/import`|POST|Multipart payload with a `file` field with a `txt` file.|Import transactions from file.

### Requests
* `POST /transactions`

Request body:
```json
{
  "tipo": "Financiamento",
  "valor": "142",
  "cpf": "09620676017",
  "cartao": "4753****3153",
  "data": "2019-03-01T00:00:00.000Z",
  "hora": "15:34:53",
  "dono": "PAULO CARVALHO",
  "loja": "BAR DO PAULO"
}
```



