# /bin/bash
echo compiling c++ library

IN=clib/main.c
OUT=../bin/myLib.dylib
gcc -dynamiclib -undefined suppress -flat_namespace $IN -o $OUT

echo compile completed!