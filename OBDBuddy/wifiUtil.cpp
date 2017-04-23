#include "wifiUtil.h"

#include <Arduino.h>
#include <SparkFunESP8266WiFi.h>
#include "constants.h"

void initializeESP8266()
{
  // esp8266.begin() verifies that the ESP8266 is operational
  // and sets it up for the rest of the sketch.
  // It returns either true or false -- indicating whether
  // communication was successul or not.
  // true
  int test = esp8266.begin();
  if (test != true)
  {
    Serial.println(F("Error talking to ESP8266."));
    while(1);
  }
  Serial.println(F("ESP8266 Shield Present"));
}

int connectWifi(String ssid, String password) {
  int retVal = esp8266.getMode();

  if(retVal != ESP8266_MODE_STA) {
    retVal = esp8266.setMode(ESP8266_MODE_STA);

#ifdef DEBUG
    if(retVal < 0) {
      Serial.println(F("Error setting mode"));
    } else {
      Serial.println(F("Mode set"));
    }
#endif
  }

  if(esp8266.getMode() == ESP8266_MODE_STA) {
    retVal = esp8266.status();
    if(retVal <= 0) {
#ifdef DEBUG
      Serial.print(F("Connecting to "));
      Serial.println(ssid);
#endif
      retVal = esp8266.connect(ssid.c_str(), password.c_str());
  
#ifdef DEBUG
      if(retVal < 0) {
        Serial.print("Error connecting: ");
        Serial.println(retVal);
      } else {
        Serial.println("Connected");
      }
#endif
    }
  }

  return retVal;
}

int connectAndSendHTTPRequest(String server, int port, String request) {
  ESP8266Client client;

  int retVal = client.connect(server.c_str(), port);
  if(retVal <= 0) {
    return retVal;
  }

  client.print(request);

  if(client.connected()) {
    client.stop();
  }

  return retVal;
}

