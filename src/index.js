const wifi = require("Wifi");
const http = require("http");
const servoPin = 16;
const servo = require("servo").connect(servoPin);
const wifiApToConnect = "CYBER-PET";
const wifiOption = {password: "pet-cyber", authMode:"wpa_wpa2"};
const wifiAp = "ESP8266";

// Fazer requisisão para API
// const http = require("http");
// http.get("http://www.espruino.com", () => {
// your code here
//  });

// Faz um scan das redes disponíveis e imprime no terminal
// wifi.scan(function(scan) {
//   console.log(scan)
// });

function onInit() {
    // Conectar na rede, habilita hotspot e imprime o endereço de IP ao iniciar
    wifi.connect(wifiApToConnect,{password: "pet-cyber"});
    wifi.startAP(wifiAp, wifiOption);
    console.log("IP address: " + wifi.getIP().ip);
}

// Led liga quando o ESP conecta na rede wi-fi
wifi.on('connected',() => {
    http.get("https://ghmeyer0.free.beeceptor.com", () => {
        // Imprime no terminal em qual rede está conectado e o endereço de IP
        console.log("Conectado na rede " + wifiApToConnect + "!");
        console.log("IP address: " + wifi.getIP().ip);
        // Liga led
        digitalWrite(2, 0);
        // Move servo
        servo.move(1);
    });
});

// Led desliga quando o ESP desconecta da rede wi-fi
wifi.on('disconnected',() => {
    http.get("https://ghmeyer0.free.beeceptor.com", () => {
        // Desliga led
        digitalWrite(2, 1);
        // Move servo
    servo.move(0);
    });
});

//SERVO rules

servo.move(0,500); // move to position 0 over 5 seconds

save();