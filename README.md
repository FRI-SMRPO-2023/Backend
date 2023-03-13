### How to run

1. Copy `.env.example`, rename it as `.env` and change values if needed.
2. Run `docker compose up` to start the Postgres database and pgadmin.
   - PgAdmin is accessible on `localhost:5050` and database on `localhost:5432`.
   - If you only want need database, run `docker compose up db`.
3. Install node packages via `npm ci`
4. Sync prisma schema with the database: `npx prisma db push`
5. Add mock records to the database `npx prisma db seed`
6. Generate prisma client: `npx prisma generate`.
7. Run the server with `npm run dev`.
8. If you want to test Authentication, set USE_AUTH in the .env to "true" - some endpoints won't be
accessible if you're not logged in and some endpoints won't be accessible if you're not admin.
Check `seed.ts` file to see which users already exist in the development database (after using `npx prisma db seee`)

### DOCS
API documentation is available on `localhost:8000/docs`