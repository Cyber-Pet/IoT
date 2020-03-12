// Para usar o módulo no seu aplicativo, use a função require para chamá-lo a partir de qualquer arquivo JavaScript que tenha baixado as dependências
const five = require('johnny-five');
const {
  EtherPortClient
} = require('etherport-client');

// Reúne as informações de porta em portInfo
var portInfo = new EtherPortClient({
    host: '192.168.137.35',
    port: 3030
  });

// Cria objeto de placa com as informações de porta obtidas pelo IP e porta do dispositivo
const board = new five.Board({
  port: portInfo,
  repl: false,
});

// Declara pino referente ao Led onboard da ESP8266
const LED_PIN = 2;

// Quando a placa conecta e está pronta para uso, define o ,led onboard do Led e começa a piscar em intervalos de 200ms
board.on('ready', () => {
  console.log("Conectado!");
  const led = new five.Led(LED_PIN);
  
  led.blink(200);
});