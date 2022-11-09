#!/bin/sh

#npm install

rm -r build
mkdir build
cp -r src/* build/
npx tsc

#remove .ts files from build dir

#get p5 library files