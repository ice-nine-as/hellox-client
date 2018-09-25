#!/bin/sh

if [ $(/usr/bin/docker inspect -f {{.State.Running}} hellox-client) = "true" ]; then
    exit 0
else
    exit 1
fi
