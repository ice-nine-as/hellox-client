#!/bin/sh

if [ "$(/usr/bin/docker inspect -f {{.State.Running}} hellox-client)" = "true" ]; then
    echo "Docker container hellox-client is functioning properly."
    exit 0
else
    # Output the State object for debugging.
    echo "Docker container state object:"
    echo "$(/usr/bin/docker inspect --format='{{json .State}}' hellox-client)"
    # Print the last 50 lines of the log.
    echo "Docker container logs (last 50 lines):"
    echo "$(/usr/bin/docker logs hellox-client | tail -50)"
    exit 1
fi
