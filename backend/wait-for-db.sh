#!/usr/bin/env bash
set -e

host="$1"
shift
port="$1"
shift

echo "Waiting for Postgres at $host:$port..."
until nc -z "$host" "$port"; do
  echo "Postgres not ready yet..."
  sleep 0.5
done

echo "Postgres ready! Starting backend..."
exec "$@"
