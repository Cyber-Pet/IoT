  const wifi = require("Wifi");
  const wifiApToConnect = "CYBER-PET";
  const wifiAp = "ESP8266";
  const wifiOption = {password: "pet-cyber", authMode:"wpa_wpa2"};

// Fazer Requisisão para API
// var http = require("http");
// http.get("http://www.espruino.com", function(res) {
//   res.on('data', function(data) {
//     console.log(data);
//   });
// });

function onInit() {
  // Conectar rede e habilitar hotspot
  wifi.connect(wifiApToConnect,{password: "pet-cyber"});
  wifi.startAP(wifiAp, wifiOption);
}

  // Led liga quando o ESP conecta na rede wi-fi
  wifi.on('connected',() => {
    digitalWrite(2, 0);
  });

  // Led desliga quando o ESP conecta na rede wi-fi
  wifi.on('disconnected',() => {
    digitalWrite(2, 1);
  });

save();