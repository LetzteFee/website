#!/bin/sh

rm -r build
mkdir build
cp -r src/* build/
npx tsc