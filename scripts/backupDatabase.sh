#!/bin/bash

# Load environment variables
export $(grep -v '^#' .env | xargs)

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups/$TIMESTAMP"

mkdir -p $BACKUP_DIR

echo "Starting MongoDB backup..."

mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR"

if [ $? -eq 0 ]; then
  echo "Backup completed successfully at $BACKUP_DIR"
else
  echo "Backup failed"
  exit 1
fi