## Backend development with Node and Express

### Requirements

- Node >= 14
- Docker (for running Postgres)

### Start project

```bash
npm install
```
### Start the project

```bash
npm start
```

The project will start listening on [http://localhost:3001](http://localhost:3001)

#### Setup Prisma

```bash
npx prisma init
```

Add Database configuration to `.env` file.

Run a migration to create your database tables with Prisma Migrate

```bash
npx prisma migrate
```
You can visualize the database using the following command:

```bash
npx prisma studio
```







