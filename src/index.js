const wifi = require("Wifi");
const http = require("http");
const servoPin = 16;
const servo = require("servo").connect(servoPin);

// Configuração do Wifi
const wifiApToConnect = "CYBER-PET";
const wifiOption = { password: "pet-cyber", authMode: "wpa_wpa2" };
const wifiAp = "ESP8266";

// Configuração do MQTT
var server = "test.mosquitto.org"; // IP do servidor MQTT
var options = { 
    client_id: "5ccf7f4c-f248",   // Client ID enviado para o servidor do MQTT (no caso, o retorno do comando getSerial();)
    keep_alive: 60,         // Tempo do Keep Alive
    port: 1883,             // Número de porta
};
var topic = "run-bowl";
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
    // Conectar no MQTT
    mqtt.connect();
}

// Led liga quando o ESP conecta na rede wi-fi
wifi.on('connected', () => {
    // Imprime no terminal em qual rede está conectado e o endereço de IP
    console.log("Connected: Conectado na rede " + wifiApToConnect + "!");
    console.log("Connected: IP address: " + wifi.getIP().ip);
    // Liga led
    digitalWrite(2, 0);
});

// Led desliga quando o ESP desconecta da rede wi-fi
wifi.on('disconnected', () => {
    // Desliga led
    digitalWrite(2, 1);
});

//MQTT
mqtt.on('connected', function () {
    mqtt.subscribe(topic);
    console.log("MQTT ALIVE!");
});

mqtt.on('publish', function (pub) {
    console.log("Return MQTT: " + pub.message);
    moveServo();
});

save();