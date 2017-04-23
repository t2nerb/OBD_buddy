#ifndef CONSTANTS_H
#define CONSTANTS_H

#define ELM_RX 10
#define ELM_TX 11

#define ELM_BAUD 9600

#define ELM_REQ_FUEL_LEVEL String("012f")
#define ELM_REQ_ERRORNO String("03")
#define ELM_REQ_SPEED String("010d")
#define ELM_REQ_FUEL_RATE String("015e")
#define ELM_REQ_ENGINE_TEMP String("0105")

#define WIFI_SHIELD_BAUD 9600

// WIFI hotspot connection info
#define WIFI_HOTSPOT_SSID "Dark Hole"
#define WIFI_HOTSPOT_PASSWORD "OBDBuddy"

#define WIFI_SERVER

// HTTP server info
#define HTTP_HOST "45.55.19.184"
#define HTTP_PORT 80
// HTTP values
#define HTTP_FUEL_LEVEL (String("fuellevel="))
#define HTTP_ERRNO (String("errno="))
#define HTTP_SPEED (String("speed="))
#define HTTP_FUEL_RATE (String("fuelrate="))
#define HTTP_ENGINE_TEMP (String("enginetemp="))

// Maybe need HTML header, too
#define HTTP_GET_REQUEST_COMPLETE(host) \
(String)"GET / HTTP/1.1\n" + \
(String)"Host: " + (String)(host) + (String)"\n" + \
(String)"Connection: close\n\n"

// 1.2.3.4/input?fuellevel=233&errno=u43o&speed=42&fuelrate=97&enginetemp=95

#define DEBUG_BAUD 9600

// Debug flag
#define DEBUG

#endif

