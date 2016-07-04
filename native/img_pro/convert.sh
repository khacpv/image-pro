#!/usr/bin/env bash
IN=libfacedet.a
OUT=libfacedet.dylib
# gcc -dynamiclib -undefined suppress -flat_namespace $IN -o $OUT
# gcc -shared -o $OUT source.o -la_static_lib -lb_static_lib
ar -x $IN
gcc -shared *.o -o $OUT