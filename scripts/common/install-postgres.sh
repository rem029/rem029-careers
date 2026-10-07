#!/bin/bash

# Update the package lists:
sudo apt upgrade

echo 'Installing Postgres...'
# Install Postgres

# Create the file repository configuration:
sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Import the repository signing key:
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -


# Install the latest version of PostgreSQL.
# If you want a specific version, use 'postgresql-16' or similar instead of 'postgresql':
sudo apt-get -y install postgresql

# Start Postgres
sudo systemctl start postgresql

# Status Postgres
sudo systemctl status postgresql

echo 'Installing Postgres... Done.'