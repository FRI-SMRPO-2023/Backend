#!/bin/sh

echo "Starting API container test";

npx prisma db push && npx prisma generate;
npx prisma db seed;

npm run dev;