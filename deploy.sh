#!/usr/bin/env bash
echo compiling native library...
cd ./native
./compile_linux.sh
echo compile successfuly to /web/bin/myLib.o

echo starting web server
cd ../web
node ./bin/www
echo server started