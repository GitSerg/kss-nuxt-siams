#!/bin/bash
echo "Starting application..."
npm run start &
echo "Starting server..."
npm run server:start &
wait -n # Wait for any background process to exit
exit $?