const wifi = require("Wifi");

const wifiApToConnect = "CYBER-PET";
const wifiAp = "AAAA";
const wifiOption = { password: "pet-cyber", authMode:"wpa_wpa2" };








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
 wifi.connect(wifiApToConnect,{password: "pet-cyber"});
 wifi.startAP(wifiAp, wifiOption);
}
save();