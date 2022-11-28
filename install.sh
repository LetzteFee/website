#!/bin/sh
echo "Installing missing Node Modules"
npm install

echo "Downloading p5 lib"
wget https://github.com/processing/p5.js/releases/download/v1.5.0/p5.js
echo "Installing p5 lib"
mkdir src/p5
mv p5.js src/p5/