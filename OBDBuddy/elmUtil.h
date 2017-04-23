#ifndef ELM_UTIL
#define ELM_UTIL

#include <SoftwareSerial.h>

extern SoftwareSerial elmSerial;

void sendRequest(String req);
String getResponse();
String getData(String response);

#endif

