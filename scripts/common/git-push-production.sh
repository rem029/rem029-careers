#!/bin/bash

git checkout production && git pull origin main && git push origin production;
git checkout main