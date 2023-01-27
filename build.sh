#!/bin/env bash

echo "removing build directory"
rm -r build

echo "creating build directory"
mkdir build

echo "copying from src to build"
cp -r src/* build/

echo "compiling typescript"
tsc

#remove .ts files from build dir
