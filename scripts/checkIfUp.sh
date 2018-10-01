#!/bin/sh

if [ "$(/usr/bin/docker inspect -f {{.State.Running}} hellox-client)" = "true" ]; then
    echo "Docker container hellox-client is functioning properly."
    exit 0
else
    # Output the State object for debugging.
    echo "Docker container state object:"
    echo "$(/usr/bin/docker inspect --format='{{json .State}}' hellox-client)"
    # Copy the log.
    /usr/bin/docker logs hellox-client > /etc/hellox-client/docker_error_logs.log
    # Restart the container
    cd /etc/hellox-client/
    gulp dockerUp
    exit 1
fi
