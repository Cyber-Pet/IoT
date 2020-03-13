// Conectar no Wifi
const wifi = require("Wifi");
wifi.connect("my-ssid", {password:"my-pwd"}, function(err){
  console.log("connected? err=", err, "info=", wifi.getIP());
});
wifi.stopAP();

// Criar ponto de acesso
// var wifi = require("Wifi");
// wifi.disconnect();
// wifi.startAP("my-ssid", {password:"my-password",authMode:"wpa_wpa2"});


// Fazer Requisisão para API
// var http = require("http");
// http.get("http://www.espruino.com", function(res) {
//   res.on('data', function(data) {
//     console.log(data);
//   });
// });

function onInit() {
 const pin = 2;
 let on = 0;
 digitalWrite(pin, on);
 setInterval(() => {
   on = on === 0 ? 1 : 0;
   digitalWrite(pin, on);
 }, 100);
}
save();