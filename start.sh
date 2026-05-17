#!/bin/bash
# Backend ve frontend'i aynı anda başlatır.
# Ctrl+C ile ikisi de durur.

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Backend başlatılıyor (port 8000)..."
cd "$ROOT/backend"
source "$ROOT/venv/bin/activate"
uvicorn main:app --reload &
BACKEND_PID=$!

echo "Frontend başlatılıyor (port 3000)..."
cd "$ROOT/frontend"
npm run dev &
FRONTEND_PID=$!

trap "echo 'Durduruluyor...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

wait
