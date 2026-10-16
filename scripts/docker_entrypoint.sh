#!/bin/bash
set -e

ENV_VARS=(AUTH_API_URL CASINO_API_URL COINS_API_URL CUSTOMER_SERVICE_API_URL FINANCE_API_URL MEDIA_API_URL OPERATOR_API_URL CONTENT_API_URL)

args_clean=true
for name in ${ENV_VARS[@]}; do
    if [ -z "${!name}" ]; then
        echo "Please set environment variable \$$name"
        args_clean=false
    fi
done

if [ "$args_clean" = false ] ; then
    exit 1
fi


if [[ "${EXPOSE_SOURCEMAPS:-0}" == "1" ]]
  then
    cp /app/*.js.map /app/build/assets/
  else
    rm -f /app/build/assets/*.js.map
fi

exec "$@"
