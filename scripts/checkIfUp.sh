#!/bin/sh

if [ "$(/usr/bin/docker inspect -f {{.State.Running}} hellox-client)" = "true" ]; then
    echo "Docker container hellox-client is functioning properly."
    exit 0
else
    # Output the State object for debugging.
    echo "Docker container state object:"
    echo "$(/usr/bin/docker inspect --format='{{json .State}}' hellox-client)"
    # Copy the log.
    echo "\nThe hellox-client container failed at $(date '+%Y-%m-%d %H:%M:%S'). The last 100 lines have been appended to /etc/hellox-logs/docker_error_logs.log."
    tail -100 $("docker inspect --format='{{.LogPath}}' containername") >> /etc/hellox-logs/docker_error_logs.log
    # Restart the container
    cd /etc/hellox-client/
    gulp dockerUp
    exit 1
fi
