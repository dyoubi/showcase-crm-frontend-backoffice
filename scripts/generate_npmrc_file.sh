#!/bin/sh
set -e

echo "Generating .npmrc file..."
{
    echo "auto-install-peers=true"
    echo "enable-pre-post-scripts=true"
    echo "link-workspace-packages=true"
    echo "prefer-workspace-packages=true"
    echo "store-dir=.pnpm-store"
    echo "@${EGC_IO_GROUP_NAMESPACE}:registry=https://${CI_SERVER_HOST}/api/v4/packages/npm/"
    echo "//${CI_SERVER_HOST}/:_authToken=${EGC_IO_NPM_TOKEN}"
    echo "//${CI_SERVER_HOST}/api/v4/packages/npm/:_authToken=${EGC_IO_NPM_TOKEN}"
    echo ""
    echo "@${CI_PROJECT_ROOT_NAMESPACE}:registry=https://${CI_SERVER_HOST}/api/v4/packages/npm/"
    echo "//${CI_SERVER_HOST}/:_authToken=${RING_NPM_TOKEN}"
    echo "//${CI_SERVER_HOST}/api/v4/packages/npm/:_authToken=${RING_NPM_TOKEN}"
} > .npmrc
echo ".npmrc file has been generated!"
