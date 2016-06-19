#gcc -dynamiclib -undefined suppress -flat_namespace clib/main.c -o myLib.dylib

IN=clib/main.c
OUT=../web/bin/myLib.so

gcc -shared -fpic $IN -o $OUT
