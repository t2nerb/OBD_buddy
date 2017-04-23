#include "elmUtil.h"

#include <Arduino.h>
#include "constants.h"

SoftwareSerial elmSerial(ELM_RX, ELM_TX);

void sendRequest(String req) {
  elmSerial.print(req + String("\r\n"));

/*#ifdef DEBUG
  Serial.print(req + String("\r\n"));
#endif */
}

String getResponse() {
  String response = "";

  delay(50);

  //Serial.print("Response: ");
  while(elmSerial.available() > 0) {
    char a = elmSerial.read();
    //Serial.print(a);
    response += String(a);
    delay(50);
  }
  //Serial.println();

#ifdef DEBUG
  Serial.println(response);
#endif
  
  return response;
}

String getData(String response) {
  String data = response.substring(11, response.length() - 4);
#ifdef DEBUG
  Serial.print("Data: ");
  Serial.println(data);
  Serial.print("Data len: ");
  Serial.println(data.length());
#endif
  return data;
}

