#!/bin/bash

node build.js
aws s3 sync dist/ s3://celine-oliveira.com/
