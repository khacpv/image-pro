#gcc -dynamiclib -undefined suppress -flat_namespace clib/main.c -o myLib.dylib
gcc -shared -fpic clib/main.c -o myLib.so
