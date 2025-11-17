#!/bin/sh
set -e

echo "Checking database connection..."

# Check if migrations exist
if [ -d "./prisma/migrations" ] && [ "$(ls -A ./prisma/migrations)" ]; then
  echo "Running database migrations..."
  npx prisma migrate deploy
else
  echo "No migrations found. Pushing schema to database..."
  npx prisma db push --skip-generate
fi

# Run database seeder if enabled
if [ "$DB_SEED" = "true" ]; then
  echo "Running database seeder..."
  npm run db:seed
fi

echo "Starting application..."
exec node build
