#!/bin/bash
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "uat-testing" || "$VERCEL_GIT_COMMIT_REF" == "dev" || "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "dev-pdf-comparison" || "$VERCEL_GIT_COMMIT_REF" == "uat-pdf-comparison" ]] ; then
  echo "✅ - Build can proceed"
  exit 1

else
  echo "🛑 - Build cancelled"
  exit 0
fi