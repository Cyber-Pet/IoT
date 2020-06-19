const wifi = require("Wifi");
const http = require("http");
const servoPin = 16;
const servo = require("servo").connect(servoPin);

// Wifi config
const wifiApToConnect = "CYBER-PET";
const wifiOption = { password: "pet-cyber", authMode: "wpa_wpa2" };
const wifiAp = "ESP8266";

// MQTT config
var server = "test.mosquitto.org"; // the ip of your MQTT broker
var options = { // ALL OPTIONAL - the defaults are below
    client_id: "5ccf7f4c-f248",   // the client ID sent to MQTT - it's a good idea to define your own static one based on `getSerial()`
    keep_alive: 60,         // keep alive time in seconds
    port: 1883,             // port number
};
var mqtt = require("MQTT").create(server, options);

// Fazer requisisão para API
// const http = require("http");
// http.get("http://www.espruino.com", () => {
// your code here
//  });

// Faz um scan das redes disponíveis e imprime no terminal
// wifi.scan(function(scan) {
//   console.log(scan)
// });

function moveServo() {
    servo.move(1, 1050);
}

function onInit() {
    // Conectar na rede, habilita hotspot e imprime o endereço de IP ao iniciar
    wifi.connect(wifiApToConnect, { password: "pet-cyber" });
    wifi.startAP(wifiAp, wifiOption);
    console.log(getSerial());
    console.log("On Init: IP address: " + wifi.getIP().ip);
    mqtt.connect();
}

// Led liga quando o ESP conecta na rede wi-fi
wifi.on('connected', () => {
    // Imprime no terminal em qual rede está conectado e o endereço de IP
    console.log("Connected: Conectado na rede " + wifiApToConnect + "!");
    console.log("Connected: IP address: " + wifi.getIP().ip);
    // Liga led
    digitalWrite(2, 0);
    // Move servo
    servo.move(1);
});

// Led desliga quando o ESP desconecta da rede wi-fi
wifi.on('disconnected', () => {
    // Desliga led
    digitalWrite(2, 1);
    // Move servo
    servo.move(0);
});

//MQTT
mqtt.on('connected', function () {
    mqtt.subscribe("run-bowl");
    console.log("MQTT ALIVE!");
});

mqtt.on('publish', function (pub) {
    console.log("Return MQTT: " + pub.message);
    moveServo();
});

save();