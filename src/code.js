// ESP8266
 const pin = 2;
 let on = 0;
 digitalWrite(pin, on);
 setInterval(() => {
   on = on === 0 ? 1 : 0;
   digitalWrite(pin, on);
 }, 100);