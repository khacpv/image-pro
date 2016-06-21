To compile `libfactorial.dylib` on OS X:

``` bash
$ gcc -dynamiclib -undefined suppress -flat_namespace factorial.c -o libfactorial.dylib
```

To compile `libfactorial.so` on Linux/Solaris/etc.:

``` bash
$ gcc -shared -fpic factorial.c -o libfactorial.so
```

To compile `libfactorial.dll` on Windows (http://stackoverflow.com/a/2220213):

``` bash
$ cl.exe /D_USRDLL /D_WINDLL factorial.c /link /DLL /OUT:libfactorial.dll
```

To run the example:

``` bash
$ node native.js 35
Your output: 6399018521010896896
```

FFI only run with node 4.1 & ffi2.0 & ref1.3.2
You should install match version (nvm for MACOS)