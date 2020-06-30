// Configuração do Wifi
const wifi = require("Wifi");
const wifiPassword = "pet-cyber";
const wifiApToConnect = "CYBER-PET";

// Configuração do MQTT
const server = "test.mosquitto.org"; // IP do servidor MQTT
const options = {
    client_id: wifi.getIP().mac,
    keep_alive: 60,         // Tempo do Keep Alive
    port: 1883,             // Número de porta
};
const mqtt = require("MQTT").create(server, options);
const topicExecute = `cyber-pet/execute/${wifi.getIP().mac}`;
const topicAlert = "cyber-pet/alert";

// Funçoes do Servo
function moveServo() {
    var servo = require("servo").connect(16);
    servo.move(1, 1050);
    mqtt.publish(topicAlert, "Pet Alimentado!");
}

//MQTT
mqtt.on('connected', function () {
    mqtt.subscribe(topicExecute);
    mqtt.subscribe(topicAlert);
});

mqtt.on('publish', function (pub) {
    if (pub.topic == topicExecute) {
        digitalWrite(2, 1);
        setTimeout(function(){
          digitalWrite(2, 0);
        },2000);
        console.log("Return mqtt executed!");
        moveServo();
    }
});


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



function onInit() {
    // Conectar na rede, habilita hotspot e imprime o endereço de IP ao iniciar
    wifi.connect(wifiApToConnect, { password: wifiPassword });
    mqtt.connect();
}

save();