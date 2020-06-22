// Configuração do Wifi
const wifi = require("Wifi");
const wifiPassword = "pet-cyber";
const wifiApToConnect = "CYBER-PET";
const wifiOption = { password: wifiPassword, authMode: "wpa_wpa2" };
const wifiAp = "ESP8266";

// Configuração do MQTT
var server = "test.mosquitto.org"; // IP do servidor MQTT
var options = {
    client_id: "5ccf7f4c-f248",
    keep_alive: 60,         // Tempo do Keep Alive
    port: 1883,             // Número de porta
};
var topic = "run-bowl";
var mqtt = require("MQTT").create(server, options);
var topicExecute = "cyber-pet/execute";
var topicAlert = "cyber-pet/alert";

// Funçoes do Servo
const servoPin = 16;
var servo = require("servo").connect(servoPin);
function moveServo() {
    servo.move(1, 1050);
    mqtt.publish(topicAlert, "Pet Alimentado!");
}

// WIFI
// Led liga quando o ESP conecta na rede wi-fi
wifi.on('connected', () => {
    digitalWrite(2, 0);
});
// Led desliga quando o ESP desconecta da rede wi-fi
wifi.on('disconnected', () => {
    // Desliga led
    digitalWrite(2, 1);
});

//MQTT
mqtt.on('connected', function () {
    mqtt.subscribe(topicExecute);
    mqtt.subscribe(topicAlert);
});

mqtt.on('publish', function (pub) {
    if (pub.topic == topicExecute) {
        moveServo();
        digitalWrite(2, 1);
        console.log("Return mqtt executed!");
    }
});

function onInit() {
    // Conectar na rede, habilita hotspot e imprime o endereço de IP ao iniciar
    wifi.connect(wifiApToConnect, { password: wifiPassword });
    wifi.startAP(wifiAp, wifiOption);
    console.log("IP address: " + wifi.getIP().ip);
    // Conectar no MQTT
    mqtt.connect();
    digitalWrite(2, 0);
    console.log("MQTT alive!");
}

save();