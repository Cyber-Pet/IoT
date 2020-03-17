const C = require("./esp-wifi-manager.js"); //import the library
let isOn = false;
const interval = 500; // 500 milliseconds = 0.5 seconds
const LED=2;

function main() {
  C(LED, ()=>{
    setInterval(() => {
        isOn = !isOn; // Flips the state on or off
        digitalWrite(LED, isOn); // 2 is the blue LED on the ESP8266 boards
    }, interval);
  });
}