 ![Logo Cyber Pet](https://i.imgur.com/A1hTRro.png)
 
 # Cyber Pet

Seu pet já acordou de manhã cedo para pedir comida? Ou talvez você não pudesse chegar em casa a tempo, então teve que fazer seu animalzinho esperar até você chegar em casa para alimentá-lo? Bem, isso foi o que aconteceu conosco e tivemos a ideia de criar um alimentador de pets automático que possa ser controlado pela internet.

Além de programar os horários para alimentação automática, é possível alimentar seu pet de forma manual pelo aplicativo mobile próprio da Cyber Pet.


## Dados
```python
1 - Armazenado no dispositivo IOT
  a. Token de acesso;
  b. Horário definidos pelo usuário.
	
2 - Armazenado no dispositivo Mobile
  a. Token da API;
  b. Dados do usuário;
  c. Dados dos potes;
  d. Dados da ração;
  e. Horário de liberação da comida.
	
3 - Armazenado no servidor
  a. Dados do usuário;
  b. Dados dos potes;
  c. Dados da ração;
  d. Horário de liberação da comida.
```

## Ferramentas
```python
1 - Ferramentas físicas
  a. Microcontrolador NodeMCU ESP8266;
  b. Motor Servo 9g.

2 - Linguagens de Programação e Frameworks
  a. C#;
  b. JavaScript;
  c. React Native.

3 - Editores e demais ferramentas
  a. Espruino Web IDE;
  b. Expo;
  c. NodeJS;
  d. PostgreSQL;
  e. Sublime Text;
  f. Visual Studio Code.
```

## Arquitetura

![Arquitetura Cyber Pet](https://i.imgur.com/A2kqQqP.png)

## Desenvolvido por:
```
Gabriel Meyer
Gustavo Reinert
Jaderson Silva
Renato Rezende
```


https://michael-kuehnel.de/iot/2019/07/16/how-to-flash-esp8266-and-esp32-to-use-espruino-firmware-on-mac-os.html

esptool.py --port COM3 erase_flash 

esptool.py --port COM3 --baud 9600 write_flash --flash_mode qio 0x0000 boot_v1.6.bin 0x1000 espruino_esp8266_user1.bin 0x3FC000 esp_init_data_default.bin 0x3FE000 blank.bin