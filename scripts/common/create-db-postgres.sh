#!/bin/bash

# Default values
DEFAULT_ECOM_USER="careers"
DEFAULT_ECOM_PASSWORD="careers"
DEFAULT_POSTGRES_PASSWORD="careers"
DEFAULT_DB_NAME="careers-do"

# Read username with default
read -p "Enter username for the new postgres user: default($DEFAULT_ECOM_USER): " POSTGRES_ECOM_USER
POSTGRES_ECOM_USER=${POSTGRES_ECOM_USER:-$DEFAULT_ECOM_USER}
echo

# Read password for new user with default
read -sp "Enter password for the new postgres $POSTGRES_ECOM_USER: default($DEFAULT_ECOM_PASSWORD): " POSTGRES_ECOM_PASSWORD
POSTGRES_ECOM_PASSWORD=${POSTGRES_ECOM_PASSWORD:-$DEFAULT_ECOM_PASSWORD}
echo

# Read password for default postgres user with default
read -sp "Enter password for the default postgres user: default($DEFAULT_POSTGRES_PASSWORD): " POSTGRES_PASSWORD
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-$DEFAULT_POSTGRES_PASSWORD}
echo

# Read database name with default
read -p "Enter Postgres database name: default($DEFAULT_DB_NAME): " POSTGRES_DB_NAME
POSTGRES_DB_NAME=${POSTGRES_DB_NAME:-$DEFAULT_DB_NAME}
echo

# Setup Postgres
echo 'Setting postgres password...'
sudo -u postgres psql -c "ALTER USER postgres WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD'"

echo "Creating user $POSTGRES_ECOM_USER with password $POSTGRES_ECOM_PASSWORD"
sudo -u postgres createuser $POSTGRES_ECOM_USER

echo "Set user postgres with password $POSTGRES_ECOM_PASSWORD"
sudo -u postgres psql -c "ALTER USER $POSTGRES_ECOM_USER WITH ENCRYPTED PASSWORD '$POSTGRES_ECOM_PASSWORD'"

echo "Creating postgres database name $POSTGRES_DB_NAME under $POSTGRES_ECOM_USER"
sudo -u postgres psql -c "CREATE DATABASE $POSTGRES_DB_NAME OWNER $POSTGRES_ECOM_USER"

echo "DB_USER_NAME=$POSTGRES_ECOM_USER"
echo "DB_USER_PASSWORD=$POSTGRES_ECOM_PASSWORD"
echo "DB_NAME=$POSTGRES_DB_NAME"

echo 'Installing Postgres... Done.'