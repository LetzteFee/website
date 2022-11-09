#!/bin/sh

#npm install

echo "removing build directory"
rm -r build

echo "creating build directory"
mkdir build

echo "copying from src to build"
cp -r src/* build/

echo "compiling typescript"
npx tsc

#remove .ts files from build dir

#get p5 library files