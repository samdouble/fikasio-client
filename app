#!/bin/bash
#
# app development helper

set -euo pipefail

USAGE="Usage: app COMMAND [SUBCOMMAND]

Common usage:
  app dev
    start the development containers
  app server|server-test
    enter the specified container
  app server test-unit
    equivalent to run 'npm run test-unit' in 'server'"

if [[ "$#" == "0" ]]; then
  echo "No argument supplied"
  cmd="help"
else
  cmd="$1"
  shift
fi

# cd to the dir of this script
cd "${0%/*}"

case "${cmd}" in
  dev)
    sudo docker-compose build
    sudo docker-compose up
    ;;
  client)
    if [[ -z "${1-}" ]]; then
      sudo docker exec -it fikasio-client /bin/bash
    else
      sudo docker exec -it fikasio-client /bin/bash -c "yarn run $@"
    fi
    ;;
  list)
    sudo docker ps -a
    ;;
  clear)
    sudo docker stop $(sudo docker ps -aq)
    sudo docker rm $(sudo docker ps -aq)
    ;;
  clean)
    cd client
    sudo rm -rf node_modules/ yarn.lock
    cd ../server
    sudo rm -rf node_modules/ package-lock.json
    ;;
  prune)
    sudo docker system prune -a --volumes
    ;;
  help)
    echo "$USAGE"
    ;;
  *)
    echo "Unexpected command '${cmd}'" >&2
    exit 1
    ;;
esac

exit 0
