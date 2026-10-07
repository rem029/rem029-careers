#!/bin/bash

# Check if environment argument is provided
ENV=${1:-development}
PROJECT_FOLDER=${2:-survey-do}
TASK=${3:-all} # Default to 'all' if no third parameter is provided
APP_DIR=$HOME/$PROJECT_FOLDER

echo "Environment: $ENV"
echo "Current working folder is $APP_DIR"
echo "Task: $TASK"

chown -R $USER $APP_DIR

echo 'Running git pull...'
git pull origin $ENV

source ~/.nvm/nvm.sh
nvm use 20.10.0
npm install -g yarn

# Conditional execution based on the third parameter
if [[ "$TASK" == "frontend" || "$TASK" == "all" ]]; then
  echo "Running@ $APP_DIR/scripts/$ENV/init-frontend.sh"
  source "$APP_DIR/scripts/$ENV/init-frontend.sh" "$PROJECT_FOLDER"
fi

if [[ "$TASK" == "backend" || "$TASK" == "all" ]]; then
  echo "Running@ $APP_DIR/scripts/$ENV/init-backend.sh"
  source "$APP_DIR/scripts/$ENV/init-backend.sh" "$PROJECT_FOLDER"
fi

pm2 save
