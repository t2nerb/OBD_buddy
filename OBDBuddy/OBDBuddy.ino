#include <SoftwareSerial.h> 
#include <SparkFunESP8266WiFi.h>

#include "elmUtil.h"
#include "wifiUtil.h"
#include "constants.h"

void setup() {
  // put your setup code here, to run once:

// Start debug serial
#ifdef DEBUG
  Serial.begin(DEBUG_BAUD);
#endif
  
  // Setup ELM327 serial communications
  elmSerial.begin(ELM_BAUD);

  /* initializeESP8266();

  if(connectWifi(WIFI_HOTSPOT_SSID, WIFI_HOTSPOT_PASSWORD) < 0) {
    Serial.println(F("Couldn't connect to hotspot"));
    while(1);
  } */
}

int toHexInt(String num);
float getFuelRate();

void loop() {
  // put your main code here, to run repeatedly:
  
  // OBD parameters (test values for now)
  sendRequest(ELM_REQ_FUEL_LEVEL);
  int fuelLevel = toHexInt(getData(getResponse()));
  
  sendRequest(ELM_REQ_ERRORNO);
  String errorCodes = "0000"; //getData(getResponse());

  sendRequest(ELM_REQ_SPEED);
  int vehicleSpeed = toHexInt(getData(getResponse()));
  
  // 0 <= fuelRate <= 32...
  //sendRequest(ELM_REQ_FUEL_RATE);
  int fuelRate = 1; // getFuelRate();
  
  // -40 <= engineTemp <= 210
  sendRequest(ELM_REQ_ENGINE_TEMP);
  int engineTemp = toHexInt(getData(getResponse())) - 40;

  String strFuelLevel = HTTP_FUEL_LEVEL + String(fuelLevel) + (String("&"));
  String strErrorCodes = HTTP_ERRNO + String(errorCodes) + (String("&"));
  String strSpeed = HTTP_SPEED + String(vehicleSpeed) + (String("&"));
  String strFuelRate = HTTP_FUEL_RATE + String(fuelRate) + (String("&"));
  String strEngineTemp = HTTP_ENGINE_TEMP + String(engineTemp);

  /* String strFuelLevel = HTTP_FUEL_LEVEL + String("0.25&");
  String strErrorCodes = HTTP_ERRNO + String("4300&");
  String strSpeed = HTTP_SPEED + String("60&");
  String strFuelRate = HTTP_FUEL_RATE + String("0.00&");
  String strEngineTemp = HTTP_ENGINE_TEMP + String("60"); */

  //String host = // HTTP_HOST + (String("/input?")) + strFuelLevel + strErrorCodes + strSpeed + strFuelRate + strEngineTemp;

  String request = (String)"GET /" + (String("/input?")) + strFuelLevel + strErrorCodes + strSpeed + strFuelRate + strEngineTemp + " HTTP/1.1\n" + \
    (String)"Host: " + (String)(HTTP_HOST) + (String)"\n" + \
    (String)"Connection: close\n\n";

#ifdef DEBUG
  Serial.println(request);
#endif

  if(connectAndSendHTTPRequest(HTTP_HOST, HTTP_PORT, request) <= 0) {
#ifdef DEBUG
    Serial.println(F("Failed to connect"));
#endif
  }

  delay(1000);
}

int toHexInt(String num) {
  int retVal = 0;
  for(int i = 0; i < num.length(); ++i) {
    char digit = num[num.length() - i - 1];
    if(digit >= '0' && digit <= '9') {
      retVal += (digit - '0') * (1 << 4 * i);
    } else if(digit >= 'A' && digit <= 'F') {
      retVal += (digit - 'A' + 10) * (1 << 4 * i);
    } else {
      return retVal;
    }
  }

  return retVal;
}

float getFuelRate() {
  String data = getData(getResponse());
  int a = toHexInt(data.substring(0, 2));
  int b = toHexInt(data.substring(3));
  return (256 * a + b) / 20.f;
}

