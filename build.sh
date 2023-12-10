#!/bin/env bash

#echo "removing build directory"
#rm -rf build

echo "creating build directory"
mkdir build

echo "copying from src to build"
cp -r src/* build/

echo "compiling typescript"
tsc

echo "Importing external Projects"
cp -r ../gravitation build/projects/gravitation
cp -r ../interferenz/src build/projects/interferenz
cp -r ../polynome-regression/src build/projects/regression
mkdir build/projects/magic-game
cp -r ../magic-game/src/*.[hj]* build/projects/magic-game/
# TODO: 
# remove .ts files from build dir
