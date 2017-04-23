#ifndef WIFI_UTIL
#define WIFI_UTIL

#include <SoftwareSerial.h>

void initializeESP8266();
int connectWifi(String ssid, String password);
int connectAndSendHTTPRequest(String server, int port, String request);

#endif

