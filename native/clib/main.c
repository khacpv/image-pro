#ifdef __cplusplus
extern "C" {
#endif

#include <stdint.h>
#include "util_str.c"

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

EXPORT uint64_t factorial(int max) {
  int i = max;
  uint64_t result = 1;

  while (i >= 2) {
    result *= i--;
  }

  return result;
}

EXPORT char* getString(char* input) {
    char* test = "welcome: <b>";
    test = concat(test, input);
    test = concat(test, "</b> from C++");
    return test;
}

#ifdef __cplusplus
}
#endif