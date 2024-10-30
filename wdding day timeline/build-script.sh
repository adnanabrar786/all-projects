#!/bin/bash
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "master" ||  "$VERCEL_GIT_COMMIT_REF" == "dev-stable" || "$VERCEL_GIT_COMMIT_REF" == "dev-stable-v3" || "$VERCEL_GIT_COMMIT_REF" == "prod-v3" ]] ; then
  echo "✅ - Build can proceed"
  exit 1

else
  echo "🛑 - Build cancelled"
  exit 0
fi
